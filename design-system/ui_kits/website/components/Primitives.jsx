/* @jsx React.createElement */
const { useState } = React;

/* =====================================================================
   PAGIT WEBSITE — UI KIT COMPONENTS
   Mirrors components/ui/* and components/icons/* from propeller-dev/pagit-website
   =====================================================================*/

/* ---------- Icons (duotone) ------------------------------------------ */
function getTone(tone) {
  if (tone === "white") return { stroke: "#FFFFFF", fill: "rgba(255,255,255,0.18)" };
  if (tone === "brand") return { stroke: "#047857", fill: "#D1FAE5" };
  if (tone === "current") return { stroke: "currentColor", fill: "currentColor" };
  return { stroke: "#1E293B", fill: "#D1FAE5" };
}

function IconBase({ size = 24, children, style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
    >
      {children}
    </svg>
  );
}

const IconRepeat = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="2" y="6" width="20" height="12" rx="3" fill={c.fill} stroke="none" />
    <path d="M7 4l-3 3 3 3" stroke={c.stroke} />
    <path d="M4 7h13a3 3 0 013 3v1" stroke={c.stroke} />
    <path d="M17 20l3-3-3-3" stroke={c.stroke} />
    <path d="M20 17H7a3 3 0 01-3-3v-1" stroke={c.stroke} />
  </IconBase>
); };

const IconSplit = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="3" y="9" width="18" height="11" rx="2.5" fill={c.fill} stroke="none" />
    <path d="M3 13h18" stroke={c.stroke} />
    <path d="M9 16h2M14 16h3" stroke={c.stroke} />
    <path d="M12 4v3m-3 0h6" stroke={c.stroke} />
  </IconBase>
); };

const IconCreditCard = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="2" y="5" width="20" height="14" rx="3" fill={c.fill} stroke="none" />
    <rect x="2" y="5" width="20" height="14" rx="3" stroke={c.stroke} />
    <path d="M2 10h20" stroke={c.stroke} />
    <path d="M6 15h4" stroke={c.stroke} />
  </IconBase>
); };

const IconMessage = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M21 12a9 9 0 11-3.7-7.3L21 4l-1 4.4A8.96 8.96 0 0121 12z" fill={c.fill} stroke="none" />
    <path d="M21 12a9 9 0 11-3.7-7.3L21 4l-1 4.4A8.96 8.96 0 0121 12z" stroke={c.stroke} />
    <circle cx="9" cy="12" r="0.7" fill={c.stroke} stroke="none" />
    <circle cx="13" cy="12" r="0.7" fill={c.stroke} stroke="none" />
    <circle cx="17" cy="12" r="0.7" fill={c.stroke} stroke="none" />
  </IconBase>
); };

const IconReceipt = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z" fill={c.fill} stroke="none" />
    <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z" stroke={c.stroke} />
    <path d="M9 8h6M9 12h6M9 16h3" stroke={c.stroke} />
  </IconBase>
); };

const IconSparkles = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill={c.fill} stroke="none" />
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" stroke={c.stroke} />
    <path d="M19 16l.7 1.6L21.5 18l-1.7.7L19 20l-.7-1.6L16.5 18l1.8-.7L19 16zM5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6L5 16z" fill={c.fill} stroke={c.stroke} />
  </IconBase>
); };

const IconKey = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <circle cx="8" cy="14" r="4" fill={c.fill} stroke={c.stroke} />
    <path d="M11 11l9-9M16 6l3 3M14 8l3 3" stroke={c.stroke} />
  </IconBase>
); };

const IconCode = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="2" y="4" width="20" height="16" rx="3" fill={c.fill} stroke="none" />
    <rect x="2" y="4" width="20" height="16" rx="3" stroke={c.stroke} />
    <path d="M9 10l-2 2 2 2M15 10l2 2-2 2M13 9l-2 6" stroke={c.stroke} />
  </IconBase>
); };

const IconArrowRight = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}><path d="M5 12h14M13 6l6 6-6 6" stroke={c.stroke} /></IconBase>
); };

const IconCheck = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}><path d="M5 12l5 5L20 7" stroke={c.stroke} /></IconBase>
); };

const IconChevron = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}><path d="M6 9l6 6 6-6" stroke={c.stroke} /></IconBase>
); };

