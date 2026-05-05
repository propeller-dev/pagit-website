import { useTranslations } from "next-intl";
import {
  Container,
  Reveal,
  Section,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui";

type Logo = {
  name: string;
  alt: string;
  href: string;
  logo: string;
};

export function Integrations() {
  const t = useTranslations("integrations");
  const logos = t.raw("logos") as Logo[];
  const disclaimer = t("disclaimer");
  const tooltipLabel = t("tooltipLabel");

  return (
    <Section spacing="compact" tone="muted">
      <Container className="space-y-6 text-center">
        <Reveal className="relative z-40">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">
            <span>{t("label")}</span>
            <span className="group z-30 inline-flex">
              <button
                type="button"
                aria-label={tooltipLabel}
                aria-describedby="integrations-disclaimer"
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink-300 bg-surface text-[10px] font-bold text-ink-500 transition-colors hover:border-brand-500 hover:text-brand-700 focus-visible:border-brand-500 focus-visible:text-brand-700"
              >
                ?
              </button>
              <span
                id="integrations-disclaimer"
                role="tooltip"
                className="pointer-events-none invisible absolute top-full left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-lg bg-ink-900 px-3 py-2 text-xs leading-relaxed font-normal tracking-normal text-white normal-case opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                {disclaimer}
              </span>
            </span>
          </p>
        </Reveal>
        <StaggerGroup
          as="ul"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12"
        >
          {logos.map((logo, idx) => (
            <StaggerItem key={logo.name} as="li" delay={idx * 0.05}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                className="inline-flex items-center opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.logo}
                  alt={logo.alt}
                  className="h-6 w-auto"
                  draggable={false}
                />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
