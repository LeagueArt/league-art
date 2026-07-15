import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./env";

/**
 * 브라우저(클라이언트 컴포넌트)용 Supabase 클라이언트.
 * anon 키 + RLS로 "본인 데이터만" 접근. service_role은 절대 사용하지 않음.
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
