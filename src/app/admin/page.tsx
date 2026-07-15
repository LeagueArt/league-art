import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  MOCK_STATS,
  MOCK_VISITS_7D,
  MOCK_CONSULTS,
  STATUS_LABEL,
} from "@/lib/mock-admin-data";

const STAT_CARDS = [
  { label: "오늘 상담", value: MOCK_STATS.todayConsults, suffix: "건" },
  { label: "이번 주 상담", value: MOCK_STATS.weekConsults, suffix: "건" },
  { label: "누적 상담", value: MOCK_STATS.totalConsults, suffix: "건" },
  { label: "주간 방문자", value: MOCK_STATS.weekVisitors, suffix: "명" },
];

const STATUS_STYLE: Record<string, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-100 text-amber-700",
  done: "bg-neutral-200 text-neutral-600",
};

export default function AdminDashboard() {
  const maxVisitors = Math.max(...MOCK_VISITS_7D.map((d) => d.visitors));
  const recent = MOCK_CONSULTS.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-1 text-sm text-neutral-500">
          상담 신청과 방문 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 지표 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              {s.value.toLocaleString("ko-KR")}
              <span className="ml-1 text-base font-medium text-neutral-400">
                {s.suffix}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* 방문자 추이 + 전환율 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-2">
          <p className="text-sm font-bold">최근 7일 방문자</p>
          <div className="mt-6 flex items-end justify-between gap-3">
            {MOCK_VISITS_7D.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs text-neutral-400">{d.visitors}</span>
                <div
                  className="w-full rounded-t bg-accent/80"
                  style={{ height: `${(d.visitors / maxVisitors) * 120}px` }}
                />
                <span className="text-xs font-medium text-neutral-500">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-bold">상담 전환율</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-accent">
            {MOCK_STATS.conversionRate}%
          </p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            방문자 대비 상담 신청 비율 (최근 7일 기준)
          </p>
        </div>
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
                <p className="truncate text-xs text-neutral-500">{c.target}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-neutral-400">{c.createdAt}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[c.status]}`}
                >
                  {STATUS_LABEL[c.status]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
