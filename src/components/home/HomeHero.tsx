"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * 홈 히어로 — 메탈릭 이미지 위에 카피를 얹은 풀블리드 섹션.
 * 제목이 한 글자씩 타이핑되며, 국문(A) ↔ 영문(B)을 번갈아 보여준다.
 * (Figma "Hero 전환 A/B" + 타이핑 연출). 카피는 콘텐츠 편집기에서 주입.
 */
type Phase = "typing" | "pausing" | "deleting";

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
  const titles = [titleA, titleB];
  const subtitles = [subtitleA, subtitleB];

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const full = titles[idx];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < full.length) {
        t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 85);
      } else {
        t = setTimeout(() => setPhase("pausing"), 120);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 2400);
    } else {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(typed.slice(0, -1)), 38);
      } else {
        t = setTimeout(() => {
          setIdx((i) => (i + 1) % titles.length);
          setPhase("typing");
        }, 350);
      }
    }
    return () => clearTimeout(t);
    // titleA/titleB 는 안정적 문자열이라 typed/phase/idx 변화에만 반응.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, phase, idx, titleA, titleB]);

  const complete = phase === "pausing";

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative aspect-[16/10] max-h-[860px] min-h-[520px] w-full">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="강남 서초동 리그아트 패션유학학원 — 감각과 완성도가 만나는 곳"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* 상하 화이트 페이드 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />

        {/* 카피 가독성용 스크림 — 카피 영역만 은은하게 어둡게 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 52% at 50% 74%, rgba(18,18,20,0.55) 0%, rgba(18,18,20,0.26) 50%, rgba(18,18,20,0) 80%)",
          }}
        />

        {/* 카피 (하단 중앙) */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-[14%] text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-white/75">
            {eyebrow}
          </p>

          {/* 타이핑되는 제목 (2줄 높이 예약 → 레이아웃 흔들림 방지) */}
          <h1 className="mt-4 flex min-h-[2.6em] items-start justify-center whitespace-pre-line text-4xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl">
            <span>
              {typed}
              <span
                aria-hidden
                className="ml-0.5 inline-block w-[0.06em] self-stretch"
                style={{
                  animation: "blink 1.05s step-end infinite",
                  borderLeft: "0.08em solid currentColor",
                }}
              />
            </span>
          </h1>

          <p
            className={`mt-5 text-sm tracking-tight text-white/70 transition-opacity duration-500 ${
              complete ? "opacity-100" : "opacity-0"
            }`}
          >
            {subtitles[idx]}
          </p>
        </div>
      </div>
    </section>
  );
}
