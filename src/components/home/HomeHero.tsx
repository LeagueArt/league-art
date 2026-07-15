import Image from "next/image";

/**
 * 홈 히어로 — 메탈릭 메인 이미지 위에 카피를 얹은 풀블리드 섹션.
 * 상하 화이트 페이드로 #fdfdfd 배경과 자연스럽게 이어진다. (Figma: Hero image + copy)
 */
export default function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative aspect-[16/10] max-h-[860px] min-h-[520px] w-full">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="리그아트 — 감각과 완성도가 만나는 곳"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* 상하 화이트 페이드 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />

        {/* 카피 (하단 중앙) */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-[14%] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-white/75">
            FASHION PORTFOLIO ACADEMY
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl">
            감각과 완성도가
            <br />
            만나는 곳
          </h1>
          <p className="mt-5 text-sm tracking-tight text-white/70">
            감각을, 학교가 읽는 포트폴리오로 —
          </p>
        </div>
      </div>
    </section>
  );
}
