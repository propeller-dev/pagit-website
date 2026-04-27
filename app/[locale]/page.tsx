import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import {
  Audience,
  CtaFinal,
  Faq,
  Features,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Integrations,
  Pricing,
  Problem,
  StructuredData,
} from "@/components/sections";

const ChargeRulerSimulator = dynamic(
  () =>
    import("@/components/interactive/ChargeRulerSimulator").then((m) => ({
      default: m.ChargeRulerSimulator,
    })),
  { loading: () => <div className="h-[600px]" aria-hidden /> },
);

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <a href="#conteudo" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Integrations />
        <Problem />
        <Audience />
        <HowItWorks />
        <Features />
        <ChargeRulerSimulator />
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
