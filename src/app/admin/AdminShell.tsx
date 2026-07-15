"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiUser,
  FiUsers,
  FiBarChart2,
  FiEdit3,
  FiTrendingUp,
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "@/lib/auth-context";

/**
 * 관리자 콘솔의 클라이언트 UI(사이드바 + 탑바 + 로그아웃).
 * ⚠️ 접근 통제(이메일 화이트리스트)는 상위 서버 컴포넌트 layout.tsx에서 강제한다.
 *    이 컴포넌트는 이미 검증을 통과한 관리자에게만 렌더된다.
 */

const NAV = [
  { href: "/admin", label: "대시보드", icon: FiGrid, exact: true },
  { href: "/admin/members", label: "회원", icon: FiUser, exact: false },
  { href: "/admin/consults", label: "상담 신청", icon: FiUsers, exact: false },
  { href: "/admin/analytics", label: "방문 통계", icon: FiBarChart2, exact: false },
  { href: "/admin/content", label: "콘텐츠 편집", icon: FiEdit3, exact: false },
  { href: "/admin/investors", label: "투자자 지표", icon: FiTrendingUp, exact: false },
];

export default function AdminShell({
  userLabel,
  children,
}: {
  userLabel: string;
  children: React.ReactNode;
}) {
  const { signOut } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white md:flex">
        <div className="border-b border-neutral-200 px-6 py-5">
          <p className="text-lg font-bold tracking-tight text-accent">
            LEAGUE ART
          </p>
          <p className="mt-0.5 text-xs font-medium text-neutral-400">
            관리자 콘솔
          </p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100"
          >
            <FiExternalLink size={18} />
            사이트 보기
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-5 py-3">
          {/* 모바일 네비 */}
          <nav className="flex items-center gap-1 md:hidden">
            {NAV.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                    active ? "bg-accent/10 text-accent" : "text-neutral-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden text-sm text-neutral-400 md:block">
            관리자 콘솔
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-600 sm:inline">
              {userLabel}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-accent hover:text-accent"
            >
              <FiLogOut size={15} />
              로그아웃
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
