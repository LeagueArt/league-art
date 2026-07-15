# Supabase 설정 · 실행 가이드 (League-Art)

리그아트 **단독 소유** Supabase 프로젝트로 회원가입/로그인/DB/인증을 운영합니다.
외부 회사(이큐어)는 회원 데이터에 접근하지 않으며, SSO/공용 사용자 풀은 없습니다.

## 1. 프로젝트 생성

1. [supabase.com](https://supabase.com) 에서 **리그아트 명의** 계정으로 새 프로젝트 생성.
2. Project Settings → API 에서 아래 값 확인:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ 서버 전용, 절대 노출 금지)

## 2. 환경변수

`.env.example` 을 복사해 `.env.local` 생성 후 값 입력:

```bash
cp .env.example .env.local
```

| 변수 | 노출 | 용도 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 클라이언트 O | 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 클라이언트 O | anon 키 (RLS 적용) |
| `SUPABASE_SERVICE_ROLE_KEY` | **서버 전용 X** | 관리자 회원 조회 (RLS 우회) |
| `ADMIN_EMAILS` | 서버 전용 | 관리자 이메일 화이트리스트(콤마 구분) |

- `NEXT_PUBLIC_` 접두사가 붙은 값만 브라우저 번들에 포함됩니다.
- `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS` 는 접두사 없이 → 서버에서만 접근.
- Vercel 배포 시 동일 변수를 **Project → Settings → Environment Variables** 에 등록.

## 3. DB 마이그레이션 적용

`supabase/migrations/0001_init.sql` — profiles + consents + RLS + 회원가입 트리거.

- **방법 A (대시보드)**: SQL Editor 에 파일 내용 붙여넣기 → Run.
- **방법 B (CLI)**:
  ```bash
  npx supabase link --project-ref <your-ref>
  npx supabase db push
  ```

## 4. 인증 설정 (Supabase 대시보드)

- Authentication → Providers → **Email** 활성화 (소셜/외부 IdP는 사용하지 않음).
- Authentication → URL Configuration:
  - Site URL: 배포 도메인 (예: `https://www.league-art.kr`)
  - Redirect URLs 에 `.../auth/callback` 추가 (로컬: `http://localhost:3000/auth/callback`).
- 이메일 확인(Confirm email) 사용 여부는 정책에 맞게. 사용 시 가입 후 확인 메일 필요.

## 5. 실행

```bash
npm install
npm run dev
```

## 6. 동작 구조 (키 사용처 한곳 정리)

| 위치 | 클라이언트 | 키 |
|------|-----------|-----|
| `src/lib/supabase/env.ts` | 공개 값 중앙화 | URL, anon |
| `src/lib/supabase/client.ts` | 브라우저 | anon |
| `src/lib/supabase/server.ts` | 서버(쿠키 세션) | anon |
| `src/lib/supabase/admin.ts` | **서버 전용**(`server-only`) | **service_role** |
| `src/lib/supabase/admin-auth.ts` | 서버 전용 | `ADMIN_EMAILS` |
| `src/proxy.ts` | 미들웨어(세션 갱신) | anon |

- 회원 페이지: `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/mypage`
- 관리자 회원 목록: `/admin/members` (서버 사이드 service_role + 관리자 화이트리스트)

## 7. 이큐어 제3자 제공 전달 계층 (기본 OFF)

리그아트 B 구조(단독 소유 Auth/DB) **위에** 동의 기반 최소 데이터 전달만 얹은 계층.
통합 로그인·공용 사용자 풀·공동이용은 **구현하지 않음**(계약상 별도 합의 영역).

### 노출 대상·필드·시점
- **대상 회원**: `consents`의 `type='equre_3rd_party'` **최신 상태가 동의(granted=true, revoked_at IS NULL)** 인 회원만.
- **노출 필드**: 각 회원이 동의한 `items` 배열에 포함된 필드만 (`이름→name`, `이메일→email`, `연락처→phone`). 동의 안 한 필드는 **NULL 마스킹**.
- **시점**: `equre_shared_view` 조회 시점의 실시간 상태. 회원가입 동의는 signUp, 이후 변경은 `/mypage`.
- 비동의/철회 회원은 뷰에 **아예 나타나지 않음** + `profiles` RLS(본인만)로 이중 차단.

### 철회 동작
- `/mypage`에서 "동의 철회" → `consents`에 `granted=false, revoked_at=now()` 행을 **append**(이력 보존).
- 최신 행이 철회로 바뀌므로 다음 조회부터 뷰에서 **즉시 제외** = 계약상 "즉시 사용 중단" 대응.

### 전달 경계 (읽기 전용 뷰 + 통제된 엔드포인트)
- `equre_shared_view` (0002): 필터·마스킹을 **DB에 고정**. `anon`/`authenticated` 접근 회수 → `service_role`만.
- `/api/equre/export` (GET): 아래 **둘 다** 충족해야만 응답. 이큐어는 `service_role`을 받지 않고 아래 토큰만.
  1. `EQURE_SHARING_ENABLED === "true"` (아니면 404)
  2. 요청 헤더 `x-equre-export-token === EQURE_EXPORT_TOKEN`

### 연동 켜기 / 끄기
- **끄기(기본)**: `EQURE_SHARING_ENABLED` 미설정 또는 `false` → 엔드포인트 404. 데이터 전달 없음.
- **켜기**: `.env.local`(또는 Vercel 환경변수)에
  ```
  EQURE_SHARING_ENABLED=true
  EQURE_EXPORT_TOKEN=<긴 랜덤 시크릿>
  ```
  설정 후 이큐어에 **엔드포인트 URL + `EQURE_EXPORT_TOKEN`만** 전달.
- **즉시 중단**: `EQURE_SHARING_ENABLED=false` 로 되돌리면 전체 채널 차단.
- `purpose`/`retention`(이용목적·보유기간)은 제3자 제공 **표준 문구**로 기입됨(`src/lib/equre-consent.ts` + 0001 트리거 동일). 계약 제9조 원문이 별도로 있으면 두 곳을 동일하게 교체하세요(법률 검토 권장).

## 8. 인수인계 체크리스트

- [ ] Supabase 프로젝트 소유권이 리그아트 계정인지 확인.
- [ ] 이큐어 등 외부 조직 멤버 제거 (개발 기간 종료 시 권한 반납).
- [ ] `SUPABASE_SERVICE_ROLE_KEY`, anon 키 **재발급/교체**.
- [ ] `.env.local` 은 커밋되지 않음 (`.gitignore` 확인).
- [ ] 배포 환경변수에 service_role 이 **NEXT_PUBLIC_ 없이** 등록됐는지 확인.
