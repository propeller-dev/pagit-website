import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  size?: number;
  tone?: "ink" | "brand" | "white" | "current";
};

function getColors(tone: IconProps["tone"]) {
  switch (tone) {
    case "white":
      return { stroke: "#FFFFFF", fill: "rgba(255,255,255,0.18)" };
    case "brand":
      return { stroke: "#047857", fill: "#D1FAE5" };
    case "current":
      return { stroke: "currentColor", fill: "currentColor" };
    case "ink":
    default:
      return { stroke: "#1E293B", fill: "#D1FAE5" };
  }
}

function IconBase({
  className,
  size = 24,
  children,
  label,
}: {
  className?: string;
  size?: number;
  children: React.ReactNode;
  label?: string;
}) {
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
      className={cn("inline-block shrink-0", className)}
      role={label ? "img" : "presentation"}
      aria-label={label}
    >
      {children}
    </svg>
  );
}

/* Cobrança recorrente — Repeat */
export function IconRepeat({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <rect x="2" y="6" width="20" height="12" rx="3" fill={c.fill} stroke="none" />
      <path d="M7 4l-3 3 3 3" stroke={c.stroke} />
      <path d="M4 7h13a3 3 0 013 3v1" stroke={c.stroke} />
      <path d="M17 20l3-3-3-3" stroke={c.stroke} />
      <path d="M20 17H7a3 3 0 01-3-3v-1" stroke={c.stroke} />
    </IconBase>
  );
}

/* Parcelamento — Split */
export function IconSplit({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <rect x="3" y="9" width="18" height="11" rx="2.5" fill={c.fill} stroke="none" />
      <path d="M3 13h18" stroke={c.stroke} />
      <path d="M9 16h2M14 16h3" stroke={c.stroke} />
      <path d="M12 4v3m-3 0h6" stroke={c.stroke} />
    </IconBase>
  );
}

/* Cartão e boleto — Credit Card */
export function IconCreditCard({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <rect x="2" y="5" width="20" height="14" rx="3" fill={c.fill} stroke="none" />
      <rect x="2" y="5" width="20" height="14" rx="3" stroke={c.stroke} />
      <path d="M2 10h20" stroke={c.stroke} />
      <path d="M6 15h4" stroke={c.stroke} />
    </IconBase>
  );
}

/* Régua / WhatsApp — MessageCircle */
export function IconMessageCircle({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M21 12a9 9 0 11-3.7-7.3L21 4l-1 4.4A8.96 8.96 0 0121 12z" fill={c.fill} stroke="none" />
      <path d="M21 12a9 9 0 11-3.7-7.3L21 4l-1 4.4A8.96 8.96 0 0121 12z" stroke={c.stroke} />
      <circle cx="9" cy="12" r="0.7" fill={c.stroke} stroke="none" />
      <circle cx="13" cy="12" r="0.7" fill={c.stroke} stroke="none" />
      <circle cx="17" cy="12" r="0.7" fill={c.stroke} stroke="none" />
    </IconBase>
  );
}

/* Comprovante IA — Receipt */
export function IconReceipt({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z" fill={c.fill} stroke="none" />
      <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z" stroke={c.stroke} />
      <path d="M9 8h6M9 12h6M9 16h3" stroke={c.stroke} />
    </IconBase>
  );
}

/* Operador-assistente — Sparkles */
export function IconSparkles({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill={c.fill} stroke="none" />
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" stroke={c.stroke} />
      <path d="M19 16l.7 1.6L21.5 18l-1.7.7L19 20l-.7-1.6L16.5 18l1.8-.7L19 16zM5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6L5 16z" fill={c.fill} stroke={c.stroke} />
    </IconBase>
  );
}

/* Multi-chave PIX — Key */
export function IconKey({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <circle cx="8" cy="14" r="4" fill={c.fill} stroke={c.stroke} />
      <path d="M11 11l9-9M16 6l3 3M14 8l3 3" stroke={c.stroke} />
    </IconBase>
  );
}

