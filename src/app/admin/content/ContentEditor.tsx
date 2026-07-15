"use client";

import { useState } from "react";
import { CONTENT_SECTIONS } from "@/lib/content-schema";

/**
 * 콘텐츠 편집기 — 현재 저장값을 로드해 편집하고 /api/admin/content 로 저장한다.
 * 저장 시 서버가 site_content upsert + 공개 페이지 revalidate → 실제 사이트에 반영.
 */

const INPUT =
  "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-accent";

export default function ContentEditor({
  initial,
}: {
  initial: Record<string, string>;
}) {
  const [active, setActive] = useState(CONTENT_SECTIONS[0].id);
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null,
  );

  const section = CONTENT_SECTIONS.find((s) => s.id === active)!;

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setNotice(null);

    // 현재 섹션 필드만 저장
    const payload: Record<string, string> = {};
    section.fields.forEach((f) => {
      payload[f.key] = values[f.key] ?? "";
    });

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "저장에 실패했습니다.");
      setNotice({
        type: "ok",
        msg: `${section.label} 섹션이 저장되어 공개 페이지에 반영되었습니다.`,
      });
    } catch (err) {
      setNotice({
        type: "err",
        msg: err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.",
      });
    } finally {
      setSaving(false);
      setTimeout(() => setNotice(null), 4000);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">콘텐츠 편집</h1>
        <p className="mt-1 text-sm text-neutral-500">
          사이트 주요 문구를 섹션별로 편집하면 공개 페이지에 바로 반영됩니다.
        </p>
      </div>

      {/* 섹션 탭 */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200">
        {CONTENT_SECTIONS.map((s) => (
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
        {section.fields.map((f) => (
          <label key={f.key} className="block space-y-2">
            <span className="text-[13px] font-medium text-neutral-700">
              {f.label}
            </span>
            {f.multiline ? (
              <textarea
                rows={4}
                value={values[f.key] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
                className={`${INPUT} resize-y leading-relaxed`}
              />
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
                className={INPUT}
              />
            )}
          </label>
        ))}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
          >
            {saving ? "저장 중…" : "저장"}
          </button>
          {notice && (
            <span
              className={`text-sm font-medium ${
                notice.type === "ok" ? "text-green-600" : "text-accent"
              }`}
            >
              {notice.type === "ok" ? "✓ " : ""}
              {notice.msg}
            </span>
          )}
        </div>
      </form>

      <p className="text-xs leading-relaxed text-neutral-400">
        ※ 히어로 제목처럼 줄바꿈이 있는 항목은 입력창에서 Enter로 줄을 나누면 공개
        페이지에도 동일하게 반영됩니다. 저장 후 공개 페이지가 최신 내용으로 갱신됩니다.
      </p>
    </div>
  );
}
