import type { Metadata } from "next";
import DirectorSection from "@/components/about/DirectorSection";

export const metadata: Metadata = {
  title: "리그아트 소개 · 대표원장",
  description:
    "파슨스 수석 졸업 출신 원장이 직접 지도하는 강남 서초동 리그아트 패션유학학원. 포트폴리오 개발부터 에세이·입시·공모전·진로까지 토탈 케어로 해외 미대 입시를 준비합니다.",
  alternates: { canonical: "/about" },
};

const FOCUS = [
  {
    en: "Portfolio",
    ko: "포트폴리오 개발",
    body: "학교별 평가 기준에 맞춘 입시 포트폴리오를 제작하고 보완합니다.",
  },
  {
    en: "Essay",
    ko: "에세이 · 지원 전략",
    body: "컨셉 개발과 서사 구조, 학교별 서면 포지셔닝을 코칭합니다.",
  },
  {
    en: "Feedback",
    ko: "대학 기준 피드백",
    body: "실제 입시 기준에 기반한 지속적 크리틱과 집중 관리를 제공합니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          ABOUT
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          리그아트 소개
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600">
          해외 명문 미술대학 입학부터 포트폴리오 디벨롭, 졸업 프로젝트, 그리고 글로벌
          크리에이티브 커리어까지 함께하는 프리미엄 아트 스튜디오입니다.
        </p>
      </header>

      {/* Why We Exist */}
      <section className="border-t border-neutral-200 py-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          WHY WE EXIST
        </p>
        <p className="mt-4 max-w-4xl text-lg font-medium leading-relaxed text-neutral-800 sm:text-xl">
          해외 미술대학에 합격하는 것은 목표가 아니라 시작입니다.
        </p>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-relaxed text-neutral-600">
          <p>
            하지만 많은 학생들이 입시에 맞춰 포트폴리오를 완성한 뒤, 학교에 입학해서는
            새로운 환경과 높은 수준의 프로젝트 앞에서 방향을 잃곤 합니다. 입시를 위해
            준비한 작업과 대학, 그리고 실제 디자인·아트 산업(Industry)에서 요구하는
            역량 사이에는 생각보다 큰 간극이 존재하기 때문입니다.
          </p>
          <p>리그아트는 바로 그 간극을 줄이기 위해 시작되었습니다.</p>
          <p>
            우리는 학생들이 대학 합격에서 멈추지 않고, 입학 이후에도 포트폴리오를
            지속적으로 디벨롭하며, 졸업 프로젝트와 인턴십, 공모전, 그리고 자신의
            커리어까지 이어질 수 있도록 함께합니다.
          </p>
          <p className="font-medium text-neutral-800">
            리그아트는 입시를 위한 포트폴리오가 아닌, 디자이너와 아티스트의 미래를 위한
            포트폴리오를 만듭니다.
          </p>
        </div>
      </section>

      {/* Program Focus */}
      <section className="border-t border-neutral-200 py-10">
        <div className="grid gap-10 sm:grid-cols-3">
          {FOCUS.map((f) => (
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
      <DirectorSection />
    </div>
  );
}
