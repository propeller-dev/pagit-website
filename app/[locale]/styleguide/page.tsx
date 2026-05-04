import {
  Badge,
  Button,
  Card,
  CardBody,
  CardBodyText,
  CardKicker,
  CardTitle,
  Container,
  Eyebrow,
  FieldLabel,
  Input,
  Logo,
  Section,
  SectionHeader,
  Textarea,
} from "@/components/ui";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconCreditCard,
  IconKey,
  IconMessageCircle,
  IconReceipt,
  IconRepeat,
  IconSparkles,
  IconSplit,
  IconStethoscope,
  IconUserFocus,
} from "@/components/icons";

export const dynamic = "force-static";

export const metadata = {
  title: "Styleguide — Pagit (interno)",
  robots: { index: false, follow: false },
};

const swatches: { name: string; classBg: string; hex: string; on: "ink" | "white" }[] = [
  { name: "brand/600", classBg: "bg-brand-600", hex: "#059669", on: "white" },
  { name: "brand/700", classBg: "bg-brand-700", hex: "#047857", on: "white" },
  { name: "brand/500", classBg: "bg-brand-500", hex: "#10B981", on: "white" },
  { name: "brand/100", classBg: "bg-brand-100", hex: "#D1FAE5", on: "ink" },
  { name: "brand/950", classBg: "bg-brand-950", hex: "#022C22", on: "white" },
  { name: "ink/900", classBg: "bg-ink-900", hex: "#0B1220", on: "white" },
  { name: "ink/600", classBg: "bg-ink-600", hex: "#475569", on: "white" },
  { name: "surface/50", classBg: "bg-surface-50", hex: "#F8FAFC", on: "ink" },
  { name: "amber", classBg: "bg-amber", hex: "#F59E0B", on: "ink" },
  { name: "danger", classBg: "bg-danger", hex: "#DC2626", on: "white" },
];

