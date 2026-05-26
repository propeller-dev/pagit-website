/* @jsx React.createElement */
const { useState: useState2 } = React;
const W2 = window.PagitWeb;

/* ---------- HOW IT WORKS (dark moment) ------------------------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Conecte sua chave Pix", b: "Cadastre a chave Pix do seu negócio. É ela que vai receber o dinheiro — direto na sua conta, sem a Pagit no meio." },
    { n: "02", t: "Defina o que cobrar", b: "Mensalidade, serviço único, parcelado em Pix ou cartão. Configure o valor, o ciclo e os clientes uma única vez." },
    { n: "03", t: "A Pagit cobra por você", b: "QR Code gerado automaticamente, lembrete no WhatsApp antes e no vencimento, recibo verificado por IA assim que o cliente paga." },
    { n: "04", t: "Você confere o que entrou", b: "Painel limpo, conciliação automática, histórico completo. Zero planilha paralela." },
  ];
  return (
    <section style={{ background: "#022C22", padding: "120px 24px", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 680 }}>
          <W2.Eyebrow tone="inverse">Como funciona</W2.Eyebrow>
          <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 40, lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 16px" }}>
            Do cadastro ao recibo, em 4 passos.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "rgba(209,250,229,0.8)", margin: 0 }}>
            Você configura uma vez. A Pagit roda sozinha no seu dia a dia.
          </p>
        </div>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#064E3B", border: "1px solid #065F46", borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "Unbounded, sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", color: "#10B981" }}>{s.n}</div>
              <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "12px 0 8px" }}>{s.t}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(209,250,229,0.75)", margin: 0 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING -------------------------------------------------- */
