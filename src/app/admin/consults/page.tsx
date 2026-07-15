import {
  MOCK_CONSULTS,
  STATUS_LABEL,
  type ConsultStatus,
} from "@/lib/mock-admin-data";

const STATUS_STYLE: Record<ConsultStatus, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-100 text-amber-700",
  done: "bg-neutral-200 text-neutral-600",
};

export default function AdminConsultsPage() {
  const total = MOCK_CONSULTS.length;
  const newCount = MOCK_CONSULTS.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">상담 신청</h1>
        <p className="mt-1 text-sm text-neutral-500">
          총 {total}건 · 신규 {newCount}건
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <th className="px-4 py-3 font-semibold">이름</th>
                <th className="px-4 py-3 font-semibold">연락처</th>
                <th className="px-4 py-3 font-semibold">학년</th>
                <th className="px-4 py-3 font-semibold">현재 학교</th>
                <th className="px-4 py-3 font-semibold">희망 학교 / 전공</th>
                <th className="px-4 py-3 font-semibold">추천인</th>
                <th className="px-4 py-3 font-semibold">신청일</th>
                <th className="px-4 py-3 font-semibold">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_CONSULTS.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                    {c.phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                    {c.grade}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {c.school || <span className="text-neutral-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.target}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {c.referrer || <span className="text-neutral-300">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {c.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[c.status]}`}
                    >
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        ※ 예시(mock) 데이터입니다. 실제 상담 신청은 백엔드(폼 저장) 연결 후
        표시됩니다. 신청자 개인정보는 role 기반 접근 제어로 보호될 예정입니다.
      </p>
    </div>
  );
}
