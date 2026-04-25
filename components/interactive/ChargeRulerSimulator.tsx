"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";

/**
 * Stub estático da Fase 6. A versão interativa completa
 * (entrada de valor, troca de cenário, animação de timeline)
 * é entregue na Fase 7.
 */
export function ChargeRulerSimulator() {
  const t = useTranslations("uauMoment");
  const steps = t.raw("timeline") as { step: number; title: string; body: string }[];

  return (
    <Section id="simulador" tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(16,185,129,0.16),transparent_70%)]"
      />
      <Container className="space-y-12">
        <SectionHeader
          align="center"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Card variant="dark" className="border-brand-800/80">
          <CardBody>
            <ol className="grid gap-3 md:grid-cols-5">
              {steps.map((step) => (
                <li key={step.step} className="rounded-2xl bg-brand-900/60 p-4">
                  <span className="font-mono text-xs font-semibold text-brand-300">
                    Passo {step.step}
                  </span>
                  <p className="mt-2 font-medium text-white">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-100/70">
                    {step.body.replace("{amount}", "R$ 200,00")}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-center text-sm text-brand-100/60">
              Versão interativa entregue na Fase 7.
            </p>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