const IconWhatsApp = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M3 21l1.6-4.5A8.5 8.5 0 1112 21H3z" fill={c.fill} stroke={c.stroke} />
    <path d="M9 9.5c0-.5.4-1 .8-1.2.4-.1.7 0 .9.4l.7 1.4c.1.3 0 .6-.2.8l-.4.4a5 5 0 002.9 2.9l.4-.4c.2-.2.5-.3.8-.2l1.4.7c.4.2.5.5.4.9-.2.4-.7.8-1.2.8a6.7 6.7 0 01-6.5-6.5z" fill={c.stroke} stroke="none" />
  </IconBase>
); };

const IconMail = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" fill={c.fill} stroke={c.stroke} />
    <path d="M3.5 7l8.5 6 8.5-6" stroke={c.stroke} />
  </IconBase>
); };

const IconInstagram = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="3" y="3" width="18" height="18" rx="5" fill={c.fill} stroke={c.stroke} />
    <circle cx="12" cy="12" r="4" stroke={c.stroke} />
    <circle cx="17.2" cy="6.8" r="0.9" fill={c.stroke} stroke="none" />
  </IconBase>
); };

const IconUserFocus = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <circle cx="12" cy="9" r="3.5" fill={c.fill} stroke={c.stroke} />
    <path d="M5 20c1.4-3.4 4.2-5 7-5s5.6 1.6 7 5" stroke={c.stroke} />
    <path d="M3 4h3M21 4h-3M3 20h3M21 20h-3" stroke={c.stroke} />
  </IconBase>
); };

const IconStethoscope = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M5 4v5a4 4 0 008 0V4" stroke={c.stroke} />
    <path d="M9 13c0 4 3 7 7 7s7-3 7-7" stroke={c.stroke} />
    <circle cx="18" cy="6" r="2" fill={c.fill} stroke={c.stroke} />
  </IconBase>
); };

const IconCap = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M2 9l10-4 10 4-10 4-10-4z" fill={c.fill} stroke={c.stroke} />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke={c.stroke} />
    <path d="M22 9v6" stroke={c.stroke} />
  </IconBase>
); };

const IconBriefcase = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <rect x="2" y="7" width="20" height="13" rx="2.5" fill={c.fill} stroke={c.stroke} />
    <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" stroke={c.stroke} />
    <path d="M2 13h20" stroke={c.stroke} />
  </IconBase>
); };

const IconPlay = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <circle cx="12" cy="12" r="9" fill={c.fill} stroke={c.stroke} />
    <path d="M10 8.5v7l6-3.5-6-3.5z" fill={c.stroke} stroke="none" />
  </IconBase>
); };

const IconWrench = ({ tone, ...r }) => { const c = getTone(tone); return (
  <IconBase {...r}>
    <path d="M14 2a5 5 0 016.5 6.5L9 20l-5-5L15.5 3.5A5 5 0 0114 2z" fill={c.fill} stroke="none" />
    <path d="M14 2a5 5 0 016.5 6.5L9 20l-5-5L15.5 3.5A5 5 0 0114 2z" stroke={c.stroke} />
  </IconBase>
); };

/* ---------- Logo (loaded from disk) ---------------------------------- */
function Logo({ tone = "brand", variant = "full", height }) {
  const src = variant === "icon" ? "../../assets/pagit-icon.svg" : "../../assets/pagit-logo.svg";
  const filter = tone === "white" ? "brightness(0) invert(1)" : undefined;
  const h = height ?? (variant === "icon" ? 40 : 28);
  return <img src={src} alt="Pagit" style={{ height: h, width: variant === "icon" ? h : "auto", filter, display: "block" }} draggable={false} />;
}

