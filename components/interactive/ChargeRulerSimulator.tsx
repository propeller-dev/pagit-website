"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";
import { IconCheck, IconMessageCircle, IconReceipt } from "@/components/icons";
import { cn } from "@/lib/utils";

type Scenario = {
  id: "recurrent" | "installments" | "oneTime";
  label: string;
  defaultValue: number;
  description: string;
};

type Step = { step: number; title: string; body: string };

const STEP_INTERVAL_MS = 1100;

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function buildInstallments(total: number, count: number) {
  const each = Math.round((total / count) * 100) / 100;
  const remainder = Math.round((total - each * count) * 100) / 100;
  return Array.from({ length: count }, (_, i) => ({
    n: i + 1,
    value: i === count - 1 ? each + remainder : each,
  }));
}

export function ChargeRulerSimulator() {
  const t = useTranslations("uauMoment");
  const scenarios = t.raw("scenarios") as Scenario[];
  const steps = t.raw("timeline") as Step[];
  const customerLabel = t("customerLabel");
  const customerDefault = t("customerDefault");
  const inputLabel = t("inputLabel");
  const replayLabel = t("replayLabel");
  const reducedMotionHint = t("reducedMotionHint");

  const [scenarioId, setScenarioId] = useState<Scenario["id"]>(scenarios[0]!.id);
  const [value, setValue] = useState<number>(scenarios[0]!.defaultValue);
  const [customer, setCustomer] = useState(customerDefault);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const activeScenario = useMemo(
    () => scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]!,
    [scenarios, scenarioId],
  );

  const installments = useMemo(
    () => (scenarioId === "installments" ? buildInstallments(value, 3) : null),
    [scenarioId, value],
  );

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const playTimeline = useCallback(() => {
    clearTimers();
    setCurrentStep(0);
    if (prefersReducedMotion) {
      setCurrentStep(steps.length);
      return;
    }
    steps.forEach((_, idx) => {
      const id = setTimeout(() => {
        setCurrentStep(idx + 1);
      }, STEP_INTERVAL_MS * (idx + 1));
      timeoutsRef.current.push(id);
    });
  }, [clearTimers, prefersReducedMotion, steps]);

  // Reset and play when scenario or value changes after first start
  useEffect(() => {
    if (!hasStarted) return;
    playTimeline();
    return clearTimers;
  }, [scenarioId, value, hasStarted, playTimeline, clearTimers]);

  // Auto-start on viewport intersection
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setHasStarted(true);
          playTimeline();
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [hasStarted, playTimeline]);

  // Reset value when scenario changes to its default
  const handleScenarioChange = (id: Scenario["id"]) => {
    const next = scenarios.find((s) => s.id === id);
    if (!next) return;
    setScenarioId(id);
    setValue(next.defaultValue);
  };

  const renderStepBody = (step: Step) => {
    const amount =
      scenarioId === "installments" && installments
        ? `${installments.length}× ${formatBRL(installments[0]!.value)}`
        : formatBRL(value);
    return step.body.replace("{amount}", amount);
  };

  return (
    <Section id="simulador" tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <Container className="space-y-12">
        <SectionHeader
          align="center"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div
          ref={containerRef}
          className="grid gap-6 rounded-3xl border border-brand-800/60 bg-brand-900/60 p-5 backdrop-blur-sm sm:p-8 lg:grid-cols-[1.1fr_1.3fr]"
        >
          {/* Controles */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">
                Cenário
              </p>
              <div
                role="radiogroup"
                aria-label="Selecionar cenário"
                className="mt-3 grid grid-cols-1 gap-2"
              >
                {scenarios.map((s) => {
                  const active = s.id === scenarioId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => handleScenarioChange(s.id)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left transition-colors",
                        active
                          ? "border-brand-400 bg-brand-700/40 ring-1 ring-brand-400"
                          : "border-brand-800 bg-brand-900/50 hover:border-brand-600",
                      )}
                    >
                      <p className="font-medium text-white">{s.label}</p>
                      <p className="text-xs text-brand-50">
                        {s.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="sim-value"
                  className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase"
                >
                  {inputLabel}
                </label>
                <div className="mt-2 flex items-center rounded-xl border border-brand-800 bg-brand-950/60 px-3 focus-within:border-brand-400 focus-within:ring-1 focus-within:ring-brand-400">
                  <span className="font-mono text-sm text-brand-300">R$</span>
                  <input
                    id="sim-value"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={value}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      setValue(Number.isFinite(next) && next > 0 ? next : 0);
                    }}
                    className="ml-2 w-full bg-transparent py-2 font-mono text-base text-white tabular-nums outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="sim-customer"
                  className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase"
                >
                  {customerLabel}
                </label>
                <input
                  id="sim-customer"
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-brand-800 bg-brand-950/60 px-3 py-2 text-base text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={playTimeline}
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-brand-950 transition-colors hover:bg-brand-400"
            >
              ▶ {replayLabel}
            </button>

            {prefersReducedMotion ? (
              <p className="text-xs text-brand-100/60">{reducedMotionHint}</p>
            ) : null}
          </div>

          {/* Timeline + Phone preview */}
          <div className="grid gap-5">
            <div className="relative rounded-2xl border border-brand-800 bg-brand-950/40 p-5">
              <p className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">
                Linha do tempo
              </p>
              <ol className="mt-4 space-y-3">
                {steps.map((step, idx) => {
                  const visible = currentStep > idx;
                  return (
                    <motion.li
                      key={step.step}
                      initial={false}
                      animate={{
                        opacity: visible ? 1 : 0.6,
                        x: visible ? 0 : -6,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                          visible
                            ? "border-brand-400 bg-brand-500 text-brand-950"
                            : "border-brand-700 text-brand-300",
                        )}
                      >
                        {visible ? <IconCheck size={12} tone="current" /> : step.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-brand-50">
                          {renderStepBody(step).replace("Maria", customer.split(" ")[0] || "Maria")}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

            {/* Mock phone preview */}
            <div className="rounded-2xl border border-brand-800 bg-brand-950/40 p-5">
              <p className="text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">
                Conversa do {customer.split(" ")[0] || "cliente"}
              </p>
              <div className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                  {currentStep >= 2 ? (
                    <motion.div
                      key="msg-1"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                        <IconMessageCircle size={14} tone="current" />
                      </span>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-brand-800/80 px-3 py-2 text-sm text-white">
                        {scenarioId === "installments" && installments
                          ? `Oi ${customer.split(" ")[0] || "cliente"}! Cobrança parcelada disponível: ${installments.length}× de ${formatBRL(installments[0]!.value)} no Pix.`
                          : `Oi ${customer.split(" ")[0] || "cliente"}! Sua cobrança de ${formatBRL(value)} está disponível. Pagamento em Pix — é só escanear o código.`}
                        <p className="mt-1 text-[10px] text-brand-100/60">
                          ✓✓ enviada
                        </p>
                      </div>
                    </motion.div>
                  ) : null}

                  {currentStep >= 3 ? (
                    <motion.div
                      key="msg-2"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                        <IconMessageCircle size={14} tone="current" />
                      </span>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-brand-800/80 px-3 py-2 text-sm text-white">
                        Lembrete amigável: vence amanhã. Posso te ajudar com algo?
                      </div>
                    </motion.div>
                  ) : null}

                  {currentStep >= 4 ? (
                    <motion.div
                      key="msg-3"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-500 px-3 py-2 text-sm text-brand-950">
                        Pago agora 💚
                      </div>
                    </motion.div>
                  ) : null}

                  {currentStep >= 5 ? (
                    <motion.div
                      key="msg-4"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 flex items-center gap-2 rounded-xl border border-brand-500/40 bg-brand-500/10 px-3 py-2 text-sm text-brand-100"
                    >
                      <IconReceipt size={16} tone="current" />
                      Recibo conciliado · {formatBRL(value)} entrou na sua conta
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
