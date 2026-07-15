"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ConsultSection from "@/components/consult/ConsultSection";
import FloatingMenu from "@/components/layout/FloatingMenu";
import MobileStickyBar from "@/components/layout/MobileStickyBar";

/**
 * 공개 사이트 chrome(내비바·상담 섹션·플로팅 메뉴·모바일 바)을 경로에 따라 분기.
 * /admin 이하에서는 chrome을 렌더하지 않고, 관리자 레이아웃이 자체 UI를 제공한다.
 */
export default function ConditionalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <ConsultSection />
      <FloatingMenu />
      <MobileStickyBar />
      {/* 모바일 sticky 바 높이만큼 하단 여백 */}
      <div className="h-14 md:hidden" />
    </>
  );
}
