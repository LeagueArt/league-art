"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * FAQ 아코디언 — 한 번에 하나만 열림(하나를 열면 나머지는 자동으로 닫힘).
 * 열린 항목을 다시 누르면 닫힘. 첫 항목이 기본으로 열려 있음.
 */

type Faq = { q: string; a: string[] };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-4 border-t border-neutral-200">
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={f.q} className="border-b border-neutral-200">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={`text-base font-bold ${
                  isOpen ? "text-accent" : "text-neutral-900"
                }`}
              >
                <span className="mr-1.5">Q.</span>
                {f.q}
              </span>
              <FiChevronDown
                size={22}
                className={`shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-accent" : "text-neutral-400"
                }`}
                aria-hidden
              />
            </button>
            {isOpen && (
              <div className="space-y-3 pb-5 pr-8">
                {f.a.map((para, j) => (
                  <p key={j} className="text-sm leading-[1.8] text-neutral-600">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
