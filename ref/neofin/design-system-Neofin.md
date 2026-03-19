# Design System — neofin.com.br
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://www.neofin.com.br/

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|
| `primary` | `rgb(110, 44, 201)` |
| `secondary` | `rgba(0, 0, 0, 0)` |

### Paleta Principal

| Hex | Ocorrências | Fontes |
|-----|-------------|--------|
| `#ffffff` | 577 | btn, sub-header |
| `#353f4f` | 505 | tra-menu, header-wrapper |
| `#6e2cc9` | 231 | btn-primary-custom-hero, btn-primary-custom-outline |
| `#6c757d` | 76 | logo-black, stretched-link |
| `#ef4444` | 22 | — |

### CSS Variables (seleção)

```css
--bs-form-valid-border-color: #198754;
--bs-focus-ring-color: rgba(13, 110, 253, 0.25);
--bs-border-color-translucent: rgba(0, 0, 0, 0.175);
--bs-highlight-bg: #fff3cd;
--bs-code-color: #d63384;
--bs-link-hover-color: #0a58ca;
--bs-emphasis-color: #000;
--bs-body-bg: #fff;
--bs-dark-bg-subtle: #ced4da;
--bs-danger-bg-subtle: #f8d7da;
--bs-primary-bg-subtle: #cfe2ff;
--bs-danger-text-emphasis: #58151c;
```

## 🔤 Tipografia

**Família principal:** `Roboto` — fallback: `null`

| Contexto | Tamanho | Peso | Line Height | Letter Spacing |
|----------|---------|------|-------------|----------------|
| heading-1 | 62.424px (3.90rem) | 700 | 1.25 | — |
| heading-1 | 59px (3.69rem) | 700 | 1.00 | -1px |
| heading-1 | 53.176px (3.32rem) | 700 | 1.00 | — |
| heading-1 | 46.24px (2.89rem) | 700 | 1.25 | — |
| heading-1 | 36.992px (2.31rem) | 700 | 1.35 | — |
| heading-1 | 35px (2.19rem) | 700 | 1.25 | — |
| heading-1 | 33.2928px (2.08rem) | 700 | 1.35 | — |
| heading-1 | 30px (1.88rem) | 600 | 1.25 | — |
| heading-1 | 27.744px (1.73rem) | 700 | 1.35 | — |
| heading-1 | 23.12px (1.45rem) | 600 | 1.35 | — |
| heading-1 | 22.1952px (1.39rem) | 600 | 1.67 | — |
| heading-1 | 20.808px (1.30rem) | 400 | 1.67 | — |
| heading-1 | 20.3456px (1.27rem) | 400 | 1.60 | — |
| heading-1 | 20.3456px (1.27rem) | 600 | 1.35 | — |
| heading-1 | 20px (1.25rem) | 400 | 1.60 | — |
| heading-1 | 19.652px (1.23rem) | 700 | 1.00 | — |
| heading-1 | 19.4208px (1.21rem) | 400 | 1.70 | — |
| link | 19.4208px (1.21rem) | 600 | 1.70 | — |
| heading-1 | 19px (1.19rem) | 400 | 1.60 | — |
| heading-1 | 18.496px (1.16rem) | 400 | 1.67 | — |
| link | 18.496px (1.16rem) | 400 | 1.67 | — |
| button | 18.496px (1.16rem) | 500 | 1.00 | — |
| button | 18.496px (1.16rem) | 600 | 1.67 | — |
| heading-1 | 18.496px (1.16rem) | 700 | 1.67 | — |
| button | 18.496px (1.16rem) | 400 | 1.67 | — |
| heading-1 | 18px (1.13rem) | 400 | 1.60 | — |
| heading-1 | 18px (1.13rem) | 600 | 1.35 | — |
| button | 17.5712px (1.10rem) | 600 | 1.67 | — |
| heading-1 | 17.34px (1.08rem) | 400 | 1.35 | — |
| heading-1 | 16.6464px (1.04rem) | 400 | 1.67 | — |
| button | 16px (1.00rem) | 600 | 1.67 | — |
| heading-1 | 15px (0.94rem) | 400 | 1.87 | — |
| link | 14px (0.88rem) | 600 | 3.57 | — |
| caption | 14px (0.88rem) | 600 | 3.57 | — |
| button | 14px (0.88rem) | 700 | 2.00 | — |
| button | 14px (0.88rem) | 500 | 1.67 | — |
| link | 14px (0.88rem) | 700 | 1.67 | — |
| link | 14px (0.88rem) | 500 | 1.67 | — |
| caption | 14px (0.88rem) | 700 | 1.67 | — |
| caption | 14px (0.88rem) | 400 | 1.67 | — |
| caption | 13px (0.81rem) | 500 | 1.67 | — |
| link | 12px (0.75rem) | 400 | 1.67 | — |
| link | 12px (0.75rem) | 700 | 1.67 | — |
| caption | 11px (0.69rem) | 400 | 1.00 | — |

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `2px` | `0.13rem` | 29 |
| `4.624px` | `0.29rem` | 9 |
| `5px` | `0.31rem` | 9 |
| `7px` | `0.44rem` | 24 |
| `10px` | `0.63rem` | 76 |
| `11px` | `0.69rem` | 96 |
| `12px` | `0.75rem` | 32 |
| `14px` | `0.88rem` | 19 |
| `15px` | `0.94rem` | 44 |
| `16px` | `1.00rem` | 17 |
| `18.496px` | `1.16rem` | 23 |
| `20px` | `1.25rem` | 32 |
| `25px` | `1.56rem` | 47 |
| `27.744px` | `1.73rem` | 12 |
| `30px` | `1.88rem` | 21 |

