import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "합격자 명단 · 목표 대학",
  description:
    "리그아트가 지원·합격을 목표로 하는 세계 최상위 미술·디자인·패션 교육기관 — Parsons, FIT, RISD, SAIC, SCAD, Central Saint Martins, IFM, Istituto Marangoni 등. 학교별 평가 기준이 곧 포트폴리오·입시 전략의 기준입니다.",
  alternates: { canonical: "/admissions" },
};

const COUNTRIES = [
  {
    flag: "🇺🇸",
    name: "United States",
    schools: [
      "Parsons School of Design — New York",
      "Fashion Institute of Technology (FIT) — New York",
      "Rhode Island School of Design (RISD) — Providence",
      "School of the Art Institute of Chicago (SAIC) — Chicago",
      "Savannah College of Art and Design (SCAD) — Savannah / Atlanta",
      "Otis College of Art and Design — Los Angeles",
    ],
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    schools: [
      "Central Saint Martins (UAL) — London",
      "London College of Fashion (UAL) — London",
      "Chelsea College of Arts (UAL) — London",
      "Royal College of Art — London",
      "University of Westminster — London",
    ],
  },
  {
    flag: "🇫🇷",
    name: "France",
    schools: [
      "Institut Français de la Mode (IFM) — Paris",
      "Atelier Chardon Savard — Paris",
      "ESMOD Paris — Paris",
    ],
  },
  {
    flag: "🇮🇹",
    name: "Italy",
    schools: ["Istituto Marangoni — Milan"],
  },
];

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          ADMISSIONS
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          합격자 명단
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          리그아트가 지원·합격을 목표로 하는 세계 최상위 미술·디자인·패션 교육기관입니다.
          이 학교들의 평가 기준이 곧 포트폴리오·입시 전략의 기준이 됩니다.
        </p>
      </header>

      <div className="space-y-12 border-t border-neutral-200 pt-10">
        {COUNTRIES.map((c) => (
          <section key={c.name}>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span aria-hidden>{c.flag}</span>
              {c.name}
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {c.schools.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="pb-16 pt-12 text-xs leading-relaxed text-neutral-400">
        구체적인 합격생 명단과 포트폴리오 사례는 개인정보 보호를 위해 상담 시 안내해
        드립니다.
      </p>
    </div>
  );
}
