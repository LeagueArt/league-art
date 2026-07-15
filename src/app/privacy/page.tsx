import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "약관 · 개인정보 처리방침",
  robots: { index: false }, // 초안 단계 — 검색 노출 제외 (법률 검토 후 해제)
};

/**
 * 약관 · 개인정보 처리방침 (초안).
 * 주의: 법적 동의 구조는 별도 법률 검토 후 확정 예정.
 * [ ] 대괄호 항목은 학원 확정 정보로 교체 필요(상호/대표자/주소/연락처/보호책임자).
 */

type Section = {
  id: string;
  title: string;
  intro?: string;
  // 표 형태 항목(수집 항목 등)
  rows?: { k: string; v: string }[];
  // 일반 문단/목록
  items?: string[];
};

const SECTIONS: Section[] = [
  {
    id: "collect",
    title: "1. 수집하는 개인정보 항목",
    intro:
      "리그아트는 상담 신청 처리를 위해 아래 항목을 수집합니다. 필수 항목만으로 상담이 가능하며, 선택 항목은 상담 품질 향상을 위한 것입니다.",
    rows: [
      { k: "필수", v: "이름, 연락처(휴대전화번호), 학년" },
      { k: "선택", v: "현재 학교, 희망 학교·전공, 추천인" },
      {
        k: "자동 수집",
        v: "서비스 이용 과정에서 접속 로그, 쿠키 등이 생성·수집될 수 있습니다.",
      },
    ],
  },
  {
    id: "purpose",
    title: "2. 개인정보의 수집·이용 목적",
    items: [
      "상담 신청 확인 및 상담 진행(연락, 일정 안내)",
      "학생 목표·현황에 맞는 커리큘럼 및 포트폴리오 방향 안내",
      "서비스 관련 공지 및 문의 응대",
    ],
  },
  {
    id: "retention",
    title: "3. 보유 및 이용 기간",
    items: [
      "수집된 개인정보는 수집·이용 목적이 달성되면 지체 없이 파기합니다.",
      "상담 이력은 상담 종료(또는 동의 철회) 후 [보유기간] 동안 보관 후 파기합니다.",
      "관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 분리 보관합니다.",
    ],
  },
  {
    id: "sensitive",
    title: "4. 민감정보의 처리",
    intro:
      "리그아트는 원칙적으로 민감정보를 수집하지 않습니다. 다만 멘탈케어 등 특정 프로그램 신청 시에는 해당 정보가 필요할 수 있으며, 이때는 별도의 명시적 동의를 받은 후에만 수집합니다.",
    items: [
      "민감정보는 일반 개인정보와 분리하여 보관·관리합니다.",
      "해당 프로그램을 신청하지 않는 경우 민감정보를 수집하지 않습니다.",
      "동의를 거부하더라도 일반 상담 이용에는 제한이 없습니다.",
    ],
  },
  {
    id: "minor",
    title: "5. 만 14세 미만 아동의 개인정보",
    items: [
      "만 14세 미만 아동의 개인정보 수집·이용 시에는 법정대리인의 동의를 받습니다.",
      "법정대리인은 아동의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있습니다.",
    ],
  },
  {
    id: "thirdparty",
    title: "6. 제3자 제공 및 처리위탁",
    items: [
      "리그아트는 정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.",
      "서비스 운영에 필요한 경우 업무의 일부를 위탁할 수 있으며, 위탁 시 수탁자와 위탁 업무 내용을 본 방침을 통해 안내합니다.",
    ],
  },
  {
    id: "rights",
    title: "7. 정보주체의 권리",
    items: [
      "정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지 및 동의 철회를 요청할 수 있습니다.",
      "권리 행사는 아래 개인정보 보호책임자에게 서면·전화·이메일로 요청할 수 있으며, 리그아트는 지체 없이 조치합니다.",
    ],
  },
  {
    id: "officer",
    title: "8. 개인정보 보호책임자",
    rows: [
      { k: "상호", v: "[상호명] (리그아트)" },
      { k: "대표자", v: "[대표자명]" },
      { k: "주소", v: "[사업장 주소] (서울 강남구 서초동)" },
      { k: "보호책임자", v: "[성명 / 직책]" },
      { k: "연락처", v: "[전화번호] / [이메일]" },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      {/* Header */}
      <header className="pb-4 pt-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
          LEGAL
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          약관 · 개인정보 처리방침
        </h1>
        <p className="mt-5 text-base leading-relaxed text-neutral-600">
          리그아트는 이용자의 개인정보를 중요하게 생각하며, 관계 법령에 따라 안전하게
          처리합니다. 본 문서는 상담 신청 시 수집되는 개인정보의 처리 기준을 안내합니다.
        </p>
      </header>

      {/* 초안 고지 */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800">
        <strong className="font-bold">안내 ·</strong> 본 약관·개인정보 처리방침은{" "}
        <strong className="font-bold">초안</strong>이며, 법률 검토 후 확정됩니다. 대괄호
        [ ] 로 표시된 항목(상호·대표자·주소·연락처 등)은 확정 정보로 교체될 예정입니다.
      </div>

      <p className="mt-6 text-xs text-neutral-400">
        시행일자: [시행일] · 최종 개정: [개정일]
      </p>

      {/* 본문 */}
      <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-52 py-8">
            <h2 className="text-lg font-bold tracking-tight">{s.title}</h2>
            {s.intro && (
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {s.intro}
              </p>
            )}

            {s.rows && (
              <dl className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
                {s.rows.map((r, i) => (
                  <div
                    key={r.k}
                    className={`grid grid-cols-[100px_1fr] gap-4 px-4 py-3 text-sm ${
                      i > 0 ? "border-t border-neutral-200" : ""
                    }`}
                  >
                    <dt className="font-bold text-neutral-800">{r.k}</dt>
                    <dd className="leading-relaxed text-neutral-600">{r.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {s.items && (
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="pb-16 pt-8 text-xs leading-relaxed text-neutral-400">
        본 방침의 내용 추가·삭제 및 수정이 있을 경우 시행일자 [일] 전부터 공지사항을 통해
        고지합니다.
      </p>
    </div>
  );
}
