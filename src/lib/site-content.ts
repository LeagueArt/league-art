import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONTENT_DEFAULTS } from "@/lib/content-schema";

/**
 * 공개 페이지용 사이트 콘텐츠 조회 (서버 전용).
 *  - site_content 테이블(service_role)에서 편집된 값을 읽어 코드 기본값 위에 덮는다.
 *  - 테이블 미생성/조회 실패/미설정 시 기본값으로 폴백 → 사이트가 항상 정상 렌더.
 *
 * 공개 페이지는 `export const revalidate` 로 ISR 캐시되며, 편집 저장 시
 * revalidatePath 로 즉시 갱신된다(/api/admin/content).
 */
export type SiteContent = Record<string, string>;

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const svc = createAdminClient();
    const { data, error } = await svc.from("site_content").select("key, value");
    if (error) return { ...CONTENT_DEFAULTS };
    const merged: SiteContent = { ...CONTENT_DEFAULTS };
    for (const row of data ?? []) {
      if (typeof row.value === "string") merged[row.key as string] = row.value;
    }
    return merged;
  } catch {
    return { ...CONTENT_DEFAULTS };
  }
}
