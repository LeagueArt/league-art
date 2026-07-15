import { getAdminStats, getConsentStats } from "@/lib/admin-data";

/**
 * 투자자 지표 — 실데이터로 산출 가능한 것만 노출.
 *  - 누적 회원 / 누적 상담: DB 카운트(실데이터).
 *  - 데이터 동의율: consents 테이블 기준(실데이터).
 *  - 방문·전환·CAC·재방문 등 성장 지표: 애널리틱스 연동 전이므로 표시하지 않는다.
 */

function fmt(n: number | null): string {
  return n === null ? "—" : n.toLocaleString("ko-KR");
}

export default async function AdminInvestorsPage() {
  const [stats, consent] = await Promise.all([
    getAdminStats(),
    getConsentStats(),
  ]);

  const kpis = [
    { label: "누적 회원", value: fmt(stats.members) },
    { label: "누적 상담 신청", value: fmt(stats.consultsTotal) },
    {
      label: "이큐어 데이터 동의율",
      value: consent.equrePct === null ? "—" : `${consent.equrePct}%`,
    },
  ];

  const consentRows = [
    { label: "필수(상담·약관) 동의", pct: consent.members > 0 ? 100 : null },
    { label: "이큐어 제3자 제공 동의", pct: consent.equrePct },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">투자자 지표</h1>
        <p className="mt-1 text-sm text-neutral-500">
          성장·데이터 자산 지표 — DB에서 집계한 실데이터.
        </p>
      </div>

      {/* KPI 카드 (실데이터) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">{k.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{k.value}</p>
          </div>
        ))}
      </div>

      {/* 데이터 동의율 (실데이터) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-bold">데이터 동의율</p>
        <p className="mt-1 text-xs text-neutral-400">
          가입 회원 {fmt(consent.members)}명 기준 · consents 로그 집계
        </p>
        <ul className="mt-5 space-y-4">
          {consentRows.map((c) => (
            <li key={c.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-neutral-700">{c.label}</span>
                <span className="font-semibold text-neutral-900">
                  {c.pct === null ? "—" : `${c.pct}%`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${c.pct ?? 0}%` }}
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

      {/* 성장 지표 안내 (애널리틱스 미연동) */}
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6">
        <p className="text-sm font-bold text-neutral-700">
          성장 · 전환 지표 (연동 예정)
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          방문 → 가입 → 상담 → 등록 전환율, CAC, 재방문율, 레퍼럴 채널 성과 등은
          웹 애널리틱스와 등록(전환) 데이터가 연동되면 이곳에 집계됩니다. 추정·예시
          수치는 표시하지 않습니다.
        </p>
      </div>
    </div>
  );
}
