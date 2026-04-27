import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://pagit.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "" : `/${locale}`;
    return {
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${BASE}${l === routing.defaultLocale ? "" : `/${l}`}`,
          ]),
        ),
      },
    };
  });
}
