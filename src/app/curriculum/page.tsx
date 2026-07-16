import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "패션 커리큘럼 · 수업 안내",
  description:
    "리그아트 패션 커리큘럼 — 해외 패션 포트폴리오, 해외대 지원반, 공모전반, 졸업제작반, 온라인 클래스. 학교별 평가 기준에 맞춘 포트폴리오 방향과 의상 메이킹까지 단계별로 지도합니다.",
  alternates: { canonical: "/curriculum" },
};

// 콘텐츠 편집 반영: ISR(최대 5분) + 저장 시 revalidatePath 로 즉시 갱신.
export const revalidate = 300;

// 여러 줄 텍스트 → 항목 배열 (빈 줄 제거).
const lines = (s: string) =>
  s.split("\n").map((l) => l.trim()).filter(Boolean);

export default async function CurriculumPage() {
  const c = await getSiteContent();

  const courses = [1, 2, 3, 4].map((i) => ({
    id: `c${i}`,
    num: String(i).padStart(2, "0"),
    ko: c[`curriculum.course${i}Ko`],
    en: c[`curriculum.course${i}En`],
    desc: c[`curriculum.course${i}Desc`],
    lessons: lines(c[`curriculum.course${i}Lessons`]),
  }));

  const CHIPS = [
    ...courses.map((co) => ({ label: `${co.num}. ${co.ko}`, href: `#${co.id}` })),
    { label: "Online Class", href: "#online" },
  ];

  const online = {
    desc: c["curriculum.onlineDesc"],
    recommend: lines(c["curriculum.onlineRecommend"]),
    process: lines(c["curriculum.onlineProcess"]).map((line, i) => {
      const [title, ...rest] = line.split("|");
      return {
        n: String(i + 1).padStart(2, "0"),
        title: (title ?? "").trim(),
        desc: rest.join("|").trim(),
      };
    }),
  };

  return (
    <>
      {/* Header — 레드 밴드 */}
      <header className="bg-accent text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Fashion Curriculum
          </h1>
          <p className="mt-3 text-base text-white/80">리그아트 패션 커리큘럼</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {CHIPS.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                {c.label}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/60">
            위의 항목을 클릭하시면 원하는 과정으로 이동할 수 있습니다.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-16 sm:px-6">
        {/* Intro */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {c["curriculum.introHeadline"]}
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-neutral-600">
            {c["curriculum.introBody"]}
          </p>
        </section>

        {/* Courses */}
        {courses.map((c) => (
          <article key={c.id} id={c.id} className="scroll-mt-52">
            {/* 레드 타이틀 바 */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-accent px-6 py-4 text-white shadow-sm">
              <span className="text-lg font-bold tracking-tight">
                {c.num}. {c.ko}
              </span>
              <span className="text-sm font-medium text-white/70">{c.en}</span>
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-relaxed text-neutral-600">
              {c.desc}
            </p>
            <div className="mt-6">
              <p className="text-sm font-bold text-accent">수업 내용</p>
              <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {c.lessons.map((l) => (
                  <li
                    key={l}
                    className="flex items-start gap-2.5 text-sm text-neutral-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        {/* Online Class */}
        <article id="online" className="scroll-mt-52">
          {/* 레드 타이틀 바 */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-accent px-6 py-4 text-white shadow-sm">
            <span className="text-lg font-bold tracking-tight">Online Class</span>
            <span className="text-sm font-medium text-white/70">온라인 클래스</span>
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-neutral-600">
            {online.desc}
          </p>

          {/* 이런 분께 추천합니다 */}
          <p className="mt-6 text-sm font-bold text-accent">이런 분께 추천합니다</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {online.recommend.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2.5 text-sm text-neutral-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {r}
              </li>
            ))}
          </ul>

          {/* 온라인 수업 진행 방식 */}
          <p className="mt-8 text-sm font-bold text-accent">온라인 수업 진행 방식</p>
          <ol className="mt-4 space-y-5">
            {online.process.map((p) => (
              <li key={p.n} className="flex gap-4">
                <span className="w-8 shrink-0 text-2xl font-light leading-none text-accent">
                  {p.n}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-bold">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    {p.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        {/* Closing */}
        <section className="border-t border-neutral-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight">
            {c["curriculum.closingHeadline"]}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-neutral-600">
            {c["curriculum.closingBody"]}
          </p>
        </section>
      </div>
    </>
  );
}
