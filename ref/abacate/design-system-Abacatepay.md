# Design System — abacatepay.com
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://www.abacatepay.com/

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|

### Paleta Principal

| Hex | Ocorrências | Fontes |
|-----|-------------|--------|
| `#244c4e` | 1228 | grid |
| `#121217` | 164 | — |
| `#4c5267` | 126 | flex |

### CSS Variables (seleção)

```css
--tw-ring-color: rgba(59,130,246,.5);
```

## 🔤 Tipografia

**Família principal:** `__fustat_6a44ab` — fallback: `__fustat_Fallback_6a44ab`

| Contexto | Tamanho | Peso | Line Height | Letter Spacing |
|----------|---------|------|-------------|----------------|
| heading-1 | 68px (4.25rem) | 600 | 1.05 | -3.4px |
| heading-1 | 48px (3.00rem) | 600 | 1.00 | -1.92px |
| heading-1 | 48px (3.00rem) | 700 | 1.50 | — |
| heading-1 | 36px (2.25rem) | 600 | 1.20 | -1.28px |
| heading-1 | 32px (2.00rem) | 700 | 0.60 | -0.96px |
| heading-1 | 20px (1.25rem) | 600 | 1.02 | -0.4px |
| link | 20px (1.25rem) | 600 | 0.70 | -0.4px |
| heading-1 | 18px (1.13rem) | 500 | 1.56 | — |
| heading-1 | 18px (1.13rem) | 600 | 1.56 | — |
| heading-1 | 16px (1.00rem) | 400 | 1.50 | — |
| link | 16px (1.00rem) | 400 | 1.50 | — |
| heading-1 | 16px (1.00rem) | 600 | 1.50 | — |
| link | 16px (1.00rem) | 600 | 0.69 | — |
| heading-1 | 16px (1.00rem) | 500 | 1.80 | 0.8px |
| button | 16px (1.00rem) | 400 | 1.50 | — |
| caption | 14px (0.88rem) | 700 | 0.71 | — |
| caption | 14px (0.88rem) | 500 | 1.80 | — |
| caption | 14px (0.88rem) | 600 | 0.71 | — |
| caption | 12px (0.75rem) | 700 | 0.67 | — |
| caption | 12px (0.75rem) | 500 | 0.67 | — |

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `1px` | `0.06rem` | 23 |
| `4px` | `0.25rem` | 1 |
| `8px` | `0.50rem` | 25 |
| `10px` | `0.63rem` | 11 |
| `12px` | `0.75rem` | 35 |
| `12.5px` | `0.78rem` | 2 |
| `16px` | `1.00rem` | 25 |
| `20px` | `1.25rem` | 3 |
| `24px` | `1.50rem` | 60 |
| `28px` | `1.75rem` | 5 |
| `32px` | `2.00rem` | 24 |
| `36px` | `2.25rem` | 4 |
| `40px` | `2.50rem` | 23 |
| `44px` | `2.75rem` | 1 |
| `48px` | `3.00rem` | 1 |

## 🔲 Border Radius

| Valor | Contagem | Elementos | Confiança |
|-------|----------|-----------|-----------|
| `0px 8px 8px 0px` | 18 | div | high |
| `8px` | 37 | div, a | high |
| `8px 0px 0px 8px` | 18 | div | high |
| `16px` | 4 | span, div | medium |
| `9999px` | 47 | a, div, span | high |

## 🌑 Sombras

```css
/* confiança: high, count: 6 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(150, 158, 166, 0.2) 0px 8px 24px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 2px;

/* confiança: low, count: 2 */
box-shadow: rgba(0, 0, 0, 0.16) 0px 8px 24px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(99, 99, 110, 0.2) 0px 7px 29px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.13) -17px 16px 52px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px 0px;

```

## 🧩 Componentes

### Botões

**Variante 1**
```css
background-color: rgb(114, 202, 58);
color:            oklch(0.183088 0.00404 285.994);
padding:          0px;
border-radius:    100px;
border:           0px solid rgb(124, 124, 138);
font-size:        16px;
font-weight:      400;
```

### Links

