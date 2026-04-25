import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["pt-BR", "en", "es"] as const,
  defaultLocale: "pt-BR",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
