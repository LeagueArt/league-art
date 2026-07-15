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

const CHIPS = [
  { label: "01. 해외 패션 포트폴리오", href: "#c1" },
  { label: "02. 해외대 지원반", href: "#c2" },
  { label: "03. 공모전반", href: "#c3" },
  { label: "04. 졸업제작반", href: "#c4" },
  { label: "Online Class", href: "#online" },
];

type Course = {
  id: string;
  num: string;
  ko: string;
  en: string;
  desc: string;
  lessons: string[];
};

const COURSES: Course[] = [
  {
    id: "c1",
    num: "01",
    ko: "해외 패션 포트폴리오",
    en: "Fashion Portfolio Preparation",
    desc: "해외 패션스쿨은 결과물만 보지 않습니다. 학생이 어떤 주제를 발견했는지, 그 주제를 어떻게 리서치했는지, 그리고 그것이 디자인과 제작 과정으로 어떻게 발전했는지를 봅니다. 리그아트의 해외 패션 포트폴리오 과정은 학생의 개인적인 감각과 관심사를 바탕으로, 학교별 평가 기준에 맞는 포트폴리오 방향을 설계합니다.",
    lessons: [
      "개인 주제 및 컨셉 개발",
      "패션 리서치 방향 설정",
      "무드보드 / 컬러 / 소재 / 실루엣 구성",
      "디자인 드로잉 및 패션 일러스트레이션",
      "디자인 디벨롭먼트 과정 정리",
      "패브릭 / 텍스처 / 샘플링 실험",
      "스케치북 및 프로세스북 구성",
      "최종 포트폴리오 레이아웃 디렉팅",
      "학교별 포트폴리오 요구사항 분석",
      "아티스트 스테이트먼트 준비",
    ],
  },
  {
    id: "c2",
    num: "02",
    ko: "해외대 지원반",
    en: "Art & Design University Application",
    desc: "해외 미대 입시는 포트폴리오 하나만으로 끝나지 않습니다. 학교 선정, 전공 선택, 에세이, 서류, 장학금 전략까지 모두 함께 준비되어야 합니다. 리그아트 해외대 지원반은 학생의 현재 작업 수준과 목표 학교를 기준으로, 지원 전체 과정을 체계적으로 관리합니다.",
    lessons: [
      "목표 학교 및 전공 상담",
      "학교별 포트폴리오 요구사항 분석",
      "지원 일정 및 제출 전략 설계",
      "Common App / SlideRoom 준비 방향",
      "Artist Statement / Personal Essay 방향 설정",
      "포트폴리오 작품 순서 및 구성 디렉팅",
      "장학금 가능성을 고려한 작품 완성도 체크",
      "인터뷰 대비 및 학교별 예상 질문 준비",
      "최종 제출 전 포트폴리오 리뷰",
    ],
  },
  {
    id: "c3",
    num: "03",
    ko: "공모전반",
    en: "Competition Portfolio Class",
    desc: "공모전은 단순히 상을 받기 위한 과정이 아니라, 학생의 포트폴리오에 강한 포인트를 만들어주는 중요한 기회가 될 수 있습니다. 리그아트 국내 공모전반은 학생의 관심 분야와 작업 성향에 맞는 공모전을 선정하고, 주제 해석부터 최종 제출물 완성까지 함께 지도합니다.",
    lessons: [
      "학생별 적합한 공모전 선정",
      "공모전 주제 분석 및 방향 설정",
      "아이디어 리서치 및 컨셉 개발",
      "스케치 / 실험 / 디자인 디벨롭먼트",
      "최종 작품 제작 디렉팅",
      "작품 설명문 및 제출 자료 구성",
      "포트폴리오에 활용 가능한 과정 정리",
      "수상 이후 포트폴리오 반영 전략",
    ],
  },
  {
    id: "c4",
    num: "04",
    ko: "해외 / 국내 졸업제작반",
    en: "Graduation Collection & Final Project",
    desc: "졸업작품은 단순히 옷을 완성하는 과정이 아닙니다. 학생의 전공적 정체성, 리서치 능력, 디자인 방향, 제작 완성도가 모두 드러나는 가장 중요한 결과물입니다. 리그아트는 해외·국내 패션 전공 학생들의 졸업작품을 위해 컨셉 기획부터 디자인 디벨롭먼트, 패턴실·봉제·가봉 리소스 연결까지 현실적인 제작 과정을 지원합니다. 특히 패션 작업의 경우, 아이디어는 좋지만 실제 제작 과정에서 막히는 학생들이 많습니다. 리그아트는 학생이 혼자 해결하기 어려운 패턴, 샘플 제작, 봉제, 가봉 과정까지 전문 리소스와 연결하여 졸업작품 수준의 완성도를 목표로 합니다.",
    lessons: [
      "졸업작품 컨셉 및 컬렉션 방향 설정",
      "리서치북 / 프로세스북 구성",
      "디자인 디벨롭먼트 및 룩 구성",
      "소재 선정 및 패브릭 실험",
      "실루엣·디테일·마감 방향 디렉팅",
      "패턴실 / 봉제 / 가봉 리소스 연결",
      "샘플 제작 과정 피드백",
      "최종 룩 스타일링 및 촬영 방향 제안",
      "졸업 포트폴리오 / 룩북 구성",
      "발표 및 크리틱 대비",
    ],
  },
];

