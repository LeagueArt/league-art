"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * 상담 신청 폼 (Figma: 06 상담 신청 Form).
 * 필수: 이름·연락처·학년·개인정보 동의 / 선택: 현재 학교·희망 학교·추천인.
 * 제출 시 /contact/complete 로 이동.
 * TODO: 폼 제출 백엔드(이메일/폼 서비스/Supabase) 연동 — 현재는 저장 없이 이동만.
 */

const GRADES = [
  "중학교 1학년",
  "중학교 2학년",
  "중학교 3학년",
  "고등학교 1학년",
  "고등학교 2학년",
  "고등학교 3학년",
  "N수·재수생",
  "대학교 재학·편입 준비",
  "해외 유학 준비",
  "기타",
];

const LABEL = "flex items-center gap-1 text-[13px] font-medium";
const REQUIRED = <span className="text-accent">*</span>;
const OPTIONAL = <span className="text-xs font-normal text-neutral-400">(선택)</span>;
const INPUT =
  "w-full rounded-[10px] border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-accent";

export default function ConsultForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: 실제 제출 처리 연동. 현재는 저장 없이 완료 페이지로 이동.
    setSubmitting(true);
    router.push("/contact/complete");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 이름 · 연락처 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className={LABEL}>이름 {REQUIRED}</span>
          <input name="name" required placeholder="홍길동" className={INPUT} />
        </label>
        <label className="block space-y-2">
          <span className={LABEL}>연락처 {REQUIRED}</span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="010-0000-0000"
            className={INPUT}
          />
        </label>
      </div>

      {/* 학년 */}
      <label className="block space-y-2">
        <span className={LABEL}>학년 {REQUIRED}</span>
        <select name="grade" required defaultValue="" className={`${INPUT} appearance-none bg-neutral-50`}>
          <option value="" disabled>
            선택해주세요
          </option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>

      {/* 현재 학교 · 희망 학교/전공 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className={LABEL}>현재 학교 {OPTIONAL}</span>
          <input name="school" placeholder="예: ○○고등학교" className={INPUT} />
        </label>
        <label className="block space-y-2">
          <span className={LABEL}>희망 학교 / 전공 {OPTIONAL}</span>
          <input
            name="target"
            placeholder="예: RISD, Parsons, 패션 디자인"
            className={INPUT}
          />
        </label>
      </div>

      {/* 추천인 */}
      <label className="block space-y-2">
        <span className={LABEL}>추천인 {OPTIONAL}</span>
        <input
          name="referrer"
          placeholder="추천해주신 분 성함 또는 연락처"
          className={INPUT}
        />
      </label>

      {/* 개인정보 동의 */}
      <div className="space-y-2 rounded-[10px] border border-neutral-200 bg-neutral-50 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="h-[18px] w-[18px] shrink-0 rounded-[5px] accent-accent"
          />
          <span className="text-[11px] font-bold text-accent">[필수]</span>
          <label htmlFor="consent" className="flex-1 text-[13px] text-neutral-600">
            개인정보 수집·이용에 동의합니다 (상담 목적)
          </label>
          <Link
            href="/privacy"
            className="shrink-0 text-xs text-neutral-400 hover:text-neutral-600"
          >
            자세히 ›
          </Link>
        </div>
        <p className="text-xs leading-[1.5] text-neutral-400">
          만 14세 미만은 법정대리인 동의가 필요하며, 상담·멘탈케어 등 민감정보는 별도
          동의 후 분리 보관됩니다.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-accent py-4 text-base font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
      >
        {submitting ? "신청 접수 중…" : "무료 상담 신청하기"}
      </button>
    </form>
  );
}