function Pricing() {
  const plans = [
    {
      id: "piloto",
      name: "Piloto",
      tagline: "Pra testar de verdade, sem pressa",
      price: "Grátis",
      priceSuffix: "",
      highlight: "2 meses grátis — sem cartão",
      featured: true,
      features: [
        "Todas as funcionalidades liberadas",
        "Cobrança recorrente e parcelamento em Pix",
        "Régua no WhatsApp e e-mail",
        "Verificação de comprovantes por IA",
        "Operador-assistente",
        "API e webhooks",
        "Sem limite artificial pra avaliação",
      ],
      cta: "Começar grátis",
    },
    {
      id: "starter",
      name: "Starter",
      tagline: "Pra quem já validou e quer escalar",
      price: "Em breve",
      priceSuffix: "/mês",
      highlight: "Mensalidade fixa",
      featured: false,
      features: [
        "Cobrança ilimitada",
        "Régua completa",
        "Integração com cartão (taxa do gateway aplicada)",
        "Múltiplas chaves Pix",
        "Relatórios e conciliação",
        "Suporte por WhatsApp",
      ],
      cta: "Falar com a gente",
    },
  ];
  return (
    <section id="precos" style={{ background: "#F8FAFC", padding: "120px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <W2.SectionHeader eyebrow="Preços" title="Simples. Mensalidade fixa."
          subtitle="Sem custo por transação da Pagit. Sem custo por cobrança emitida. Sem custo por régua disparada." />
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {plans.map((p) => (
            <W2.Card key={p.id} variant={p.featured ? "light" : "outline"}
              style={{ position: "relative", boxShadow: p.featured ? "0 18px 48px -12px rgba(11,18,32,0.12)" : undefined, outline: p.featured ? "1px solid #A7F3D0" : undefined }}>
              {p.featured && (
                <div style={{ position: "absolute", top: 16, right: 16 }}>
                  <W2.Badge variant="amber">{p.highlight}</W2.Badge>
                </div>
              )}
              <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color: "#047857", textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                  <p style={{ marginTop: 8, fontSize: 15, color: "#475569" }}>{p.tagline}</p>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "Unbounded, sans-serif", fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", color: "#0B1220" }}>{p.price}</span>
                  {p.priceSuffix && <span style={{ fontSize: 15, color: "#64748B" }}>{p.priceSuffix}</span>}
                </div>
                {!p.featured && <p style={{ fontSize: 14, color: "#475569" }}>{p.highlight}</p>}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#334155" }}>
                      <span style={{ width: 20, height: 20, borderRadius: 9999, background: "#D1FAE5", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <W2.IconCheck size={12} tone="brand" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "auto" }}>
                  <W2.Button full variant={p.featured ? "primary" : "secondary"}>{p.cta}</W2.Button>
                </div>
              </div>
            </W2.Card>
          ))}
        </div>
        <p style={{ marginTop: 32, textAlign: "center", fontSize: 12, lineHeight: 1.6, color: "#64748B" }}>
          Taxas de cartão (quando você ativar) seguem o padrão do gateway e ficam claramente exibidas antes de você habilitar.
          A Pagit não adiciona margem sobre elas.
        </p>
      </div>
    </section>
  );
}

/* ---------- FAQ ------------------------------------------------------ */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState2(false);
  return (
    <div style={{ borderBottom: "1px solid #E2E8F0" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "transparent", border: 0, padding: "20px 0", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left",
        fontFamily: "inherit",
      }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#0B1220" }}>{q}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms", color: "#475569" }}>
          <W2.IconChevron size={20} />
        </span>
      </button>
      {open && (
        <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.7, color: "#475569" }}>{a}</p>
      )}
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "Preciso dar acesso à minha conta bancária pra usar a Pagit?", a: "Não. Você cadastra sua chave Pix (CPF/CNPJ, celular, e-mail ou aleatória) e a Pagit gera QR Codes que apontam pra ela. A Pagit não acessa extrato, saldo nem movimenta sua conta." },
    { q: "O dinheiro do Pix cai na minha conta ou na da Pagit?", a: "Direto na sua. Sem intermediário, sem conta Pagit no meio. Você usa a sua chave, seu cliente paga, o dinheiro entra na sua conta bancária na hora — como qualquer Pix comum." },
    { q: "Como funciona o parcelamento em Pix?", a: "A Pagit gera vários QR Codes — um por parcela — e dispara cada um no vencimento combinado. É um parcelamento operacional, não uma linha de crédito. Você recebe o valor inteiro de cada parcela, sem juros envolvidos na operação." },
    { q: "A Pagit faz \"Pix Automático\"?", a: "Não. Pix Automático é um produto regulamentado pelo Banco Central oferecido por instituições financeiras autorizadas. A Pagit faz algo diferente: lembretes automáticos de cobrança recorrente, usando QR Codes gerados com a sua chave Pix." },
    { q: "Tem taxa por transação?", a: "Não da Pagit. Você paga só a mensalidade do plano. Se ativar pagamento por cartão, o gateway integrado cobra a taxa padrão de mercado — a Pagit não adiciona margem sobre ela." },
    { q: "Como cancelo?", a: "Pelo próprio painel, a qualquer momento. Sem multa, sem fidelidade, sem precisar falar com ninguém pra cancelar. Você exporta seus dados antes, se quiser." },
  ];
  return (
    <section id="faq" style={{ padding: "120px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <W2.SectionHeader align="center" eyebrow="FAQ" title="Tira-dúvidas honesto."
          subtitle="As perguntas que todo mundo faz antes de contratar — respondidas sem enrolar." />
        <div style={{ marginTop: 48 }}>
          {items.map((it) => <FAQItem key={it.q} q={it.q} a={it.a} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA FINAL ------------------------------------------------ */
function CtaFinal() {
  return (
    <section style={{ padding: "100px 24px", background: "linear-gradient(to bottom, #F8FAFC, #fff)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <W2.Eyebrow>Última parada</W2.Eyebrow>
        <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 48, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.035em", color: "#0B1220", margin: "12px 0 16px" }}>
          Bote a cobrança no automático hoje.
        </h2>
        <p style={{ fontSize: 18, color: "#475569", margin: 0 }}>2 meses grátis. Sem cartão. Sem custo por transação da Pagit.</p>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <W2.Button size="lg">Começar grátis <W2.IconArrowRight size={18} tone="white" /></W2.Button>
          <W2.Button variant="secondary" size="lg">Falar no WhatsApp</W2.Button>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "#64748B" }}>Você cancela quando quiser, no painel. Sem fidelidade.</p>
      </div>
    </section>
  );
}

/* ---------- FOOTER --------------------------------------------------- */
function Footer() {
  const sections = [
    { title: "Produto", links: ["Funcionalidades", "Para quem", "Preços", "FAQ"] },
    { title: "Contato", links: [{ icon: <W2.IconWhatsApp size={16} />, label: "+55 21 93618-3583" }, { icon: <W2.IconMail size={16} />, label: "contato@pagit.com.br" }, { icon: <W2.IconInstagram size={16} />, label: "@pagit.fin" }] },
    { title: "Desenvolvedores", links: ["Documentação · em breve", "Status · em breve"] },
    { title: "Legal", links: ["Termos de uso", "Política de privacidade"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid #E2E8F0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 40 }}>
          <div>
            <W2.Logo />
            <p style={{ marginTop: 16, fontSize: 14, color: "#475569", maxWidth: 280 }}>
              Cobrança automatizada para empreendedores brasileiros.
            </p>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h3 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "#64748B", textTransform: "uppercase", margin: "0 0 12px" }}>{s.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {s.links.map((l, i) => (
                  <li key={i}>
                    <a href="#" style={{ fontSize: 14, color: "#334155", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                      {typeof l === "object" ? l.icon : null}
                      {typeof l === "object" ? l.label : l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, borderTop: "1px solid #E2E8F0", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>© 2026 Pagit. Todos os direitos reservados.</p>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Site em português do Brasil.</p>
        </div>
      </div>
    </footer>
  );
}

window.PagitWebSections2 = { HowItWorks, Pricing, FAQ, CtaFinal, Footer };
