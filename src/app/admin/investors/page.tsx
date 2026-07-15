import {
  MOCK_INVESTOR_KPIS,
  MOCK_PIPELINE_FUNNEL,
  MOCK_REFERRAL_PERF,
  MOCK_CONSENT_BREAKDOWN,
} from "@/lib/mock-admin-data";

export default function AdminInvestorsPage() {
  const funnelTop = MOCK_PIPELINE_FUNNEL[0].count;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">투자자 지표</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Eqüre 데이터 파이프라인 Layer 1 — 성장·전환·데이터 자산 지표.
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_INVESTOR_KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">{k.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{k.value}</p>
            <p
              className={`mt-1 text-xs font-medium ${
                k.positive ? "text-green-600" : "text-accent"
              }`}
            >
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* 데이터 파이프라인 퍼널 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-bold">데이터 파이프라인 전환</p>
        <p className="mt-1 text-xs text-neutral-400">
          방문 → 가입 → 상담 신청 → 등록 전환 (월 기준)
        </p>
        <div className="mt-5 space-y-2">
          {MOCK_PIPELINE_FUNNEL.map((f, i) => {
            const pct = Math.round((f.count / funnelTop) * 100);
            return (
              <div key={f.step} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm text-neutral-700">
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 레퍼럴 성과 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-bold">레퍼럴 채널 성과</p>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
                <th className="pb-2 font-semibold">채널</th>
                <th className="pb-2 text-right font-semibold">가입</th>
                <th className="pb-2 text-right font-semibold">전환율</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_REFERRAL_PERF.map((r) => (
                <tr key={r.channel}>
                  <td className="py-2.5 font-medium">{r.channel}</td>
                  <td className="py-2.5 text-right text-neutral-600">
                    {r.signups}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-accent">
                    {r.conversion}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 데이터 동의율 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-bold">데이터 동의율</p>
          <ul className="mt-5 space-y-4">
            {MOCK_CONSENT_BREAKDOWN.map((c) => (
              <li key={c.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{c.label}</span>
                  <span className="font-semibold text-neutral-900">{c.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-neutral-400">
            민감정보(멘탈케어)는 별도 동의 후 분리 보관됩니다. 동의 데이터는 거버넌스
            규칙에 따라 관리됩니다.
          </p>
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        ※ 예시(mock) 데이터입니다. 실제 지표는 백엔드·애널리틱스·동의 로그 연동 후
        집계됩니다.
      </p>
    </div>
  );
}
