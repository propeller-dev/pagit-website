# Design System — stripe.com
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://stripe.com/

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|
| `primary` | `rgb(83, 58, 253)` |
| `secondary` | `rgba(255, 255, 255, 0)` |

### Paleta Principal

| Hex | Ocorrências | Fontes |
|-----|-------------|--------|
| `#000000` | 2039 | hds-mode, hds-button-group |
| `#533afd` | 915 | hds-link, hds-button |
| `#50617a` | 310 | hds-text, hds-link |
| `#061b31` | 293 | hds-button, hds-heading |
| `#ffffff` | 181 | hds-button, hds-mode |
| `#0000ee` | 86 | book-button |
| `#7f7dfc` | 37 | — |
| `#ff6118` | 28 | — |

### CSS Variables (seleção)

```css
--hds-canary-color-border-focus: #635bff;
--accent-gradient-color-stop-1: #bdb4ff;
--hds-color-util-white: #fff;
--hds-color-util-text-quiet: #7d8ba4;
--hds-color-util-text-inactive: #95a4ba;
--hds-color-util-success-600: #006f3a;
--hds-color-util-success-400: #00b261;
--hds-color-util-success-100: #b6f2c7;
--hds-color-util-neutral-200: #bac8da;
--hds-color-util-error-600: #a01400;
--hds-color-util-error-500: #d8351e;
--hds-color-util-error-400: #f3432a;
```

## 🔤 Tipografia

**Família principal:** `sohne-var` — fallback: `SF Pro Display`

| Contexto | Tamanho | Peso | Line Height | Letter Spacing |
|----------|---------|------|-------------|----------------|
| heading-1 | 56px (3.50rem) | 300 | 1.03 | -1.4px |
| heading-1 | 48px (3.00rem) | 300 | 1.15 | -0.96px |
| heading-1 | 32px (2.00rem) | 300 | 1.10 | -0.64px |
| heading-1 | 26px (1.63rem) | 400 | — | — |
| heading-1 | 26px (1.63rem) | 300 | 1.12 | -0.26px |
| heading-1 | 22px (1.38rem) | 300 | 1.10 | -0.22px |
| heading-1 | 18px (1.13rem) | 300 | 1.40 | — |
| link | 16px (1.00rem) | 400 | — | — |
| button | 16px (1.00rem) | 400 | 1.00 | — |
| heading-1 | 16px (1.00rem) | 400 | — | — |
| heading-1 | 16px (1.00rem) | 300 | 1.40 | — |
| link | 16px (1.00rem) | 300 | 1.40 | — |
| heading-1 | 15px (0.94rem) | 400 | — | — |
| button | 14px (0.88rem) | 400 | 1.00 | — |
| link | 14px (0.88rem) | 400 | 1.00 | — |
| caption | 14px (0.88rem) | 400 | 1.00 | — |
| caption | 14px (0.88rem) | 300 | — | -0.42px |
| caption | 12px (0.75rem) | 400 | — | — |
| caption | 12px (0.75rem) | 300 | 1.45 | — |
| caption | 11px (0.69rem) | 300 | 1.45 | -0.33px |
| caption | 10px (0.63rem) | 400 | 1.15 | -0.3px |
| caption | 9px (0.56rem) | 300 | — | — |
| caption | 8px (0.50rem) | 300 | 1.07 | — |

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `1px` | `0.06rem` | 7 |
| `2px` | `0.13rem` | 46 |
| `4px` | `0.25rem` | 13 |
| `6px` | `0.38rem` | 36 |
| `8px` | `0.50rem` | 18 |
| `9px` | `0.56rem` | 6 |
| `10px` | `0.63rem` | 16 |
| `11px` | `0.69rem` | 18 |
| `12px` | `0.75rem` | 15 |
| `14px` | `0.88rem` | 7 |
| `14.5px` | `0.91rem` | 25 |
| `15.5px` | `0.97rem` | 33 |
| `16px` | `1.00rem` | 16 |
| `16.5px` | `1.03rem` | 9 |
| `24px` | `1.50rem` | 8 |

