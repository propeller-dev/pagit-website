import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui";

type Logo = { name: string; alt: string; href: string };

export function Integrations() {
  const t = useTranslations("integrations");
  const logos = t.raw("logos") as Logo[];

  return (
    <Section spacing="compact" tone="muted">
      <Container className="space-y-6 text-center">
        <p className="text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">
          {t("label")}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo) => (
            <li key={logo.name}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg font-semibold text-ink-700 transition-colors hover:text-ink-900"
                aria-label={logo.alt}
              >
                {logo.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-2xl text-xs text-ink-500">
          {t("disclaimer")}
        </p>
      </Container>
    </Section>
  );
}
