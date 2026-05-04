# Pagit — Mood Board & Design System

> Direção visual aprovada na Fase 0 do spec [`2026-04-24-pagit-landing-design.md`](../specs/2026-04-24-pagit-landing-design.md). Tokens em [`lib/brand-tokens.ts`](../../lib/brand-tokens.ts).

---

## Princípios

1. **Claro domina, escuro pontua.** Base clara generosa; uma única "dark section" (momento uau + como funciona) cria contraste sem virar modal permanente.
2. **Emerald é âncora, não decoração.** O primary aparece em CTAs, estados ativos, ícones e gradientes sutis — não em backgrounds chapados grandes.
3. **Respiro > densidade.** Padding generoso, hierarquia tipográfica forte. Ninguém lê um site apertado.
4. **Motion assina presença, não distrai.** Entradas em fade+translate, stagger em listas, hover com micro-interação. Nada de parallax dramático nem scroll hijacking.
5. **Duotone consistente em ícones.** Ink (ink/800) + emerald (brand/600) — sem pacote genérico Lucide chapado.

---

## Paleta

### Primary — Emerald (logo anchor)

| Hex | Token | Uso |
|---|---|---|
| `#ECFDF5` | `brand/50` | Tintas leves, hover de link |
| `#D1FAE5` | `brand/100` | Wash de seção, chips |
| `#6EE7B7` | `brand/300` | Highlight em gradient top |
| `#10B981` | `brand/500` | Badges, ícones secundários |
| **`#059669`** | **`brand/600`** | **Primary CTA, logo, ícones de marca** |
| `#047857` | `brand/700` | Hover primary, texto em light |
| `#064E3B` | `brand/900` | Texto sobre wash claro |
| `#022C22` | `brand/950` | Fundo da dark section |

### Ink — neutros quentes-neutros

| Hex | Token | Uso |
|---|---|---|
| `#0B1220` | `ink/900` | Texto principal em light |
| `#334155` | `ink/700` | Subtítulos |
| `#475569` | `ink/600` | Texto secundário |
| `#94A3B8` | `ink/400` | Placeholders, text muted |
| `#E2E8F0` | `line/200` | Bordas, separadores |
| `#F8FAFC` | `surface/50` | Fundo alternado de seção |
| `#FFFFFF` | `surface/0` | Fundo base |

### Accent & feedback

| Hex | Token | Uso |
|---|---|---|
| `#F59E0B` | `accent/amber` | "2 meses grátis", números em destaque |
| `#FEF3C7` | `accent/amberLight` | Fundo de callout da oferta |
| `#DC2626` | `feedback/danger` | Inadimplência em gráficos, estado de erro |

---

## Tipografia

### Família

- **Display (headlines H1-H3, eyebrows):** `Geist` — geométrica, moderna, tem personalidade sem gritar. Pesos 500/600/700.
- **Body / UI:** `Inter` — padrão de mercado, combina tecnicamente com Geist. Pesos 400/500/600.
- **Mono (simulador, códigos, números financeiros em tabelas):** `Geist Mono`.

### Escala

| Token | Tamanho | Line-height | Uso típico |
|---|---|---|---|
| `xs` | 12px | 16 | Legendas, microcopy |
| `sm` | 14px | 20 | Labels, text secundário |
| `base` | 16px | 24 | Body padrão |
| `lg` | 18px | 28 | Body grande (hero sub) |
| `xl` | 20px | 28 | Lead paragraphs |
| `2xl` | 24px | 32 | Títulos de card |
| `3xl` | 32px | 38 | Títulos de seção (mobile) |
| `4xl` | 40px | 48 | Títulos de seção (desktop) |
| `5xl` | 56px | 1.1 | Hero H1 (tablet) |
| `6xl` | 72px | 1.05 | Hero H1 (desktop) |
| `display` | 80px | 1 | Números do simulador |

### Regras

- **Display weights:** headlines em 600, nunca 700 puro (gera volume excessivo).
- **Tracking:** padrão 0; headlines `-0.02em` para apertar visualmente.
- **Parágrafos body:** max-width ~65 chars (`max-w-prose`).
- **Tabular numerals** em valores financeiros (`font-variant-numeric: tabular-nums`).

---

## Espaçamento & layout

### Containers

- `narrow` 880px (blocos focados, cartões destacados)
- `max` 1200px (default de seção)
- `wide` 1320px (grid de features, carrossel)
- `reading` 680px (FAQ, legal)

### Seções

- `py` responsivo: `clamp(4rem, 8vw, 8rem)` em seções principais, `clamp(3rem, 6vw, 5rem)` em transicionais
- Gutter lateral: `clamp(1rem, 4vw, 2rem)`

### Grid

- Mobile: 1 col
- `md`: 2 col (features, para quem é)
- `lg`: 3-4 col (features grid, integração bar)

---

## Superfícies & formas

### Cards

- **Default light:** fundo `surface/0`, borda 1px `line/200`, `shadow-sm`, radius 16px
- **Wash:** fundo `brand/50` ou `surface/50`, sem borda, radius 16px
- **Dark:** fundo `brand/900`, borda 1px `brand/800`, radius 16px, texto `surface/0`

### Botões

Todos radius 12px, padding `px-5 py-3` (md) / `px-4 py-2.5` (sm) / `px-6 py-3.5` (lg).

