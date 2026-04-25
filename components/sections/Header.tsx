"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, Container, Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function Header() {
  const t = useTranslations("nav");
  const items = t.raw("items") as NavItem[];
  const ctaPrimary = {
    label: t("ctaPrimary.label"),
    href: t("ctaPrimary.href"),
  };
  const ctaSecondary = {
    label: t("ctaSecondary.label"),
    href: t("ctaSecondary.href"),
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-line-200/80 bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Pagit"
          className="flex items-center gap-2"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" href={ctaSecondary.href}>
            {ctaSecondary.label}
          </Button>
          <Button size="sm" href={ctaPrimary.href}>
            {ctaPrimary.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? t("menuToggleClose") : t("menuToggleOpen")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-200 bg-surface text-ink-900 md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M4 4l10 10" />
                <path d="M14 4l-10 10" />
              </>
            ) : (
              <>
                <path d="M3 5h12" />
                <path d="M3 9h12" />
                <path d="M3 13h12" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="md:hidden">
          <Container className="space-y-4 pt-2 pb-6">
            <nav aria-label="Menu mobile" className="flex flex-col gap-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-surface-50"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="secondary" href={ctaSecondary.href}>
                {ctaSecondary.label}
              </Button>
              <Button href={ctaPrimary.href}>{ctaPrimary.label}</Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
