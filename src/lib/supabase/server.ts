import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./env";

/**
 * 서버(Server Component / Route Handler / Server Action)용 Supabase 클라이언트.
 * 사용자 세션 쿠키를 읽어 RLS가 적용된 상태로 동작. anon 키 사용.
 * (관리자 전체 조회는 이 클라이언트가 아니라 admin.ts의 service_role 클라이언트로)
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component에서 호출된 경우 무시 — 세션 갱신은 proxy(미들웨어)가 담당.
        }
      },
    },
  });
}
