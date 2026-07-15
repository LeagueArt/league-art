import { FiBarChart2 } from "react-icons/fi";

/**
 * 방문 통계 — 웹 애널리틱스 연동 전이므로 실데이터 소스가 없다.
 * 가짜 수치를 노출하지 않고, 연동 시 제공될 지표를 안내하는 정직한 빈 상태를 표시한다.
 */

const PLANNED = [
  "월별 · 일별 방문자 추이",
  "유입 경로 (검색 · 소셜 · 직접 유입)",
  "인기 페이지 (조회수)",
  "기기 비율 (모바일 · 데스크탑 · 태블릿)",
  "상담 전환 퍼널 (방문 → 상담 페이지 → 폼 작성 → 신청 완료)",
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">방문 통계</h1>
        <p className="mt-1 text-sm text-neutral-500">
          유입 경로·페이지·기기·전환 흐름을 확인하세요.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-400 shadow-sm">
            <FiBarChart2 size={20} />
          </span>
          <div>
            <p className="text-base font-bold text-neutral-800">
              애널리틱스 연동이 필요합니다
            </p>
            <p className="text-sm text-neutral-500">
              방문 통계는 추적 데이터가 있어야 표시할 수 있습니다.
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-neutral-600">
          현재 사이트에는 방문자 추적 도구가 연결돼 있지 않아 표시할 실데이터가
          없습니다. GA4, 네이버 애널리틱스, 또는 Vercel Analytics 중 하나를 연동하면
          아래 지표가 이 화면에 집계됩니다.
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {PLANNED.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-600"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