## 🔲 Border Radius

| Valor | Contagem | Elementos | Confiança |
|-------|----------|-----------|-----------|
| `6px` | 54 | ul, a | high |
| `10px` | 10 | button, div | medium |
| `12px` | 40 | button, card, li | high |
| `16px` | 39 | card, div | high |
| `20px` | 4 | card, div | medium |
| `50%` | 37 | div, image, img | high |

## 🌑 Sombras

```css
/* confiança: high, count: 30 */
box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 15px 0px;

/* confiança: high, count: 9 */
box-shadow: rgba(110, 44, 201, 0.3) 0px 4px 15px 0px;

/* confiança: high, count: 6 */
box-shadow: rgba(96, 96, 96, 0.1) 0px 2px 3px 0px;

/* confiança: medium, count: 5 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 25px 0px;

/* confiança: low, count: 2 */
box-shadow: rgba(48, 20, 86, 0.29) -5px 2px 23px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(71, 71, 71, 0.08) 0px 8px 10px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(110, 44, 201, 0.2) 0px 15px 30px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.08) 0px 10px 30px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 40px 0px;

/* confiança: low, count: 1 */
box-shadow: rgba(0, 0, 0, 0.08) 0px 15px 20px 0px;

```

## 🧩 Componentes

### Botões

**Variante 1**
```css
background-color: rgb(82, 33, 150);
color:            rgb(255, 255, 255);
padding:          4px 22px 6px;
border-radius:    4px;
border:           2px solid rgb(55, 3, 138);
font-size:        14px;
font-weight:      700;
```

**Variante 2**
```css
background-color: rgb(255, 255, 255);
color:            rgb(110, 44, 201);
padding:          16px 32px;
border-radius:    12px;
border:           0px rgb(110, 44, 201);
font-size:        16px;
font-weight:      600;
```

**Variante 3**
```css
background-color: rgb(110, 44, 201);
color:            rgb(255, 255, 255);
padding:          14px 32px;
border-radius:    12px;
border:           0px rgb(255, 255, 255);
font-size:        17.5712px;
font-weight:      600;
```

**Variante 4**
```css
background-color: rgb(241, 245, 249);
color:            rgb(100, 116, 139);
padding:          12px 20px;
border-radius:    12px;
border:           1px solid rgb(226, 232, 240);
font-size:        14px;
font-weight:      500;
```

**Variante 5**
```css
background-color: rgba(0, 0, 0, 0);
color:            rgb(110, 44, 201);
padding:          10px 22px;
border-radius:    10px;
border:           2px solid rgb(110, 44, 201);
font-size:        17.5712px;
font-weight:      600;
```

### Links

