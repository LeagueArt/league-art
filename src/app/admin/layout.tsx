import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import AdminShell from "./AdminShell";

/**
 * 관리자 레이아웃 — 서버 사이드 접근 가드(이메일 화이트리스트).
 *
 * 이 서버 컴포넌트가 모든 /admin 하위 라우트의 단일 관문이다:
 *  - getAdminUser()가 ADMIN_EMAILS 화이트리스트로 관리자 여부를 서버에서 검증.
 *  - 미로그인/비관리자(일반 회원 포함)는 렌더 전에 /login 으로 redirect.
 *  - 검증을 통과한 관리자에게만 클라이언트 UI(AdminShell)를 렌더한다.
 *
 * 클라이언트 가드와 달리 서버에서 차단하므로 비관리자는 하위 페이지의
 * 데이터/마크업 자체를 받지 못한다.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const name = admin.user_metadata?.name;
  const userLabel =
    typeof name === "string" && name ? `${name} 님` : (admin.email ?? "관리자");

  return <AdminShell userLabel={userLabel}>{children}</AdminShell>;
}
