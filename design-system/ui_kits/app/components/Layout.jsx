/* @jsx React.createElement */
const { useState: useStateApp } = React;
const A = window.PagitApp;

/* ---------- SIDEBAR --------------------------------------------------- */
function Sidebar({ active, onNavigate }) {
  const groups = [
    { label: "Visão geral", items: [{ id: "overview", icon: A.Ti.Dashboard, label: "Dashboard" }] },
    { label: "Gestão", items: [
      { id: "customers", icon: A.Ti.User, label: "Clientes" },
      { id: "subscriptions", icon: A.Ti.Billing, label: "Assinaturas" },
      { id: "plans", icon: A.Ti.Product, label: "Planos" },
      { id: "users", icon: A.Ti.Users, label: "Usuários" },
    ] },
    { label: "Cobrança", items: [
      { id: "charges", icon: A.Ti.Invoice, label: "Cobranças" },
      { id: "reviews", icon: A.Ti.Check, label: "Comprovantes" },
    ] },
    { label: "Configurações", items: [
      { id: "payments", icon: A.Ti.Payment, label: "Pagamentos" },
      { id: "notifications", icon: A.Ti.Bell, label: "Notificações" },
    ] },
  ];
  return (
    <aside style={{ width: 256, height: "100%", background: "#fff", borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* tenant switcher slot */}
      <div style={{ padding: 12, borderBottom: "1px solid #F1F5F9" }}>
        <button style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10, padding: 8,
          background: "transparent", border: "1px solid transparent", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
        }}>
          <A.AppLogo />
          <span style={{ marginLeft: "auto", color: "#94A3B8" }}><A.Ti.ChevronsDown size={14} /></span>
        </button>
      </div>

      <nav style={{ flex: 1, overflow: "auto", padding: 8 }}>
        {groups.map((g) => (
          <div key={g.label} style={{ marginBottom: 14 }}>
            <div style={{ padding: "8px 10px 4px", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: "#94A3B8", textTransform: "uppercase" }}>
              {g.label}
            </div>
            {g.items.map((it) => {
              const isActive = it.id === active;
              const Icon = it.icon;
              return (
                <button key={it.id} onClick={() => onNavigate(it.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                  background: isActive ? "#F1F5F9" : "transparent", color: isActive ? "#0B1220" : "#334155",
                  border: 0, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 500,
                  textAlign: "left", marginBottom: 2,
                }}>
                  <Icon size={18} color={isActive ? "#047857" : "#475569"} />
                  <span>{it.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: 12, borderTop: "1px solid #F1F5F9" }}>
        <button style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10, padding: 8,
          background: "transparent", border: 0, borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
        }}>
          <A.Ti.Code size={16} color="#475569" />
          <span style={{ fontSize: 14, color: "#334155" }}>API docs</span>
        </button>
        <div style={{ marginTop: 12, padding: 12, background: "#ECFDF5", borderRadius: 12, border: "1px solid #D1FAE5" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#047857", textTransform: "uppercase", marginBottom: 4 }}>Plano Piloto</div>
          <div style={{ fontSize: 13, color: "#064E3B", lineHeight: 1.45 }}>2 meses grátis · 42 dias restantes</div>
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, padding: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#10b981,#047857)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12 }}>RM</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#0B1220" }}>Raphael M.</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>Estúdio Vértice</div>
          </div>
          <A.Ti.ChevronsDown size={14} color="#94A3B8" style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </aside>
  );
}

/* ---------- TOP BAR ------------------------------------------------- */
function TopBar({ breadcrumbs }) {
  return (
    <header style={{ height: 56, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid rgba(226,232,240,0.6)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button style={{ background: "transparent", border: 0, cursor: "pointer", padding: 6, color: "#475569", borderRadius: 6 }}><A.Ti.Sidebar size={18} /></button>
        <span style={{ width: 1, height: 16, background: "#E2E8F0" }} />
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {breadcrumbs.map((b, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <A.Ti.ChevronRight size={14} color="#94A3B8" />}
              <a href="#" style={{
                fontSize: 13, color: i === breadcrumbs.length - 1 ? "#0B1220" : "#64748B",
                textDecoration: "none", fontWeight: i === breadcrumbs.length - 1 ? 500 : 400,
              }}>{b}</a>
            </span>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button style={{ background: "transparent", border: 0, cursor: "pointer", padding: 6, color: "#475569", borderRadius: 6 }}><A.Ti.Globe size={18} /></button>
        <button style={{ background: "transparent", border: 0, cursor: "pointer", padding: 6, color: "#475569", borderRadius: 6 }}><A.Ti.Sun size={18} /></button>
      </div>
    </header>
  );
}

window.PagitAppLayout = { Sidebar, TopBar };
