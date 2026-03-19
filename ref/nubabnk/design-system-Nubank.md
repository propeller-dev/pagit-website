# Design System — nubank.com.br
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://nubank.com.br/home2

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|

### Paleta Principal

| Hex | Ocorrências | Fontes |
|-----|-------------|--------|
| `#a2a2a2` | 209 | carousel-manual-navigation-pre, chakra-link |
| `#ffffff` | 202 | chakra-button, chakra-link |
| `#820ad1` | 80 | chakra-link, chakra-button |

### CSS Variables (seleção)

```css
--colors-bordersColors-colorBrand: #ECD9FF;
--colors-bordersColors-accentFocus: #D2A5FF;
--colors-bordersColors-color: #E9DFF6;
--colors-content-feedback-attention: #9B5A00;
--colors-content-feedback-critical: #D01D1C;
--colors-content-feedback-success: #0C7A3A;
--colors-content-states-pressedActive: #320850;
--colors-content-states-hovered: #490B75;
--colors-content-states-subtle: #AA68FF;
--colors-content-linkHover: #3E1874;
--colors-content-linkActive: #17092C;
--colors-content-base: #000000;
```

## 🔤 Tipografia

**Família principal:** `graphikMedium` — fallback: `graphikMedium Fallback, arial, helvetica`

| Contexto | Tamanho | Peso | Line Height | Letter Spacing |
|----------|---------|------|-------------|----------------|
| heading-1 | 56px (3.50rem) | 500 | 1.10 | -1.68px |
| heading-1 | 48px (3.00rem) | 500 | 1.10 | -1.44px |
| heading-1 | 36px (2.25rem) | 500 | 1.20 | -0.72px |
| link | 24px (1.50rem) | 500 | 1.30 | -0.44px |
| button | 24px (1.50rem) | 400 | 1.50 | — |
| heading-1 | 22px (1.38rem) | 500 | 1.30 | -0.44px |
| link | 22px (1.38rem) | 500 | 1.30 | -0.44px |
| button | 20px (1.25rem) | 400 | 1.50 | — |
| heading-1 | 20px (1.25rem) | 500 | 1.30 | -0.2px |
| heading-1 | 18px (1.13rem) | 500 | 2.22 | — |
| link | 18px (1.13rem) | 400 | 2.22 | — |
| heading-1 | 18px (1.13rem) | 400 | 1.44 | — |
| link | 16px (1.00rem) | 500 | 1.00 | — |
| button | 16px (1.00rem) | 500 | 1.00 | — |
| heading-1 | 16px (1.00rem) | 400 | 1.50 | — |
| heading-1 | 16px (1.00rem) | 500 | 1.50 | — |
| button | 16px (1.00rem) | 400 | 1.50 | — |
| link | 16px (1.00rem) | 400 | 1.50 | — |
| link | 14px (0.88rem) | 500 | 1.50 | -0.14px |
| button | 14px (0.88rem) | 500 | 1.50 | -0.14px |
| caption | 12px (0.75rem) | 400 | 1.66 | — |

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `2px` | `0.13rem` | 1 |
| `4px` | `0.25rem` | 18 |
| `8px` | `0.50rem` | 36 |
| `12px` | `0.75rem` | 1 |
| `16px` | `1.00rem` | 20 |
| `18px` | `1.13rem` | 2 |
| `24px` | `1.50rem` | 42 |
| `32px` | `2.00rem` | 13 |
| `40px` | `2.50rem` | 4 |
| `48px` | `3.00rem` | 11 |
| `64px` | `4.00rem` | 8 |
| `80px` | `5.00rem` | 10 |
| `96px` | `6.00rem` | 1 |
| `112px` | `7.00rem` | 3 |
| `136px` | `8.50rem` | 1 |

## 🔲 Border Radius

| Valor | Contagem | Elementos | Confiança |
|-------|----------|-----------|-----------|
| `0px 0px 24px 24px` | 5 | div | medium |
| `8px` | 7 | button | medium |
| `12px` | 16 | Me Roubaram abre em uma nova janela, Canal de Denúncias abre em uma nova janela, Central de Proteção | high |
| `24px` | 23 | div, Digite seu CPF, image | high |
| `32px` | 11 | Dois cartões Nubank sobrepostos deslizam entre si em movimento. Em segundo plano, fundo preto., image, div | high |
| `999px` | 35 | Menu Nubank, Menu Nubank Ultravioleta, Menu Nu Empresas | high |

