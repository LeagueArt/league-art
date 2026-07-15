import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { CTA_ITEM } from "@/lib/site-config";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "베네핏 · 자주 묻는 질문",
  description:
    "리그아트 패션유학학원의 차별점과 자주 묻는 질문 — 수업 장소, 지원 가능 국가, 원서 통합 컨설팅, 준비 기간, 장학금, 포트폴리오 준비 등. 소수정예 1:4 밀착 지도와 Parsons·CSM 출신 지도진.",
  alternates: { canonical: "/faq" },
};

// 콘텐츠 편집 반영: ISR(최대 5분) + 저장 시 revalidatePath 로 즉시 갱신.
export const revalidate = 300;

// 리그아트가 특별한 이유 (Figma: Benefits)
const BENEFITS = [
  {
    num: "01",
    title: "소수정예 1:4 밀착 지도",
    body: "한 클래스 최대 4명. 학생별 작업 방향·포트폴리오를 전적으로 책임집니다.",
  },
  {
    num: "02",
    title: "Parsons·CSM 출신 지도진",
    body: "원장·강사진과 글로벌 브랜드 현직 크리에이티브 디렉터의 크리틱.",
  },
  {
    num: "03",
    title: "원서 통합 컨설팅",
    body: "지원과 관련한 전 과정을 총괄 관리합니다.",
  },
  {
    num: "04",
    title: "포트폴리오 + 에세이 통합",
    body: "작업과 서류를 하나의 흐름으로 완성합니다.",
  },
  {
    num: "05",
    title: "합격까지 토탈 케어",
    body: "공모전·장학금·진로 연계까지 지원합니다.",
  },
  {
    num: "06",
    title: "실전 기준 피드백",
    body: "실제 입시 평가 기준에 기반한 다회 피드백.",
  },
];

