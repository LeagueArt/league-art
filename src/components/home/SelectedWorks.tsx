"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDES = [
  { src: "/images/hero/main-1.jpg", alt: "리그아트 학생들의 작업과 현장 콜라주" },
  {
    src: "/images/hero/main-2.jpg",
    alt: "Parsons·1Granary Dialective 참여 디자이너 소개 스프레드",
  },
] as const;

/** Selected Works — 리그아트의 작업/현장 콜라주 캐러셀. (Figma: Selected Works) */
export default function SelectedWorks() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;
  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Selected Works</h2>
            <p className="mt-2 text-sm text-neutral-500">리그아트의 작업과 현장</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="이전 슬라이드"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="다음 슬라이드"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-100">
          {SLIDES.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className={`object-cover transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`슬라이드 ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
