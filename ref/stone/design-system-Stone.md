# Design System — stone.com.br
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://www.stone.com.br/

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|
| `primary` | `rgb(0, 168, 104)` |

### Paleta Principal

| Hex | Ocorrências | Fontes |
|-----|-------------|--------|
| `#e6ecf2` | 1445 | cc-link, relative |
| `#20252a` | 1166 | cc-link, relative |
| `#67707d` | 60 | font-body, cursor-pointer |
| `#008e5a` | 54 | items-center, size-fit |

### CSS Variables (seleção)

```css
--tw-ring-color: rgba(59,130,246,.5);
```

## 🔤 Tipografia

**Família principal:** `Sharon Display` — fallback: `null`

| Contexto | Tamanho | Peso | Line Height | Letter Spacing |
|----------|---------|------|-------------|----------------|
| heading-1 | 48px (3.00rem) | 700 | 1.17 | — |
| heading-1 | 48px (3.00rem) | 900 | 1.17 | — |
| heading-1 | 40px (2.50rem) | 700 | 1.20 | — |
| heading-1 | 32px (2.00rem) | 700 | 1.19 | — |
| heading-1 | 32px (2.00rem) | 900 | 1.19 | — |
| heading-1 | 32px (2.00rem) | 500 | 1.25 | — |
| heading-1 | 28px (1.75rem) | 700 | 1.29 | — |
| heading-1 | 24px (1.50rem) | 700 | 1.33 | — |
| heading-1 | 24px (1.50rem) | 600 | 1.33 | — |
| heading-1 | 20px (1.25rem) | 400 | 1.30 | — |
| heading-1 | 20px (1.25rem) | 700 | 1.40 | — |
| heading-1 | 20px (1.25rem) | 600 | 1.40 | — |
| heading-1 | 18px (1.13rem) | 400 | 1.44 | — |
| button | 18px (1.13rem) | 500 | 1.50 | — |
| heading-1 | 18px (1.13rem) | 700 | 1.50 | — |
| heading-1 | 16px (1.00rem) | 400 | 1.50 | — |
| link | 16px (1.00rem) | 400 | 1.50 | — |
| button | 16px (1.00rem) | 500 | 1.31 | — |
| heading-1 | 16px (1.00rem) | 500 | 1.31 | — |
| button | 16px (1.00rem) | 700 | 1.50 | — |
| heading-1 | 16px (1.00rem) | 700 | 1.50 | — |
| link | 16px (1.00rem) | 700 | 1.50 | — |
| heading-1 | 16px (1.00rem) | 600 | 1.50 | — |
| button | 16px (1.00rem) | 400 | 1.50 | — |
| caption | 14px (0.88rem) | 600 | 1.43 | — |
| link | 14px (0.88rem) | 600 | 1.43 | — |
| caption | 14px (0.88rem) | 400 | 1.43 | — |
| caption | 14px (0.88rem) | 700 | 1.86 | — |
| caption | 12px (0.75rem) | 400 | 1.75 | — |
| caption | 12px (0.75rem) | 700 | 1.50 | — |

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `3.2px` | `0.20rem` | 2 |
| `4px` | `0.25rem` | 30 |
| `7px` | `0.44rem` | 2 |
| `8px` | `0.50rem` | 153 |
| `12px` | `0.75rem` | 5 |
| `16px` | `1.00rem` | 25 |
| `24px` | `1.50rem` | 93 |
| `32px` | `2.00rem` | 2 |
| `40px` | `2.50rem` | 21 |
| `72px` | `4.50rem` | 2 |
| `80px` | `5.00rem` | 19 |
| `120px` | `7.50rem` | 1 |
| `200px` | `12.50rem` | 1 |

## 🔲 Border Radius

| Valor | Contagem | Elementos | Confiança |
|-------|----------|-----------|-----------|
| `0px 0px 24px 24px` | 6 | article | medium |
| `8px` | 14 | div | high |
| `16px` | 11 | div, article, details | high |
| `24px` | 19 | button, img, a | high |
| `24px 24px 0px` | 5 | div | medium |
| `32px` | 15 | a, button | high |
| `40px` | 15 | div, img | high |
| `9999px` | 14 | label, button, div | high |

## 🌑 Sombras

```css
/* confiança: high, count: 10 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;

/* confiança: high, count: 6 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(66, 74, 83, 0.3) 0px 8px 50px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(103, 116, 129, 0.15) 0px 2px 8px 0px;

```

## 🧩 Componentes

### Botões

**Variante 1**
```css
background-color: rgb(0, 168, 104);
color:            rgb(255, 255, 255);
padding:          24px 16px;
border-radius:    24px;
border:           0px rgb(66, 236, 154);
font-size:        16px;
font-weight:      500;
```

**Variante 2**
```css
background-color: rgb(255, 255, 255);
color:            rgb(32, 37, 42);
padding:          24px 16px;
border-radius:    24px;
border:           1px solid rgb(188, 200, 214);
font-size:        16px;
font-weight:      500;
```

**Variante 3**
```css
background-color: rgba(0, 0, 0, 0);
color:            rgb(32, 37, 42);
padding:          24px 16px;
border-radius:    24px;
border:           1px solid rgb(188, 200, 214);
font-size:        16px;
font-weight:      500;
```

