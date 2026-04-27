import { Card } from "@/components/ui";
import { IconCheck, IconMessageCircle } from "@/components/icons";

export function HeroVisual({ amountLabel }: { amountLabel?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Painel principal */}
      <Card variant="dark" className="relative shadow-[0_30px_60px_-20px_rgba(2,44,34,0.4)]">
        <div className="border-b border-brand-800/70 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">
              Painel · cobranças
            </p>
            <span className="flex h-2 w-2 rounded-full bg-brand-400" />
          </div>
        </div>

        <div className="space-y-3 px-6 py-5">
          {[
            { name: "Maria Souza", value: "R$ 200,00", status: "Pago", tone: "ok" as const },
            { name: "João Lima", value: "R$ 500,00", status: "Vence em 1d", tone: "warn" as const },
            { name: "Estúdio Vértice", value: "R$ 1.500,00", status: "Recorrente", tone: "info" as const },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-xl bg-brand-900/50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{row.name}</p>
                <p className="font-mono text-xs text-brand-100/70 tabular-nums">
                  {row.value}
                </p>
              </div>
              <span
                className={
                  row.tone === "ok"
                    ? "inline-flex items-center gap-1 rounded-full bg-brand-500/25 px-2.5 py-0.5 text-xs font-semibold text-brand-100"
                    : row.tone === "warn"
                      ? "inline-flex items-center gap-1 rounded-full bg-amber-light px-2.5 py-0.5 text-xs font-semibold text-[#5C3A03]"
                      : "inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-brand-100"
                }
              >
                {row.tone === "ok" ? <IconCheck size={12} tone="current" /> : null}
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Bubble de WhatsApp flutuante */}
      <div className="absolute -bottom-6 -left-4 hidden w-64 rotate-[-3deg] sm:block lg:-left-12">
        <Card variant="light" className="rounded-2xl shadow-lg">
          <div className="flex items-start gap-3 p-4">
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <IconMessageCircle size={16} tone="brand" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink-500">WhatsApp · Pagit</p>
              <p className="mt-1 text-sm leading-snug text-ink-800">
                Oi Maria! Sua mensalidade venceu hoje. Tá aqui o Pix 💚
              </p>
            </div>
          </div>
        </Card>
      </div>

      <span className="sr-only">{amountLabel}</span>
    </div>
  );
}
