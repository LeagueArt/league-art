import type { Metadata } from "next";
import DirectorSection from "@/components/about/DirectorSection";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "리그아트 소개 · 대표원장",
  description:
    "파슨스 수석 졸업 출신 원장이 직접 지도하는 강남 서초동 리그아트 패션유학학원. 포트폴리오 개발부터 에세이·입시·공모전·진로까지 토탈 케어로 해외 미대 입시를 준비합니다.",
  alternates: { canonical: "/about" },
};

// 콘텐츠 편집 반영: ISR(최대 5분) + 저장 시 revalidatePath 로 즉시 갱신.
export const revalidate = 300;

// 영문 라벨은 디자인 요소로 고정, 국문 제목·설명은 콘텐츠 편집기에서 관리.
const FOCUS_EN = ["Portfolio", "Essay", "Feedback"] as const;

export default async function AboutPage() {
  const c = await getSiteContent();
  const focus = [
    { en: FOCUS_EN[0], ko: c["about.focus1Ko"], body: c["about.focus1Body"] },
    { en: FOCUS_EN[1], ko: c["about.focus2Ko"], body: c["about.focus2Body"] },
    { en: FOCUS_EN[2], ko: c["about.focus3Ko"], body: c["about.focus3Body"] },
  ];
  // 빈 줄로 구분된 문단을 배열로.
  const whyParas = c["about.whyBody"].split(/\n\s*\n/).filter(Boolean);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          ABOUT
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {c["about.title"]}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600">
          {c["about.intro"]}
        </p>
      </header>

      {/* Why We Exist */}
      <section className="border-t border-neutral-200 py-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          WHY WE EXIST
        </p>
        <p className="mt-4 max-w-4xl whitespace-pre-line text-lg font-medium leading-relaxed text-neutral-800 sm:text-xl">
          {c["about.whyHeadline"]}
        </p>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-relaxed text-neutral-600">
          {whyParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="font-medium text-neutral-800">{c["about.whyEmphasis"]}</p>
        </div>
      </section>

      {/* Program Focus */}
      <section className="border-t border-neutral-200 py-10">
        <div className="grid gap-10 sm:grid-cols-3">
          {focus.map((f) => (
            <div key={f.en}>
              <p className="text-xl font-bold italic text-accent">{f.en}</p>
              <h3 className="mt-2 text-lg font-bold">{f.ko}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Director */}
      <DirectorSection
        headline={c["about.directorHeadline"]}
        greeting={c["about.greeting"]}
      />
    </div>
  );
}
