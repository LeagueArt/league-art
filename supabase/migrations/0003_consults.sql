-- League-Art · 0003 consults (상담 신청 저장)
-- ─────────────────────────────────────────────────────────────
-- 적용: Supabase 대시보드 SQL Editor에 붙여넣기 실행 (또는 supabase db push)
--
-- 공개 상담 신청 폼(/contact)의 제출을 저장한다. 비로그인 방문자가 남기는
-- 데이터이므로 user_id는 두지 않는다.
--
-- 보안(고정 원칙과 일치):
--   · RLS 활성화 + 정책 없음 → anon/authenticated 는 조회·삽입 전면 차단.
--   · 삽입은 서버 API(/api/consult)가 service_role 로 수행.
--   · 관리자 조회도 서버 사이드 service_role 로만 (RLS 우회는 서버에서만).
-- ─────────────────────────────────────────────────────────────

create table if not exists public.consults (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  grade      text not null,
  school     text,
  target     text,
  referrer   text,
  status     text not null default 'new' check (status in ('new', 'contacted', 'done')),
  created_at timestamptz not null default now()
);

create index if not exists consults_created_idx
  on public.consults (created_at desc);

-- RLS 활성화. 정책을 두지 않으므로 anon/authenticated 역할은 접근 불가.
-- (service_role 은 RLS를 우회하므로 서버에서만 읽고 쓴다.)
alter table public.consults enable row level security;
