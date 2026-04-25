import { useTranslations } from "next-intl";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";

type Step = { number: string; title: string; body: string };

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <Section id="como-funciona" tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%)]"
      />
      <Container className="space-y-14">
        <SectionHeader
          align="center"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-brand-800/80 bg-brand-800/60 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="bg-brand-900 p-6 sm:p-8"
            >
              <span className="font-mono text-sm font-semibold tracking-wider text-brand-300">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
