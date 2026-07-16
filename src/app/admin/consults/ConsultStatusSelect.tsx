"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATUS_LABEL, type ConsultStatus } from "@/lib/consult-types";

/**
 * 상담 상태 변경 셀렉트 — 변경 시 /api/admin/consults 로 PATCH 후 목록 갱신.
 * 낙관적으로 표시값을 먼저 바꾸고, 실패하면 원복 + 에러 표시.
 */

const STATUS_STYLE: Record<ConsultStatus, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-amber-100 text-amber-700",
  done: "bg-neutral-200 text-neutral-600",
};

const OPTIONS: ConsultStatus[] = ["new", "contacted", "done"];

export default function ConsultStatusSelect({
  id,
  status,
}: {
  id: string;
  status: ConsultStatus;
}) {
  const router = useRouter();
  const [value, setValue] = useState<ConsultStatus>(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [, startTransition] = useTransition();

  async function onChange(next: ConsultStatus) {
    const prev = value;
    setValue(next);
    setSaving(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/consults", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error();
      startTransition(() => router.refresh());
    } catch {
      setValue(prev);
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${STATUS_STYLE[value].split(" ")[0]}`}
        aria-hidden
      />
      <select
        value={value}
        disabled={saving}
        onChange={(e) => onChange(e.target.value as ConsultStatus)}
        className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 outline-none transition focus:border-accent disabled:opacity-60"
        aria-label="상담 상태 변경"
      >
        {OPTIONS.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABEL[s]}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-accent">실패</span>}
    </div>
  );
}
