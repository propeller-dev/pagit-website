import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { loadLegalContent } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Termos de Uso e Serviços — Pagit",
  description:
    "Termos que regem a relação entre a Pagit e seus contratantes (PJ/profissionais liberais).",
  robots: { index: true, follow: true },
};

export default async function TermosDeServicoPage() {
  const content = await loadLegalContent("termos-de-servico");
  return <LegalPage content={content} variant="termos" />;
}
