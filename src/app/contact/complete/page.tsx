import type { Metadata } from "next";
import Link from "next/link";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SOCIAL_LINKS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "상담 신청 완료",
  robots: { index: false }, // 완료 페이지는 검색 노출 제외
};

// 상담 신청 후 안내 (다음 단계)
const NEXT = [
  {
    title: "24시간 내 연락",
    body: "담당 선생님이 남겨주신 연락처로 확인 후 연락드립니다.",
  },
  {
    title: "초기 진단 상담",
    body: "학생의 현재 작업·목표 학교를 바탕으로 방향을 함께 잡습니다.",
  },
  {
    title: "맞춤 커리큘럼 제안",
    body: "목표와 준비 기간에 맞춘 개인별 커리큘럼을 안내해 드립니다.",
  },
];

export default function ConsultCompletePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      {/* 완료 안내 */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-white shadow-sm">
          ✓
        </div>
        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          COUNSELING · DONE
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          상담 신청이 완료되었습니다
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
          소중한 신청 감사합니다. 담당 선생님이 확인 후 24시간 내에 연락드립니다.
          급하시면 아래 카카오톡으로 바로 상담하실 수 있어요.
        </p>

        {/* CTA */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <a
            href={SOCIAL_LINKS.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#FEE500] px-6 py-3.5 text-sm font-bold text-[#3C1E1E] transition hover:brightness-95"
          >
            <RiKakaoTalkFill size={20} />
            카카오톡으로 바로 상담
          </a>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center rounded-lg border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-800 transition hover:border-accent hover:text-accent"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 다음 단계 */}
      <section className="mt-16 border-t border-neutral-200 pt-10">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
          NEXT STEPS
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {NEXT.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-neutral-200 p-6 text-center"
            >
              <span className="font-mono text-2xl font-light text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-center text-xs text-neutral-400">
        무료 상담 · 24시간 내 답변 · 방문 상담은 사전 예약제로 운영됩니다.
      </p>
    </div>
  );
}
