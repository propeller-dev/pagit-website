# Pagit Design System

> Pagit — _"Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você."_
> SaaS brasileiro de **automação de cobrança, recorrência e gestão de recebíveis** para PMEs.

This design system encodes the brand and UI vocabulary used across both Pagit
products so designs created here look and feel like Pagit, not like a generic
template.

---

## Sources

The system was built from these two repos. They are the canonical reference;
if you want to go deeper, browse them directly:

| Repo | Role | URL |
|---|---|---|
| `propeller-dev/pagit-website` | Marketing site (`pagit.com.br`) — landing, styleguide, brand SVGs | <https://github.com/propeller-dev/pagit-website> |
| `propeller-dev/pagit` | Product app (`dash.pagit.com.br`) — Next.js 15 + shadcn dashboard | <https://github.com/propeller-dev/pagit> |

Key files that shaped this system:

- `pagit-website/app/globals.css` — Tailwind v4 `@theme` tokens (colors, type, radii, containers)
- `pagit-website/lib/brand-tokens.ts` — TS mirror of the same tokens + spacing, shadow, motion
- `pagit-website/docs/design/moodboard.md` — verbal direction (principles, anti-patterns)
- `pagit-website/components/ui/*` — Button, Card, Badge, Input, Logo
- `pagit-website/components/icons/index.tsx` — duotone icon set (20 icons, 24×24)
- `pagit-website/messages/pt-BR.json` — copy in production tone (PT-BR)
- `pagit-website/app/[locale]/styleguide/page.tsx` — internal styleguide page
- `pagit/frontend/src/components/ui/*` — shadcn primitives used in the dashboard
- `pagit/frontend/src/features/overview/components/overview.tsx` — dashboard KPI grid
- `pagit/frontend/src/features/charges/components/charge-status-badge.tsx` — app status colors

Reference screenshots are in [`assets/reference/`](./assets/reference/).

---

## Index

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest
colors_and_type.css        ← CSS vars (colors, type, radii, shadows, motion)

assets/
  pagit-logo.svg           ← wordmark + symbol, emerald
  pagit-icon.svg           ← square symbol (Pix-inspired arrow + circle)
  favicon.svg
  integrations/            ← Stripe, Woovi, WhatsApp, Resend
  sources/                 ← Bacen, Sebrae, Serasa (research citations)
  reference/               ← Full-page screenshots (desktop 1440, mobile 375, styleguide)

preview/                   ← Design System tab cards (one HTML per concept)

