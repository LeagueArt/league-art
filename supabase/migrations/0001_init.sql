-- League-Art · 0001 init (profiles + consents + RLS + 회원가입 트리거)
-- ─────────────────────────────────────────────────────────────
-- 적용: 리그아트 명의 Supabase 프로젝트 생성 후 (별첨 A 10항)
--   · Supabase CLI:  supabase db push
--   · 또는 대시보드 SQL Editor에 이 파일 내용 붙여넣기 실행
--
-- 고정 원칙:
--   · 인증 = 이메일 기반 (Supabase Auth). 소셜/외부 IdP/권한등급 없음.
--   · 모든 회원 테이블 RLS로 "본인(auth.uid() = user_id)만" 접근.
--   · 외부 회사(이큐어) 접근 없음. SSO/공용 사용자 풀 없음.
--   · 관리자 전체 조회는 서버 사이드 service_role로만 (RLS 우회는 서버에서만).
-- ─────────────────────────────────────────────────────────────

-- 1) profiles ─ auth.users 1:1 (최소 컬럼)
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text,
  phone      text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 본인만 조회/수정 (insert는 아래 트리거가 담당하되, 본인 insert도 허용)
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 2) consents ─ 동의 이력(append-only, 본인만). 실제 외부 공유는 하지 않고 "동의 사실"만 기록.
--    type: 'terms_privacy'(필수), 'equre_3rd_party'(선택, 제9조 이큐어 제3자 제공)
--    이력 보존: 덮어쓰지 않고 행을 append. 현재 상태 = user별 최신(granted_at desc) 행.
create table if not exists public.consents (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  type       text not null default 'equre_3rd_party',
  granted    boolean not null,
  purpose    text,                                              -- 이용 목적
  items      text[],                                            -- 제공 항목(배열)
  retention  text,                                              -- 보유·이용 기간
  provider   text default '주식회사 이큐어(Equre Co., Ltd.)',   -- 제공받는 자
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists consents_user_type_idx
  on public.consents (user_id, type, granted_at desc);

alter table public.consents enable row level security;

-- 본인만 자기 동의 레코드 select/insert/update
create policy "consents_select_own"
  on public.consents for select
  using (auth.uid() = user_id);

create policy "consents_insert_own"
  on public.consents for insert
  with check (auth.uid() = user_id);

create policy "consents_update_own"
  on public.consents for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3) 회원가입 트리거 ─ auth.users insert 시 profiles + consents 자동 생성
--    (이메일 확인 여부와 무관하게 서버측에서 기록되도록 SECURITY DEFINER)
--    signUp 시 options.data 로 넘긴 name/phone/consent_equre 를 사용.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'phone'
  );

  insert into public.consents (user_id, type, granted)
  values (new.id, 'terms_privacy', true);

  -- 이큐어 제3자 제공 동의(선택). 아래 4항목은 src/lib/equre-consent.ts 와 일치해야 함.
  insert into public.consents (user_id, type, granted, purpose, items, retention, provider)
  values (
    new.id,
    'equre_3rd_party',
    coalesce((new.raw_user_meta_data ->> 'consent_equre')::boolean, false),
    '이큐어의 통합 회원 관리 및 본인 식별, 맞춤형 서비스·혜택 제공, 이벤트·프로모션 등 정보 안내, 서비스 개선을 위한 통계·분석',
    array['이름', '이메일', '연락처'],
    '제공일로부터 회원 탈퇴 또는 동의 철회 시까지. 단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관 후 파기합니다.',
    '주식회사 이큐어(Equre Co., Ltd.)'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
