import type { Metadata } from "next";
import { RiKakaoTalkFill } from "react-icons/ri";
import ConsultForm from "@/components/consult/ConsultForm";
import { SOCIAL_LINKS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "무료 포트폴리오 리뷰 상담 신청",
  description:
    "강남 서초동 리그아트 패션유학학원 무료 포트폴리오 리뷰 상담. 이름·연락처·학년만 남기면 담당 선생님이 24시간 내 연락드립니다. 카카오톡으로 바로 상담도 가능합니다. 전화 0507-1319-1038.",
  alternates: { canonical: "/contact" },
};

// 상담 & 지원 프로세스 (Figma: Process)
const STEPS = [
  {
    n: "01",
    title: "초기 진단 & 목표 설정",
    body: "학생의 배경·실력·관심사·장기 목표를 심층 진단하고, 적합한 목표 대학과 명확한 입시 경로를 설정합니다.",
  },
  {
    n: "02",
    title: "포트폴리오 방향 & 컨셉 개발",
    body: "학교별 기준에 맞춘 개인 포트폴리오 방향을 잡고, 일관되고 의도적인 작업 세계를 함께 만듭니다.",
  },
  {
    n: "03",
    title: "에세이 & 지원 전략",
    body: "에세이·자기소개서·서면 자료를 포트폴리오와 함께 개발해 학생의 예술적 의도를 명확히 전달합니다.",
  },
  {
    n: "04",
    title: "지속적 리뷰 & 전문 피드백",
    body: "실제 대학 평가 기준을 반영한 다회 피드백 사이클로 완성도를 끌어올립니다.",
  },
  {
    n: "05",
    title: "최종 검토 & 제출 지원",
    body: "제출 전 종합 검토와 기술 준비·일정 관리로 모든 지원의 정확성과 완결성을 책임집니다.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          COUNSELING
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          무료 포트폴리오 리뷰 신청
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          리그아트의 상담은 일회성 컨설팅이 아니라, 구조화된 장기 학습 과정입니다. 아래
          정보를 남겨주시면 담당 선생님이 확인 후 연락드립니다. 급하시면 카카오톡으로
          바로 상담하실 수 있어요.
        </p>
      </header>

      {/* 상담 & 지원 프로세스 */}
      <section className="border-t border-neutral-200 py-10">
        <h2 className="text-xl font-bold tracking-tight">상담 &amp; 지원 프로세스</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-neutral-200 p-6">
              <span className="font-mono text-2xl font-light text-accent">
                {s.n}
              </span>
              <h3 className="mt-2 text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Form + quick channels */}
      <section className="grid gap-10 pb-16 md:grid-cols-[1.4fr_1fr]">
        <ConsultForm />

        <aside className="space-y-4">
          <a
            href={SOCIAL_LINKS.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#FEE500] px-6 py-4 text-base font-bold text-[#3C1E1E] transition hover:brightness-95"
          >
            <RiKakaoTalkFill size={22} />
            카카오톡으로 바로 상담
          </a>
          <div className="rounded-lg border border-neutral-200 p-6 text-sm">
            <p className="font-bold text-neutral-900">상담 안내</p>
            <p className="mt-2 leading-relaxed text-neutral-600">
              무료 상담 · 24시간 내 답변
            </p>
            <p className="mt-1 leading-relaxed text-neutral-600">
              방문 상담은 사전 예약제로 운영됩니다.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
