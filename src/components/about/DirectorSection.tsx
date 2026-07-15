/**
 * 대표원장 섹션 — 좌: 인사말 + 통계 / 우: Career History 타임라인. (Figma: Director)
 * 헤드라인·인사말은 콘텐츠 편집기에서 관리(props). 통계·이력은 구조화 데이터로 코드 유지.
 */

const STATS = [
  { value: "4", label: "최대 정원" },
  { value: "5", label: "전문 프로그램" },
  { value: "20+", label: "목표 대학" },
];

type Career = {
  period?: string;
  place?: string;
  title: string;
  bullets: string[];
  tags: string[];
};

const CAREER: Career[] = [
  {
    period: "현재",
    place: "뉴욕 · 서울",
    title: "LF Fashion · P3 · RR Brand",
    bullets: ["브랜드 크리에이티브 디렉터 (Creative Director)"],
    tags: ["현재", "Creative Director"],
  },
  {
    period: "현재",
    place: "뉴욕",
    title: "Parsons School of Design, NY",
    bullets: ["Dialective Runway Judge"],
    tags: ["현재", "Judge"],
  },
  {
    period: "2024 – 26",
    place: "프랑스, 파리",
    title: "Jacquemus | 자크뮈스",
    bullets: ["Creative Director Assistant"],
    tags: ["CD Assistant"],
  },
  {
    place: "뉴욕, 소호",
    title: "R13",
    bullets: ["RTW Collection 디자인 및 제작 참여"],
    tags: ["RTW"],
  },
  {
    place: "뉴욕, 소호",
    title: "Marchesa Soho Couture Atelier",
    bullets: ["RTW Collection 디자인 및 제작 참여"],
    tags: ["Couture", "RTW"],
  },
  {
    period: "Award",
    title: "Parsons School of Design | 파슨스",
    bullets: [
      "BFA Fashion Design 수석 졸업",
      "Swarovski NY Sponsorship — Winner",
      "MDF Award — Final Winner",
    ],
    tags: ["수석 졸업", "Award"],
  },
];

export default function DirectorSection({
  headline,
  greeting,
}: {
  headline: string;
  greeting: string;
}) {
  const greetingParas = greeting.split(/\n\s*\n/).filter(Boolean);
  return (
    <section className="grid gap-12 border-t border-neutral-200 py-14 lg:grid-cols-2 lg:gap-20">
      {/* Left — 인사말 + 통계 */}
      <div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            DIRECTOR
          </span>
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">대표원장 인사말</span>
        </div>

        <h2 className="mt-8 whitespace-pre-line text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl">
          {headline}
        </h2>
        <div className="mt-6 h-[3px] w-16 rounded-full bg-accent" />

        <div className="mt-6 space-y-4">
          {greetingParas.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-neutral-600">
              {p}
            </p>
          ))}
        </div>

        <dl className="mt-10 flex divide-x divide-neutral-200 border-y border-neutral-200">
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 px-5 py-5">
              <dt className="text-3xl font-bold tracking-tight">{s.value}</dt>
              <dd className="mt-1 text-xs text-neutral-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right — Career History 타임라인 */}
      <div>
        <h3 className="text-xl font-bold tracking-tight">
          Career History
          <span className="mx-2 font-normal text-neutral-300">|</span>
          <span className="text-neutral-700">원장 이력</span>
        </h3>

        <ol className="mt-8">
          {CAREER.map((c, i) => (
            <li key={c.title} className="grid grid-cols-[80px_1fr] gap-5">
              <div className="pt-0.5">
                {c.period && (
                  <p className="text-sm font-bold text-neutral-900">{c.period}</p>
                )}
                {c.place && (
                  <p className="mt-1 text-xs text-neutral-400">{c.place}</p>
                )}
              </div>

              <div
                className={`relative border-l border-neutral-200 pl-6 ${
                  i === CAREER.length - 1 ? "pb-0" : "pb-9"
                }`}
              >
                <span className="absolute -left-[6px] top-1 h-3 w-3 rounded-full border-2 border-white bg-accent" />
                <h4 className="text-base font-bold tracking-tight">{c.title}</h4>
                <ul className="mt-2 space-y-1.5">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm leading-snug text-neutral-600"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-accent/10 px-2 py-1 text-[11px] font-bold text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
