import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 상담 신청 상태 변경 (관리자 전용).
 *  - ADMIN_EMAILS 화이트리스트 통과자만 허용.
 *  - status 는 new/contacted/done 만 허용(DB CHECK 제약과 일치).
 *  - service_role 로 업데이트(RLS 우회는 서버에서만).
 */
export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "done"] as const;

export async function PATCH(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: { id?: unknown; status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const status = body.status;
  if (!id || typeof status !== "string" || !STATUSES.includes(status as never)) {
    return NextResponse.json({ error: "유효하지 않은 값입니다." }, { status: 400 });
  }

  try {
    const svc = createAdminClient();
    const { error } = await svc
      .from("consults")
      .update({ status })
      .eq("id", id);
    if (error) {
      return NextResponse.json({ error: "상태 변경에 실패했습니다." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
