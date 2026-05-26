---
name: pagit-design
description: Use this skill to generate well-branded interfaces and assets for Pagit (Brazilian SaaS for billing automation: "Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você"), either for production or throwaway prototypes / mocks / decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the marketing site or the dashboard product.
user-invocable: true
---

# Pagit design

Read `README.md` first — it has the brand thesis, content fundamentals
(tone, casing, regulatory rules), visual foundations (color, type,
motion), and iconography rules. Then explore the other files:

- `colors_and_type.css` — drop into any HTML mock with
  `<link rel="stylesheet" href="…/colors_and_type.css">` to get the full
  token set as CSS custom properties.
- `assets/` — the two logos (wordmark + symbol), integration logos
  (Stripe, Woovi, WhatsApp, Resend), source citations (Serasa, Sebrae,
  Bacen), and reference screenshots from production. Copy these out
  rather than redrawing.
- `preview/` — small specimen HTML cards covering the design system:
  colors, type, radii, shadows, buttons, badges, cards, inputs, the full
  duotone icon set, the dashboard charges-row pattern, and voice samples.
- `ui_kits/website/` — full marketing landing as React+JSX
  (Header, Hero with dark mock panel, Integrations, Features grid,
  Audience grid, dark "Como funciona", Pricing, FAQ, CTA, Footer).
- `ui_kits/app/` — dashboard shell (sidebar, KPI grid, charges table,
  customers, new-charge form). Uses Tabler-style icons, not the marketing
  duotone set — that split is real and intentional.

## When working with this skill

If you're building **visual artifacts** (slides, throwaway mockups,
landing variants, deck assets) for Pagit, copy the assets you need into
your output folder and produce static HTML files. Use the components in
`ui_kits/` as a starting point — they are real working JSX you can lift
straight into a deck or prototype.

If you're working on **production code** in the actual Pagit repos
(`propeller-dev/pagit` or `propeller-dev/pagit-website`), read the rules
in `README.md` to become an expert in the brand voice and visual system,
then use the source files in those repos as the source of truth — this
design system is a study, not the authority. Specifically:

- **Marketing copy:** edit `messages/pt-BR.json` in `pagit-website`.
  Never invent product names "Pix Automático" or "Pix Parcelado" — those
  are Banco Central terms.
- **Marketing visuals:** Tailwind v4 tokens live in
  `app/globals.css` (`@theme`). The TS mirror is `lib/brand-tokens.ts`.
- **Dashboard:** uses shadcn/ui in `components/ui/`. Tabler Icons. The
  layout shell is `components/layout/app-sidebar.tsx` +
  `components/layout/header.tsx`.

## When invoked with no guidance

Ask the user what they want to build (a landing variant? a new section?
a sales deck? a feature mock?), then ask 2–3 focused questions before
producing anything:

1. **Surface** — marketing site or dashboard product?
2. **Format** — interactive HTML prototype, deck slides, static
   screenshot, or production-ready code?
3. **Audience** — internal review, investor pitch, customer-facing?

Then produce work that matches the brand voice (PT-BR informal "você",
direct, anti-corporate, no inflated verbs), the visual system (emerald
anchor, Unbounded display + Inter body, duotone icons on marketing /
Tabler on app, sanctioned dark moment, 16px card radius, 12px buttons),
and the content rules (no fake testimonials, no invented stats, no
Pix Automático / Pix Parcelado as product names).
