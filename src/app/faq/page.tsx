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

// 여러 줄 → 항목 배열 / 빈 줄로 문단 분리.
const paras = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default async function BenefitPage() {
  const c = await getSiteContent();

  const benefits = [1, 2, 3, 4, 5, 6].map((i) => ({
    num: String(i).padStart(2, "0"),
    title: c[`benefit.b${i}Title`],
    body: c[`benefit.b${i}Body`],
  }));

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((i) => ({ q: c[`benefit.faq${i}Q`], a: paras(c[`benefit.faq${i}A`]) }))
    .filter((f) => f.q);

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
          {benefits.map((b) => (
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
        <FaqAccordion items={faqs} />
      </section>

      {/* 상담 / 프로그램 */}
      <section className="rounded-2xl border border-neutral-200 p-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          PROGRAM
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">상담 / 프로그램</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {c["benefit.programBody"]}
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
