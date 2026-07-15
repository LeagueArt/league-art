"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HERO_SLIDES } from "@/lib/hero-collage";

const AUTOPLAY_MS = 6000;

export default function HeroCollage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  const goTo = useCallback((i: number) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="리그아트 메인 갤러리"
      className="relative aspect-video w-full overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="이전 이미지"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-neutral-900 shadow-md transition hover:bg-white"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="다음 이미지"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-neutral-900 shadow-md transition hover:bg-white"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-white/85 px-4 py-2.5 shadow-md">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1}번 이미지로 이동`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
