import {
  MOCK_MONTHLY_VISITS,
  MOCK_TRAFFIC_SOURCES,
  MOCK_TOP_PAGES,
  MOCK_DEVICES,
  MOCK_FUNNEL,
} from "@/lib/mock-admin-data";

export default function AdminAnalyticsPage() {
  const maxMonthly = Math.max(...MOCK_MONTHLY_VISITS.map((m) => m.visitors));
  const maxPage = Math.max(...MOCK_TOP_PAGES.map((p) => p.views));
  const funnelTop = MOCK_FUNNEL[0].count;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">방문 통계</h1>
        <p className="mt-1 text-sm text-neutral-500">
          유입 경로·페이지·기기·전환 흐름을 확인하세요.
        </p>
      </div>

      {/* 월별 방문자 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-bold">월별 방문자 (최근 6개월)</p>
        <div className="mt-6 flex items-end justify-between gap-3">
          {MOCK_MONTHLY_VISITS.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs text-neutral-400">
                {m.visitors.toLocaleString("ko-KR")}
              </span>
              <div
                className="w-full rounded-t bg-accent/80"
                style={{ height: `${(m.visitors / maxMonthly) * 140}px` }}
              />
              <span className="text-xs font-medium text-neutral-500">
                {m.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 유입 경로 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-bold">유입 경로</p>
          <ul className="mt-5 space-y-3">
            {MOCK_TRAFFIC_SOURCES.map((s) => (
              <li key={s.source}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{s.source}</span>
                  <span className="text-neutral-400">
                    {s.visitors.toLocaleString("ko-KR")} · {s.pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 기기 비율 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-bold">기기 비율</p>
          <ul className="mt-5 space-y-4">
            {MOCK_DEVICES.map((d) => (
              <li key={d.type}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{d.type}</span>
                  <span className="font-semibold text-neutral-900">{d.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-neutral-800"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-neutral-400">
            모바일 유입이 다수입니다. 모바일 UX 최적화가 전환율에 직접 영향을 줍니다.
          </p>
        </div>
      </div>

      {/* 인기 페이지 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-bold">인기 페이지 (조회수)</p>
        <ul className="mt-5 space-y-3">
          {MOCK_TOP_PAGES.map((p) => (
            <li key={p.path} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-sm font-medium">{p.label}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-accent/70"
                  style={{ width: `${(p.views / maxPage) * 100}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-sm text-neutral-500">
                {p.views.toLocaleString("ko-KR")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 전환 퍼널 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-bold">상담 전환 퍼널</p>
        <div className="mt-5 space-y-2">
          {MOCK_FUNNEL.map((f, i) => {
            const pct = Math.round((f.count / funnelTop) * 100);
            return (
              <div key={f.step} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm text-neutral-700">
                  {f.step}
                </span>
                <div className="h-8 flex-1 overflow-hidden rounded-lg bg-neutral-100">
                  <div
                    className="flex h-full items-center rounded-lg bg-accent/80 px-3 text-xs font-semibold text-white"
                    style={{ width: `${Math.max(pct, 12)}%` }}
                  >
                    {f.count.toLocaleString("ko-KR")}
                  </div>
                </div>
                <span className="w-12 shrink-0 text-right text-sm text-neutral-400">
                  {i === 0 ? "100%" : `${pct}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        ※ 예시(mock) 데이터입니다. 실제 통계는 애널리틱스(GA4/네이버 애널리틱스 등)
        연동 후 표시됩니다.
      </p>
    </div>
  );
}
