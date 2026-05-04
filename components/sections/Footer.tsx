import { useTranslations } from "next-intl";
import { Container, Logo } from "@/components/ui";
import { IconWhatsApp, IconMail, IconInstagram } from "@/components/icons";

type FooterLink = {
  label: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: string;
};
type FooterSection = { title: string; links: FooterLink[] };

const iconMap = {
  whatsapp: IconWhatsApp,
  mail: IconMail,
  instagram: IconInstagram,
} as const;

function LinkInner({ link }: { link: FooterLink }) {
  const Icon = link.icon ? iconMap[link.icon as keyof typeof iconMap] : null;
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      {Icon ? <Icon size={18} tone="ink" /> : null}
      <span>{link.label}</span>
    </span>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const sections = t.raw("sections") as FooterSection[];
  const year = new Date().getFullYear();
  const copy = t("copy", { year });

  return (
    <footer className="border-t border-line-200 bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
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
                  if (link.disabled) {
                    const tooltipId = `footer-tip-${section.title}-${link.label}`
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-");
                    return (
                      <li key={link.label}>
                        <span className="group relative inline-block">
                          <button
                            type="button"
                            aria-disabled="true"
                            aria-label={`${link.label} — ${link.tooltip ?? ""}`}
                            aria-describedby={tooltipId}
                            className="cursor-not-allowed text-sm text-ink-700 opacity-60"
                          >
                            <LinkInner link={link} />
                          </button>
                          <span
                            id={tooltipId}
                            role="tooltip"
                            className="pointer-events-none absolute -top-8 left-0 z-10 rounded-md bg-ink-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 motion-safe:transition-opacity motion-safe:duration-150"
                          >
                            {link.tooltip}
                          </span>
                        </span>
                      </li>
                    );
                  }
                  const isHttp = link.href?.startsWith("http") ?? false;
                  const isMailto = link.href?.startsWith("mailto:") ?? false;
                  const isExternal = isHttp || isMailto;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        aria-label={link.label}
                        target={isHttp ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-ink-700 transition-colors hover:text-brand-700"
                      >
                        <LinkInner link={link} />
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
