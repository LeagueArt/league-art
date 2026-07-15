import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { CTA_ITEM, SOCIAL_LINKS } from "@/lib/site-config";

/**
 * 상담 전환 카드 — 전 페이지 하단에 반복 노출한다.
 * 좌: 카피 / 우: 2개 CTA(무료 리뷰 신청 = 레드, 카카오톡 = 다크).
 */
export default function ConsultSection() {
  return (
    <section className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            상담이 필요하신가요?<span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
            해외 미대 포트폴리오 준비, 지금 어떤 방향으로 시작해야 할지 고민이라면
            리그아트에서 학생의 현재 작업과 목표 학교에 맞춰 가장 현실적인
            포트폴리오 방향을 안내해드립니다.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
            무료 상담 · 24시간 내 답변
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={CTA_ITEM.href}
            className="flex items-center justify-between rounded-lg bg-accent px-6 py-4 text-base font-semibold text-white transition hover:bg-accent-dark"
          >
            무료 포트폴리오 리뷰 신청하기
            <FiArrowRight size={20} />
          </Link>
          <a
            href={SOCIAL_LINKS.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-neutral-300 bg-white px-6 py-4 text-base font-semibold text-neutral-900 transition hover:border-neutral-900"
          >
            <span className="flex items-center gap-2">
              <RiKakaoTalkFill size={20} className="text-[#3C1E1E]" />
              카카오톡 상담하기
            </span>
            <FiArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
