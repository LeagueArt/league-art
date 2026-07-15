import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 이큐어 전용 export 엔드포인트 (기본 OFF).
 *
 * 접근 통제(다중):
 *  1) 토글: EQURE_SHARING_ENABLED === "true" 아니면 즉시 404 (연동 미개시).
 *  2) 별도 스코프 토큰: x-equre-export-token === EQURE_EXPORT_TOKEN.
 *     (service_role/anon 키와 분리된 시크릿. 이큐어는 이 토큰만 받음.)
 *  3) 데이터는 equre_shared_view 에서만 → 동의(미철회)·동의항목만. 비동의자 원천 제외.
 *
 * 철회 즉시 반영: 뷰가 consents 최신 상태를 실시간 반영 → 철회자는 다음 호출부터 제외.
 * 실제 이큐어 연동을 켤 때만 환경변수 2개를 설정하세요(README 참고).
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // 1) 토글 OFF면 존재하지 않는 것처럼 응답
  if (process.env.EQURE_SHARING_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2) 별도 스코프 토큰 검증
  const expected = process.env.EQURE_EXPORT_TOKEN;
  const provided = request.headers.get("x-equre-export-token");
  if (!expected || !provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3) 동의자·동의항목만 담긴 뷰 조회 (service_role, 서버 전용)
  try {
    const svc = createAdminClient();
    const { data, error } = await svc
      .from("equre_shared_view")
      .select("user_id, name, email, phone");
    if (error) {
      return NextResponse.json({ error: "Query failed" }, { status: 500 });
    }
    return NextResponse.json({
      provider: "주식회사 이큐어(Equre Co., Ltd.)",
      count: data?.length ?? 0,
      members: data ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
}