const ONLINE = {
  desc: "리그아트 온라인 클래스는 해외 미대 입시를 준비하는 학생, 지방에 거주하는 학생, 이미 해외 학교에 재학 중인 학생, 졸업작품 제작 과정에서 방향성이 필요한 학생들을 위해 운영됩니다. 온라인 수업이라고 해서 단순한 피드백으로 끝나지 않습니다. 학생의 작업을 함께 보며 주제 설정, 리서치 방향, 디자인 디벨롭먼트, 포트폴리오 구성, 학교별 제출 전략까지 단계별로 지도합니다.",
  recommend: [
    "해외 미대 / 패션스쿨 입시를 준비하는 학생",
    "지방 또는 해외에 거주해 오프라인 수업이 어려운 학생",
    "Parsons, FIT, CSM, LCF, RISD, SCAD 등 해외 학교 지원을 준비하는 학생",
    "이미 해외 미대에 재학 중이지만 작업 방향성이 필요한 학생",
    "졸업작품, 컬렉션, 룩북, 포트폴리오 완성도가 필요한 학생",
    "학교 수업만으로는 포트폴리오 정리가 어려운 학생",
  ],
  process: [
    { n: "01", title: "상담 및 작업 진단", desc: "학생의 현재 작업 상태, 목표 학교, 지원 일정, 제작 상황을 확인합니다." },
    { n: "02", title: "자료 공유", desc: "스케치, 리서치 이미지, 무드보드, 작업 사진, 포트폴리오 PDF 등을 온라인으로 공유합니다." },
    { n: "03", title: "실시간 피드백", desc: "화상 수업을 통해 작업 방향, 수정 포인트, 다음 단계 과제를 구체적으로 안내합니다." },
    { n: "04", title: "과제 및 디벨롭먼트", desc: "수업 후 학생은 정해진 방향에 따라 작업을 발전시키고, 다음 수업에서 다시 피드백을 받습니다." },
    { n: "05", title: "최종 포트폴리오 정리", desc: "작품 순서, 페이지 구성, 설명문, 제출 파일까지 최종적으로 정리합니다." },
  ],
};

export default async function CurriculumPage() {
  const c = await getSiteContent();
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
            해외 미대 입시를 준비하는 학생들이 가장 많이 막히는 지점은 단순히 “작품을
            어떻게 만들까”가 아닙니다. 어떤 학교에 지원해야 하는지, 포트폴리오를 어떤
            방향으로 구성해야 하는지, 패션 작업은 어디까지 직접 제작해야 하는지,
            졸업작품은 어떻게 완성도 있게 마무리해야 하는지까지 모두 연결되어 있습니다.
            리그아트는 해외 패션 포트폴리오, 해외대 지원, 국내 공모전, 해외·국내
            졸업제작까지 학생의 단계와 목표에 맞춰 현실적인 해결책을 제안합니다. 파슨스
            수석 졸업 출신 원장의 직접 지도와 뉴욕 현지 패션·아트 씬 경험을 바탕으로,
            단순히 보기 좋은 포트폴리오가 아니라 학교와 심사자 및 패션 브랜드들이 납득할
            수 있는 작업의 방향, 리서치, 컨셉, 제작 완성도를 함께 설계합니다.
          </p>
        </section>

        {/* Courses */}
        {COURSES.map((c) => (
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
            {ONLINE.desc}
          </p>

          {/* 이런 분께 추천합니다 */}
          <p className="mt-6 text-sm font-bold text-accent">이런 분께 추천합니다</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {ONLINE.recommend.map((r) => (
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
            {ONLINE.process.map((p) => (
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
            리그아트는 입시 이후까지 생각합니다.
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-neutral-600">
            해외 미대 입시는 합격으로 끝나지 않습니다. 입학 이후 학교 수업을 따라가고,
            졸업 포트폴리오를 만들고, 나아가 자신의 커리어 방향을 설계하는 과정까지
            이어집니다. 리그아트는 단기적인 합격만을 위한 포트폴리오가 아니라, 학생이
            실제로 학교에 들어가서도 성장할 수 있는 감각과 사고방식을 함께 길러갑니다.
            리그아트는 현실적인 고민을 해결합니다. 포트폴리오의 방향, 학교 지원 전략,
            공모전 준비, 졸업작품 제작까지. 학생의 다음 단계를 함께 설계합니다.
          </p>
        </section>
      </div>
    </>
  );
}
