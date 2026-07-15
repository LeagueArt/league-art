import Image from "next/image";
import { FaInstagram, FaMapPin } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/site-config";

/**
 * 우측 세로 플로팅 메뉴 (데스크톱). 모바일에선 MobileStickyBar가 대체.
 * Figma 디자인과 동일: 인스타(그라데이션) · 카카오톡/네이버 블로그(공식 로고) · 위치(레드 핀).
 */
const BASE =
  "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export default function FloatingMenu() {
  return (
    <div className="fixed bottom-6 right-5 z-40 hidden flex-col gap-3 md:flex">
      {/* 인스타그램 — 브랜드 그라데이션 */}
      <a
        href={SOCIAL_LINKS.instagram}
        aria-label="인스타그램"
        title="인스타그램"
        className={`${BASE} bg-gradient-to-tr from-[#feca35] via-[#e1306c] to-[#7f2bce] text-white`}
        {...LINK_PROPS}
      >
        <FaInstagram size={22} aria-hidden />
      </a>

      {/* 카카오톡 상담 — 공식 로고 */}
      <a
        href={SOCIAL_LINKS.kakao}
        aria-label="카카오톡 상담"
        title="카카오톡 상담"
        className={BASE}
        {...LINK_PROPS}
      >
        <Image
          src="/logo/kakaotalk.png"
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      </a>

      {/* 네이버 블로그 — 흰 배경 원 위에 초록 blog 로고 (Figma Desktop 기준) */}
      <a
        href={SOCIAL_LINKS.blog}
        aria-label="네이버 블로그"
        title="네이버 블로그"
        className={`${BASE} bg-white`}
        {...LINK_PROPS}
      >
        <Image
          src="/logo/naver-blog.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain p-2"
        />
      </a>

      {/* 오시는 길 — 레드 핀 */}
      <a
        href={SOCIAL_LINKS.location}
        aria-label="오시는 길"
        title="오시는 길"
        className={`${BASE} bg-accent text-white`}
        {...LINK_PROPS}
      >
        <FaMapPin size={20} aria-hidden />
      </a>
    </div>
  );
}
