import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase 이메일 링크 콜백 — 회원가입 확인 / 비밀번호 재설정 링크를 세션으로 교환.
 *
 * 두 방식을 모두 지원한다:
 *  1) token_hash + type → verifyOtp (권장). code_verifier 쿠키가 필요 없어
 *     "PC에서 요청 → 폰에서 링크 클릭" 같은 다른 기기/브라우저에서도 동작한다.
 *  2) code → exchangeCodeForSession (PKCE). 같은 브라우저에서 진행한 경우.
 *
 * 성공 시 next 경로로, 실패 시 /login?error=auth_callback 로 리디렉션.
 * 예) 비밀번호 재설정: /auth/callback?token_hash=...&type=recovery&next=/reset-password
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
