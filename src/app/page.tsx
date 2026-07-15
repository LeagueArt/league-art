import Link from "next/link";
import HomeHero from "@/components/home/HomeHero";
import SelectedWorks from "@/components/home/SelectedWorks";
import { SITE } from "@/lib/site-config";

const STATS = [
  { value: "1:4", label: "소수정예 (최대 4명)" },
  { value: "5", label: "전문 프로그램" },
  { value: "20+", label: "목표 대학" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <SelectedWorks />

      {/* Intro — 타입 + 통계 + CTA (Figma: Intro) */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          FASHION PORTFOLIO ACADEMY
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl">
          해외 미대·패션 스쿨 입시,
          <br />
          <span className="text-accent">포트폴리오</span>로 증명합니다
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600">
          {SITE.description}
        </p>

        <dl className="mt-8 grid max-w-xl gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="text-4xl font-bold tracking-tight text-accent">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm text-neutral-600">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/admissions"
            className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            합격자 명단 보기
          </Link>
          <Link
            href="/curriculum"
            className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-accent hover:text-accent"
          >
            커리큘럼 안내
          </Link>
        </div>
      </section>
    </>
  );
}
