import "server-only"; // 이 모듈을 클라이언트에서 import하면 빌드가 실패 → service_role 유출 원천 차단
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./env";

/**
 * service_role 클라이언트 — 서버 전용. RLS를 우회하므로 **관리자 조회에만** 사용.
 *
 * 보안 규칙 (계약 별첨 12항):
 *  - SUPABASE_SERVICE_ROLE_KEY는 NEXT_PUBLIC_ 접두사 금지 = 클라이언트 번들 미노출.
 *  - 이 파일은 `import "server-only"`로 클라이언트 임포트를 차단.
 *  - 인수인계 시 이 키를 반드시 재발급/교체.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) {
    throw new Error(
      "Supabase 관리자 설정 누락: SUPABASE_SERVICE_ROLE_KEY (서버 환경변수) 확인 필요.",
    );
  }
  return createSupabaseClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
