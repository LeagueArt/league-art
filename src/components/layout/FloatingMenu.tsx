import Image from "next/image";
import { FaInstagram, FaMapPin } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/site-config";

/**
 * 우측 세로 플로팅 메뉴 (데스크톱). 모바일에선 MobileStickyBar가 대체.
 * Figma 디자인과 동일: 인스타(그라데이션) · 카카오톡/네이버 블로그(공식 로고) · 위치(레드 핀).
 * 마우스 오버 시 왼쪽으로 라벨(정보)이 슬라이드되어 나온다.
 */
const BASE =
  "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

function FloatItem({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex items-center justify-end">
      {/* hover 라벨 — 왼쪽으로 슬라이드 */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-neutral-900/90 px-3.5 py-2 text-sm font-medium text-white opacity-0 shadow-md transition-all duration-200 [transform:translateX(8px)] group-hover:opacity-100 group-hover:[transform:translateX(0)]">
        {label}
      </span>
      <a
        href={href}
        aria-label={label}
        className={`${BASE} ${className ?? ""}`}
        {...LINK_PROPS}
      >
        {children}
      </a>
    </div>
  );
}

export default function FloatingMenu() {
  return (
    <div className="fixed bottom-6 right-5 z-40 hidden flex-col gap-3 md:flex">
      {/* 인스타그램 — 브랜드 그라데이션 */}
      <FloatItem
        href={SOCIAL_LINKS.instagram}
        label="인스타그램"
        className="bg-gradient-to-tr from-[#feca35] via-[#e1306c] to-[#7f2bce] text-white"
      >
        <FaInstagram size={22} aria-hidden />
      </FloatItem>

      {/* 카카오톡 상담 — 공식 로고 */}
      <FloatItem href={SOCIAL_LINKS.kakao} label="카카오톡 상담">
        <Image
          src="/logo/kakaotalk.png"
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      </FloatItem>

      {/* 네이버 블로그 — 흰 배경 원 위에 초록 blog 로고 */}
      <FloatItem href={SOCIAL_LINKS.blog} label="네이버 블로그" className="bg-white">
        <Image
          src="/logo/naver-blog.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain p-2"
        />
      </FloatItem>

      {/* 오시는 길 — 레드 핀 */}
      <FloatItem
        href={SOCIAL_LINKS.location}
        label="오시는 길"
        className="bg-accent text-white"
      >
        <FaMapPin size={20} aria-hidden />
      </FloatItem>
    </div>
  );
}
