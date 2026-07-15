"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * 로그인 — Supabase Auth 이메일/비밀번호.
 * 소셜 로그인·외부 IdP 없음(계약 범위 밖).
 */

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-accent";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("로그인 기능이 아직 설정되지 않았습니다. (Supabase 환경변수 필요)");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setLoading(false);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[68vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          LOGIN
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          로그인
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          리그아트 계정으로 로그인하세요.
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
        <label className="block space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium">비밀번호</span>
            <Link
              href="/forgot-password"
              className="text-xs text-neutral-400 hover:text-accent"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="비밀번호"
            className={INPUT}
          />
        </label>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3.5 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="font-bold text-accent hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
