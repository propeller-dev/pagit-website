import { useTranslations } from "next-intl";
import {
  Button,
  Container,
  Eyebrow,
  Section,
} from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/icons";

export function CtaFinal() {
  const t = useTranslations("ctaFinal");

  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(16,185,129,0.25),transparent_70%)]"
      />
      <Container size="narrow" className="space-y-8 text-center">
        <Eyebrow tone="inverse">{t("eyebrow")}</Eyebrow>
        <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-xl text-lg text-brand-100/80">
          {t("subtitle")}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="inverse" size="lg" href={t("ctaPrimary.href")}>
            {t("ctaPrimary.label")}
            <IconArrowRight size={18} tone="brand" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href={t("ctaSecondary.href")}
            className="text-brand-100 hover:bg-white/10 hover:text-white"
          >
            {t("ctaSecondary.label")}
          </Button>
        </div>
        <p className="inline-flex items-center justify-center gap-2 text-sm text-brand-100/70">
          <IconCheck size={14} tone="current" />
          {t("reassurance")}
        </p>
      </Container>
    </Section>
  );
}
