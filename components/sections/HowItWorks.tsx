import { useTranslations } from "next-intl";
import {
  Container,
  Reveal,
  Section,
  SectionHeader,
  StaggerGroup,
  StaggerItem,
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
        <Reveal>
          <SectionHeader
            align="center"
            tone="dark"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <StaggerGroup
          as="ol"
          className="grid gap-px overflow-hidden rounded-3xl border border-brand-800/80 bg-brand-800/60 sm:grid-cols-2 lg:grid-cols-4"
          childStagger={0.1}
        >
          {steps.map((step, idx) => (
            <StaggerItem
              key={step.number}
              as="li"
              delay={idx * 0.1}
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
