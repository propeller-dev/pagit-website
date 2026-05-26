/* @jsx React.createElement */
const { useState, useEffect } = React;

/* =====================================================================
   PAGIT APP — UI KIT PRIMITIVES (shadcn-flavored, matching pagit repo)
   ===================================================================== */

/* Tabler-style stroke icons used in the dashboard */
function TablerIcon({ children, size = 18, color = "currentColor", strokeWidth = 2, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}>
      {children}
    </svg>
  );
}

const Ti = {
  Dashboard:    (p) => <TablerIcon {...p}><path d="M4 4h6v8H4zM14 4h6v4h-6zM14 12h6v8h-6zM4 16h6v4H4z"/></TablerIcon>,
  Invoice:      (p) => <TablerIcon {...p}><path d="M5 21V5a2 2 0 012-2h7l5 5v13"/><path d="M14 3v5h5"/><path d="M9 12h6M9 16h6M9 8h2"/></TablerIcon>,
  Check:        (p) => <TablerIcon {...p}><path d="M5 12l5 5L20 7"/></TablerIcon>,
  Payment:      (p) => <TablerIcon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h2M13 15h4"/></TablerIcon>,
  Bell:         (p) => <TablerIcon {...p}><path d="M10 5a2 2 0 014 0a7 7 0 014 6v3a4 4 0 002 3H4a4 4 0 002-3v-3a7 7 0 014-6"/><path d="M9 17v1a3 3 0 006 0v-1"/></TablerIcon>,
  User:         (p) => <TablerIcon {...p}><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0113 0"/></TablerIcon>,
  Users:        (p) => <TablerIcon {...p}><circle cx="9" cy="7" r="4"/><path d="M3 21a6 6 0 0112 0"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></TablerIcon>,
  Billing:      (p) => <TablerIcon {...p}><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="17" cy="17" r="3"/></TablerIcon>,
  Product:      (p) => <TablerIcon {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17l9 5 9-5"/></TablerIcon>,
  Search:       (p) => <TablerIcon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></TablerIcon>,
  Code:         (p) => <TablerIcon {...p}><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></TablerIcon>,
  ChevronDown:  (p) => <TablerIcon {...p}><path d="M6 9l6 6 6-6"/></TablerIcon>,
  ChevronRight: (p) => <TablerIcon {...p}><path d="M9 6l6 6-6 6"/></TablerIcon>,
  ChevronsDown: (p) => <TablerIcon {...p}><path d="M7 7l5 5 5-5M7 13l5 5 5-5"/></TablerIcon>,
  Plus:         (p) => <TablerIcon {...p}><path d="M12 5v14M5 12h14"/></TablerIcon>,
  Clock:        (p) => <TablerIcon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></TablerIcon>,
  Activity:     (p) => <TablerIcon {...p}><path d="M3 12h4l3-9 4 18 3-9h4"/></TablerIcon>,
  CreditCard:   (p) => <TablerIcon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h2"/></TablerIcon>,
  Receipt:      (p) => <TablerIcon {...p}><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2V3z"/><path d="M9 8h6M9 12h6M9 16h3"/></TablerIcon>,
  Filter:       (p) => <TablerIcon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></TablerIcon>,
  Download:     (p) => <TablerIcon {...p}><path d="M12 4v12M7 11l5 5 5-5M4 20h16"/></TablerIcon>,
  Sun:          (p) => <TablerIcon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4L4.2 19.8M19.8 4.2l-1.4 1.4"/></TablerIcon>,
  Globe:        (p) => <TablerIcon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></TablerIcon>,
  Sidebar:      (p) => <TablerIcon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></TablerIcon>,
  Slash:        (p) => <TablerIcon {...p}><path d="M9 21l6-18"/></TablerIcon>,
};

/* ---------- Logo (app uses square symbol in sidebar header) ---------- */
function AppLogo({ collapsed }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src="../../assets/pagit-icon.svg" alt="Pagit" style={{ width: 32, height: 32, borderRadius: 8, display: "block" }} />
      {!collapsed && <img src="../../assets/pagit-logo.svg" alt="Pagit" style={{ height: 22, display: "block" }} />}
    </div>
  );
}

