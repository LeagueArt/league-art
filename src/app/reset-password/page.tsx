"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * 새 비밀번호 설정 — 재설정 메일의 링크(/auth/callback → 세션 교환)로 진입한 뒤 사용.
 * 세션이 있는 상태에서 updateUser로 비밀번호 변경.
 */

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-accent";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("아직 설정되지 않은 기능입니다. (Supabase 환경변수 필요)");
      return;
    }
    if (password.length < 8)
      return setError("비밀번호는 8자 이상이어야 합니다.");
    if (password !== confirm) return setError("비밀번호가 일치하지 않습니다.");

    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setLoading(false);
      setError(
        "재설정 링크가 만료되었거나 유효하지 않습니다. 다시 시도해 주세요.",
      );
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[68vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          RESET
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          새 비밀번호 설정
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          새로 사용할 비밀번호를 입력해 주세요.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">새 비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="8자 이상"
            className={INPUT}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">새 비밀번호 확인</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="비밀번호 재입력"
            className={INPUT}
          />
        </label>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3.5 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
        >
          {loading ? "변경 중…" : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}
