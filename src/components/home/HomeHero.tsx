"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * 홈 히어로 — 메탈릭 메인 이미지 위에 카피를 얹은 풀블리드 섹션.
 * Figma "Hero 전환 A(KR) / B(EN)": 제목·부제가 국문↔영문으로 일정 주기마다
 * 크로스페이드 전환된다. 카피는 콘텐츠 편집기(site_content)에서 주입된다.
 */
export default function HomeHero({
  eyebrow,
  titleA,
  subtitleA,
  titleB,
  subtitleB,
}: {
  eyebrow: string;
  titleA: string;
  subtitleA: string;
  titleB: string;
  subtitleB: string;
}) {
  const variants = [
    { title: titleA, subtitle: subtitleA },
    { title: titleB, subtitle: subtitleB },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v === 0 ? 1 : 0)), 4000);
    return () => clearInterval(id);
  }, []);

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
            {eyebrow}
          </p>

          {/* A(KR) ↔ B(EN) 크로스페이드 — grid로 겹쳐 배치 */}
          <div className="mt-4 grid">
            {variants.map((v, i) => (
              <div
                key={i}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <h1 className="whitespace-pre-line text-4xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl">
                  {v.title}
                </h1>
                <p className="mt-5 text-sm tracking-tight text-white/70">
                  {v.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