/* ---------- shadcn-flavored Button ---------------------------------- */
function ShadButton({ variant = "default", size = "default", children, onClick, type = "button", style }) {
  const variants = {
    default:     { background: "#0B1220", color: "#fff", border: "1px solid transparent" },
    secondary:   { background: "#F1F5F9", color: "#0B1220", border: "1px solid transparent" },
    destructive: { background: "#DC2626", color: "#fff", border: "1px solid transparent" },
    outline:     { background: "#fff", color: "#0B1220", border: "1px solid #E2E8F0" },
    ghost:       { background: "transparent", color: "#334155", border: "1px solid transparent" },
    brand:       { background: "#047857", color: "#fff", border: "1px solid transparent" },
  };
  const sizes = {
    default: { height: 36, padding: "0 16px", fontSize: 14 },
    sm:      { height: 32, padding: "0 12px", fontSize: 13 },
    lg:      { height: 40, padding: "0 24px", fontSize: 14 },
    icon:    { height: 36, width: 36, padding: 0 },
  };
  return (
    <button type={type} onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      borderRadius: 8, fontFamily: "inherit", fontWeight: 500, cursor: "pointer",
      transition: "all 150ms", boxShadow: "0 1px 2px 0 rgba(11,18,32,0.04)",
      ...variants[variant], ...sizes[size], ...style,
    }}>
      {children}
    </button>
  );
}

/* ---------- shadcn-flavored Card ---------------------------------- */
function ShadCard({ children, style }) {
  return (
    <div style={{
      background: "#fff", color: "#0B1220", display: "flex", flexDirection: "column", gap: 12,
      borderRadius: 16, border: "1px solid #E2E8F0",
      boxShadow: "0 1px 2px 0 rgba(11,18,32,0.04)", padding: "24px",
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ---------- ChargeStatusBadge ---------------------------------- */
function ChargeStatusBadge({ status }) {
  const map = {
    paid:     { bg: "#16a34a", color: "#fff", label: "Pago" },
    pending:  { bg: "#eab308", color: "#fff", label: "Pendente" },
    review:   { bg: "#f97316", color: "#fff", label: "Em revisão" },
    failed:   { bg: "#DC2626", color: "#fff", label: "Falhou" },
    canceled: { bg: "#F1F5F9", color: "#334155", border: "1px solid #CBD5E1", label: "Cancelado" },
  };
  const c = map[status] || map.canceled;
  return (
    <span style={{
      display: "inline-block", padding: "3px 8px", fontSize: 11, fontWeight: 500,
      borderRadius: 6, background: c.bg, color: c.color, border: c.border, whiteSpace: "nowrap",
    }}>
      {c.label}
    </span>
  );
}

/* ---------- Situation dot + label ---------------------------------- */
function Situation({ tone, children }) {
  const dot = {
    paid: "#10b981", today: "#0ea5e9", upcoming: "#64748b", danger: "#dc2626", attention: "#f59e0b", neutral: "#94a3b8",
  }[tone] || "#94a3b8";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: "#334155" }}>{children}</span>
    </span>
  );
}

/* ---------- Input (form field) ---------------------------------- */
function ShadInput({ placeholder, value, onChange, type = "text", style, prefix }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, border: "1px solid #E2E8F0",
      borderRadius: 8, background: "#fff", padding: "0 12px", height: 36, ...style,
    }}>
      {prefix}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ flex: 1, border: 0, outline: 0, background: "transparent", fontSize: 14, color: "#0B1220", fontFamily: "inherit", padding: 0, minWidth: 0 }}
      />
    </div>
  );
}

window.PagitApp = {
  Ti, AppLogo, ShadButton, ShadCard, ChargeStatusBadge, Situation, ShadInput, TablerIcon,
};
