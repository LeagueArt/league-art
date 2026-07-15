"use client";

import { useState } from "react";
import { CONTENT } from "@/lib/content-defaults";

/**
 * 콘텐츠 편집 (UI 목업).
 * ⚠️ 백엔드/CMS 미연결 — 편집·저장은 화면 동작만 재현하며 실제 사이트에 반영되지 않습니다.
 * TODO: 저장을 CMS/DB API로 연결하면 공개 페이지 카피가 이 값에서 렌더되도록 교체.
 */

type Field = { key: string; label: string; value: string; multiline?: boolean };

const SECTIONS: { id: string; label: string; fields: Field[] }[] = [
  {
    id: "home",
    label: "홈",
    fields: [
      { key: "heroEyebrow", label: "히어로 상단문구", value: CONTENT.home.heroEyebrow },
      { key: "heroTitle", label: "히어로 제목", value: CONTENT.home.heroTitle, multiline: true },
      { key: "heroSubtitle", label: "히어로 부제", value: CONTENT.home.heroSubtitle },
      { key: "introHeadline", label: "인트로 헤드라인", value: CONTENT.home.introHeadline },
      { key: "introBody", label: "인트로 본문", value: CONTENT.home.introBody, multiline: true },
    ],
  },
  {
    id: "about",
    label: "소개",
    fields: [
      { key: "headline", label: "헤드라인", value: CONTENT.about.headline },
      { key: "greeting", label: "원장 인사말(첫 문단)", value: CONTENT.about.greeting, multiline: true },
    ],
  },
  {
    id: "curriculum",
    label: "커리큘럼",
    fields: [
      { key: "headline", label: "헤드라인", value: CONTENT.curriculum.headline },
      { key: "intro", label: "인트로 본문", value: CONTENT.curriculum.intro, multiline: true },
    ],
  },
  {
    id: "benefit",
    label: "베네핏",
    fields: [
      { key: "headline", label: "헤드라인", value: CONTENT.benefit.headline },
      { key: "intro", label: "인트로 본문", value: CONTENT.benefit.intro, multiline: true },
    ],
  },
];

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-accent";

export default function AdminContentPage() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    SECTIONS.forEach((s) =>
      s.fields.forEach((f) => (init[`${s.id}.${f.key}`] = f.value)),
    );
    return init;
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const section = SECTIONS.find((s) => s.id === active)!;

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: CMS/DB 저장으로 교체. 현재는 저장됨 표시만.
    setSavedAt(`${section.label} 섹션 변경사항이 저장되었습니다 (데모)`);
    setTimeout(() => setSavedAt(null), 3000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">콘텐츠 편집</h1>
        <p className="mt-1 text-sm text-neutral-500">
          사이트 주요 문구를 섹션별로 편집하세요.
        </p>
      </div>

      {/* 섹션 탭 */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              active === s.id
                ? "border-accent text-accent"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 편집 폼 */}
      <form
        onSubmit={handleSave}
        className="max-w-2xl space-y-5 rounded-2xl border border-neutral-200 bg-white p-6"
      >
        {section.fields.map((f) => {
          const id = `${section.id}.${f.key}`;
          return (
            <label key={id} className="block space-y-2">
              <span className="text-[13px] font-medium text-neutral-700">
                {f.label}
              </span>
              {f.multiline ? (
                <textarea
                  rows={4}
                  value={values[id]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [id]: e.target.value }))
                  }
                  className={`${INPUT} resize-y leading-relaxed`}
                />
              ) : (
                <input
                  value={values[id]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [id]: e.target.value }))
                  }
                  className={INPUT}
                />
              )}
            </label>
          );
        })}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark"
          >
            저장
          </button>
          {savedAt && (
            <span className="text-sm font-medium text-green-600">✓ {savedAt}</span>
          )}
        </div>
      </form>

      <p className="text-xs text-neutral-400">
        ※ 목업 편집기입니다. 저장 값은 실제 사이트에 반영되지 않으며, CMS/DB 연결 후
        공개 페이지 카피가 이 값에서 렌더되도록 연동됩니다.
      </p>
    </div>
  );
}
