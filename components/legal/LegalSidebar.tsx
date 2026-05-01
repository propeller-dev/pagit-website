"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SidebarItem = { id: string; label: string };

export function LegalSidebar({
  items,
  outroId,
  outroLabel,
}: {
  items: SidebarItem[];
  outroId?: string;
  outroLabel?: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = [...items.map((i) => i.id), ...(outroId ? [outroId] : [])];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.2, 1],
      },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items, outroId]);

  return (
    <nav
      aria-label="Navegação do documento"
      className="rounded-2xl border border-line-200 bg-surface p-5"
    >
      <p className="text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">
        Navegação
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm leading-snug transition-colors",
                activeId === item.id
                  ? "font-semibold text-brand-700"
                  : "text-ink-600 hover:text-brand-700",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
        {outroId && outroLabel ? (
          <li className="border-t border-line-200 pt-3">
            <a
              href={`#${outroId}`}
              className={cn(
                "block text-sm leading-snug transition-colors",
                activeId === outroId
                  ? "font-semibold text-brand-700"
                  : "text-ink-600 hover:text-brand-700",
              )}
            >
              {outroLabel}
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
