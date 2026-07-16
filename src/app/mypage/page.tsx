"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  EQURE_PROVISION,
  EQURE_CONSENT_TYPE,
  EQURE_CONSENT_ENABLED,
} from "@/lib/equre-consent";

/**
 * 마이페이지 — 계정 정보 + 이큐어 제3자 제공 동의 관리(동의/철회).
 * 철회 시 consents에 granted=false 행을 append(이력 보존), revoked_at 기록.
 * 최신 상태가 즉시 equre_shared_view에서 제외됨.
 */
export default function MyPage() {
  const router = useRouter();
  const [configured] = useState(isSupabaseConfigured());
  // 미설정이면 로딩할 것이 없으므로 false로 시작(effect 내 동기 setState 방지).
  const [loading, setLoading] = useState(configured);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [granted, setGranted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setEmail(user.email ?? "");
      setName(
        typeof user.user_metadata?.name === "string"
          ? user.user_metadata.name
          : "",
      );
      const { data } = await supabase
        .from("consents")
        .select("granted")
        .eq("type", EQURE_CONSENT_TYPE)
        .order("granted_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setGranted(Boolean(data?.granted));
      setLoading(false);
    })();
  }, [router]);

  async function toggleConsent() {
    if (!isSupabaseConfigured()) return;
    setSaving(true);
    setNotice("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    if (granted) {
      // 철회: append granted=false + revoked_at (덮어쓰지 않음)
      const { error } = await supabase.from("consents").insert({
        user_id: user.id,
        type: EQURE_CONSENT_TYPE,
        granted: false,
        revoked_at: new Date().toISOString(),
      });
      if (!error) {
        setGranted(false);
        setNotice("이큐어 제3자 제공 동의를 철회했습니다. 즉시 제공이 중단됩니다.");
      }
    } else {
      // 동의: append granted=true
      const { error } = await supabase.from("consents").insert({
        user_id: user.id,
        type: EQURE_CONSENT_TYPE,
        granted: true,
        purpose: EQURE_PROVISION.purpose,
        items: [...EQURE_PROVISION.items],
        retention: EQURE_PROVISION.retention,
        provider: EQURE_PROVISION.provider,
      });
      if (!error) {
        setGranted(true);
        setNotice("이큐어 제3자 제공에 동의했습니다.");
      }
    }
    setSaving(false);
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight">마이페이지</h1>
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          로그인 기능이 아직 설정되지 않았습니다. (Supabase 환경변수 필요)
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-sm text-neutral-500 sm:px-6">
        불러오는 중…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-16 sm:px-6">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          MY PAGE
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">마이페이지</h1>
      </div>

      {/* 계정 정보 */}
      <section className="rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-sm font-bold">계정 정보</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-neutral-500">이름</dt>
            <dd className="font-medium">{name || "—"}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-neutral-500">이메일</dt>
            <dd className="font-medium">{email}</dd>
          </div>
        </dl>
      </section>

      {/* 이큐어 제3자 제공 동의 관리 — 실제 제공 합의 시에만 노출(플래그) */}
      {EQURE_CONSENT_ENABLED && (
      <section className="rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-bold">개인정보 제3자 제공 동의</h2>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              granted
                ? "bg-green-100 text-green-700"
                : "bg-neutral-200 text-neutral-600"
            }`}
          >
            {granted ? "동의함" : "동의 안 함"}
          </span>
        </div>

        <dl className="mt-4 space-y-1 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-[12px] leading-relaxed text-neutral-500">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-neutral-600">
              제공받는 자
            </dt>
            <dd>{EQURE_PROVISION.provider}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-neutral-600">
              이용 목적
            </dt>
            <dd>{EQURE_PROVISION.purpose}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-neutral-600">
              제공 항목
            </dt>
            <dd>{EQURE_PROVISION.items.join(", ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-neutral-600">
              보유·이용 기간
            </dt>
            <dd>{EQURE_PROVISION.retention}</dd>
          </div>
        </dl>

        {notice && (
          <p className="mt-4 text-sm font-medium text-green-600">✓ {notice}</p>
        )}

        <button
          type="button"
          onClick={toggleConsent}
          disabled={saving}
          className={`mt-4 rounded-lg px-5 py-2.5 text-sm font-bold transition disabled:opacity-70 ${
            granted
              ? "border border-neutral-300 text-neutral-800 hover:border-accent hover:text-accent"
              : "bg-accent text-white hover:bg-accent-dark"
          }`}
        >
          {saving ? "처리 중…" : granted ? "동의 철회" : "동의하기"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-neutral-400">
          동의는 선택 사항이며, 철회 시 즉시 이큐어로의 제공이 중단됩니다. 철회 후에도
          회원가입 및 서비스 이용에는 영향이 없습니다.
        </p>
      </section>
      )}

      <p className="text-center text-sm">
        <Link href="/" className="text-neutral-500 hover:text-accent">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}