- **Primary:** bg `brand/600`, texto branco, hover `brand/700`, active `brand/800`, shadow-md
- **Secondary:** bg `surface/0`, borda 1px `line/200`, texto `ink/900`, hover bg `surface/50`
- **Ghost:** bg transparent, texto `ink/700`, hover bg `brand/50`
- **Link:** texto `brand/700`, underline em hover

Foco visível em todos: `ring-2 ring-brand-500 ring-offset-2` (contrast AA garantido).

### Inputs

- Radius 12px, altura `h-11` (44px — target mobile tap)
- Borda 1px `line/200`, foco `ring-2 ring-brand-500`, bg `surface/0`
- Label acima, placeholder em `ink/400`, texto em `ink/900`

### Badges / chips

- Radius `pill` (9999px)
- Padding `px-3 py-1`
- `text-sm` medium
- Variantes: emerald wash, amber wash, neutral wash

---

## Iconografia

- **Duotone custom em SVG**, 24×24 viewBox
- Primary stroke: `ink/800` ou `brand/700` (contexto light) / `surface/0` ou `brand/300` (contexto dark)
- Secondary fill: `brand/100` ou `brand/800` (respectivo)
- Stroke width 1.5px, linecap round, linejoin round
- Cada seção tem 1 ícone "hero" maior (48px), resto são 24px

**Não usar:** Lucide default, Feather flat, emojis de pagamento (💰, 💳).

---

## Motion

### Durações

- `150ms` — hovers, focus states, pequenas mudanças de cor/opacidade
- `220ms` — entrada de elementos, ícones animados
- `360ms` — entrada de seções, timeline do simulador

### Easings

- `cubic-bezier(0.22, 1, 0.36, 1)` (standard) — padrão para tudo
- `cubic-bezier(0.16, 1, 0.3, 1)` (emphasized) — para o simulador e transições longas

### Padrões

- **Section entrance:** opacity 0→1 + translateY 24px→0, `viewport={{ once: true, margin: "-10%" }}`
- **Stagger em listas:** delay incremental de 80ms por item
- **Hover em cards:** scale(1.01) + shadow-lg, transition `motion.durationFast`
- **CTA primary hover:** brighten via overlay linear-gradient, não via scale
- **Lenis scroll:** duration 1.2s, easing exponencial

### Respeito a `prefers-reduced-motion`

Hook global que desabilita Framer Motion variants e Lenis quando a mídia query retorna `reduce`. Animações viram snapshots estáticos do estado final, não são removidas estruturalmente.

---

## Exemplos visuais (ASCII)

### Botão primary

```
┌──────────────────────────────┐
│  Começar grátis        →     │   bg brand/600, texto #FFF, radius 12
└──────────────────────────────┘   shadow-md
```

### Card de feature (light)

```
┌──────────────────────────────────┐
│  [ícone 48px duotone]            │   fundo #FFF
│                                   │   borda 1px #E2E8F0
│  Cobrança recorrente              │   radius 16
│  no Pix                           │
│                                   │
│  Você define valor, dia e         │
│  régua. A Pagit dispara o         │
│  QR Code todo ciclo.              │
│                                   │
└──────────────────────────────────┘
```

### Hero mockup (wireframe)

```
┌────────────────────────────────────────────────────────────┐
│  [logo]  Funcionalidades  Para quem  Preços  FAQ   [Entrar] [Começar grátis] │
├────────────────────────────────────────────────────────────┤
│                                                             │
│   ★ eyebrow em brand/700 uppercase tracking-wide            │
│                                                             │
│   Receber em dia virou a parte chata                        │
│   do seu negócio? A Pagit assume                            │
│   pra você.                                                 │
│   ┌─────────────────┐ ┌──────────────────────────┐          │
│   │ Começar grátis →│ │ Falar no WhatsApp        │          │
│   └─────────────────┘ └──────────────────────────┘          │
│                                                             │
│   2 meses grátis — sem cartão                              │
│                                                             │
│                [ visual mock / simulator ]                  │
└────────────────────────────────────────────────────────────┘
```

---

## Acessibilidade

- **Contraste:** todo texto passa AA (4.5:1). Primary bg `brand/600` + texto branco = 4.82:1 ✓. Body `ink/600` em `surface/0` = 7.04:1 ✓.
- **Target sizes:** mínimo 44×44px em interativos (inputs, botões, links com ícone).
- **Focus visible:** `ring-2 ring-brand-500 ring-offset-2` em todos os focáveis.
- **Hierarquia semântica:** um único H1 (hero), H2 por seção, H3 em cards.
- **`prefers-reduced-motion`:** hook global respeitado.
- **`prefers-color-scheme`:** a landing é light por design; sem toggle dark (evita complexidade desnecessária em site institucional).

---

## Anti-padrões (o que NÃO fazer)

- ❌ Gradient roxo/azul cripto no hero
- ❌ Cards neumórficos
- ❌ Ícones chapados genéricos (Feather/Lucide sem customização)
- ❌ Fontes em sans condensado (Montserrat, Oswald)
- ❌ Parallax 3D em mouse move
- ❌ Modais grandes de "aceite cookies" no primeiro scroll
- ❌ Depoimentos falsos ou números inventados
- ❌ "Revolucione", "Transforme", "Ecossistema completo"
