import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 회원 목록 조회 (관리자 전용).
 *
 * 보안:
 *  - Server Component에서만 실행 → service_role 키는 서버에만 존재(클라 번들 미노출).
 *  - getAdminUser()로 이메일 화이트리스트 검증. 비관리자는 접근 불가.
 *  - RLS는 일반 사용자를 타인 데이터로부터 보호. 전체 조회는 service_role로만.
 */

type Member = {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  confirmed: boolean;
};

export default async function AdminMembersPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">회원 목록</h1>
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase 환경변수가 아직 설정되지 않았습니다. 키 설정 및 마이그레이션 적용
          후 실제 회원 목록이 표시됩니다.
        </p>
      </div>
    );
  }

  // 관리자 검증 (이메일 화이트리스트). 비관리자/미로그인은 로그인으로.
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  let members: Member[] = [];
  let loadError = "";
  try {
    const svc = createAdminClient();
    const {
      data: { users },
    } = await svc.auth.admin.listUsers({ page: 1, perPage: 200 });
    const { data: profiles } = await svc
      .from("profiles")
      .select("user_id, name, phone, created_at");
    const pmap = new Map(
      (profiles ?? []).map((p) => [p.user_id as string, p]),
    );
    members = users.map((u) => {
      const p = pmap.get(u.id);
      const metaName =
        typeof u.user_metadata?.name === "string" ? u.user_metadata.name : "";
      return {
        id: u.id,
        email: u.email ?? "—",
        name: (p?.name as string) || metaName || "—",
        phone: (p?.phone as string) || "—",
        createdAt: (u.created_at ?? "").slice(0, 10),
        confirmed: Boolean(u.email_confirmed_at),
      };
    });
  } catch {
    loadError =
      "회원 목록을 불러오지 못했습니다. SUPABASE_SERVICE_ROLE_KEY(서버 환경변수)를 확인해 주세요.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">회원 목록</h1>
        <p className="mt-1 text-sm text-neutral-500">
          총 {members.length}명 · 관리자 {admin.email}
        </p>
      </div>

      {loadError ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {loadError}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 font-semibold">이름</th>
                  <th className="px-4 py-3 font-semibold">이메일</th>
                  <th className="px-4 py-3 font-semibold">연락처</th>
                  <th className="px-4 py-3 font-semibold">가입일</th>
                  <th className="px-4 py-3 font-semibold">이메일 인증</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-neutral-400"
                    >
                      아직 가입한 회원이 없습니다.
                    </td>
                  </tr>
                ) : (
                  members.map((m) => (
                    <tr key={m.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                        {m.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                        {m.phone}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                        {m.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                            m.confirmed
                              ? "bg-green-100 text-green-700"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          {m.confirmed ? "인증됨" : "미인증"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-400">
        ※ 실데이터입니다. 회원 개인정보는 서버 사이드(service_role)에서만 조회되며,
        RLS로 일반 사용자는 타인 데이터에 접근할 수 없습니다.
      </p>
    </div>
  );
}