## 🧩 Componentes

### Botões

**Variante 1**
```css
background-color: rgba(0, 0, 0, 0);
color:            rgb(0, 0, 0);
padding:          0px;
border-radius:    999px;
border:           2px solid rgba(0, 0, 0, 0);
font-size:        20px;
font-weight:      400;
```

**Variante 2**
```css
background-color: rgb(130, 10, 209);
color:            rgb(255, 255, 255);
padding:          0px 24px;
border-radius:    999px;
border:           ;
font-size:        14px;
font-weight:      500;
```

**Variante 3**
```css
background-color: rgb(162, 162, 162);
color:            rgb(0, 0, 0);
padding:          0px;
border-radius:    8px;
border:           0px solid rgb(0, 0, 0);
font-size:        16px;
font-weight:      400;
```

**Variante 4**
```css
background-color: rgb(0, 0, 0);
color:            rgb(0, 0, 0);
padding:          0px;
border-radius:    8px;
border:           0px solid rgb(0, 0, 0);
font-size:        16px;
font-weight:      400;
```

**Variante 5**
```css
background-color: rgba(202, 202, 202, 0.3);
color:            rgb(0, 0, 0);
padding:          0px;
border-radius:    999px;
border:           0px solid rgb(143, 143, 157);
font-size:        16px;
font-weight:      400;
```

### Links

| Cor | Decoração | Peso |
|-----|-----------|------|
| `rgb(130, 10, 209)` | none | 500 |
| `rgb(0, 0, 0)` | none | 500 |
| `rgb(255, 255, 255)` | none | 500 |
| `rgb(162, 162, 162)` | none | 400 |

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html.__variable_2c76d6.__variable_94be80.__variable_2f67ac` | all | 0s | ease | 0s |
| `div.swiper-wrapper` | transform | 0s | ease | 0s |
| `div.swiper-slide.swiper-slide-visible.swiper-slide-fully-visible` | transform, opacity, height | 0s | ease | 0s |
| `label.chakra-form__label.css-uvho5g` | all | 0.15s | ease-out | 0s |
| `div.css-1elzuo1` | all | 1s | ease | 0s |
| `div.swiper-slide.swiper-slide-visible.swiper-slide-fully-visible` | opacity | 0s | ease | 0s |
| `div.css-1mse5is` | width | 0.35s | cubic-bezier(0.21, 0, 0.25, 0.99) | 0s |
| `div.css-18uonoj` | all | 0.65s | ease | 0s |

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 2028 |
| `cubic-bezier(0.21, 0, 0.25, 0.99)` | 4 |
| `ease-out` | 2 |

## 🖱️ Hover States

**`a.chakra-link.css-1et45qw`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(0, 0, 0)` | `rgb(130, 10, 209)` |

**`a.chakra-link.css-1et45qw`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(0, 0, 0)` | `rgb(130, 10, 209)` |

**`a.chakra-link.css-1et45qw`**

| Propriedade | Antes | Depois |
|-------------|-------|--------|
| color | `rgb(0, 0, 0)` | `rgb(130, 10, 209)` |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ✅ Sim
- **scroll-behavior:** `smooth`
- **Elementos sticky/fixed:** 10

| Elemento | Position | Top |
|----------|----------|-----|
| `header.css-x8sfzv` | fixed | 0px |
| `div.css-110tpna` | fixed | -100% |
| `div.css-110tpna` | fixed | -100% |
| `div.css-110tpna` | fixed | -100% |
| `div.css-110tpna` | fixed | -100% |
| `div.css-110tpna` | fixed | -100% |
| `div.chakra-slide` | fixed | 561px |
| `div` | fixed | 0px |
| `div` | fixed | 0px |
| `div` | fixed | 0px |

## ✨ Micro-interações

### focus-ring

Custom focus styles

```json
[
  {
    "selector": "[data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled])",
    "outline": "none",
    "boxShadow": "none"
  },
  {
    "selector": "[data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled])",
    "outline": "none",
    "boxShadow": "none"
  },
  {
    "selector": "[data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled])",
    "outline": "none",
    "boxShadow": "none"
  }
]
```

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 6122px |
| Altura nav | 80px |
| Altura hero | 792px |
| Número de sections | 7 |
| Scroll depth (x viewport) | 8x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site não implementa prefers-reduced-motion ⚠️

---

## 🔧 Frameworks Detectados

- **Chakra UI** — confiança: high (269 Chakra components)

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)