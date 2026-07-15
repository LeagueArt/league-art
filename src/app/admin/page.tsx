import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  getAdminStats,
  getConsults,
  STATUS_LABEL,
  type ConsultStatus,
} from "@/lib/admin-data";

/**
 * 관리자 대시보드 — 실데이터 요약.
 *  - 회원/상담 카운트는 DB(service_role)에서 조회.
 *  - 방문자·전환율 등 애널리틱스 지표는 추적 인프라 연동 전이므로 표시하지 않는다.
 */

const STATUS_STYLE: Record<ConsultStatus, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-100 text-amber-700",
  done: "bg-neutral-200 text-neutral-600",
};

function fmtDate(iso: string): string {
  const kst = new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function statValue(n: number | null): string {
  return n === null ? "—" : n.toLocaleString("ko-KR");
}

export default async function AdminDashboard() {
  const [stats, { rows }] = await Promise.all([getAdminStats(), getConsults()]);
  const recent = rows.slice(0, 5);

  const cards = [
    { label: "오늘 상담", value: statValue(stats.consultsToday), suffix: "건" },
    { label: "신규(미처리) 상담", value: statValue(stats.consultsNew), suffix: "건" },
    { label: "누적 상담", value: statValue(stats.consultsTotal), suffix: "건" },
    { label: "누적 회원", value: statValue(stats.members), suffix: "명" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-1 text-sm text-neutral-500">
          상담 신청과 회원 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 지표 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              {s.value}
              <span className="ml-1 text-base font-medium text-neutral-400">
                {s.suffix}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* 방문 통계 안내 (애널리틱스 미연동) */}
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6">
        <p className="text-sm font-bold text-neutral-700">방문자 · 전환율 통계</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          방문자 추이와 전환율은 웹 애널리틱스(GA4 · 네이버 애널리틱스 · Vercel
          Analytics 등) 연동 후 표시됩니다. 현재는 추적 데이터가 수집되지 않아 표시할
          실데이터가 없습니다.
        </p>
      </div>

      {/* 최근 상담 신청 */}
      <div className="rounded-2xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <p className="text-sm font-bold">최근 상담 신청</p>
          <Link
            href="/admin/consults"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            전체 보기 <FiArrowRight size={14} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-neutral-500">
            아직 접수된 상담 신청이 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {recent.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-4 px-6 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {c.name}
                    <span className="ml-2 text-xs text-neutral-400">
                      {c.grade}
                    </span>
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {c.target || "희망 학교 미기재"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-neutral-400">
                    {fmtDate(c.created_at)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[c.status]}`}
                  >
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
