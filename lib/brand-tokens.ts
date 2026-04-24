/**
 * Pagit brand tokens — single source of truth for the marketing site.
 * Derived from pagit_mkt-logo.svg and pagit_mkt-icon.svg (anchor #059669).
 *
 * Consumed by tailwind.config.ts and by any component that needs raw values
 * (gradients in CSS-in-JS, canvas animations, chart colors).
 */

export const colors = {
  brand: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
    950: "#022C22",
  },
  ink: {
    900: "#0B1220",
    800: "#1E293B",
    700: "#334155",
    600: "#475569",
    500: "#64748B",
    400: "#94A3B8",
    300: "#CBD5E1",
    200: "#E2E8F0",
    100: "#F1F5F9",
  },
  surface: {
    0: "#FFFFFF",
    50: "#F8FAFC",
    100: "#F1F5F9",
  },
  line: {
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
  },
  accent: {
    amber: "#F59E0B",
    amberLight: "#FEF3C7",
  },
  feedback: {
    success: "#059669",
    warning: "#F59E0B",
    danger: "#DC2626",
    dangerLight: "#FEE2E2",
  },
} as const;

export const fontFamily = {
  display: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
  sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
} as const;

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["2rem", { lineHeight: "2.375rem" }],
  "4xl": ["2.5rem", { lineHeight: "3rem" }],
  "5xl": ["3.5rem", { lineHeight: "1.1" }],
  "6xl": ["4.5rem", { lineHeight: "1.05" }],
  display: ["5rem", { lineHeight: "1" }],
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const spacing = {
  section: "clamp(4rem, 8vw, 8rem)",
  sectionSm: "clamp(3rem, 6vw, 5rem)",
  gutter: "clamp(1rem, 4vw, 2rem)",
} as const;

export const radius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px 0 rgb(11 18 32 / 0.04)",
  md: "0 4px 12px -2px rgb(11 18 32 / 0.06), 0 2px 4px -2px rgb(11 18 32 / 0.04)",
  lg: "0 18px 48px -12px rgb(11 18 32 / 0.12), 0 6px 16px -6px rgb(11 18 32 / 0.08)",
  glow: "0 0 0 6px rgb(16 185 129 / 0.12)",
} as const;

export const motion = {
  durationFast: "150ms",
  durationBase: "220ms",
  durationSlow: "360ms",
  easingStandard: "cubic-bezier(0.22, 1, 0.36, 1)",
  easingEmphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const container = {
  max: "1200px",
  wide: "1320px",
  narrow: "880px",
  reading: "680px",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const brandTokens = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  radius,
  shadow,
  motion,
  container,
  breakpoints,
} as const;

export type BrandTokens = typeof brandTokens;
