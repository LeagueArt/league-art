import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * 공개 상담 신청 저장 엔드포인트.
 *
 *  - 비로그인 방문자가 /contact 폼에서 제출 → consults 테이블에 저장.
 *  - consults 는 RLS 잠금(정책 없음)이므로 service_role(서버 전용)로만 삽입한다.
 *  - 입력값은 서버에서 검증·길이 제한 후 저장(과도한 payload 차단).
 *
 * TODO(운영): 스팸 방지를 위한 rate limit / 캡차는 트래픽 상황에 맞춰 추가 권장.
 */
export const dynamic = "force-dynamic";

const MAX = { name: 60, phone: 40, grade: 60, school: 120, target: 160, referrer: 120 };

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "서버가 아직 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const grade = clean(body.grade, MAX.grade);

  // 필수값 검증 (폼의 required 와 일치).
  if (!name || !phone || !grade) {
    return NextResponse.json(
      { error: "이름·연락처·학년은 필수입니다." },
      { status: 400 },
    );
  }

  const record = {
    name,
    phone,
    grade,
    school: clean(body.school, MAX.school) || null,
    target: clean(body.target, MAX.target) || null,
    referrer: clean(body.referrer, MAX.referrer) || null,
  };

  try {
    const svc = createAdminClient();
    const { error } = await svc.from("consults").insert(record);
    if (error) {
      return NextResponse.json(
        { error: "저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
