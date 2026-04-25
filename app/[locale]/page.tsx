import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("hero");

  return (
    <main className="min-h-screen">
      <a href="#main" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <section
        id="main"
        className="mx-auto max-w-[var(--container-default)] px-6 pt-24 pb-16"
      >
        <p className="mb-4 text-sm font-medium tracking-wide text-brand-700 uppercase">
          {tHero("eyebrow")}
        </p>
        <h1 className="font-display text-4xl leading-tight font-semibold text-ink-900 md:text-5xl lg:text-6xl">
          <span className="block">{tHero("title.lead")}</span>
          <span className="block text-brand-600">
            {tHero("title.emphasis")}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-600">
          {tHero("subtitle")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={tHero("ctaPrimary.href")}
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-medium text-white shadow-sm transition hover:bg-brand-700"
          >
            {tHero("ctaPrimary.label")}
          </a>
          <a
            href={tHero("ctaSecondary.href")}
            className="inline-flex items-center justify-center rounded-xl border border-line-200 bg-surface px-6 py-3.5 text-base font-medium text-ink-900 transition hover:bg-surface-50"
          >
            {tHero("ctaSecondary.label")}
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-500">{tHero("reassurance")}</p>

        <div className="mt-16 rounded-2xl border border-line-200 bg-surface-50 p-8 text-center text-ink-500">
          <p className="text-sm">
            Scaffold validado · Seções completas entregues na Fase 6
          </p>
        </div>
      </section>
    </main>
  );
}
