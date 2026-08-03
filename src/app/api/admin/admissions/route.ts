import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 합격 실적 명단 관리 (관리자 전용) — 추가/수정/삭제.
 *  - ADMIN_EMAILS 화이트리스트 통과자만 허용.
 *  - service_role 로 쓰기(RLS 우회는 서버에서만).
 *  - 변경 시 공개 페이지(/admissions) 재검증.
 */
export const dynamic = "force-dynamic";

const MAX_LEN = 200;

/** 입력값 정리: 문자열 트림 + 길이 제한. 빈 문자열이면 null 옵션 지원. */
function str(v: unknown, { nullable = false } = {}): string | null {
  if (typeof v !== "string") return nullable ? null : "";
  const t = v.trim().slice(0, MAX_LEN);
  return nullable && t === "" ? null : t;
}

/** 연도 정수 파싱(1900~2100). 유효하지 않으면 null. */
function parseYear(v: unknown): number | null {
  const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
  if (!Number.isInteger(n) || n < 1900 || n > 2100) return null;
  return n;
}

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const year = parseYear(body.year);
  const student = str(body.student);
  const school = str(body.school);
  if (year === null || !student || !school) {
    return NextResponse.json(
      { error: "연도·학생·학교는 필수입니다." },
      { status: 400 },
    );
  }

  const row = {
    year,
    student,
    school,
    program: str(body.program, { nullable: true }),
    country: str(body.country, { nullable: true }),
    sort_order: parseYear(body.sort_order) === null ? 0 : Number(body.sort_order) || 0,
  };

  try {
    const svc = createAdminClient();
    const { error } = await svc.from("admissions").insert(row);
    if (error) {
      return NextResponse.json(
        { error: "추가에 실패했습니다. admissions 테이블(0005) 적용 여부를 확인하세요." },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }

  revalidatePath("/admissions");
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const year = parseYear(body.year);
  const student = str(body.student);
  const school = str(body.school);
  if (!id || year === null || !student || !school) {
    return NextResponse.json(
      { error: "연도·학생·학교는 필수입니다." },
      { status: 400 },
    );
  }

  const patch = {
    year,
    student,
    school,
    program: str(body.program, { nullable: true }),
    country: str(body.country, { nullable: true }),
  };

  try {
    const svc = createAdminClient();
    const { error } = await svc.from("admissions").update(patch).eq("id", id);
    if (error) {
      return NextResponse.json({ error: "수정에 실패했습니다." }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }

  revalidatePath("/admissions");
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: { id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ error: "유효하지 않은 값입니다." }, { status: 400 });
  }

  try {
    const svc = createAdminClient();
    const { error } = await svc.from("admissions").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }

  revalidatePath("/admissions");
  return NextResponse.json({ ok: true });
}
