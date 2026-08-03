import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { getAdmissions, type Admission } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "합격자 명단 · 목표 대학",
  description:
    "리그아트가 지원·합격을 목표로 하는 세계 최상위 미술·디자인·패션 교육기관 — Parsons, FIT, RISD, SAIC, SCAD, Central Saint Martins, IFM, Istituto Marangoni 등. 학교별 평가 기준이 곧 포트폴리오·입시 전략의 기준입니다.",
  alternates: { canonical: "/admissions" },
};

// 콘텐츠 편집(문구·학교목록) + 합격 실적 DB 변경 시 revalidatePath 로 즉시 갱신.
export const revalidate = 300;

type SchoolGroup = { flag: string; country: string; schools: string[] };

/** "국기 | 국가 | 학교" 형식의 여러 줄 → 국가별 그룹(등장 순서 유지). */
function parseSchools(raw: string): SchoolGroup[] {
  const groups: SchoolGroup[] = [];
  const byCountry = new Map<string, SchoolGroup>();
  for (const line of raw.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const [flag, country, school] = line.split("|").map((p) => p.trim());
    if (!country) continue;
    let group = byCountry.get(country);
    if (!group) {
      group = { flag: flag ?? "", country, schools: [] };
      byCountry.set(country, group);
      groups.push(group);
    }
    if (school) group.schools.push(school);
  }
  return groups;
}

/** 합격 실적을 연도 내림차순 그룹으로 묶는다(조회는 이미 정렬됨). */
function groupByYear(rows: Admission[]): { year: number; items: Admission[] }[] {
  const groups: { year: number; items: Admission[] }[] = [];
  const byYear = new Map<number, Admission[]>();
  for (const row of rows) {
    let arr = byYear.get(row.year);
    if (!arr) {
      arr = [];
      byYear.set(row.year, arr);
      groups.push({ year: row.year, items: arr });
    }
    arr.push(row);
  }
  return groups;
}

export default async function AdmissionsPage() {
  const c = await getSiteContent();
  const { rows } = await getAdmissions();

  const groups = parseSchools(c["admissions.schools"] ?? "");
  const roster = groupByYear(rows);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          {c["admissions.eyebrow"]}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {c["admissions.title"]}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          {c["admissions.intro"]}
        </p>
      </header>

      {/* 합격 실적 (DB) — 등록된 실적이 있을 때만 노출 */}
      {roster.length > 0 && (
        <section className="border-t border-neutral-200 pt-10">
          <h2 className="text-lg font-bold">{c["admissions.rosterHeadline"]}</h2>
          <div className="mt-6 space-y-8">
            {roster.map((g) => (
              <div key={g.year}>
                <p className="text-sm font-bold text-accent">{g.year}</p>
                <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {g.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 text-sm text-neutral-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        <b className="font-semibold">{item.student}</b> · {item.school}
                        {item.program ? (
                          <span className="text-neutral-500"> — {item.program}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 목표·지원 학교 목록 (콘텐츠 편집) */}
      <div className="space-y-12 border-t border-neutral-200 pt-10">
        {groups.map((g) => (
          <section key={g.country}>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              {g.flag && <span aria-hidden>{g.flag}</span>}
              {g.country}
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {g.schools.map((s) => (
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
        {c["admissions.note"]}
      </p>
    </div>
  );
}
