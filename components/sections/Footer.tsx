import { useTranslations } from "next-intl";
import { Container, Logo } from "@/components/ui";

type FooterSection = { title: string; links: { label: string; href: string }[] };

export function Footer() {
  const t = useTranslations("footer");
  const sections = t.raw("sections") as FooterSection[];
  const year = new Date().getFullYear();
  const copy = t("copy", { year });

  return (
    <footer className="border-t border-line-200 bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-ink-600">{t("tagline")}</p>
          </div>
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => {
                  const isExternal =
                    link.href.startsWith("http") ||
                    link.href.startsWith("mailto:");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-ink-700 transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-600">{copy}</p>
          <p className="text-xs text-ink-600">{t("localeHint")}</p>
        </div>
      </Container>
    </footer>
  );
}
