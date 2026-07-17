import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/admin-auth";

/**
 * 현재 로그인 사용자가 관리자인지 여부만 반환 (마이페이지의 관리자 바로가기 노출용).
 * 세션 쿠키 기반 서버 판별 → ADMIN_EMAILS 목록을 클라이언트에 노출하지 않는다.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdminUser();
  return NextResponse.json({ isAdmin: Boolean(admin) });
}
