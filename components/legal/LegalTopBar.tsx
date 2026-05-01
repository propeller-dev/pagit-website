import Link from "next/link";
import { Container } from "@/components/ui";

export function LegalTopBar({ lastUpdated }: { lastUpdated: string | null }) {
  return (
    <div className="border-b border-line-200 bg-surface">
      <Container className="flex h-12 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
        >
          ← Voltar para início
        </Link>
        {lastUpdated ? (
          <p className="text-xs text-ink-500 sm:text-sm">
            Última atualização: <span className="text-ink-700">{lastUpdated}</span>
          </p>
        ) : null}
      </Container>
    </div>
  );
}