/* API/devs — Code */
export function IconCode({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <rect x="2" y="4" width="20" height="16" rx="3" fill={c.fill} stroke="none" />
      <rect x="2" y="4" width="20" height="16" rx="3" stroke={c.stroke} />
      <path d="M9 10l-2 2 2 2M15 10l2 2-2 2M13 9l-2 6" stroke={c.stroke} />
    </IconBase>
  );
}

/* Audience icons */

export function IconUserFocus({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <circle cx="12" cy="9" r="3.5" fill={c.fill} stroke={c.stroke} />
      <path d="M5 20c1.4-3.4 4.2-5 7-5s5.6 1.6 7 5" stroke={c.stroke} />
      <path d="M3 4h3M21 4h-3M3 20h3M21 20h-3" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconStethoscope({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M5 4v5a4 4 0 008 0V4" stroke={c.stroke} />
      <path d="M9 13c0 4 3 7 7 7s7-3 7-7" stroke={c.stroke} />
      <circle cx="18" cy="6" r="2" fill={c.fill} stroke={c.stroke} />
    </IconBase>
  );
}

export function IconGraduationCap({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M2 9l10-4 10 4-10 4-10-4z" fill={c.fill} stroke={c.stroke} />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke={c.stroke} />
      <path d="M22 9v6" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconBriefcase({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <rect x="2" y="7" width="20" height="13" rx="2.5" fill={c.fill} stroke={c.stroke} />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" stroke={c.stroke} />
      <path d="M2 13h20" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconPlayCircle({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <circle cx="12" cy="12" r="9" fill={c.fill} stroke={c.stroke} />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill={c.stroke} stroke="none" />
    </IconBase>
  );
}

export function IconWrench({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M14 2a5 5 0 016.5 6.5L9 20l-5-5L15.5 3.5A5 5 0 0114 2z" fill={c.fill} stroke="none" />
      <path d="M14 2a5 5 0 016.5 6.5L9 20l-5-5L15.5 3.5A5 5 0 0114 2z" stroke={c.stroke} />
    </IconBase>
  );
}

/* Utility icons */

export function IconArrowRight({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconCheck({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M5 12l5 5L20 7" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconChevronDown({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M6 9l6 6 6-6" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconExternal({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M14 4h6v6M10 14L20 4M19 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h6" stroke={c.stroke} />
    </IconBase>
  );
}

export function IconWhatsApp({ tone, ...rest }: IconProps) {
  const c = getColors(tone);
  return (
    <IconBase {...rest}>
      <path d="M3 21l1.6-4.5A8.5 8.5 0 1112 21H3z" fill={c.fill} stroke={c.stroke} />
      <path d="M9 9.5c0-.5.4-1 .8-1.2.4-.1.7 0 .9.4l.7 1.4c.1.3 0 .6-.2.8l-.4.4a5 5 0 002.9 2.9l.4-.4c.2-.2.5-.3.8-.2l1.4.7c.4.2.5.5.4.9-.2.4-.7.8-1.2.8a6.7 6.7 0 01-6.5-6.5z" fill={c.stroke} stroke="none" />
    </IconBase>
  );
}

export const featureIconMap = {
  repeat: IconRepeat,
  split: IconSplit,
  "credit-card": IconCreditCard,
  "message-circle": IconMessageCircle,
  receipt: IconReceipt,
  sparkles: IconSparkles,
  key: IconKey,
  code: IconCode,
} as const;

export const audienceIconMap = {
  "user-focus": IconUserFocus,
  stethoscope: IconStethoscope,
  "graduation-cap": IconGraduationCap,
  briefcase: IconBriefcase,
  "play-circle": IconPlayCircle,
  wrench: IconWrench,
} as const;

export type FeatureIconName = keyof typeof featureIconMap;
export type AudienceIconName = keyof typeof audienceIconMap;
