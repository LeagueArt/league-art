import Link from "next/link";
import { NAV_ITEMS, CTA_ITEM } from "@/lib/site-config";

/**
 * 404 — 페이지를 찾을 수 없음 (App Router not-found).
 * 레이아웃의 <main> 안에서 렌더되며, 하단 ConsultSection이 이어집니다.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-mono text-6xl font-bold tracking-tight text-accent sm:text-7xl">
        404
      </p>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다. 아래에서 원하는
        페이지로 이동해 주세요.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-white transition hover:bg-accent-dark"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href={CTA_ITEM.href}
          className="flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-800 transition hover:border-accent hover:text-accent"
        >
          {CTA_ITEM.label}
        </Link>
      </div>

      {/* 바로가기 */}
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-neutral-200 pt-8 text-sm">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium text-neutral-500 transition-colors hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
