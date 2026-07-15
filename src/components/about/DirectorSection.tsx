/**
 * 대표원장 섹션 — 좌: 인사말 + 통계 / 우: Career History 타임라인. (Figma: Director)
 */

const STATS = [
  { value: "4", label: "최대 정원" },
  { value: "5", label: "전문 프로그램" },
  { value: "20+", label: "목표 대학" },
];

const GREETING = [
  "리그아트는 Parsons School of Design 석사 출신 원장의 직접 지도 아래, 뉴욕 현지의 미대·패션스쿨 평가 기준을 바탕으로 포트폴리오 방향성을 설계하는 프리미엄 유학미술 포트폴리오 스튜디오입니다. 특히 파슨스 졸업반 포트폴리오 심사 경험과 뉴욕 패션 현장에서의 실무 경험을 기반으로, 학생이 단순히 잘 만든 작품을 넘어서 왜 이 작업을 해야 하는지, 어떤 방식으로 발전시켜야 하는지를 깊이 있게 지도합니다.",
  "해외 미대 포트폴리오는 예쁜 결과물만으로 평가되지 않습니다. 학교는 학생이 어떤 질문을 던지는지, 어떤 리서치를 통해 사고를 확장하는지, 그리고 그 과정을 자신만의 시각 언어로 어떻게 풀어내는지를 봅니다. 리그아트는 이러한 해외 미대의 평가 기준을 바탕으로 학생 개개인의 성향, 관심사, 감정, 경험을 분석하고, 이를 설득력 있는 주제와 포트폴리오 흐름으로 발전시킵니다.",
  "리그아트의 가장 큰 차별점은 1:1 맞춤 과외 방식의 밀도 높은 지도입니다. 정형화된 커리큘럼에 학생을 맞추는 것이 아니라, 학생 한 명 한 명의 감각과 가능성에 맞춰 주제 설정, 리서치, 컨셉 개발, 스케치북, 워크북, 최종 작품 메이킹, 포트폴리오 구성, 에세이 방향성까지 입시 전반의 흐름을 세밀하게 관리합니다.",
  "또한 패션 전공 학생들을 위해 실제 의상 제작 과정에 필요한 메이킹 리소스까지 함께 제공합니다. 리그아트는 CSM 출신이자 Alexander McQueen에서 10년간 실무 경험을 쌓은 선생님의 패턴, 재단, 봉제, 드레이핑, 마네킹 작업, 공업용 미싱 활용 등 전문적인 제작 도움을 받을 수 있는 환경을 갖추고 있습니다.",
  "리그아트의 수업은 작품 수를 채우는 방식이 아닙니다. 학생이 가지고 있는 고유한 감각을 발견하고, 그것을 입학 심사에서 설득력 있게 보일 수 있는 포트폴리오로 정리하는 과정입니다. 학생이 무엇을 좋아하는지, 어떤 질문을 가지고 있는지, 어떤 방식으로 세상을 바라보는지를 함께 찾아가며, 그 시선을 자신만의 시각 언어로 발전시킵니다.",
  "리그아트는 해외 미술대학 입학을 위한 포트폴리오 준비뿐 아니라, 세계 패션 대회 및 공모전 준비까지 함께 지원합니다. 합격을 위한 포트폴리오를 넘어, 유학 이후에도 스스로 작업을 이어갈 수 있는 힘을 만드는 것이 리그아트의 목표입니다. 리그아트는 학생 한 명 한 명의 가능성을 가장 설득력 있는 포트폴리오로 완성합니다.",
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

export default function DirectorSection() {
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

        <h2 className="mt-8 text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl">
          단순한 수업을 넘어,
          <br />
          결과까지 책임집니다.
        </h2>
        <div className="mt-6 h-[3px] w-16 rounded-full bg-accent" />

        <div className="mt-6 space-y-4">
          {GREETING.map((p, i) => (
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
