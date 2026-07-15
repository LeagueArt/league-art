/**
 * Supabase 공개 환경변수 (클라이언트 노출 허용).
 * ⚠️ service_role 키는 여기 두지 않습니다 → admin.ts(server-only)에서만 읽습니다.
 *    (NEXT_PUBLIC_ 접두사 금지 원칙)
 *
 * 키 사용처 한곳 모으기:
 *  - NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY → 이 파일(env.ts)
 *  - SUPABASE_SERVICE_ROLE_KEY → src/lib/supabase/admin.ts (서버 전용)
 *  - ADMIN_EMAILS → src/lib/supabase/admin-auth.ts (서버 전용)
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Supabase 공개 키가 설정되어 있는지 (미설정이어도 사이트가 죽지 않도록 가드에 사용) */
export const isSupabaseConfigured = () =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
