import "server-only";
import { createClient } from "./server";
import { isSupabaseConfigured } from "./env";

/**
 * 관리자 판별 — 이메일 화이트리스트(서버 전용 env ADMIN_EMAILS, 콤마 구분).
 * 권한 등급(role) 관리는 계약 범위 밖이라 도입하지 않고, 단순 화이트리스트로 보호.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * 현재 로그인 사용자가 관리자면 user, 아니면 null.
 * 세션은 서버 클라이언트(anon+쿠키)로 검증 → 관리자 데이터 조회는 별도 service_role 클라이언트로.
 */
export async function getAdminUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;
  return getAdminEmails().includes(user.email.toLowerCase()) ? user : null;
}