export default function Styleguide() {
  return (
    <main className="bg-surface text-ink-900">
      <Section spacing="compact" tone="default">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Styleguide"
            title="Design system da Pagit"
            subtitle="Página interna usada para validar tokens e componentes. Não indexável."
          />
        </Container>
      </Section>

      {/* Logo */}
      <Section spacing="compact" tone="muted">
        <Container className="space-y-6">
          <Eyebrow>Logo</Eyebrow>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line-200 bg-surface p-8">
              <p className="mb-4 text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">Marca completa</p>
              <Logo />
            </div>
            <div className="rounded-2xl border border-line-200 bg-brand-950 p-8">
              <p className="mb-4 text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">Sobre escuro</p>
              <Logo tone="white" />
            </div>
            <div className="rounded-2xl border border-line-200 bg-surface p-8">
              <p className="mb-4 text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">Ícone</p>
              <Logo variant="icon" />
            </div>
            <div className="rounded-2xl border border-line-200 bg-brand-950 p-8">
              <p className="mb-4 text-xs font-semibold tracking-[0.08em] text-brand-300 uppercase">Ícone sobre escuro</p>
              <Logo variant="icon" tone="white" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Cores */}
      <Section spacing="compact">
        <Container className="space-y-6">
          <Eyebrow>Cores</Eyebrow>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map((s) => (
              <div
                key={s.name}
                className={`${s.classBg} flex h-28 flex-col justify-end rounded-xl border border-line-200/60 p-4`}
              >
                <p className={`text-xs font-semibold ${s.on === "white" ? "text-white" : "text-ink-900"}`}>{s.name}</p>
                <p className={`font-mono text-[11px] ${s.on === "white" ? "text-white/70" : "text-ink-700"}`}>{s.hex}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tipografia */}
      <Section spacing="compact" tone="muted">
        <Container className="space-y-8">
          <Eyebrow>Tipografia</Eyebrow>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-ink-500">Display 6xl · Unbounded 800</p>
              <p className="font-display text-6xl leading-[1.02] font-extrabold tracking-[-0.035em]">Pagit assume pra você.</p>
            </div>
            <div>
              <p className="text-xs text-ink-500">Display 4xl · Unbounded 700</p>
              <p className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em]">Receber em dia virou a parte chata?</p>
            </div>
            <div>
              <p className="text-xs text-ink-500">Body lg · Inter 400</p>
              <p className="text-lg text-ink-600">Cobrança recorrente, parcelamento em Pix, régua automática no WhatsApp. Você só confere o dinheiro entrar.</p>
            </div>
            <div>
              <p className="text-xs text-ink-500">Body base · Inter 400</p>
              <p className="text-base text-ink-700">Texto padrão usado em parágrafos, FAQ e descrições de cards.</p>
            </div>
            <div>
              <p className="text-xs text-ink-500">Mono · system · tabular-nums</p>
              <p className="font-mono text-2xl tabular-nums">R$ 1.500,00</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Botões */}
      <Section spacing="compact">
        <Container className="space-y-6">
          <Eyebrow>Botões</Eyebrow>
          <div className="flex flex-wrap gap-3">
            <Button>Começar grátis <IconArrowRight size={18} tone="white" /></Button>
            <Button variant="secondary">Falar no WhatsApp</Button>
            <Button variant="ghost">Saiba mais</Button>
            <Button variant="link">Saiba mais →</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Ação compacta</Button>
            <Button size="md">Ação média</Button>
            <Button size="lg">Ação grande</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-brand-950 p-6">
            <Button variant="inverse">CTA inverse (sobre escuro)</Button>
            <Button variant="ghost" className="text-brand-100 hover:bg-white/10 hover:text-white">Ghost dark</Button>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section spacing="compact" tone="muted">
        <Container className="space-y-6">
          <Eyebrow>Cards</Eyebrow>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="light">
              <CardBody>
                <CardKicker>Light</CardKicker>
                <CardTitle className="mt-2">Card padrão</CardTitle>
                <CardBodyText className="mt-2">Fundo branco, borda sutil, sombra-sm.</CardBodyText>
              </CardBody>
            </Card>
            <Card variant="wash">
              <CardBody>
                <CardKicker>Wash</CardKicker>
                <CardTitle className="mt-2">Card emerald</CardTitle>
                <CardBodyText className="mt-2">Fundo brand/50, sem borda forte.</CardBodyText>
              </CardBody>
            </Card>
            <Card variant="dark">
              <CardBody>
                <CardKicker tone="inverse">Dark</CardKicker>
                <CardTitle tone="dark" className="mt-2">Card escuro</CardTitle>
                <CardBodyText tone="dark" className="mt-2">Fundo brand/900, texto branco.</CardBodyText>
              </CardBody>
            </Card>
            <Card variant="outline">
              <CardBody>
                <CardKicker tone="muted">Outline</CardKicker>
                <CardTitle className="mt-2">Card outline</CardTitle>
                <CardBodyText className="mt-2">Sem fundo, só borda.</CardBodyText>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section spacing="compact">
        <Container className="space-y-6">
          <Eyebrow>Badges</Eyebrow>
          <div className="flex flex-wrap gap-3">
            <Badge variant="brand">Pix</Badge>
            <Badge variant="brand"><IconCheck size={12} tone="brand" /> Ativo</Badge>
            <Badge variant="amber">2 meses grátis</Badge>
            <Badge variant="neutral">Em breve</Badge>
            <Badge variant="danger">Em atraso</Badge>
            <Badge variant="outline">Para devs</Badge>
            <Badge variant="inverse">Sobre escuro</Badge>
          </div>
        </Container>
      </Section>

      {/* Inputs */}
      <Section spacing="compact" tone="muted">
        <Container className="space-y-6">
          <Eyebrow>Inputs</Eyebrow>
          <div className="grid max-w-xl gap-4">
            <div>
              <FieldLabel htmlFor="sg-name" required>Nome</FieldLabel>
              <Input id="sg-name" placeholder="Como você quer ser chamado" />
            </div>
            <div>
              <FieldLabel htmlFor="sg-email">E-mail</FieldLabel>
              <Input id="sg-email" type="email" placeholder="voce@exemplo.com" />
            </div>
            <div>
              <FieldLabel htmlFor="sg-message">Mensagem</FieldLabel>
              <Textarea id="sg-message" placeholder="O que quer contar?" rows={4} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Ícones */}
      <Section spacing="compact">
        <Container className="space-y-6">
          <Eyebrow>Ícones (duotone)</Eyebrow>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {[
              { Icon: IconRepeat, label: "repeat" },
              { Icon: IconSplit, label: "split" },
              { Icon: IconCreditCard, label: "credit-card" },
              { Icon: IconMessageCircle, label: "message-circle" },
              { Icon: IconReceipt, label: "receipt" },
              { Icon: IconSparkles, label: "sparkles" },
              { Icon: IconKey, label: "key" },
              { Icon: IconUserFocus, label: "user-focus" },
              { Icon: IconStethoscope, label: "stethoscope" },
              { Icon: IconChevronDown, label: "chevron-down" },
              { Icon: IconArrowRight, label: "arrow-right" },
              { Icon: IconCheck, label: "check" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-line-200 bg-surface p-4"
              >
                <Icon size={32} />
                <span className="font-mono text-xs text-ink-500">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