**Variante 4**
```css
background-color: rgb(0, 142, 90);
color:            rgb(255, 255, 255);
padding:          0px 24px;
border-radius:    32px;
border:           0px solid rgb(230, 236, 242);
font-size:        16px;
font-weight:      700;
```

**Variante 5**
```css
background-color: rgb(49, 56, 63);
color:            rgb(255, 255, 255);
padding:          0px;
border-radius:    9999px;
border:           0px solid rgb(230, 236, 242);
font-size:        16px;
font-weight:      700;
```

### Links

| Cor | Decoração | Peso |
|-----|-----------|------|
| `rgb(31, 181, 132)` | underline | 400 |
| `rgb(255, 255, 255)` | none | 500 |
| `rgb(32, 37, 42)` | none | 500 |
| `rgb(66, 74, 83)` | none | 400 |

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html` | all | 0s | ease | 0s |
| `div.cc-revoke.cc-bottom.cc-animate` | transform, -webkit-transform | 1s, 1s | ease, ease | 0s, 0s |
| `div.cc-window.cc-banner.cc-type-opt-in` | opacity | 1s | ease | 0s |
| `button.cc-link.cmp-pref-link` | all | 0.003s | ease-in-out | 0s |
| `div.h-full.px-2.z-50` | color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter | 0.15s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `article.invisible.absolute.top-full` | color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter | 0.2s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.invisible.absolute.inset-0` | opacity | 0.5s | cubic-bezier(0, 0, 0.2, 1) | 0s |
| `aside.absolute.inset-y-0.right-0` | transform | 0.5s | cubic-bezier(0, 0, 0.2, 1) | 0s |
| `summary.flex.items-center.justify-between` | all | 0.2s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.transition-transform.duration-300` | transform | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `div.grid.transition-[grid-template-rows].duration-300` | grid-template-rows | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `dialog.group.z-[999].items-center` | all | 0.2s | cubic-bezier(0, 0, 0.2, 1) | 0s |
| `article.col-start-1.row-start-1.scale-90` | color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter | 0.2s | cubic-bezier(0, 0, 0.2, 1) | 0s |
| `div.flex.items-center.gap-2` | all | 0.15s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |

## 🎬 Animações Ativas

| Nome | Duração | Easing | Iteração | Fill Mode |
|------|---------|--------|----------|-----------|
| `bounce` | 1.5s | ease-in-out | infinite | none |
| `shake` | 5s | ease | infinite | none |

### @keyframes Detectados

**`@keyframes pulse`**
```css
  50% { opacity: 0.5; }
```

**`@keyframes marquee`**
```css
  100% { transform: translateX(-50%); }
```

**`@keyframes spin`**
```css
  100% { transform: rotate(1turn); }
```

**`@keyframes shake`**
```css
  0% { transform: translate(0px); }
  80% { transform: translateY(4px) rotate(0deg); }
  82% { transform: translateY(-4px) rotate(0deg); }
  84% { transform: translateY(4px) rotate(0deg); }
  86% { transform: translateY(-4px) rotate(0deg); }
  88% { transform: translateY(0px) rotate(0deg); }
  90% { transform: translateY(-4px) rotate(0deg); }
  92% { transform: translateY(4px) rotate(0deg); }
  94% { transform: translateY(-4px) rotate(0deg); }
  96% { transform: translateY(4px) rotate(0deg); }
  98% { transform: translateY(-4px) rotate(0deg); }
  100% { transform: translateY(0px) rotate(0deg); }
```

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 4012 |
| `cubic-bezier(0.4, 0, 0.2, 1)` | 47 |
| `cubic-bezier(0, 0, 0.2, 1)` | 4 |
| `ease-in-out` | 2 |
| `ease, ease` | 1 |

## 🖱️ Hover States

**`a.btn.btn-large`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| transform | `matrix(1, 0, 0, 1, 0, 3.95522)` | `matrix(1, 0, 0, 1, 0, 3.99419)` |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ❌ Não
- **scroll-behavior:** `auto`
- **Elementos sticky/fixed:** 6

| Elemento | Position | Top |
|----------|----------|-----|
| `div.cc-revoke.cc-bottom` | fixed | auto |
| `div.cc-window.cc-banner` | fixed | 982px |
| `div.cmp-loader` | fixed | calc(50% - 50px) |
| `a.btn.btn-large` | fixed | 984px |
| `dialog.group.z-[999]` | fixed | 0px |
| `aside.inline-flex.flex-1` | sticky | 80px |

## ✨ Micro-interações

### focus-ring

Custom focus styles

```json
[
  {
    "selector": ".focus\\:outline-none:focus",
    "outline": "transparent solid 2px",
    "boxShadow": ""
  }
]
```

## ⏳ Loading Patterns

- **loader** — selector: `[class*="loader"]`, count: 1
  - animation: `1.5s ease-in-out infinite bounce`

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 9179px |
| Altura nav | 72px |
| Altura hero | 98px |
| Número de sections | 31 |
| Scroll depth (x viewport) | 8x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site não implementa prefers-reduced-motion ⚠️

---

## 🔧 Frameworks Detectados

- **Tailwind CSS** — confiança: high (arbitrary values (e.g., top-[117px]), responsive/state modifiers)
- **DaisyUI** — confiança: high (Tailwind + 0 DaisyUI components)
- **PrimeReact/Vue/NG** — confiança: high (466 Prime components)
- **Fluent UI** — confiança: high (246 Fluent components)

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)