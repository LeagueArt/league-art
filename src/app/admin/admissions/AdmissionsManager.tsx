"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiEdit2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import type { Admission } from "@/lib/admin-data";

/**
 * 합격 실적 명단 관리 — 추가/수정/삭제.
 *  - 각 작업은 /api/admin/admissions (POST/PATCH/DELETE) 호출 후 router.refresh()로 목록 갱신.
 *  - 서버(관리자 페이지)가 실데이터의 출처이며, 이 컴포넌트는 폼/편집 상태만 관리한다.
 */

const INPUT =
  "w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-sm outline-none transition focus:border-accent";

type Draft = {
  year: string;
  student: string;
  school: string;
  program: string;
  country: string;
};

const EMPTY_DRAFT = (): Draft => ({
  year: String(new Date().getFullYear()),
  student: "",
  school: "",
  program: "",
  country: "",
});

export default function AdmissionsManager({
  initial,
  ready,
}: {
  initial: Admission[];
  ready: boolean;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null,
  );

  function flash(type: "ok" | "err", msg: string) {
    setNotice({ type, msg });
    setTimeout(() => setNotice(null), 4000);
  }

  function refresh() {
    startTransition(() => router.refresh());
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (adding) return;
    if (!draft.student.trim() || !draft.school.trim() || !draft.year.trim()) {
      flash("err", "연도·학생·학교는 필수입니다.");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "추가에 실패했습니다.");
      setDraft(EMPTY_DRAFT());
      flash("ok", "합격 실적이 추가되었습니다.");
      refresh();
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "추가 중 오류가 발생했습니다.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("이 합격 실적을 삭제할까요?")) return;
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      flash("ok", "삭제되었습니다.");
      refresh();
    } catch {
      flash("err", "삭제에 실패했습니다.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">합격자 명단</h1>
        <p className="mt-1 text-sm text-neutral-500">
          합격 실적을 추가·수정·삭제하면 공개 페이지(/admissions)에 바로 반영됩니다.
          제목·소개·학교 목록 문구는 <b>콘텐츠 편집 → 합격자 명단</b> 탭에서 수정합니다.
        </p>
      </div>

      {notice && (
        <div
          className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
            notice.type === "ok"
              ? "bg-green-50 text-green-700"
              : "bg-accent/10 text-accent"
          }`}
        >
          {notice.type === "ok" ? "✓ " : ""}
          {notice.msg}
        </div>
      )}

      {!ready && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          admissions 테이블을 찾을 수 없습니다. Supabase에{" "}
          <code>0005_admissions.sql</code> 마이그레이션을 적용하면 합격 실적을 저장할
          수 있습니다.
        </div>
      )}

      {/* 추가 폼 */}
      <form
        onSubmit={handleAdd}
        className="rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <p className="mb-3 text-sm font-semibold text-neutral-700">합격 실적 추가</p>
        <div className="grid gap-3 sm:grid-cols-6">
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs text-neutral-500">연도 *</span>
            <input
              type="number"
              value={draft.year}
              onChange={(e) => setDraft((d) => ({ ...d, year: e.target.value }))}
              className={INPUT}
              placeholder="2025"
            />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs text-neutral-500">학생 *</span>
            <input
              value={draft.student}
              onChange={(e) => setDraft((d) => ({ ...d, student: e.target.value }))}
              className={INPUT}
              placeholder="김OO"
            />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span className="text-xs text-neutral-500">합격 학교 *</span>
            <input
              value={draft.school}
              onChange={(e) => setDraft((d) => ({ ...d, school: e.target.value }))}
              className={INPUT}
              placeholder="Parsons School of Design"
            />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs text-neutral-500">전공</span>
            <input
              value={draft.program}
              onChange={(e) => setDraft((d) => ({ ...d, program: e.target.value }))}
              className={INPUT}
              placeholder="Fashion Design"
            />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs text-neutral-500">국가</span>
            <input
              value={draft.country}
              onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
              className={INPUT}
              placeholder="United States"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={adding}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-70"
        >
          <FiPlus size={15} />
          {adding ? "추가 중…" : "추가"}
        </button>
      </form>

      {/* 목록 */}
      {initial.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-12 text-center text-sm text-neutral-500">
          아직 등록된 합격 실적이 없습니다. 위 폼에서 추가하세요.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 font-semibold">연도</th>
                  <th className="px-4 py-3 font-semibold">학생</th>
                  <th className="px-4 py-3 font-semibold">합격 학교</th>
                  <th className="px-4 py-3 font-semibold">전공</th>
                  <th className="px-4 py-3 font-semibold">국가</th>
                  <th className="px-4 py-3 text-right font-semibold">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {initial.map((row) => (
                  <AdmissionRow
                    key={row.id}
                    row={row}
                    editing={editingId === row.id}
                    onEdit={() => setEditingId(row.id)}
                    onCancel={() => setEditingId(null)}
                    onSaved={() => {
                      setEditingId(null);
                      flash("ok", "수정되었습니다.");
                      refresh();
                    }}
                    onError={(m) => flash("err", m)}
                    onDelete={() => handleDelete(row.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function AdmissionRow({
  row,
  editing,
  onEdit,
  onCancel,
  onSaved,
  onError,
  onDelete,
}: {
  row: Admission;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSaved: () => void;
  onError: (msg: string) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState<Draft>({
    year: String(row.year),
    student: row.student,
    school: row.school,
    program: row.program ?? "",
    country: row.country ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    if (saving) return;
    if (!draft.student.trim() || !draft.school.trim() || !draft.year.trim()) {
      onError("연도·학생·학교는 필수입니다.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id, ...draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "수정에 실패했습니다.");
      onSaved();
    } catch (err) {
      onError(err instanceof Error ? err.message : "수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  const cell = "border border-neutral-300 rounded-md px-2 py-1 text-sm w-full outline-none focus:border-accent";
  const dash = <span className="text-neutral-300">—</span>;

  if (editing) {
    return (
      <tr className="bg-accent/5">
        <td className="px-4 py-2">
          <input
            type="number"
            value={draft.year}
            onChange={(e) => setDraft((d) => ({ ...d, year: e.target.value }))}
            className={cell}
          />
        </td>
        <td className="px-4 py-2">
          <input
            value={draft.student}
            onChange={(e) => setDraft((d) => ({ ...d, student: e.target.value }))}
            className={cell}
          />
        </td>
        <td className="px-4 py-2">
          <input
            value={draft.school}
            onChange={(e) => setDraft((d) => ({ ...d, school: e.target.value }))}
            className={cell}
          />
        </td>
        <td className="px-4 py-2">
          <input
            value={draft.program}
            onChange={(e) => setDraft((d) => ({ ...d, program: e.target.value }))}
            className={cell}
          />
        </td>
        <td className="px-4 py-2">
          <input
            value={draft.country}
            onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
            className={cell}
          />
        </td>
        <td className="px-4 py-2">
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              aria-label="저장"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white transition hover:bg-accent-dark disabled:opacity-60"
            >
              <FiCheck size={15} />
            </button>
            <button
              type="button"
              onClick={onCancel}
              aria-label="취소"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:border-neutral-400"
            >
              <FiX size={15} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-neutral-50">
      <td className="whitespace-nowrap px-4 py-3 font-medium">{row.year}</td>
      <td className="px-4 py-3 font-medium">{row.student}</td>
      <td className="px-4 py-3 text-neutral-700">{row.school}</td>
      <td className="px-4 py-3 text-neutral-600">{row.program || dash}</td>
      <td className="px-4 py-3 text-neutral-600">{row.country || dash}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={onEdit}
            aria-label="수정"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:border-accent hover:text-accent"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="삭제"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition hover:border-accent hover:text-accent"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
