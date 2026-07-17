"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/lib/auth-context";
import { NAV_ITEMS, CTA_ITEM } from "@/lib/site-config";

/** LEAGUE ART 워드마크 (Figma 로고 재현) + with egüre */
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 md:gap-3"
    >
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-bold tracking-[0.14em] text-accent text-xl md:text-[clamp(1.5rem,2.6vw,2.25rem)]">
          LEAGUE ART
        </span>
        <span className="text-center font-medium tracking-[0.45em] text-accent text-[7px] md:text-[clamp(8px,0.8vw,11px)]">
          STUDIO
        </span>
      </span>
      <span className="hidden whitespace-nowrap font-serif text-sm italic text-neutral-400 md:inline md:text-[clamp(0.75rem,1.25vw,1.125rem)]">
        with
      </span>
      <Image
        src="/logo/equre.png"
        alt="egüre"
        width={72}
        height={27}
        priority
        className="h-4 w-auto md:h-[clamp(1.125rem,2vw,1.75rem)]"
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:h-[120px] md:px-14">
        <Logo onClick={() => setOpen(false)} />

        {/* Desktop: 로고 옆부터 메뉴가 넓게 펼쳐짐 */}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`hidden whitespace-nowrap text-[clamp(0.875rem,1.6vw,22px)] font-medium transition-colors md:block ${
              isActive(item.href)
                ? "text-accent"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
        {!isLoading && (
          user ? (
            <>
              <Link
                href="/mypage"
                className="hidden whitespace-nowrap text-[clamp(0.875rem,1.6vw,22px)] font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:block"
              >
                마이페이지
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="hidden whitespace-nowrap text-[clamp(0.875rem,1.6vw,22px)] font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:block"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden whitespace-nowrap text-[clamp(0.875rem,1.6vw,22px)] font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:block"
            >
              로그인
            </Link>
          )
        )}
        <Link
          href={CTA_ITEM.href}
          className="hidden whitespace-nowrap rounded-full bg-accent px-[clamp(1rem,1.9vw,1.75rem)] py-[clamp(0.5rem,1vw,0.875rem)] text-[clamp(0.875rem,1.6vw,22px)] font-semibold text-white transition hover:bg-accent-dark md:block"
        >
          {CTA_ITEM.label}
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-800 md:hidden"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-black/5 bg-white px-6 pb-5 md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block border-l-2 px-3 py-3.5 text-lg font-medium ${
                  isActive(item.href)
                    ? "border-accent text-accent"
                    : "border-transparent text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {!isLoading &&
            (user ? (
              <>
                <li>
                  <Link
                    href="/mypage"
                    onClick={() => setOpen(false)}
                    className="block border-l-2 border-transparent px-3 py-3.5 text-lg font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    마이페이지
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="block w-full border-l-2 border-transparent px-3 py-3.5 text-left text-lg font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block border-l-2 border-transparent px-3 py-3.5 text-lg font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  로그인
                </Link>
              </li>
            ))}
          <li className="pt-3">
            <Link
              href={CTA_ITEM.href}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-accent px-4 py-3.5 text-center text-lg font-semibold text-white"
            >
              {CTA_ITEM.label}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