| Cor | Decoração | Peso |
|-----|-----------|------|
| `rgb(76, 82, 103)` | none | 400 |
| `rgb(36, 76, 78)` | none | 600 |
| `rgb(88, 196, 17)` | none | 600 |

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html` | all | 0s | ease | 0s |
| `a.text-[16px].font-fustat.font-semibold` | all | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.grid.desktopDefault:grid-cols-2.hero-bg` | opacity, transform | 0.7s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0.1s |
| `a.bg-white.overflow-hidden.rounded-lg` | color, background-color, border-color, text-decoration-color, fill, stroke | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.group.inline-block.hover:scale-[102%]` | transform | 0.5s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.p-6.flex.items-center` | color, background-color, border-color, text-decoration-color, fill, stroke | 0.15s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `svg.size-6.text-[#9EEA6C].transition-transform` | transform | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `a.hover:text-[#58C411].transition-colors.duration-500` | color, background-color, border-color, text-decoration-color, fill, stroke | 0.5s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.woot-widget-holder.woot--hide.woot-elements--right` | opacity, transform | 0.2s, 0.25s | linear, linear | 0s, 0s |

## 🎬 Animações Ativas

| Nome | Duração | Easing | Iteração | Fill Mode |
|------|---------|--------|----------|-----------|
| `skeleton` | 1.8s | ease-in-out | infinite | none |
| `pulse` | 3.5s | cubic-bezier(0.4, 0, 0.6, 1) | infinite | none |
| `draw-main` | 4s | ease-in-out | infinite | none |
| `draw-arrow` | 4s | ease-in-out | infinite | none |
| `blink` | 1s | ease-in-out | infinite | none |
| `marquee` | 30s | linear | infinite | none |
| `marquee-reverse` | 30s | linear | infinite | none |

### @keyframes Detectados

**`@keyframes button-pop`**
```css
  0% { transform: scale(var(--btn-focus-scale,.98)); }
  40% { transform: scale(1.02); }
  100% { transform: scale(1); }
```

**`@keyframes checkmark`**
```css
  0% { background-position-y: 5px; }
  50% { background-position-y: -2px; }
  100% { background-position-y: 0px; }
```

**`@keyframes modal-pop`**
```css
  0% { opacity: 0; }
```

**`@keyframes progress-loading`**
```css
  50% { background-position-x: -115%; }
```

**`@keyframes radiomark`**
```css
  0% { box-shadow: 0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset; }
  50% { box-shadow: 0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset; }
  100% { box-shadow: 0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset; }
```

**`@keyframes rating-pop`**
```css
  0% { transform: translateY(-0.125em); }
  40% { transform: translateY(-0.125em); }
  100% { transform: translateY(0px); }
```

**`@keyframes skeleton`**
```css
  0% { background-position: 150% center; }
  100% { background-position: -50% center; }
```

**`@keyframes toast-pop`**
```css
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
```

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 10186 |
| `cubic-bezier(0.4, 0, 0.2, 1)` | 82 |
| `ease-in-out` | 6 |
| `cubic-bezier(0.4, 0, 0.6, 1)` | 6 |
| `linear` | 2 |
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 1 |
| `linear, linear` | 1 |

## 🖱️ Hover States

**`a.text-[16px].font-fustat`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgba(0, 0, 0, 0)` | `rgb(246, 248, 250)` |
| transform | `none` | `matrix(1.02, 0, 0, 1.02, 0, 0)` |

**`a.text-[16px].font-fustat`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgba(0, 0, 0, 0)` | `rgb(246, 248, 250)` |
| transform | `none` | `matrix(1.02, 0, 0, 1.02, 0, 0)` |

**`a.text-[16px].font-fustat`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgba(0, 0, 0, 0)` | `rgb(246, 248, 250)` |
| transform | `none` | `matrix(1.02, 0, 0, 1.02, 0, 0)` |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ✅ Sim
- **scroll-behavior:** `smooth`
- **Elementos sticky/fixed:** 1

| Elemento | Position | Top |
|----------|----------|-----|
| `div.woot-widget-holder.woot--hide` | fixed | 1520px |

## ✨ Micro-interações

### focus-ring

Custom focus styles

```json
[
  {
    "selector": ".card:focus",
    "outline": "transparent solid 2px",
    "boxShadow": ""
  },
  {
    "selector": ".card:focus-visible",
    "outline": "currentcolor solid 2px",
    "boxShadow": ""
  },
  {
    "selector": ".input input:focus",
    "outline": "transparent solid 2px",
    "boxShadow": ""
  }
]
```

### will-change

Elementos com GPU acceleration

```json
[
  {
    "element": "span.skeleton.clip-text",
    "willChange": "background-position"
  },
  {
    "element": "span.skeleton.clip-text",
    "willChange": "background-position"
  },
  {
    "element": "div.woot-widget-holder.woot--hide",
    "willChange": "transform, opacity"
  }
]
```

## ⏳ Loading Patterns

- **skeleton** — selector: `[class*="skeleton"]`, count: 2
  - animation: `1.8s ease-in-out infinite skeleton`
- **placeholder** — selector: `[class*="placeholder"]`, count: 1
  - animation: `none`
- **pulse** — selector: `[class*="pulse"]`, count: 6
  - animation: `3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse`

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 8916px |
| Altura nav | 99px |
| Altura hero | 733px |
| Número de sections | 10 |
| Scroll depth (x viewport) | 8x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site respeita prefers-reduced-motion ✅

---

## 🔧 Frameworks Detectados

- **Tailwind CSS** — confiança: high (arbitrary values (e.g., top-[117px]), responsive/state modifiers)
- **PrimeReact/Vue/NG** — confiança: high (197 Prime components)
- **Fluent UI** — confiança: high (98 Fluent components)

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)