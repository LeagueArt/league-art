"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** 비밀번호 재설정 요청 — 재설정 링크가 담긴 메일 발송. */

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-accent";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("아직 설정되지 않은 기능입니다. (Supabase 환경변수 필요)");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    setError("");
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    // 계정 존재 여부를 노출하지 않도록 항상 동일하게 완료 처리
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto flex min-h-[68vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
          ✉
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          재설정 메일을 보냈습니다
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {email} 로 비밀번호 재설정 링크를 보냈습니다. 메일을 확인해 주세요.
        </p>
        <Link
          href="/login"
          className="mt-8 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-bold text-neutral-800 transition hover:border-accent hover:text-accent"
        >
          로그인으로
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[68vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          RESET
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          비밀번호 재설정
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          가입한 이메일 주소로 재설정 링크를 보내드립니다.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">이메일</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={INPUT}
          />
        </label>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3.5 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
        >
          {loading ? "전송 중…" : "재설정 링크 보내기"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        <Link href="/login" className="font-bold text-accent hover:underline">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