## 🔲 Border Radius

| Valor | Contagem | Elementos | Confiança |
|-------|----------|-----------|-----------|
| `1px` | 31 | div | high |
| `4px` | 72 | button, Sign in, input | high |
| `5px` | 6 | card | medium |
| `6px` | 53 | nav, Toggle navigation menu, div | high |
| `8px` | 4 | div | medium |

## 🌑 Sombras

```css
/* confiança: medium, count: 3 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 20.187px 40.374px -20.187px;

/* confiança: low, count: 2 */
box-shadow: rgba(50, 50, 93, 0.12) 0px 16px 32px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px;

/* confiança: low, count: 1 */
box-shadow: rgba(23, 23, 23, 0.08) 0px 15px 35px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(23, 23, 23, 0.06) 0px 3px 6px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(55, 39, 37, 0.15) 0px 10px 50px -7.79776px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.05) 0px 12px 15px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 5px 9px 0px;

```

## 🧩 Componentes

### Botões

**Variante 1**
```css
background-color: rgba(0, 0, 0, 0);
color:            rgb(83, 58, 253);
padding:          10.5px 20px 13.5px;
border-radius:    4px;
border:           1px solid rgb(255, 255, 255);
font-size:        14px;
font-weight:      400;
```

**Variante 2**
```css
background-color: rgb(83, 58, 253);
color:            rgb(255, 255, 255);
padding:          11.5px 20px 14.5px;
border-radius:    4px;
border:           0px rgb(255, 255, 255);
font-size:        14px;
font-weight:      400;
```

**Variante 3**
```css
background-color: rgba(255, 255, 255, 0.65);
color:            rgb(83, 58, 253);
padding:          14.5px 24px 15.5px;
border-radius:    4px;
border:           1px solid rgb(185, 185, 249);
font-size:        16px;
font-weight:      400;
```

**Variante 4**
```css
background-color: rgb(255, 224, 209);
color:            rgb(255, 97, 24);
padding:          0px;
border-radius:    4px;
border:           0px rgb(255, 97, 24);
font-size:        10px;
font-weight:      400;
```

**Variante 5**
```css
background-color: rgb(0, 214, 111);
color:            rgb(0, 0, 0);
padding:          0px;
border-radius:    4px;
border:           0px rgb(0, 0, 0);
font-size:        16px;
font-weight:      400;
```

### Links

