/* @jsx React.createElement */
const { useState, useEffect } = React;
const {
  Button, Badge, Card, Eyebrow, SectionHeader, Logo,
  IconRepeat, IconSplit, IconCreditCard, IconMessage, IconReceipt, IconSparkles, IconKey, IconCode,
  IconArrowRight, IconCheck, IconChevron, IconWhatsApp, IconMail, IconInstagram,
  IconUserFocus, IconStethoscope, IconCap, IconBriefcase, IconPlay, IconWrench,
} = window.PagitWeb;

/* ---------- HEADER --------------------------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const items = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Para quem", href: "#para-quem" },
    { label: "Preços", href: "#precos" },
    { label: "Dúvidas?", href: "#faq" },
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, width: "100%",
      transition: "all 200ms",
      background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : undefined,
      WebkitBackdropFilter: scrolled ? "blur(12px)" : undefined,
      borderBottom: scrolled ? "1px solid rgba(226,232,240,0.8)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {items.map((it) => (
            <a key={it.label} href={it.href} className="navlink"
              style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none", position: "relative" }}>
              {it.label}
            </a>
          ))}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#94A3B8", display: "inline-flex", alignItems: "center", gap: 6 }}>
            Desenvolvedores <Badge variant="neutral">Em breve</Badge>
          </span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button size="sm">Começar grátis</Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ----------------------------------------------------- */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: 80, paddingBottom: 120, background: "linear-gradient(to bottom, rgba(236,253,245,0.6), #fff, #fff)" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "0 0 auto 0", top: 0, height: 640, zIndex: -1,
        background: "radial-gradient(60% 40% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
        <div style={{ maxWidth: 640 }}>
          <Eyebrow>Cobrança automatizada para PMEs brasileiras</Eyebrow>
          <h1 style={{
            fontFamily: "Unbounded, sans-serif", fontSize: 64, lineHeight: 1.02, fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0B1220", margin: "20px 0 0",
          }}>
            <span style={{ display: "block" }}>Receber em dia virou a parte chata do seu negócio?</span>
            <span style={{
              marginTop: 4, display: "block",
              background: "linear-gradient(90deg, #047857, #10B981)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>A Pagit assume pra você.</span>
          </h1>
          <p style={{ marginTop: 24, fontSize: 20, lineHeight: 1.55, color: "#475569" }}>
            Cobrança recorrente, parcelamento em Pix, régua automática no WhatsApp. Você só confere o dinheiro entrar.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button size="lg">Começar grátis <IconArrowRight size={18} tone="white" /></Button>
            <Button variant="secondary" size="lg">Falar no WhatsApp</Button>
          </div>
          <p style={{ marginTop: 20, fontSize: 14, color: "#475569", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <IconCheck size={16} tone="brand" /> 2 meses grátis. Sem cartão, sem custo por transação da Pagit.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const rows = [
    { name: "Maria Souza", value: "R$ 200,00", status: "Pago", tone: "ok" },
    { name: "João Lima", value: "R$ 500,00", status: "Vence em 1d", tone: "warn" },
    { name: "Estúdio Vértice", value: "R$ 1.500,00", status: "Recorrente", tone: "info" },
  ];
  return (
    <div style={{ position: "relative" }}>
      <Card variant="dark" style={{ boxShadow: "0 30px 60px -20px rgba(2,44,34,0.4)" }}>
        <div style={{ borderBottom: "1px solid rgba(6,95,70,0.7)", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#6EE7B7", textTransform: "uppercase", margin: 0 }}>
            Painel · cobranças
          </p>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#34D399" }} />
        </div>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((r) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 12, background: "rgba(6,78,59,0.5)", padding: "12px 14px" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", margin: 0 }}>{r.name}</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(209,250,229,0.7)", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{r.value}</p>
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4, borderRadius: 9999, padding: "2px 10px",
                fontSize: 12, fontWeight: 600,
                ...(r.tone === "ok"
                  ? { background: "rgba(16,185,129,0.25)", color: "#D1FAE5" }
                  : r.tone === "warn"
                    ? { background: "#FEF3C7", color: "#5C3A03" }
                    : { background: "rgba(255,255,255,0.15)", color: "#D1FAE5" }),
              }}>
                {r.tone === "ok" && <IconCheck size={12} tone="current" />}
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ position: "absolute", bottom: -24, left: -16, width: 260, transform: "rotate(-3deg)" }}>
        <Card variant="light" style={{ boxShadow: "0 18px 48px -12px rgba(11,18,32,0.12)" }}>
          <div style={{ display: "flex", gap: 12, padding: 16, alignItems: "flex-start" }}>
            <span style={{ width: 32, height: 32, borderRadius: 9999, background: "#D1FAE5", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#047857" }}>
              <IconMessage size={16} tone="brand" />
            </span>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#64748B", margin: 0 }}>WhatsApp · Pagit</p>
              <p style={{ marginTop: 4, fontSize: 14, lineHeight: 1.4, color: "#1E293B" }}>
                Oi Maria! Sua mensalidade venceu hoje. Tá aqui o Pix 💚
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- INTEGRATIONS BAR ----------------------------------------- */
function Integrations() {
  const logos = ["stripe", "woovi", "whatsapp", "resend"];
  return (
    <section style={{ padding: "48px 24px", borderTop: "1px solid #F1F5F9", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Integra com as ferramentas que você conhece</p>
        <div style={{ marginTop: 24, display: "flex", gap: 56, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {logos.map((l) => (
            <img key={l} src={`../../assets/integrations/${l}.svg`} alt={l} style={{ height: 24, opacity: 0.85, filter: "grayscale(0.2)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES ------------------------------------------------- */
function Features() {
  const cards = [
    { icon: <IconRepeat size={24} tone="brand" />, title: "Cobrança recorrente no Pix", body: "Defina valor e ciclo. A Pagit gera o QR Code com a sua chave a cada período e dispara para o cliente automaticamente.", tag: "Pix" },
    { icon: <IconSplit size={24} tone="brand" />, title: "Parcelamento em Pix", body: "Divida uma cobrança em várias parcelas. A Pagit gera um QR Code por parcela e envia cada um no vencimento certo — sem juros, sem cartão.", tag: "Pix" },
    { icon: <IconCreditCard size={24} tone="brand" />, title: "Cartão e boleto integrados", body: "Seu cliente paga como preferir. Cartão via gateway integrado com taxa padrão de mercado; boleto disponível.", tag: "Multi-canal" },
    { icon: <IconMessage size={24} tone="brand" />, title: "Régua no WhatsApp e e-mail", body: "Seis eventos configuráveis — cobrança criada, 7 dias antes, 3 dias antes, 1 dia antes, vence hoje e em atraso.", tag: "WhatsApp" },
    { icon: <IconReceipt size={24} tone="brand" />, title: "Verificação de comprovante por IA", body: "Cliente mandou recibo? A IA lê, confere o valor e concilia sozinha. Casos limítrofes vão pra revisão manual.", tag: "IA" },
    { icon: <IconSparkles size={24} tone="brand" />, title: "Operador-assistente", body: "Operador no WhatsApp: você cria cobrança, reagenda vencimento e consulta status por mensagem.", tag: "IA" },
    { icon: <IconKey size={24} tone="brand" />, title: "Várias chaves Pix organizadas", body: "Receba em contas diferentes por plano, serviço, sócio ou unidade. Troque a chave padrão a qualquer momento.", tag: "Organização" },
    { icon: <IconCode size={24} tone="brand" />, title: "API e webhooks", body: "Conecte a Pagit ao seu sistema. Endpoints REST documentados, webhooks para eventos de cobrança e pagamento.", tag: "Para devs" },
  ];
  return (
    <section id="funcionalidades" style={{ padding: "120px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="Funcionalidades" title="Tudo que a cobrança pedia. Automatizado."
          subtitle="Sem custo por transação da Pagit. Cartão via gateway integrado com taxa padrão de mercado." />
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {cards.map((c) => (
            <Card key={c.title} variant="light" style={{ height: "100%", transition: "all 150ms" }}>
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "#ECFDF5", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {c.icon}
                </span>
                <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#0B1220", margin: 0 }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "#475569", margin: 0 }}>{c.body}</p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Badge variant="brand">{c.tag}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AUDIENCE ------------------------------------------------- */
function Audience() {
  const cards = [
    { icon: <IconUserFocus size={28} tone="ink" />, title: "Profissionais liberais", body: "Personal trainer, fisio, psicólogo, professor particular, terapeuta. Mensalidade no Pix, régua no WhatsApp, você no treino/atendimento." },
    { icon: <IconStethoscope size={28} tone="ink" />, title: "Clínicas e consultórios", body: "Pacotes, sessões avulsas, plano mensal. A Pagit organiza recebíveis por paciente sem misturar com o prontuário." },
    { icon: <IconCap size={28} tone="ink" />, title: "Academias, escolas e cursos", body: "Matrícula parcelada, mensalidade recorrente, cobrança por turma. Régua automatizada reduz a evasão por esquecimento." },
    { icon: <IconBriefcase size={28} tone="ink" />, title: "Contabilidades, agências e consultorias", body: "Carteira B2B com honorário mensal. Emite, cobra, concilia — sem depender de um financeiro dedicado." },
    { icon: <IconPlay size={28} tone="ink" />, title: "Infoprodutores e mentores", body: "Assinatura, turma fechada, mentoria contínua. Pix pra quem quer simples; cartão pra quem precisa parcelar." },
    { icon: <IconWrench size={28} tone="ink" />, title: "Gráficas, oficinas e manutenção", body: "Parcelamento não-ortodoxo (semanal, quinzenal, entrada + saldo). Múltiplos QR Codes Pix entregues por vencimento." },
  ];
  return (
    <section id="para-quem" style={{ padding: "120px 24px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="Para quem é" title="Feito pra quem vive de prestar serviço, não de cobrar."
          subtitle="Se você cobra todo mês, parcela em várias vezes ou tem uma carteira fixa de clientes, a Pagit encaixa." />
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cards.map((c) => (
            <Card key={c.title} variant="light">
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                {c.icon}
                <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#0B1220", margin: "8px 0 0" }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "#475569", margin: 0 }}>{c.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

window.PagitWebSections1 = { Header, Hero, Integrations, Features, Audience };
