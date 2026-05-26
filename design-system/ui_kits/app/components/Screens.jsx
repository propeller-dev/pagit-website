/* @jsx React.createElement */
const A2 = window.PagitApp;
const { useState: useStateS } = React;

/* ---------- OVERVIEW SCREEN ------------------------------------------ */
function OverviewScreen() {
  const kpis = [
    { icon: A2.Ti.CreditCard, tint: ["#ede9fe", "#7c3aed"], title: "Receita recebida", value: "R$ 18.420,00", footer: "Em maio" },
    { icon: A2.Ti.Receipt, tint: ["#dbeafe", "#2563eb"], title: "Faturado no período", value: "R$ 24.800,00", footer: "12 cobranças emitidas", note: "Período em curso" },
    { icon: A2.Ti.Clock, tint: ["#fef3c7", "#d97706"], title: "Pendente de recebimento", value: "R$ 6.380,00", footer: "8 cobranças em aberto", note: "Acompanhar régua", footerColor: "#d97706" },
    { icon: A2.Ti.Search, tint: ["#ede9fe", "#7c3aed"], title: "Comprovantes em revisão", value: "3", footer: "Aguardando você", note: "Conferir comprovantes" },
    { icon: A2.Ti.Activity, tint: ["#d1fae5", "#059669"], title: "Taxa de sucesso", value: "94%", footer: "Recebimento dentro do prazo", note: "Acima da média histórica" },
    { icon: A2.Ti.Clock, tint: ["#dbeafe", "#2563eb"], title: "A vencer em 7 dias", value: "5", footer: "R$ 3.150,00 previstos", note: "Régua já configurada" },
  ];

  const recent = [
    { name: "Maria Souza", value: "R$ 200,00", status: "paid", initials: "MS", tone: "#10b981" },
    { name: "João Lima", value: "R$ 500,00", status: "pending", initials: "JL", tone: "#0ea5e9" },
    { name: "Estúdio Vértice", value: "R$ 1.500,00", status: "pending", initials: "EV", tone: "#a855f7" },
    { name: "Clínica Aurora", value: "R$ 380,00", status: "review", initials: "CA", tone: "#f97316" },
    { name: "Studio Pilates", value: "R$ 240,00", status: "paid", initials: "SP", tone: "#10b981" },
  ];

  // 12 fake months for the bar graph
  const bars = [38,42,46,52,49,58,55,63,67,72,69,74];
  const max = Math.max(...bars);
  const months = ["Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr","Mai"];

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#0B1220", margin: 0 }}>
          Bom dia, Raphael
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <A2.ShadButton variant="outline" size="sm"><A2.Ti.Filter size={14} /> Período</A2.ShadButton>
          <A2.ShadButton variant="brand" size="sm"><A2.Ti.Plus size={14} /> Nova cobrança</A2.ShadButton>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <A2.ShadCard key={k.title} style={{ padding: 24, gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, fontWeight: 500, color: "#0B1220" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: k.tint[0], color: k.tint[1], display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} />
                </div>
                {k.title}
              </div>
              <div style={{ fontFamily: "Unbounded, sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: "-0.025em", color: "#0B1220", marginTop: 8, fontVariantNumeric: "tabular-nums" }}>
                {k.value}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: k.footerColor || "#0B1220", fontWeight: 500 }}>{k.footer}</div>
              {k.note && <div style={{ fontSize: 12, color: "#64748B" }}>{k.note}</div>}
            </A2.ShadCard>
          );
        })}
      </div>

      {/* Chart + recent sales */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <A2.ShadCard style={{ padding: 0, gap: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px 8px", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#047857", textTransform: "uppercase" }}>Receita recebida</div>
            <div style={{ fontFamily: "Unbounded, sans-serif", fontSize: 18, fontWeight: 700, color: "#0B1220", marginTop: 4 }}>Últimos 12 meses</div>
          </div>
          <div style={{ padding: 24, height: 280, display: "flex", alignItems: "flex-end", gap: 12 }}>
            {bars.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: i === bars.length - 1 ? "#047857" : "#A7F3D0", borderRadius: "6px 6px 0 0" }} />
                </div>
                <div style={{ fontSize: 11, color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </A2.ShadCard>

        <A2.ShadCard style={{ padding: "20px 0 0", gap: 0 }}>
          <div style={{ padding: "0 24px 16px", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#047857", textTransform: "uppercase" }}>Atividade recente</div>
            <div style={{ fontFamily: "Unbounded, sans-serif", fontSize: 18, fontWeight: 700, color: "#0B1220", marginTop: 4 }}>Últimas cobranças</div>
          </div>
          <div>
            {recent.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", borderBottom: i === recent.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9999, background: r.tone, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 11 }}>{r.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0B1220" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Mensalidade · Pix</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", fontVariantNumeric: "tabular-nums" }}>{r.value}</div>
                  <div style={{ marginTop: 2 }}><A2.ChargeStatusBadge status={r.status} /></div>
                </div>
              </div>
            ))}
          </div>
        </A2.ShadCard>
      </div>
    </div>
  );
}