| Cor | Decoração | Peso |
|-----|-----------|------|
| `rgb(83, 58, 253)` | none | 400 |
| `rgb(6, 27, 49)` | none | 400 |
| `rgb(255, 255, 255)` | none | 400 |
| `rgb(125, 139, 164)` | none | 300 |
| `rgb(0, 0, 0)` | none | 400 |
| `rgb(0, 0, 238)` | none | 400 |

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html` | all | 0s | ease | 0s |
| `a.hds-link.navigation-menu-home-link` | opacity | 0.24s | cubic-bezier(0.45, 0.05, 0.55, 0.95) | 0s |
| `path` | fill | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 0s |
| `div.hds-navigation-menu__content.navigation-menu-content` | opacity, transform | 0s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| `button.hds-button.hds-navigation-menu__trigger.hds-button--transparent` | background-color, color, border | 0.3s, 0.3s, 0.3s | cubic-bezier(0.25, 1, 0.5, 1), cubic-bezier(0.25, 1, 0.5, 1), cubic-bezier(0.25, 1, 0.5, 1) | 0s, 0s, 0s |
| `path.navigation__chevron-down-icon__left` | transform | 0.25s | cubic-bezier(0.6, 0, 0.2, 0.5) | 0s |
| `svg.hds-icon.hds-icon-hover-arrow` | stroke | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 0s |
| `path` | opacity | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 0s |
| `path` | transform | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 0s |
| `section.navigation-menu-header` | opacity | 0.25s | ease-in | 0s |
| `a.hds-link.navigation-item__contact-sales-mobile` | opacity, color | 0.25s, 0.3s | ease-in-out, cubic-bezier(0.25, 1, 0.5, 1) | 0s, 0s |
| `button.hds-ui-button.hds-navigation-menu__trigger.navigation-hamburger-button` | background-color | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 0s |
| `rect.navigation-hamburger__line.line-1` | transform, opacity | 0.25s, 0.25s | ease-in-out, ease-in-out | 0s, 0s |
| `a.hds-button.navigation-cta-button.navigation-item__sign-in` | color, background-color, border-color | 0.24s | cubic-bezier(0.45, 0.05, 0.55, 0.95) | 0s |
| `div.hero-wave-animation__static` | opacity | 0.25s | linear | 0s |

## 🎬 Animações Ativas

| Nome | Duração | Easing | Iteração | Fill Mode |
|------|---------|--------|----------|-----------|
| `detect-scroll` | auto | linear | 1 | none |
| `UniversalChatInitializer__ctaEntrance` | 0.3s | cubic-bezier(0.25, 1, 0.5, 1) | 1 | none |

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 6170 |
| `cubic-bezier(0.25, 1, 0.5, 1)` | 432 |
| `cubic-bezier(0.165, 0.84, 0.44, 1)` | 55 |
| `linear` | 51 |
| `cubic-bezier(0.25, 1, 0.5, 1), cubic-bezier(0.25, 1, 0.5, 1), cubic-bezier(0.25, 1, 0.5, 1)` | 45 |
| `cubic-bezier(0.4, 0, 0.2, 1)` | 27 |
| `cubic-bezier(0.65, 0, 0.35, 1)` | 26 |
| `cubic-bezier(0.16, 1, 0.3, 1)` | 20 |
| `cubic-bezier(0.3, 0, 0.2, 1)` | 16 |
| `cubic-bezier(0.33, 1, 0.68, 1)` | 11 |
| `cubic-bezier(0.6, 0, 0.2, 0.5)` | 8 |
| `cubic-bezier(0.9, 0, 0.1, 1)` | 7 |
| `steps(1)` | 6 |
| `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | 5 |
| `ease-out` | 5 |

## 🖱️ Hover States

**`button.hds-button.hds-navigation-menu__trigger`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(94, 110, 135)` | `rgb(6, 27, 49)` |

**`button.hds-button.hds-navigation-menu__trigger`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(100, 116, 141)` | `rgb(6, 27, 49)` |

**`button.hds-button.hds-navigation-menu__trigger`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(100, 116, 141)` | `rgb(6, 27, 49)` |

**`a.hds-link.navigation-menu-home-link`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(83, 58, 253)` | `rgb(46, 43, 140)` |

**`a.hds-button.hds-navigation-menu__trigger`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(100, 116, 141)` | `rgb(6, 27, 49)` |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ❌ Não
- **scroll-behavior:** `auto`
- **Elementos sticky/fixed:** 4

| Elemento | Position | Top |
|----------|----------|-----|
| `div.UniversalChatInitializer__cta` | fixed | 812px |
| `iframe` | fixed | 192px |
| `iframe.ThirdPartyFrame` | fixed | 14740.7px |
| `iframe.ThirdPartyFrame` | fixed | 14740.7px |

## ✨ Micro-interações

### will-change

Elementos com GPU acceleration

```json
[
  {
    "element": "div.modular-solutions-bento-card__dialog-entry-wrapper",
    "willChange": "background-color"
  },
  {
    "element": "div.modular-solutions-bento-card__border-color-gradient",
    "willChange": "transform"
  },
  {
    "element": "div.modular-solutions-bento-card__dialog-entry-wrapper",
    "willChange": "background-color"
  }
]
```

## ⏳ Loading Patterns

- **placeholder** — selector: `[class*="placeholder"]`, count: 9
  - animation: `none`

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 14741px |
| Altura nav | 76px |
| Altura hero | 0px |
| Número de sections | 15 |
| Scroll depth (x viewport) | 16x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site não implementa prefers-reduced-motion ⚠️

---

## 🔧 Frameworks Detectados

- **Fluent UI** — confiança: high (49 Fluent components)
- **Element Plus/UI** — confiança: high (57 el- components)

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)