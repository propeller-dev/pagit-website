# Design System — mercadopago.com.br
> Relatório combinado: tokens visuais (dembrandt) + padrões de interação (Playwright)  
> Extraído em: 2026-03-18  
> URL: https://www.mercadopago.com.br/

---

## 🎨 Cores

### Cores Semânticas

| Papel | Valor |
|-------|-------|

## 📐 Espaçamento

**Base unit:** `8px`

| Valor | Rem | Ocorrências |
|-------|-----|-------------|
| `8px` | `0.50rem` | 2 |
| `12px` | `0.75rem` | 2 |

## 🧩 Componentes

---

## ⚡ Transições CSS

| Elemento | Propriedade | Duração | Easing | Delay |
|----------|-------------|---------|--------|-------|
| `html` | all | 0s | ease | 0s |

## 📈 Timing Functions

| Função | Ocorrências |
|--------|-------------|
| `ease` | 1506 |

## 🖱️ Scroll Behavior

- **Smooth scroll:** ❌ Não
- **scroll-behavior:** `auto`
- **Elementos sticky/fixed:** 0

## ✨ Micro-interações

### focus-ring

Custom focus styles

```json
[
  {
    "selector": ":focus",
    "outline": "none",
    "boxShadow": "rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 126, 181) 0px 0px 0px 3px, rgba(71, 154, 209, 0.3) 0px 0px 0px 5px"
  },
  {
    "selector": ":focus-visible",
    "outline": "none",
    "boxShadow": "rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 126, 181) 0px 0px 0px 3px, rgba(71, 154, 209, 0.3) 0px 0px 0px 5px"
  },
  {
    "selector": ":focus:not(:focus-visible)",
    "outline": "none",
    "boxShadow": "none"
  }
]
```

## 🏗️ Estrutura de Página

| Métrica | Valor |
|---------|-------|
| Altura total | 14392px |
| Altura nav | 3042px |
| Altura hero | 2710px |
| Número de sections | 11 |
| Scroll depth (x viewport) | 13x |
| Back-to-top | ❌ |

## ♿ Acessibilidade de Movimento

Site não implementa prefers-reduced-motion ⚠️

---

> Gerado por: dembrandt (tokens) + interaction-extractor (comportamento)