| Cor | Decoração | Peso |
|-----|-----------|------|
| `rgb(108, 117, 125)` | none | 400 |
| `rgb(53, 63, 79)` | none | 600 |
| `rgb(255, 255, 255)` | none | 700 |
| `rgb(110, 44, 201)` | none | 600 |

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html` | all | 0s | ease | 0s |
| `a` | all | 0.4s | ease-in-out | 0s |
| `div.wsmainfull.menu.clearfix` | all | 0.45s | ease-in-out | 0s |
| `ul.sub-menu` | -webkit-transform, opacity | 0.3s, 0.3s | ease, ease | 0s, 0s |
| `a.h-link` | all | 0.3s | ease-in-out | 0s |
| `div.col-lg-6.visible` | opacity, transform | 0.8s, 0.8s | ease-out, ease-out | 0s, 0s |
| `a.btn-primary-custom-hero` | all | 0.3s | ease | 0s |
| `div.mockup-container.visible` | opacity, transform | 0.5s | ease | 0s |
| `img.lazy.entered.loaded` | filter | 0.3s | ease | 0s |
| `div.comparison-card.traditional-card` | opacity, transform | 0.3s | ease | 0s |
| `img.lazy` | transform | 0.3s | ease | 0s |
| `div.stat-icon` | all | 0.5s | ease | 0s |
| `img.lazy` | transform | 0.5s | ease | 0s |
| `img.client-logo.lazy.entered` | all | 0.4s | ease | 0s |
| `div.blog-card.visible` | opacity, transform | 0.4s | ease | 0s |

## 🎬 Animações Ativas

| Nome | Duração | Easing | Iteração | Fill Mode |
|------|---------|--------|----------|-----------|
| `float` | 6s | ease-in-out | infinite | none |
| `marquee` | 20s | linear | infinite | none |
| `fadeIn` | 0.5s | ease-in-out | 1 | none |

### @keyframes Detectados

**`@keyframes progress-bar-stripes`**
```css
  0% { background-position-x: 1rem; }
```

**`@keyframes spinner-border`**
```css
  100% { transform: rotate(360deg); }
```

**`@keyframes spinner-grow`**
```css
  0% { transform: scale(0); }
  50% { opacity: 1; transform: none; }
```

**`@keyframes placeholder-glow`**
```css
  50% { opacity: 0.2; }
```

**`@keyframes placeholder-wave`**
```css
  100% { mask-position: -200% 0%; }
```

**`@keyframes rotation`**
```css
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
```

**`@keyframes float`**
```css
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px); }
```

**`@keyframes marquee`**
```css
  0% { transform: translateX(0px); }
  100% { transform: translateX(-50%); }
```

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 2043 |
| `ease-in-out` | 140 |
| `ease-out, ease-out` | 22 |
| `ease, ease` | 6 |
| `linear` | 2 |
| `ease-out` | 1 |

## 🖱️ Hover States

**`button.nav-tab`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgb(241, 245, 249)` | `rgb(226, 232, 240)` |
| color | `rgb(100, 116, 139)` | `rgb(71, 85, 105)` |

**`button.nav-tab`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgb(241, 245, 249)` | `rgb(226, 232, 240)` |
| color | `rgb(100, 116, 139)` | `rgb(71, 85, 105)` |

**`button.nav-tab`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| bg | `rgb(241, 245, 249)` | `rgb(226, 232, 240)` |
| color | `rgb(100, 116, 139)` | `rgb(71, 85, 105)` |

**`a.logo-black`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(108, 117, 125)` | `rgb(55, 65, 80)` |

**`a.h-link.wsarrow`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(53, 63, 79)` | `rgb(96, 3, 248)` |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ✅ Sim
- **scroll-behavior:** `smooth`
- **Elementos sticky/fixed:** 9

| Elemento | Position | Top |
|----------|----------|-----|
| `div.header-wrapper` | fixed | 0px |
| `a.ico-whatsapp-scroll` | fixed | 827px |
| `div.modal.fade` | fixed | 0px |
| `div.go2933276541.go2369186930` | fixed | 0px |
| `div.go2933276541.go1348078617` | fixed | 900px |
| `div.go2417249464.go613305155` | fixed | 0px |
| `div.go2417249464.go471583506` | fixed | 0px |
| `div.go2417249464.go3921366393` | fixed | 900px |
| `div.go2417249464.go3967842156` | fixed | 900px |

## ✨ Micro-interações

### focus-ring

Custom focus styles

```json
[
  {
    "selector": "button:focus:not(:focus-visible)",
    "outline": "0px",
    "boxShadow": ""
  },
  {
    "selector": ".form-control:focus",
    "outline": "0px",
    "boxShadow": "rgba(13, 110, 253, 0.25) 0px 0px 0px 0.25rem"
  },
  {
    "selector": ".form-control-plaintext:focus",
    "outline": "0px",
    "boxShadow": ""
  }
]
```

## ⏳ Loading Patterns

- **placeholder** — selector: `[class*="placeholder"]`, count: 1
  - animation: `none`

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 13522px |
| Altura nav | 0px |
| Altura hero | 594px |
| Número de sections | 12 |
| Scroll depth (x viewport) | 15x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site respeita prefers-reduced-motion ✅

---

## 🔧 Frameworks Detectados

- **Bootstrap** — confiança: high (grid system (container + row + col), button variants)
- **PrimeReact/Vue/NG** — confiança: high (11 Prime components)
- **Fluent UI** — confiança: high (6 Fluent components)
- **Quasar** — confiança: high (45 q- components)

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)