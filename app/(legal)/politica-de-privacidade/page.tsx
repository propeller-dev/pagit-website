import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { loadLegalContent } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Política de Privacidade — Pagit",
  description:
    "Como a Pagit coleta, usa, armazena e protege seus dados pessoais em conformidade com a LGPD.",
  robots: { index: true, follow: true },
};

export default async function PoliticaDePrivacidadePage() {
  const content = await loadLegalContent("politica-de-privacidade");
  return <LegalPage content={content} variant="privacidade" />;
}