ui_kits/
  website/                 ← Marketing site recreation (Hero, Features, Pricing, FAQ, Footer)
    index.html
    components/*.jsx
  app/                     ← Dashboard recreation (sidebar, KPI grid, charges table)
    index.html
    components/*.jsx
```

---

## Content fundamentals

The voice of Pagit was built around a single thesis: _receiving money should not
be the entrepreneur's second job_. That shapes everything in copy.

**Language.** Default is **Brazilian Portuguese (pt-BR)**. English and Spanish
exist as placeholder routes but are untranslated. When writing in PT, prefer
**informal "você"** address — Pagit talks to the entrepreneur, not the
corporate buyer. _"Você só confere o dinheiro entrar."_

**Tone.** Direct, confident, honest. The brand explicitly rejects the inflated
Brazilian fintech vocabulary — there is a published anti-pattern list:

> ❌ "Revolucione", "Transforme", "Ecossistema completo"

Instead, copy is concrete and operational: _"Conecte sua chave Pix"_, _"A Pagit
cobra por você"_, _"Tira-dúvidas honesto"_. The FAQ is literally titled
**"Tira-dúvidas honesto"** and answers with what the product is _not_ as often
as what it _is_.

**Casing.** Sentence case for headlines (_"Receber em dia virou a parte chata
do seu negócio?"_). Eyebrows above section titles are **UPPERCASE** with
`letter-spacing: 0.08em` in emerald. UI labels, button copy, and metadata are
sentence case — never `Title Case Like This`.

**Regulatory discipline.** Two protected terms in Brazilian fintech that Pagit
**never** uses as product names: "Pix Automático" and "Pix Parcelado" (these
are Banco Central-regulated products). Pagit uses workarounds: _"cobrança
recorrente via Pix"_, _"parcelamento em Pix"_, _"lembretes automáticos"_.
Same discipline for partnerships — copy says _"integra com"_ Stripe / Woovi /
WhatsApp / Resend, never _"em parceria com"_.

**No fake social proof.** There is a written rule: no invented testimonials,
no invented market numbers. Every statistic in the landing carries a citation
(Serasa, Sebrae, Banco Central) with a real source URL.

**Numbers in copy.** When numbers appear in body copy, use Portuguese number
formatting: _"R$ 1.500,00"_, _"8,9 milhões"_, _"1 em cada 3"_. Always
`font-variant-numeric: tabular-nums` for currency in UI.

**Emoji.** Almost never. There is **one** sanctioned emoji in production copy,
the green heart at the end of a WhatsApp reminder mockup: _"Tá aqui o Pix 💚"_.
Otherwise the iconography is the duotone SVG set. No 💰 💳 🚀 etc.

**Example copy samples worth re-reading:**

- Hero: _"Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você."_
- Reassurance: _"2 meses grátis. Sem cartão, sem custo por transação da Pagit."_
- WhatsApp mock: _"Oi Maria! Sua mensalidade venceu hoje. Tá aqui o Pix 💚"_
- Feature card: _"QR Code gerado automaticamente, lembrete no WhatsApp antes e no vencimento, recibo verificado por IA assim que o cliente paga."_
- FAQ answer: _"Não. 2 meses grátis, sem cartão, sem pegadinha."_

---

## Visual foundations

### Anchor color & contrast strategy

**Emerald is the anchor, not the decoration.** The primary `#059669`
(brand/600) appears in CTAs, the logo, active states, and brand-tone icons —
never as a flat large background. The single sanctioned dark moment is
`brand/950` (`#022c22`), used for the "como funciona / momento uau" section
and the floating hero panel — _"claro domina, escuro pontua."_

### Palette structure

- **Brand (emerald, 50→950).** 11 stops. CTA is `brand/700` (`#047857`) per
  `Button.tsx`, _not_ `brand/600` — `brand/600` is the logo color and the
  hover/active for primary CTAs is `brand/800` / `brand/900`.
- **Ink (10 neutrals, slate-derived).** Cool neutrals. `ink/900` is body
  text, `ink/600` is secondary, `ink/400` is muted/placeholder.
- **Surface & line.** `surface/0` is pure white; `surface/50` is the
  alternating section background; `line/200` is the default border on cards
  and inputs.
- **Accents.** Amber (`#F59E0B` + `#FEF3C7` wash) reserved for the
  "2 meses grátis" highlight and pricing badges. Danger red `#DC2626` for
  errors and overdue states. No purple, no blue (except WhatsApp green stays
  as the WhatsApp brand on its own logo).
- **App-specific status colors.** The dashboard uses a slightly different
  palette for charge statuses (`charge-status-badge.tsx`): paid → `green-600`,
  pending → `yellow-500`, pending-review → `orange-500`, failed/rejected →
  destructive, canceled → slate. These are saturated Tailwind defaults, more
  saturated than the marketing emerald, because they need to read clearly in
  dense tables.

### Type system

> ⚠️ **Brand fonts are not locked yet.** The production site currently
> ships **Unbounded** (display) + **Inter** (body) via `next/font/google`,
> and the moodboard originally mentioned Geist. That's a working choice,
> not a final brand decision. Treat the typeface assignment below as
> "the current stack" — swap freely when the brand picks final faces.
> The roles, weights, scale, and tracking are stable; only the family
> names should change.

- **Display:** currently Unbounded, weights 600/700/800 — geometric,
  slightly playful, used for all H1/H2/H3 and big financial numbers in
  the simulator.
- **Body / UI:** currently Inter (variable, used at 400/500/600/700).
- **Mono:** currently JetBrains Mono in this design system (the website
  code itself does not load a webfont and falls back to `ui-monospace`).
- **Tracking.** Display gets aggressive negative tracking (`-0.02em` to
  `-0.04em`) to keep the geometric letters from feeling loose.
- **Tabular nums.** Mandatory on currency and on any cell that aligns to a
  column.

### Backgrounds

- Mostly flat white (`surface/0`). Section variation comes from `surface/50`
  alternation, not pattern or gradient.
- **One sanctioned gradient:** a radial wash behind the hero, very subtle:
  `radial-gradient(60% 40% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)`.
- **One sanctioned text gradient:** the hero emphasis line, brand/700 → brand/500.
- No hand-drawn illustrations, no repeating patterns, no grain. The dark hero
  panel uses a `shadow-[0_30px_60px_-20px_rgba(2,44,34,0.4)]` to lift it off
  the wash. That is the entire "decoration" budget for the homepage.
- **No bluish-purple crypto gradients.** Explicitly forbidden in the moodboard.

### Animation & motion

- Durations: **150ms** for hover/focus, **220ms** for element entrances,
  **360ms** for section entrances and the simulator timeline.
- Easings: **standard** `cubic-bezier(0.22, 1, 0.36, 1)` for everything;
  **emphasized** `cubic-bezier(0.16, 1, 0.3, 1)` reserved for the simulator.
- **Section entrance pattern:** `opacity: 0 → 1` + `translateY(16–24px) → 0`,
  triggered by IntersectionObserver, fired once (`once: true`). Stagger lists
  with 60–80ms increment between children.
- **No parallax, no scroll-hijacking, no scale-on-mouse-move.**
- **Lenis smooth scroll** is on by default (1.2s exponential), with a
  `prefers-reduced-motion` fallback that disables it.
- Reduced-motion fallback is non-negotiable — every animation has to render
  its final state if the user opts out.

### Hover & press states

- **Primary button.** Hover darkens `brand/700 → brand/800`; active goes to
  `brand/900`. No scale. No glow.
- **Secondary button.** Hover lifts the background to `surface/50` and the
  border to `line/300`. Very subtle.
- **Ghost button.** Hover gets a `brand/50` tint and a `brand/700` text color.
- **Feature cards.** Hover lifts `-translate-y-0.5` and bumps shadow `sm → md`.
  This is the only sanctioned scale-on-hover.
- **Nav links.** A 2px emerald underline grows from `scale-x-0` to
  `scale-x-100`, anchored left. ~200ms standard easing.
- **Focus visible.** Always a 2px `brand/500` ring with a 2px offset. AA contrast.

### Borders, radii, shadows

- **Radii.** Buttons & inputs `12px` (radius-md). Cards `16px` (radius-lg)
  with a few `2xl` (32px) for big container cards (KPI tiles in the dashboard).
  Badges/chips are `pill` (9999px).
- **Borders.** Default `1px solid line/200`. Wash cards and the dark hero
  card use a 1px emerald border one shade off the fill (brand/100/60,
  brand/800).
- **Shadows.** Four-stop scale:
  - `sm` — default card resting state
  - `md` — primary button + card-on-hover
  - `lg` — pricing card focal point + tooltips
  - `dark-hero` — the one big shadow under the dark hero panel
  - There is **no inset shadow** anywhere in the system.
- **Inputs.** 12px radius, `h-11` (44px — mobile tap target). Border becomes
  emerald on focus, with a 2px brand/500 outline at 2px offset.

### Cards

Four official variants from `Card.tsx`:

| Variant | Fill | Border | Shadow | Use |
|---|---|---|---|---|
| `light` | `surface/0` | `1px line/200` | `sm` | default everywhere |
| `wash`  | `brand/50`  | `1px brand/100/60` | none | section accents |
| `dark`  | `brand/900` | `1px brand/800` | none | hero panel + dark moment |
| `outline` | transparent | `1px line/200` | none | pricing comparison, FAQ |

All cards are `rounded-2xl` (16px) with `overflow: hidden`.

### Layout & containers

Four reading widths:

- `reading` 680px — FAQ, legal pages
- `narrow` 880px — pricing, focused blocks
- `default` 1200px — section default
- `wide` 1320px — feature grid, hero

Section padding is responsive: `clamp(4rem, 8vw, 8rem)` on primary sections
and `clamp(3rem, 6vw, 5rem)` on transitional ones. Gutters are
`clamp(1rem, 4vw, 2rem)`.

### Use of transparency & blur

Two sanctioned uses:

1. **Sticky header.** When `scrollY > 8`, the header gets `bg-surface/85` +
   `backdrop-blur-md` and a `line-200/80` bottom border. Before that, fully
   transparent.
2. **WhatsApp/notification mock chips.** Inside the dark hero panel, rows use
   `bg-brand-900/50` for layered depth.

No general use of glass / frosted surfaces.

### Imagery vibe

Pagit ships zero stock photography in production. The visual content is:

- The two SVG marks (logo wordmark + square icon)
- The duotone icon set (20 icons, 24×24)
- Third-party logos (Stripe, Woovi, WhatsApp, Resend) for the integrations bar
- Source-citation logos (Serasa, Sebrae, Bacen)
- Recipe-card style UI mocks (the dashboard hero panel) built from real
  components

If you need a product image, **build it as UI** rather than reaching for stock.

---

## Iconography

The icon set is **20 custom duotone SVGs** in `components/icons/index.tsx`.
They live as React components (`<IconRepeat />`, `<IconKey />`, etc.) with
this contract:

- **24×24 viewBox**, 1.5px stroke, round linecap and linejoin
- Each icon takes a `tone` prop: `"ink"` (default, ink/800 stroke + brand/100
  fill), `"brand"` (brand/700 stroke + brand/100 fill), `"white"` (white
  stroke + 18% white fill, for use on dark), or `"current"` (inherits)
- The shape is two paths: a filled "shadow" path + a stroked outline path
  on top. That's the duotone effect.
- Feature icons (`repeat`, `split`, `credit-card`, `message-circle`, `receipt`,
  `sparkles`, `key`, `code`) map to features in the landing
- Audience icons (`user-focus`, `stethoscope`, `graduation-cap`, `briefcase`,
  `play-circle`, `wrench`) map to verticals (clinics, gyms, freelancers, etc.)
- Utility icons (`arrow-right`, `check`, `chevron-down`, `external`, `shield`,
  `document`, `whatsapp`, `mail`, `instagram`)

**Anti-patterns explicitly listed in the moodboard:** no Lucide-default flat
icons, no Feather without customization, no payment emojis (💰💳).

**In the dashboard product** Pagit uses **Tabler Icons** (`@tabler/icons-react`)
for everything except the brand logo. That's a deliberate split — the
custom duotone set is "marketing voice," Tabler is "operating tool voice."

**For this design system** the duotone set is rebuilt as standalone HTML/SVG
in [`ui_kits/website/components/Icons.jsx`](./ui_kits/website/components/Icons.jsx),
copied from the original code. For dashboard mocks, use Tabler Icons from
CDN (`https://unpkg.com/@tabler/icons@latest`) or substitute the closest
duotone match.

**No emoji is used as iconography.** Single exception is the 💚 in the
WhatsApp reminder bubble.

---

## Font substitutions

**Brand fonts are not finalized.** The current stack mirrors what
production ships today, but every face below is provisional and can
be replaced once the brand picks final typefaces. Roles (display /
body / mono) and weights/scale will hold; family names will change.

| Role | Current in code | This system | Notes |
|---|---|---|---|
| Display | Unbounded (Google) | Unbounded (Google) | Provisional. Original moodboard called for Geist. |
| Body / UI | Inter (Google) | Inter (Google) | Provisional. |
| Mono | system `ui-monospace` | JetBrains Mono (Google) | **Substitution** — production doesn't ship a webfont mono, falls back to system. We loaded JetBrains Mono so mockups render predictably across browsers. |

> 🟡 **Action item for the brand owner:** confirm or replace the
> display/body/mono families. Once locked, swap them in
> `colors_and_type.css` (`--font-display`, `--font-sans`, `--font-mono`)
> and re-run the preview cards. Nothing else needs to change.

---

## Caveats

- **No real product screenshots** of the dashboard were available in the
  open repos (only marketing screenshots). The app UI kit is built from the
  shadcn primitives and layout code in the `pagit` repo, not from a live
  view. Some interaction polish may differ from production.
- The marketing simulator (`ChargeRulerSimulator.tsx`) is a complex Motion
  component — recreated in spirit, not 1:1, in the website UI kit.
- The mono font is a substitution (see above).