/* ---------- Button --------------------------------------------------- */
function Button({ variant = "primary", size = "md", children, onClick, full, type = "button" }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 8, fontWeight: 500, borderRadius: 12, transition: "all 150ms cubic-bezier(0.22,1,0.36,1)",
    border: 0, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
    width: full ? "100%" : undefined,
  };
  const sizes = {
    sm: { height: 36, padding: "0 16px", fontSize: 14 },
    md: { height: 44, padding: "0 20px", fontSize: 15 },
    lg: { height: 48, padding: "0 24px", fontSize: 15 },
  };
  const variants = {
    primary:   { background: "#047857", color: "#fff", boxShadow: "0 1px 2px 0 rgba(11,18,32,.06)" },
    secondary: { background: "#fff", color: "#0B1220", border: "1px solid #E2E8F0" },
    ghost:     { background: "transparent", color: "#334155" },
    link:      { background: "transparent", color: "#047857", textDecoration: "underline", textUnderlineOffset: 4, padding: 0, height: "auto" },
    inverse:   { background: "#fff", color: "#064E3B", boxShadow: "0 1px 2px 0 rgba(11,18,32,.06)" },
  };
  return (
    <button type={type} onClick={onClick}
      style={{ ...base, ...(variant === "link" ? {} : sizes[size]), ...variants[variant] }}
      onMouseEnter={(e) => {
        if (variant === "primary") e.currentTarget.style.background = "#065F46";
        if (variant === "secondary") e.currentTarget.style.background = "#F8FAFC";
        if (variant === "ghost") { e.currentTarget.style.background = "#ECFDF5"; e.currentTarget.style.color = "#047857"; }
        if (variant === "inverse") e.currentTarget.style.background = "#ECFDF5";
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") e.currentTarget.style.background = "#047857";
        if (variant === "secondary") e.currentTarget.style.background = "#fff";
        if (variant === "ghost") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#334155"; }
        if (variant === "inverse") e.currentTarget.style.background = "#fff";
      }}>
      {children}
    </button>
  );
}

/* ---------- Badge ---------------------------------------------------- */
function Badge({ variant = "brand", children }) {
  const v = {
    brand:   { background: "#D1FAE5", color: "#065F46" },
    amber:   { background: "#FEF3C7", color: "#F59E0B" },
    neutral: { background: "#F1F5F9", color: "#334155" },
    danger:  { background: "#FEE2E2", color: "#DC2626" },
    outline: { background: "#fff", color: "#334155", border: "1px solid #E2E8F0" },
    inverse: { background: "#065F46", color: "#D1FAE5", border: "1px solid rgba(4,120,87,.6)" },
  }[variant];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      borderRadius: 9999, padding: "4px 12px", fontSize: 12, fontWeight: 600, lineHeight: 1, ...v,
    }}>
      {children}
    </span>
  );
}

/* ---------- Card ----------------------------------------------------- */
function Card({ variant = "light", children, style, onClick }) {
  const variants = {
    light:   { background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 1px 2px 0 rgba(11,18,32,.04)" },
    wash:    { background: "#ECFDF5", border: "1px solid rgba(209,250,229,.6)" },
    dark:    { background: "#064E3B", border: "1px solid #065F46", color: "#fff" },
    outline: { background: "transparent", border: "1px solid #E2E8F0" },
  };
  return (
    <div onClick={onClick} style={{
      position: "relative", overflow: "hidden", borderRadius: 16,
      ...variants[variant], ...style,
    }}>
      {children}
    </div>
  );
}

/* ---------- Eyebrow -------------------------------------------------- */
function Eyebrow({ children, tone = "brand" }) {
  const toneMap = { brand: "#047857", muted: "#64748B", inverse: "#6EE7B7" };
  return (
    <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: toneMap[tone], margin: 0 }}>
      {children}
    </p>
  );
}

/* ---------- Section header ------------------------------------------- */
function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div style={{ textAlign: align, maxWidth: 680, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{
        fontFamily: "Unbounded, sans-serif", fontSize: 40, lineHeight: 1.1, fontWeight: 700,
        letterSpacing: "-0.03em", color: "#0B1220", margin: eyebrow ? "12px 0 0" : 0,
      }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 18, lineHeight: 1.55, color: "#475569", marginTop: 16, marginBottom: 0 }}>{subtitle}</p>}
    </div>
  );
}

window.PagitWeb = {
  Button, Badge, Card, Eyebrow, SectionHeader, Logo,
  IconRepeat, IconSplit, IconCreditCard, IconMessage, IconReceipt, IconSparkles, IconKey, IconCode,
  IconArrowRight, IconCheck, IconChevron, IconWhatsApp, IconMail, IconInstagram,
  IconUserFocus, IconStethoscope, IconCap, IconBriefcase, IconPlay, IconWrench,
};