/* ---------- CHARGES SCREEN ------------------------------------------ */
function ChargesScreen() {
  const rows = [
    { customer: "Maria Souza", situation: ["paid", "Pago em 12 mai"],   status: "paid",     origin: "Recorrente · mensal",   amount: "R$ 200,00",   paidAt: "12 mai", createdAt: "01 mai", dueDate: "10 mai" },
    { customer: "João Lima",   situation: ["today", "Vence hoje"],      status: "pending",  origin: "Avulsa",                amount: "R$ 500,00",   paidAt: "—",      createdAt: "20 mai", dueDate: "26 mai" },
    { customer: "Estúdio Vértice", situation: ["upcoming", "Vence em 3d"], status: "pending", origin: "Parcela 1/3",         amount: "R$ 1.500,00", paidAt: "—",      createdAt: "23 mai", dueDate: "29 mai" },
    { customer: "Clínica Aurora",  situation: ["danger", "Atrasado há 5d"], status: "review", origin: "Recorrente · mensal", amount: "R$ 380,00",   paidAt: "—",      createdAt: "10 mai", dueDate: "21 mai" },
    { customer: "Studio Pilates",  situation: ["paid", "Pago em 14 mai"],   status: "paid",   origin: "Recorrente · mensal", amount: "R$ 240,00",   paidAt: "14 mai", createdAt: "01 mai", dueDate: "12 mai" },
    { customer: "Atelier Beatriz", situation: ["upcoming", "Vence em 7d"],  status: "pending", origin: "Parcela 2/3",        amount: "R$ 1.500,00", paidAt: "—",      createdAt: "23 mai", dueDate: "02 jun" },
    { customer: "Café da Esquina", situation: ["danger", "Atrasado há 1d"], status: "pending", origin: "Avulsa",             amount: "R$ 89,00",    paidAt: "—",      createdAt: "20 mai", dueDate: "25 mai" },
    { customer: "Academia Forma",  situation: ["attention", "Comprovante recebido"], status: "review", origin: "Recorrente · mensal", amount: "R$ 320,00", paidAt: "—", createdAt: "12 mai", dueDate: "22 mai" },
  ];

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#0B1220", margin: 0 }}>Cobranças</h1>
          <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>Acompanhe e gerencie todas as cobranças do seu negócio.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <A2.ShadButton variant="outline" size="sm"><A2.Ti.Download size={14} /> Exportar</A2.ShadButton>
          <A2.ShadButton variant="brand" size="sm"><A2.Ti.Plus size={14} /> Nova cobrança</A2.ShadButton>
        </div>
      </div>

      {/* filter bar */}
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, maxWidth: 420 }}>
          <A2.ShadInput placeholder="Buscar por cliente, valor ou ID…" prefix={<A2.Ti.Search size={16} color="#94A3B8" />} />
        </div>
        <A2.ShadButton variant="outline" size="sm">Status · Todos <A2.Ti.ChevronDown size={14} /></A2.ShadButton>
        <A2.ShadButton variant="outline" size="sm">Origem · Todas <A2.Ti.ChevronDown size={14} /></A2.ShadButton>
        <A2.ShadButton variant="outline" size="sm">Período · 30 dias <A2.Ti.ChevronDown size={14} /></A2.ShadButton>
      </div>

      <A2.ShadCard style={{ padding: 0, gap: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Cliente","Situação","Status","Origem","Valor","Pago em","Criado","Vencimento"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
              ))}
              <th style={{ borderBottom: "1px solid #E2E8F0", width: 32 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i === rows.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                <td style={{ padding: "14px 16px", fontWeight: 500, color: "#0B1220" }}>{r.customer}</td>
                <td style={{ padding: "14px 16px" }}><A2.Situation tone={r.situation[0]}>{r.situation[1]}</A2.Situation></td>
                <td style={{ padding: "14px 16px" }}><A2.ChargeStatusBadge status={r.status} /></td>
                <td style={{ padding: "14px 16px", color: "#475569", whiteSpace: "nowrap" }}>{r.origin}</td>
                <td style={{ padding: "14px 16px", fontWeight: 500, color: "#0B1220", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.amount}</td>
                <td style={{ padding: "14px 16px", color: "#64748B", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.paidAt}</td>
                <td style={{ padding: "14px 16px", color: "#64748B", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.createdAt}</td>
                <td style={{ padding: "14px 16px", color: "#64748B", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.dueDate}</td>
                <td style={{ padding: "14px 8px", color: "#94A3B8" }}>•••</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: "1px solid #F1F5F9" }}>
          <span style={{ fontSize: 12, color: "#64748B" }}>Exibindo 8 de 124 cobranças</span>
          <div style={{ display: "flex", gap: 6 }}>
            <A2.ShadButton variant="outline" size="sm">Anterior</A2.ShadButton>
            <A2.ShadButton variant="outline" size="sm">Próxima</A2.ShadButton>
          </div>
        </div>
      </A2.ShadCard>
    </div>
  );
}

/* ---------- CUSTOMERS SCREEN ---------------------------------------- */
function CustomersScreen() {
  const customers = [
    { initials: "MS", name: "Maria Souza", tag: "Recorrente", contact: "maria@souza.com · +55 21 9 9123-4567", lifetime: "R$ 2.400,00", since: "Jan/2025", tone: "#10b981" },
    { initials: "JL", name: "João Lima", tag: "Avulsa", contact: "joao.lima@gmail.com", lifetime: "R$ 500,00", since: "Mai/2026", tone: "#0ea5e9" },
    { initials: "EV", name: "Estúdio Vértice", tag: "Parcelamento", contact: "financeiro@estudiovertice.com.br", lifetime: "R$ 12.300,00", since: "Out/2024", tone: "#a855f7" },
    { initials: "CA", name: "Clínica Aurora", tag: "Recorrente", contact: "contato@clinicaaurora.com.br", lifetime: "R$ 4.560,00", since: "Mar/2025", tone: "#f97316" },
    { initials: "SP", name: "Studio Pilates", tag: "Recorrente", contact: "studio.pilates@hotmail.com", lifetime: "R$ 2.880,00", since: "Fev/2025", tone: "#10b981" },
    { initials: "AB", name: "Atelier Beatriz", tag: "Parcelamento", contact: "bea@atelierbeatriz.com", lifetime: "R$ 4.500,00", since: "Mai/2026", tone: "#f59e0b" },
  ];
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#0B1220", margin: 0 }}>Clientes</h1>
          <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>Sua carteira de cobrança. {customers.length} clientes ativos.</p>
        </div>
        <A2.ShadButton variant="brand" size="sm"><A2.Ti.Plus size={14} /> Novo cliente</A2.ShadButton>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, maxWidth: 420 }}>
          <A2.ShadInput placeholder="Buscar cliente…" prefix={<A2.Ti.Search size={16} color="#94A3B8" />} />
        </div>
        <A2.ShadButton variant="outline" size="sm">Tipo · Todos <A2.Ti.ChevronDown size={14} /></A2.ShadButton>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {customers.map((c) => (
          <A2.ShadCard key={c.name} style={{ padding: 20, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 9999, background: c.tone, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0B1220" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{c.contact}</div>
              </div>
              <span style={{ display: "inline-block", padding: "3px 10px", fontSize: 11, fontWeight: 500, borderRadius: 9999, background: "#D1FAE5", color: "#065F46" }}>{c.tag}</span>
            </div>
            <div style={{ display: "flex", gap: 24, paddingTop: 12, borderTop: "1px solid #F1F5F9", marginTop: 4 }}>
              <div>
                <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Lifetime</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0B1220", fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{c.lifetime}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Cliente desde</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0B1220", marginTop: 2 }}>{c.since}</div>
              </div>
            </div>
          </A2.ShadCard>
        ))}
      </div>
    </div>
  );
}

