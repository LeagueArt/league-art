import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { CTA_ITEM, SOCIAL_LINKS } from "@/lib/site-config";

/** 모바일 전용 하단 고정 전환 바 — 전화 / 카카오톡 / 상담 신청. */
export default function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-neutral-200 bg-white/95 backdrop-blur md:hidden">
      <a
        href={SOCIAL_LINKS.phone}
        aria-label="전화 문의"
        className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium text-neutral-700"
      >
        <FiPhone size={18} />
        전화
      </a>
      <a
        href={SOCIAL_LINKS.kakao}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        className="flex flex-1 items-center justify-center gap-1.5 border-l border-neutral-200 py-3 text-sm font-medium text-neutral-700"
      >
        <RiKakaoTalkFill size={18} />
        카톡
      </a>
      <Link
        href={CTA_ITEM.href}
        className="flex flex-[1.4] items-center justify-center bg-accent py-3 text-sm font-semibold text-white"
      >
        상담 신청
      </Link>
    </div>
  );
}
