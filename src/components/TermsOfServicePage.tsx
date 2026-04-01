import {
  AlertTriangle,
  BookOpen,
  CalendarClock,
  Copyright,
  FileText,
  Mail,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
  Wallet,
} from 'lucide-react';
import type { ComponentType } from 'react';

import { termsOfServiceContent } from '../content/terms-of-service-content';
import type { TermsIconKey } from '../types/terms-of-service';
import SiteFooter from './SiteFooter';

const iconMap: Record<TermsIconKey, ComponentType<{ className?: string }>> = {
  'file-text': FileText,
  'book-open': BookOpen,
  'user-check': UserCheck,
  'shield-check': ShieldCheck,
  wallet: Wallet,
  copyright: Copyright,
  'alert-triangle': AlertTriangle,
  'calendar-clock': CalendarClock,
  'refresh-ccw': RefreshCcw,
  mail: Mail,
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
            ← Voltar para início
          </a>
          <span className="text-xs sm:text-sm text-slate-500">
            Última atualização: {termsOfServiceContent.lastUpdated}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold mb-5">
            <FileText className="w-4 h-4" />
            Termos de Serviço
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {termsOfServiceContent.title}
          </h1>

          <div className="mt-5 space-y-3 max-w-3xl">
            {termsOfServiceContent.intro.map((paragraph, index) => (
              <p key={`intro-${index}`} className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-10">
          <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-fit">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Navegação</h2>
            <nav className="space-y-2">
              {termsOfServiceContent.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-3 py-2 transition-colors"
                >
                  {section.title}
                </a>
              ))}
              <a
                href="#contato-contratual"
                className="block text-sm text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-3 py-2 transition-colors"
              >
                10. Contato contratual
              </a>
            </nav>
          </aside>

          <div className="space-y-6">
            {termsOfServiceContent.sections.map((section) => {
              const Icon = iconMap[section.icon];

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{section.title}</h3>
                  </div>

                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-5 space-y-2 text-slate-600 list-disc pl-5">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li key={`${section.id}-bullet-${bulletIndex}`}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.orderedBullets ? (
                    <ol className="mt-5 space-y-2 text-slate-600 list-decimal pl-5">
                      {section.orderedBullets.map((bullet, bulletIndex) => (
                        <li key={`${section.id}-ordered-${bulletIndex}`}>{bullet}</li>
                      ))}
                    </ol>
                  ) : null}
                </section>
              );
            })}

            <section
              id="contato-contratual"
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">10. Contato contratual</h3>
              </div>

              <p className="text-slate-600 leading-relaxed">
                <span className="font-semibold">{termsOfServiceContent.contact.label}:</span>{' '}
                para dúvidas sobre este contrato, envie mensagem para{' '}
                <a
                  href={`mailto:${termsOfServiceContent.contact.email}`}
                  className="font-semibold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 underline-offset-2"
                >
                  {termsOfServiceContent.contact.email}
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