/* ---------- NEW CHARGE (modal-style) -------------------------------- */
function NewChargeScreen() {
  const [type, setType] = useStateS("recurrent");
  const [amount, setAmount] = useStateS("200,00");
  const [customer, setCustomer] = useStateS("Maria Souza");
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, maxWidth: 880 }}>
      <div>
        <h1 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#0B1220", margin: 0 }}>Nova cobrança</h1>
        <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>Configure uma vez. A Pagit dispara o resto.</p>
      </div>

      <A2.ShadCard style={{ padding: 0, gap: 0 }}>
        <div style={{ padding: 24, borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#0B1220" }}>Tipo de cobrança</div>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[
              { id: "recurrent", l: "Recorrente", s: "Mesmo valor todo mês" },
              { id: "installments", l: "Parcelada em Pix", s: "Divide em N parcelas" },
              { id: "oneTime", l: "Avulsa", s: "Cobrança única" },
            ].map((t) => (
              <button key={t.id} onClick={() => setType(t.id)} style={{
                textAlign: "left", padding: 14, border: type === t.id ? "1px solid #047857" : "1px solid #E2E8F0",
                background: type === t.id ? "#ECFDF5" : "#fff", borderRadius: 10, cursor: "pointer",
                fontFamily: "inherit",
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: type === t.id ? "#047857" : "#0B1220" }}>{t.l}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{t.s}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", display: "block", marginBottom: 6 }}>Cliente</label>
            <A2.ShadInput value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", display: "block", marginBottom: 6 }}>Valor</label>
            <A2.ShadInput value={`R$ ${amount}`} onChange={(e) => setAmount(e.target.value.replace(/[^\d,]/g,""))} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", display: "block", marginBottom: 6 }}>Chave Pix de recebimento</label>
            <A2.ShadInput value="raphael@pagit.com.br" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", display: "block", marginBottom: 6 }}>Vencimento</label>
            <A2.ShadInput value="Dia 10 de cada mês" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#0B1220", display: "block", marginBottom: 6 }}>Mensagem ao cliente (opcional)</label>
            <textarea defaultValue="Oi {nome}! Sua cobrança de {valor} está disponível. Pagamento em Pix — é só escanear o código." rows={3}
              style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", color: "#0B1220", outline: 0, resize: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#047857", textTransform: "uppercase", marginBottom: 8 }}>Régua de cobrança</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["7 dias antes", "3 dias antes", "1 dia antes", "Vence hoje", "Em atraso"].map((e, i) => (
                <span key={e} style={{
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 10px", borderRadius: 9999,
                  background: i < 4 ? "#fff" : "rgba(255,255,255,0.5)", color: "#065F46", border: "1px solid #A7F3D0",
                }}>
                  {i < 4 && <A2.Ti.Check size={12} color="#047857" />}
                  {e}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#065F46" }}>4 de 5 eventos ativos · WhatsApp + e-mail</div>
          </div>
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <A2.ShadButton variant="ghost">Cancelar</A2.ShadButton>
          <A2.ShadButton variant="brand">Criar cobrança</A2.ShadButton>
        </div>
      </A2.ShadCard>
    </div>
  );
}

window.PagitAppScreens = { OverviewScreen, ChargesScreen, CustomersScreen, NewChargeScreen };
