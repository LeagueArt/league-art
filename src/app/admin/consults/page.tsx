import { getConsults, STATUS_LABEL, type ConsultStatus } from "@/lib/admin-data";

/**
 * 상담 신청 목록 (관리자 전용).
 *  - consults 테이블을 service_role 로 조회 (RLS 우회는 서버에서만).
 *  - 공개 상담 폼(/contact → /api/consult)이 저장한 실데이터.
 */

const STATUS_STYLE: Record<ConsultStatus, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-100 text-amber-700",
  done: "bg-neutral-200 text-neutral-600",
};

function fmtDate(iso: string): string {
  // KST 기준 YYYY-MM-DD
  const d = new Date(iso);
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export default async function AdminConsultsPage() {
  const { rows, ready } = await getConsults();
  const total = rows.length;
  const newCount = rows.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">상담 신청</h1>
        <p className="mt-1 text-sm text-neutral-500">
          총 {total}건 · 신규 {newCount}건
        </p>
      </div>

      {!ready ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          consults 테이블을 찾을 수 없습니다. Supabase에 <code>0003_consults.sql</code>{" "}
          마이그레이션을 적용하면 상담 신청이 여기에 표시됩니다.
        </div>
      ) : total === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-12 text-center text-sm text-neutral-500">
          아직 접수된 상담 신청이 없습니다. 공개 상담 폼(/contact)으로 신청이 들어오면
          이곳에 표시됩니다.
        </div>
      ) : (
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
                {rows.map((c) => (
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
                    <td className="px-4 py-3 text-neutral-600">
                      {c.target || <span className="text-neutral-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {c.referrer || <span className="text-neutral-300">—</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                      {fmtDate(c.created_at)}
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
      )}
    </div>
  );
}
