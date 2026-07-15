-- League-Art · 0004 site_content (콘텐츠 교체 수준 기본 관리)
-- ─────────────────────────────────────────────────────────────
-- 적용: Supabase 대시보드 SQL Editor에 붙여넣기 실행 (또는 supabase db push)
--
-- 관리자 콘텐츠 편집기(/admin/content)가 공개 페이지의 주요 문구를 key-value 로
-- 저장한다. 공개 페이지는 이 값을 우선 렌더하고, 없으면 코드 기본값으로 폴백한다.
--
-- 보안:
--   · RLS 활성화 + 정책 없음 → anon/authenticated 직접 접근 차단.
--   · 읽기(공개 페이지)·쓰기(관리자)는 모두 서버 사이드 service_role 로만.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.site_content (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
