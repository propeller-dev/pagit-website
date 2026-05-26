# Pagit Website — UI kit

Recreation of the marketing landing at `pagit.com.br`. Sourced from
`propeller-dev/pagit-website` (`components/sections/*`, `components/ui/*`,
`messages/pt-BR.json`, `app/globals.css`).

## Files

| File | What |
|---|---|
| `index.html` | Click-through landing (Header → Hero → Integrations → Features → Audience → How it works → Pricing → FAQ → CTA → Footer) |
| `components/Primitives.jsx` | `Button`, `Badge`, `Card`, `Eyebrow`, `SectionHeader`, `Logo` + all 20 duotone icons |
| `components/Sections.jsx` | `Header`, `Hero`, `Integrations`, `Features`, `Audience` |
| `components/SectionsBottom.jsx` | `HowItWorks` (dark moment), `Pricing`, `FAQ`, `CtaFinal`, `Footer` |

## Design notes

- **Width:** 1320px design. Set `meta viewport` to `width=1320`.
- **Dark moment:** "Como funciona" is the only section with `brand/950`
  background. Card-on-dark uses `brand/900` fill with `brand/800` border.
- **Hero gradient text:** the emphasis line uses `linear-gradient(90deg,
  brand/700, brand/500)` clipped to text. The hero subtitle is the only
  flat ink/600 paragraph at 20px.
- **Floating WhatsApp bubble** below the dark hero card is rotated -3°
  and lives in `<HeroVisual />`.
- **Pricing badge** sits absolute top-right inside the featured card with
  `Badge variant="amber"`. The featured card also gets a 1px brand/200 ring.
- **FAQ** is a `useState`-driven accordion, one item open at a time would
  be a nice tweak but the production site allows multi-open.
- **Header scroll behaviour:** transparent until `scrollY > 8`, then
  blurred white background with a 1px line/200 bottom border. The nav links
  have an animated underline that scales from left.

## What's NOT in this kit (yet)

- The `ChargeRulerSimulator` (interactive timeline with Motion). The
  production component is ~14kB; a faithful copy belongs in its own file.
  The hero visual gives the same impression statically.
- The `Reveal` / `StaggerGroup` scroll-driven animations. We render in
  final state; if you need them, wire IntersectionObserver to a class
  toggle on `.pagit-reveal`.
- The styleguide page (`/styleguide`). Equivalent content is split across
  the Design System preview cards.
