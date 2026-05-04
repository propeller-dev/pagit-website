import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Badge, Container } from "@/components/ui";
import { IconShield, IconDocument } from "@/components/icons";
import type { LegalContent } from "@/lib/legal-content";
import { LegalSidebar, type SidebarItem } from "./LegalSidebar";
import { LegalTopBar } from "./LegalTopBar";

type Variant = "privacidade" | "termos";

const VARIANT_META: Record<Variant, { badge: string; Icon: typeof IconShield }> = {
  privacidade: { badge: "Política de Privacidade", Icon: IconShield },
  termos: { badge: "Termos de Uso e Serviços", Icon: IconDocument },
};

export function LegalPage({
  content,
  variant,
}: {
  content: LegalContent;
  variant: Variant;
}) {
  const meta = VARIANT_META[variant];
  const sidebarItems: SidebarItem[] = content.sections.map((s) => ({
    id: s.id,
    label: s.number ? `${s.number}. ${s.title}` : s.title,
  }));
  const outroId = content.outro ? "contato-dpo" : undefined;
  const outroLabel = content.outro ? "Contato do Encarregado de Dados (DPO)" : undefined;

  return (
    <>
      <a href="#legal-conteudo" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <LegalTopBar lastUpdated={content.lastUpdated} />

      <main id="legal-conteudo" className="bg-surface-50 pb-24">
        <Container className="pt-12 sm:pt-16">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
            <div className="hidden lg:block" aria-hidden />
            <header className="max-w-[42.5rem]">
              <span data-legal-decor>
                <Badge variant="brand" className="text-sm">
                  <meta.Icon size={16} tone="brand" />
                  {meta.badge}
                </Badge>
              </span>
              <h1 className="mt-5 font-display text-3xl leading-[1.1] font-bold tracking-[-0.025em] text-ink-900 sm:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              {content.intro ? (
                <div className="prose-legal mt-6 text-base leading-relaxed text-ink-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {content.intro}
                  </ReactMarkdown>
                </div>
              ) : null}
            </header>
          </div>

          <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <LegalSidebar
                items={sidebarItems}
                outroId={outroId}
                outroLabel={outroLabel}
              />
            </aside>

            <div className="mt-8 space-y-6 lg:mt-0">
              {content.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-20 rounded-2xl border border-line-200 bg-surface p-6 sm:p-8"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <meta.Icon size={18} tone="brand" />
                    </span>
                    <h2 className="font-display text-xl leading-tight font-bold tracking-[-0.01em] text-ink-900 sm:text-2xl">
                      {section.number ? `${section.number}. ` : ""}
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose-legal mt-5 text-ink-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {section.body}
                    </ReactMarkdown>
                  </div>
                </article>
              ))}

              {content.outro ? (
                <article
                  id="contato-dpo"
                  className="scroll-mt-20 rounded-2xl border border-line-200 bg-brand-50/40 p-6 sm:p-8"
                >
                  <div className="prose-legal text-ink-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {content.outro}
                    </ReactMarkdown>
                  </div>
                </article>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
