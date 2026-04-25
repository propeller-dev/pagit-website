import { useTranslations } from "next-intl";
import { Button, Container, Eyebrow } from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-surface to-surface pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_40%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <Container size="wide" className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="max-w-2xl">
          <Eyebrow className="mb-5">{t("eyebrow")}</Eyebrow>
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-6xl">
            <span className="block">{t("title.lead")}</span>
            <span className="mt-1 block bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              {t("title.emphasis")}
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" href={t("ctaPrimary.href")}>
              {t("ctaPrimary.label")}
              <IconArrowRight size={18} tone="white" />
            </Button>
            <Button variant="secondary" size="lg" href={t("ctaSecondary.href")}>
              {t("ctaSecondary.label")}
            </Button>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-600">
            <IconCheck size={16} tone="brand" />
            {t("reassurance")}
          </p>
        </div>

        <HeroVisual amountLabel={t("subtitle")} />
      </Container>
    </section>
  );
}
