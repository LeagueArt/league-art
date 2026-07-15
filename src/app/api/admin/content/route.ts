import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONTENT_KEYS } from "@/lib/content-schema";

/**
 * 관리자 콘텐츠 저장 — site_content upsert 후 공개 페이지 재검증(revalidate).
 *  - 관리자(ADMIN_EMAILS 화이트리스트)만 허용.
 *  - 알려진 키만 저장(화이트리스트) + 길이 제한.
 *  - 저장 즉시 공개 페이지에 반영되도록 관련 경로를 revalidatePath.
 */
export const dynamic = "force-dynamic";

const MAX_LEN = 2000;

// 콘텐츠 키 접두사 → 재검증할 공개 경로
const PATH_BY_PREFIX: Record<string, string> = {
  home: "/",
  about: "/about",
  curriculum: "/curriculum",
  benefit: "/faq",
};

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: { values?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const entries = Object.entries(body.values ?? {}).filter(
    ([key, value]) => CONTENT_KEYS.includes(key) && typeof value === "string",
  );
  if (entries.length === 0) {
    return NextResponse.json({ error: "저장할 항목이 없습니다." }, { status: 400 });
  }

  const rows = entries.map(([key, value]) => ({
    key,
    value: (value as string).slice(0, MAX_LEN),
    updated_at: new Date().toISOString(),
  }));

  try {
    const svc = createAdminClient();
    const { error } = await svc.from("site_content").upsert(rows, { onConflict: "key" });
    if (error) {
      return NextResponse.json(
        { error: "저장에 실패했습니다. site_content 테이블(0004) 적용 여부를 확인하세요." },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }

  // 변경된 섹션에 해당하는 공개 페이지 재검증
  const paths = new Set<string>();
  for (const [key] of entries) {
    const prefix = key.split(".")[0];
    if (PATH_BY_PREFIX[prefix]) paths.add(PATH_BY_PREFIX[prefix]);
  }
  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ ok: true });
}