// 자주 묻는 질문 (Figma: FAQ Accordion). 학원 확정 카피.
// a: 문단 배열 — 문단마다 별도 <p>로 렌더.
const FAQS: { q: string; a: string[] }[] = [
  {
    q: "수업은 어디에서 진행되나요?",
    a: [
      "수업은 서울 강남구 서초동에 위치한 리그아트유학 스튜디오에서 진행됩니다. 해외 거주 중이거나 방문이 어려운 경우, 온라인 상담 및 온라인 수업 가능 여부를 별도로 안내해드립니다.",
    ],
  },
  {
    q: "미국뿐 아니라 영국, 캐나다 미대도 지원할 수 있나요?",
    a: [
      "네, 가능합니다. 미국, 영국, 캐나다 등 국가별·학교별로 요구하는 포트폴리오 방향, 원서 구성, 에세이 기준이 다르기 때문에 리그아트에서는 각 학교의 지원 요건에 맞춰 맞춤형 전략을 설계합니다.",
    ],
  },
  {
    q: "원서 통합 컨설팅은 무엇인가요?",
    a: [
      "원서 통합 컨설팅은 학교 선정부터 포트폴리오 방향, 에세이, 서류, 제출 일정까지 지원 과정 전반을 함께 관리하는 서비스입니다. 학생의 목표 전공과 학교에 맞춰 필요한 준비 사항을 정리하고, 전체 지원 흐름이 흔들리지 않도록 체계적으로 안내합니다. 자세한 내용은 상담 시 학생의 현재 상황과 목표 학교를 기준으로 안내해드립니다.",
    ],
  },
  {
    q: "리그아트는 다른 미술학원과 무엇이 다른가요?",
    a: [
      "리그아트는 단순히 작품을 많이 만드는 수업이 아니라, 해외 미대에서 평가되는 포트폴리오의 방향성을 함께 설계하는 스튜디오입니다. 가장 큰 차이는 현역성입니다. 리그아트는 파슨스 수석 졸업 출신 원장이 직접 지도하며, 현재도 뉴욕 현지의 패션·아트 씬과 연결된 실무 경험, 파슨스 뉴욕 졸업 패션쇼 및 포트폴리오 심사 경험을 바탕으로 학생을 지도합니다. 해외 미대 입시는 매년 트렌드와 평가 기준이 달라집니다. 그래서 과거의 합격 사례나 오래된 방식만으로는 학생에게 현실적인 도움을 주기 어렵습니다. 리그아트는 지금 현장에서 요구되는 감각, 포트폴리오 구성 방식, 리서치 방향, 전공별 완성도 기준을 반영해 학생 개개인의 작업을 발전시킵니다.",
      "또한 리그아트는 입시에서 끝나는 수업이 아니라, 입학 이후 학교생활과 졸업 포트폴리오, 나아가 커리어 방향까지 함께 바라봅니다. 뉴욕 현지 네트워크와 실무 리소스를 바탕으로 학생에게 필요한 경우 교수진, 현업 디자이너, 패션·아트 분야 전문가와의 연결 가능성까지 함께 고민합니다.",
      "패션 전공 학생의 경우, 메이킹 과정 또한 보다 전문적으로 지원합니다. CSM 학사·석사 출신이자 Alexander McQueen 10년 경력의 현 대기업 크리에이티브 디렉터 및 전문 패턴·메이킹 리소스와의 연결을 통해, 단순한 입시용 작품을 넘어 졸업작품 수준의 제작 방향까지 함께 설계할 수 있습니다.",
      "리그아트는 학생이 학교에 합격하는 것에서 멈추지 않고, 해외 미대에서 실제로 성장하고, 이후 커리어까지 이어갈 수 있도록 보다 현실적인 방향을 제안합니다.",
    ],
  },
  {
    q: "준비 기간은 얼마나 필요한가요?",
    a: [
      "학생의 현재 실력, 목표 학교, 지원 전공에 따라 다르지만 일반적으로 12개월에서 24개월 정도의 준비 기간을 권장합니다.",
    ],
  },
  {
    q: "미술을 전혀 못해도 괜찮나요?",
    a: [
      "네, 가능합니다. 기초 드로잉부터 리서치, 아이디어 전개, 실험 과정, 포트폴리오 완성까지 단계별로 지도합니다. 해외 미대 포트폴리오에서 중요한 것은 단순한 기술력만이 아닙니다. 학생이 어떤 시선으로 세상을 바라보는지, 어떤 질문을 가지고 작업을 발전시키는지, 그리고 그 가능성을 어떻게 시각적으로 보여주는지가 중요합니다. 리그아트는 학생 안에 있는 잠재력을 발견하고, 그것을 포트폴리오로 설득력 있게 표현할 수 있도록 돕습니다.",
    ],
  },
  {
    q: "장학금도 받을 수 있나요?",
    a: [
      "네. 학교별 장학금 가능성과 전략을 함께 고려해 준비합니다. 장학금은 단순히 성적만으로 결정되는 것이 아니라, 포트폴리오의 완성도, 학생의 개성, 전공 적합성, 에세이와 원서 전체의 설득력 등 여러 요소가 함께 작용합니다. 리그아트는 지원 학교별 특성을 고려해 장학금 가능성을 높일 수 있는 방향으로 포트폴리오와 원서 전략을 함께 설계합니다.",
    ],
  },
  {
    q: "포트폴리오는 몇 작품 정도 준비해야 하나요?",
    a: [
      "학교와 전공에 따라 다르지만, 일반적으로 완성도 있는 작품과 과정 기록을 함께 준비해야 합니다.",
      "해외 미대에서는 결과물뿐 아니라 아이디어가 어떻게 시작되고 발전했는지, 어떤 실험과 리서치를 거쳤는지를 중요하게 평가합니다. 리그아트에서는 단순히 작품 개수를 채우는 것이 아니라, 학생의 개성과 전공 적합성이 잘 드러나는 포트폴리오 구성을 함께 설계합니다.",
    ],
  },
  {
    q: "에세이와 자기소개서도 함께 준비할 수 있나요?",
    a: [
      "네, 가능합니다. 해외 미대 지원에서는 포트폴리오만큼 에세이와 자기소개서도 중요합니다. 학생의 작업 방향, 지원 동기, 전공에 대한 이해도, 학교와의 적합성이 글 안에서 설득력 있게 드러나야 하기 때문입니다. 리그아트에서는 포트폴리오와 에세이가 따로 보이지 않도록, 학생의 전체 지원 스토리가 하나의 방향으로 연결될 수 있게 지도합니다.",
    ],
  },
  {
    q: "수업은 소수정예로 진행되나요?",
    a: [
      "네. 리그아트는 학생 개개인의 작업 방향을 깊이 있게 봐야 하는 포트폴리오 수업 특성상 소수정예 방식으로 운영됩니다. 학생마다 목표 학교, 전공, 현재 실력, 작업 성향이 모두 다르기 때문에 개별 피드백과 맞춤형 방향 설정을 중요하게 생각합니다.",
    ],
  },
];

export default async function BenefitPage() {
  const c = await getSiteContent();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          BENEFIT · FAQ
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {c["benefit.title"]}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600">
          {c["benefit.intro"]}
        </p>
      </header>

      {/* 리그아트가 특별한 이유 */}
      <section className="border-t border-neutral-200 py-10">
        <h2 className="text-xl font-bold tracking-tight">리그아트가 특별한 이유</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.num}
              className="rounded-2xl border border-neutral-200 p-6 transition hover:border-accent/40 hover:shadow-sm"
            >
              <p className="font-mono text-sm font-medium text-accent">{b.num}</p>
              <h3 className="mt-2 text-base font-bold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <section className="border-t border-neutral-200 py-10">
        <h2 className="text-xl font-bold tracking-tight">자주 묻는 질문</h2>
        <FaqAccordion items={FAQS} />
      </section>

      {/* 상담 / 프로그램 */}
      <section className="rounded-2xl border border-neutral-200 p-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          PROGRAM
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">상담 / 프로그램</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
          프로그램 구성과 수업료는 학생의 목표와 준비 기간에 따라 달라집니다. 무료
          상담에서 개인별 커리큘럼과 함께 안내해 드립니다.
        </p>
        <Link
          href={CTA_ITEM.href}
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
        >
          {CTA_ITEM.label}
        </Link>
      </section>

      {/* 학생 전시회 — 추후 추가 */}
      <section className="mb-16 mt-6 rounded-2xl border border-dashed border-neutral-300 p-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          COMING SOON
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-500">
          리그아트 학생 전시회
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500">
          갤러리 협업 전시(1~4기) 등 학생들의 활동을 추후 이곳에 소개할 예정입니다.
        </p>
      </section>
    </div>
  );
}
