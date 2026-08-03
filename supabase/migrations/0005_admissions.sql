-- League-Art · 0005 admissions (합격 실적 명단)
-- ─────────────────────────────────────────────────────────────
-- 적용: Supabase 대시보드 SQL Editor에 붙여넣기 실행 (또는 supabase db push)
--
-- 공개 합격자 명단 페이지(/admissions)에 노출되는 합격 실적을 저장한다.
-- 관리자 콘솔(/admin/admissions)에서 추가/수정/삭제한다.
--
-- 보안(고정 원칙과 일치):
--   · RLS 활성화 + 정책 없음 → anon/authenticated 는 조회·삽입 전면 차단.
--   · 공개 페이지 조회도 서버 사이드 service_role 로만 (RLS 우회는 서버에서만).
--   · 쓰기(추가/수정/삭제)는 관리자 API가 service_role 로 수행.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.admissions (
  id         uuid primary key default gen_random_uuid(),
  year       integer not null,
  student    text not null,
  school     text not null,
  program    text,
  country    text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 연도 내림차순 → 수동 정렬값 오름차순 → 생성순.
create index if not exists admissions_order_idx
  on public.admissions (year desc, sort_order asc, created_at desc);

-- RLS 활성화. 정책을 두지 않으므로 anon/authenticated 역할은 접근 불가.
-- (service_role 은 RLS를 우회하므로 서버에서만 읽고 쓴다.)
alter table public.admissions enable row level security;
