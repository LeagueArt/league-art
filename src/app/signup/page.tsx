"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { EQURE_PROVISION, EQURE_CONSENT_ENABLED } from "@/lib/equre-consent";

/**
 * 회원가입 — Supabase Auth 이메일/비밀번호.
 * name/phone/consent_equre 를 signUp options.data 로 넘기면, DB 트리거(0001_init.sql)가
 * profiles + consents(제9조 감사로그)를 자동 생성합니다.
 * 소셜 로그인·외부 IdP·외부 데이터 공유 없음(계약 범위 밖).
 */

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-accent";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    consent: false, // [필수] 이용약관·개인정보 처리방침
    equreConsent: false, // [선택] 제9조 제3자 제공(주식회사 이큐어) — 동의 사실만 기록
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("회원가입 기능이 아직 설정되지 않았습니다. (Supabase 환경변수 필요)");
      return;
    }
    if (form.name.trim().length < 2) return setError("이름을 입력해 주세요.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("올바른 이메일 주소를 입력해 주세요.");
    if (form.password.length < 8)
      return setError("비밀번호는 8자 이상이어야 합니다.");
    if (form.password !== form.confirm)
      return setError("비밀번호가 일치하지 않습니다.");
    if (!form.consent)
      return setError("약관 및 개인정보 처리방침에 동의해 주세요.");

    setError("");
    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/`,
        // 트리거가 읽어 profiles/consents 생성
        data: {
          name: form.name.trim(),
          consent_equre: form.equreConsent,
        },
      },
    });

    if (signUpError) {
      setLoading(false);
      setError(
        signUpError.message.includes("already")
          ? "이미 가입된 이메일입니다."
          : "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }

    // 이메일 확인이 켜져 있으면 session이 없음 → 확인 안내. 꺼져 있으면 바로 로그인 상태.
    if (data.session) {
      router.push("/");
      router.refresh();
    } else {
      setLoading(false);
      setEmailSent(true);
    }
  }

  if (emailSent) {
    return (
      <div className="mx-auto flex min-h-[68vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
          ✉
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          확인 이메일을 보냈습니다
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {form.email} 로 발송된 메일의 링크를 눌러 가입을 완료해 주세요.
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
          SIGN UP
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          회원가입
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          리그아트 계정을 만들어 상담 내역과 정보를 관리하세요.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">이름</span>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
            placeholder="홍길동"
            className={INPUT}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">이메일</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={INPUT}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">비밀번호</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
            autoComplete="new-password"
            placeholder="8자 이상"
            className={INPUT}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium">비밀번호 확인</span>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            required
            autoComplete="new-password"
            placeholder="비밀번호 재입력"
            className={INPUT}
          />
        </label>

        {/* 동의 */}
        <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3.5">
          {/* [필수] 약관·개인정보 */}
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-[5px] accent-accent"
            />
            <span className="text-[13px] leading-relaxed text-neutral-600">
              <span className="font-bold text-accent">[필수]</span>{" "}
              <Link href="/privacy" className="underline hover:text-neutral-900">
                이용약관 및 개인정보 처리방침
              </Link>
              에 동의합니다
            </span>
          </label>

          {/* [선택] 제9조 제3자 제공 (이큐어) — 실제 제공 합의 시에만 노출(플래그) */}
          {EQURE_CONSENT_ENABLED && (
          <div className="border-t border-neutral-200 pt-3">
            <label className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={form.equreConsent}
                onChange={(e) => update("equreConsent", e.target.checked)}
                className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-[5px] accent-accent"
              />
              <span className="text-[13px] leading-relaxed text-neutral-600">
                <span className="font-bold text-neutral-500">[선택]</span> 개인정보
                제3자 제공에 동의합니다{" "}
                <span className="text-neutral-400">(주식회사 이큐어)</span>
              </span>
            </label>
            <dl className="ml-[30px] mt-2 space-y-1 rounded-md border border-neutral-200 bg-white p-3 text-[11px] leading-relaxed text-neutral-500">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium text-neutral-600">
                  제공받는 자
                </dt>
                <dd>{EQURE_PROVISION.provider}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium text-neutral-600">
                  이용 목적
                </dt>
                <dd>{EQURE_PROVISION.purpose}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium text-neutral-600">
                  제공 항목
                </dt>
                <dd>{EQURE_PROVISION.items.join(", ")}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium text-neutral-600">
                  보유·이용 기간
                </dt>
                <dd>{EQURE_PROVISION.retention}</dd>
              </div>
              <p className="pt-1 text-neutral-400">
                동의하지 않아도 회원가입 및 서비스 이용이 가능합니다.
              </p>
            </dl>
          </div>
          )}
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3.5 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
        >
          {loading ? "가입 처리 중…" : "회원가입"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-bold text-accent hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
