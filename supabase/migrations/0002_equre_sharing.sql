-- League-Art · 0002 이큐어 제3자 제공 전달 경계 (읽기 전용 뷰)
-- ─────────────────────────────────────────────────────────────
-- 목적: 동의(granted=true·미철회)한 회원의, 동의한 항목만 노출하는 뷰.
--   · 비동의/철회 회원은 절대 나타나지 않음 (WHERE 필터).
--   · 동의하지 않은 필드는 NULL 마스킹 (items 배열 기반).
--   · anon/authenticated 접근 회수 → service_role(서버)만 조회.
--   · profiles RLS는 그대로 유지(약화 금지). 이 뷰는 통제된 별도 채널.
--   · 실제 이큐어 연동은 export 엔드포인트 토글(EQURE_SHARING_ENABLED)로 제어 — 기본 OFF.
--
-- 현재 상태 판정: consents append-only 이력에서 user별 최신(granted_at desc) 행.
--   최신이 철회(granted=false)면 뷰에서 즉시 제외 → "즉시 사용 중단" 대응.
-- ─────────────────────────────────────────────────────────────

create or replace view public.equre_shared_view
with (security_invoker = false)  -- 정의자(소유자) 권한 실행: auth.users 조인 위함. 접근은 아래 revoke로 통제.
as
with latest as (
  select distinct on (c.user_id)
    c.user_id,
    c.granted,
    c.revoked_at,
    c.items
  from public.consents c
  where c.type = 'equre_3rd_party'
  order by c.user_id, c.granted_at desc
)
select
  l.user_id,
  case when '이름'   = any (l.items) then p.name  end as name,
  case when '이메일' = any (l.items) then u.email end as email,
  case when '연락처' = any (l.items) then p.phone end as phone
from latest l
join public.profiles p on p.user_id = l.user_id
join auth.users     u on u.id       = l.user_id
where l.granted is true
  and l.revoked_at is null;

-- 접근 차단: 브라우저 키(anon)·로그인 사용자(authenticated)는 이 뷰를 읽을 수 없음.
-- service_role(서버 전용)만 조회 가능 → 이큐어는 service_role을 받지 않고,
-- 서버 export 엔드포인트(별도 EQURE_EXPORT_TOKEN + 토글)를 통해서만 접근.
revoke all on public.equre_shared_view from anon, authenticated;

comment on view public.equre_shared_view is
  '이큐어 제3자 제공용 읽기 전용 뷰. 동의(미철회) 회원의 동의 항목만 노출. service_role 전용.';
