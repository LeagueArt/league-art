import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        {eyebrow && (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {description}
          </p>
        )}
      </header>
      {children && <div className="mt-12">{children}</div>}
    </div>
  );
}
