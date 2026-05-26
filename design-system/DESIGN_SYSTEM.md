# Pagit — Design System

> **Pagit** — _"Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você."_
> SaaS brasileiro de automação de cobrança, recorrência e gestão de recebíveis para PMEs.

Este documento consolida o sistema visual e de conteúdo da Pagit num único lugar.
É a referência canônica para qualquer designer, redator ou engenheiro que queira
produzir algo que se pareça com Pagit.

---

## Sumário

- [1. Fontes e referências](#1-fontes-e-referências)
- [2. Princípios](#2-princípios)
- [3. Fundamentos de conteúdo](#3-fundamentos-de-conteúdo)
- [4. Cores](#4-cores)
- [5. Tipografia](#5-tipografia)
- [6. Espaçamento, raios e sombras](#6-espaçamento-raios-e-sombras)
- [7. Animação e estados](#7-animação-e-estados)
- [8. Componentes](#8-componentes)
- [9. Iconografia](#9-iconografia)
- [10. Logo e marca](#10-logo-e-marca)
- [11. Layout e containers](#11-layout-e-containers)
- [12. App vs marketing — o split intencional](#12-app-vs-marketing--o-split-intencional)
- [13. Anti-padrões](#13-anti-padrões)
- [14. Ressalvas](#14-ressalvas)

---

## 1. Fontes e referências

| Repositório | Papel | URL |
|---|---|---|
| `propeller-dev/pagit-website` | Site institucional (`pagit.com.br`) — landing, styleguide, SVGs da marca | <https://github.com/propeller-dev/pagit-website> |
| `propeller-dev/pagit` | Produto (`dash.pagit.com.br`) — Next.js 15 + shadcn/ui | <https://github.com/propeller-dev/pagit> |

Arquivos-fonte usados:

- `pagit-website/app/globals.css` — tokens Tailwind v4 (`@theme`)
- `pagit-website/lib/brand-tokens.ts` — mirror em TS dos tokens
- `pagit-website/docs/design/moodboard.md` — direção visual aprovada
- `pagit-website/components/ui/*` — Button, Card, Badge, Input, Logo
- `pagit-website/components/icons/index.tsx` — set duotone de 20 ícones
- `pagit-website/messages/pt-BR.json` — copy oficial PT-BR
- `pagit-website/app/[locale]/styleguide/page.tsx` — styleguide interno
- `pagit/frontend/src/components/ui/*` — primitivos shadcn do produto
- `pagit/frontend/src/features/overview/components/overview.tsx` — grid de KPIs
- `pagit/frontend/src/features/charges/components/charge-status-badge.tsx` — cores de status do app

---

## 2. Princípios

1. **Claro domina, escuro pontua.** Base clara generosa; uma única "dark section" cria contraste sem virar modal permanente.
2. **Emerald é âncora, não decoração.** O primary aparece em CTAs, estados ativos, ícones e gradientes sutis — não em fundos chapados grandes.
3. **Respiro > densidade.** Padding generoso, hierarquia tipográfica forte. Ninguém lê um site apertado.
4. **Motion assina presença, não distrai.** Entradas em fade+translate, stagger em listas, hover com micro-interação. Sem parallax dramático nem scroll hijacking.
5. **Duotone consistente em ícones.** Ink (ink/800) + emerald (brand/600) — sem pacote genérico Lucide chapado.

---

## 3. Fundamentos de conteúdo

A tese da voz da Pagit é uma só: **receber dinheiro não deveria ser o segundo emprego do empreendedor**. Isso molda toda a copy.

### Idioma e tratamento

- **Português brasileiro (pt-BR)** é o default. Inglês e espanhol existem como rotas placeholder.
- Sempre **"você" informal**. A Pagit fala com o empreendedor, não com o comprador corporativo.
- Tom: direto, confiante, honesto.

### Casing

- **Sentence case** em títulos: _"Receber em dia virou a parte chata do seu negócio?"_
- **UPPERCASE** com `letter-spacing: 0.08em` em emerald nos eyebrows acima de section titles.
- UI labels, botões e metadata em sentence case — nunca `Title Case Like This`.

### Disciplina regulatória (inegociável)

A Pagit **nunca** usa estes termos como nome de produto — são regulamentados pelo Banco Central:

- ❌ "Pix Automático" (Resolução BCB 505/2025, só PSPs autorizados)
- ❌ "Pix Parcelado" (linha de crédito regulada)

Use no lugar:

- ✅ "cobrança recorrente via Pix"
- ✅ "parcelamento em Pix"
- ✅ "lembretes automáticos"

Mesma disciplina para parcerias: copy diz **"integra com"** Stripe / Woovi / WhatsApp / Resend, nunca "em parceria com".

### Provas sociais e números

- **Sem depoimentos falsos.** A Pagit ainda não tem prova social própria — a seção fica "em breve" ou usa dados de mercado.
- **Sem números inventados.** Toda estatística citável tem fonte em `docs/research.md` (Serasa, Sebrae, BCB).
- Formatação brasileira: _"R$ 1.500,00"_, _"8,9 milhões"_, _"1 em cada 3"_.
- Sempre `font-variant-numeric: tabular-nums` em moeda na UI.

### Emoji

Quase nunca. Há **um único** emoji sancionado em produção, o coração verde no final de um mock de WhatsApp:

> _"Tá aqui o Pix 💚"_

Caso contrário, iconografia é o set duotone SVG. Sem 💰 💳 🚀.

### Exemplos de copy aprovada

| Onde | Texto |
|---|---|
| Hero | _"Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você."_ |
| Reassurance | _"2 meses grátis. Sem cartão, sem custo por transação da Pagit."_ |
| WhatsApp mock | _"Oi Maria! Sua mensalidade venceu hoje. Tá aqui o Pix 💚"_ |
| Feature card | _"QR Code gerado automaticamente, lembrete no WhatsApp antes e no vencimento, recibo verificado por IA assim que o cliente paga."_ |
| FAQ | _"Não. 2 meses grátis, sem cartão, sem pegadinha."_ |
| Section header | _"Tira-dúvidas honesto."_ |

---

## 4. Cores

### Brand · Emerald (âncora)

Ramp completo, 11 stops, derivado do hex da logo (`#059669`).

| Token | Hex | Uso |
|---|---|---|
| `brand/50`  | `#ECFDF5` | Tintas leves, hover de link |
| `brand/100` | `#D1FAE5` | Wash de seção, chips |
| `brand/200` | `#A7F3D0` | Borda do plano destaque, ring sutil |
| `brand/300` | `#6EE7B7` | Highlight em gradient top, eyebrow inverso |
| `brand/400` | `#34D399` | Variante clara da logo em dark |
| `brand/500` | `#10B981` | Badges, ícones secundários, focus ring |
| **`brand/600`** | **`#059669`** | **★ Cor da logo, CTAs primários no marketing** |
| **`brand/700`** | **`#047857`** | **★ Bg do botão primary (Button.tsx), texto link** |
| `brand/800` | `#065F46` | Hover/active do primary, texto em wash claro |
| `brand/900` | `#064E3B` | Fundo de card dark, texto sobre wash |
| `brand/950` | `#022C22` | Fundo da seção dark |

### Ink · Neutros

Slate-derived, neutros cool.

| Token | Hex | Uso |
|---|---|---|
| `ink/100` | `#F1F5F9` | Fundo de seção alternada (alias surface/100) |
| `ink/200` | `#E2E8F0` | Borda default (alias line/200) |
| `ink/300` | `#CBD5E1` | Borda forte / divider |
| `ink/400` | `#94A3B8` | Placeholder, texto muted |
| `ink/500` | `#64748B` | Caption, label muted |
| `ink/600` | `#475569` | Texto secundário |
| `ink/700` | `#334155` | Subtítulos, body strong |
| `ink/800` | `#1E293B` | Stroke default dos ícones |
| `ink/900` | `#0B1220` | Texto principal em light |

### Surface & line

| Token | Hex | Uso |
|---|---|---|
| `surface/0`   | `#FFFFFF` | Fundo base |
| `surface/50`  | `#F8FAFC` | Seção alternada |
| `surface/100` | `#F1F5F9` | Fundo de chip neutro |
| `line/100`    | `#F1F5F9` | Divider muito leve |
| `line/200`    | `#E2E8F0` | Borda default |
| `line/300`    | `#CBD5E1` | Borda forte |

### Accent & feedback (marketing)

| Token | Hex | Uso |
|---|---|---|
| `accent/amber`      | `#F59E0B` | "2 meses grátis", número destacado |
| `accent/amberLight` | `#FEF3C7` | Fundo de callout da oferta |
| `feedback/danger`   | `#DC2626` | Inadimplência em gráficos, estado de erro |
| `feedback/dangerLight` | `#FEE2E2` | Fundo de error |
| `feedback/success`  | `#059669` | Alias para brand/600 |

### Status do produto (app dashboard)

O dashboard usa uma paleta **mais saturada** para statuses em tabelas
(arquivo: `charge-status-badge.tsx`). É um break consciente da paleta
emerald do marketing — statuses precisam ler em densidade.

| Status | Hex | Token |
|---|---|---|
| Paid | `#16A34A` | green-600 (Tailwind default) |
| Pending | `#EAB308` | yellow-500 |
| Pending review | `#F97316` | orange-500 |
| Failed / rejected | `#DC2626` | destructive |
| Canceled | `#64748B` | slate-500 |

Indicador de "situation" (dot + label relativo, ex: "Vence em 3d"):

| Situação | Cor do dot | Hex |
|---|---|---|
| Paid | emerald | `#10B981` |
| Today | sky | `#0EA5E9` |
| Upcoming | slate | `#64748B` |
| Overdue / danger | red | `#DC2626` |
| Attention | amber | `#F59E0B` |

---

## 5. Tipografia

> ⚠️ **Brand fonts não estão fechadas.** A stack atual abaixo é o que o
> código de produção carrega via `next/font/google`. Os papéis, pesos,
> escala e tracking são estáveis; só os nomes das famílias devem mudar
> quando a brand decidir as faces finais.

### Famílias (provisional)

| Papel | Família atual | Pesos usados |
|---|---|---|
| Display (H1/H2/H3, números grandes) | Unbounded | 600 / 700 / 800 |
| Body / UI | Inter | 400 / 500 / 600 / 700 |
| Mono (moeda, código, chaves Pix) | JetBrains Mono | 400 / 500 |

### Escala

| Token | Tamanho | Line-height | Uso típico |
|---|---|---|---|
| `xs`      | 12px | 16 | Legendas, microcopy, eyebrows |
| `sm`      | 14px | 20 | Labels, texto secundário |
| `base`    | 16px | 24 | Body padrão |
| `lg`      | 18px | 28 | Body grande (hero sub) |
| `xl`      | 20px | 28 | Lead paragraphs |
| `2xl`     | 24px | 32 | Títulos de card |
| `3xl`     | 32px | 38 | Títulos de seção (mobile) |
| `4xl`     | 40px | 48 | Títulos de seção (desktop) |
| `5xl`     | 56px | 1.1 | Hero H1 (tablet) |
| `6xl`     | 72px | 1.05 | Hero H1 (desktop) |
| `display` | 80px | 1 | Números grandes (simulador) |

### Regras

- **Display weights:** headlines em 600/700; nunca 800 puro em texto longo (gera volume excessivo).
- **Tracking:** padrão 0; headlines `-0.02em` a `-0.04em` para apertar visualmente.
- **Parágrafos body:** max-width ~65 chars (`max-w-prose`).
- **Tabular nums:** mandatory em valores financeiros (`font-variant-numeric: tabular-nums`).

### Eyebrow

Padrão acima de toda section title:

```css
font-family: Inter;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #047857; /* brand/700 */
```

### Gradiente de texto (uma exceção)

Usado **apenas** na linha de ênfase do hero:

```css
background: linear-gradient(90deg, #047857, #10B981);
-webkit-background-clip: text;
color: transparent;
```

---

## 6. Espaçamento, raios e sombras

### Raios

| Token | Valor | Onde |
|---|---|---|
| `radius-sm`   | 8px  | Inputs compactos, chips |
| `radius-md`   | 12px | **Botões + inputs (44px height)** |
| `radius-lg`   | 16px | **Cards** |
| `radius-xl`   | 24px | Modais, painéis grandes |
| `radius-2xl`  | 32px | KPI tile, container card grande |
| `radius-pill` | 9999 | **Badges e chips** |

### Sombras

| Token | Valor | Onde |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgb(11 18 32 / 0.04)` | Card resting |
| `shadow-md` | `0 4px 12px -2px rgb(11 18 32 / 0.06), 0 2px 4px -2px rgb(11 18 32 / 0.04)` | Botão primary + card hover |
| `shadow-lg` | `0 18px 48px -12px rgb(11 18 32 / 0.12), 0 6px 16px -6px rgb(11 18 32 / 0.08)` | Plano destaque, tooltips |
| `shadow-glow` | `0 0 0 6px rgb(16 185 129 / 0.12)` | Focus glow opcional |
| `shadow-dark-hero` | `0 30px 60px -20px rgb(2 44 34 / 0.4)` | A única sombra do hero panel dark |

**Sem inset shadows. Sem cards neumórficos.**

### Containers

| Token | Valor | Onde |
|---|---|---|
| `container-reading` | 680px | FAQ, páginas legais |
| `container-narrow`  | 880px | Pricing, blocos focados |
| `container-default` | 1200px | Seção padrão |
| `container-wide`    | 1320px | Grid de features, hero |

### Spacing rhythm

| Token | Valor |
|---|---|
| `space-section`    | `clamp(4rem, 8vw, 8rem)` |
| `space-section-sm` | `clamp(3rem, 6vw, 5rem)` |
| `space-gutter`     | `clamp(1rem, 4vw, 2rem)` |

---

## 7. Animação e estados

### Durações

- **150ms** — hovers, focus, mudanças de cor/opacidade
- **220ms** — entrada de elementos, ícones animados
- **360ms** — entrada de seções, timeline do simulador

### Easings

- **Standard** `cubic-bezier(0.22, 1, 0.36, 1)` — padrão pra tudo
- **Emphasized** `cubic-bezier(0.16, 1, 0.3, 1)` — simulador, transições longas

### Padrões

- **Section entrance:** opacity 0→1 + translateY 16–24px → 0, IntersectionObserver fired once.
- **Stagger em listas:** delay incremental 60–80ms por item.
- **Hover em cards de feature:** `translateY(-2px)` + sombra sm → md.
- **CTA primary hover:** escurece via cor (brand/700 → brand/800 → brand/900). Sem scale.
- **Lenis smooth scroll:** 1.2s exponencial, com fallback `prefers-reduced-motion`.

### Estados de botão

| Variant | Resting | Hover | Active |
|---|---|---|---|
| Primary | bg `brand/700` #047857 | bg `brand/800` #065F46 | bg `brand/900` #064E3B |
| Secondary | bg `surface/0` + borda `line/200` | bg `surface/50` + borda `line/300` | — |
| Ghost | transparent | bg `brand/50` + texto `brand/700` | — |
| Inverse (sobre dark) | bg `surface/0` | bg `brand/50` | — |

### Foco (a11y)

```css
:focus-visible {
  outline: 2px solid #10B981; /* brand/500 */
  outline-offset: 2px;
  border-radius: 2px;
}
```

### `prefers-reduced-motion`

Toda animação tem fallback. Quando o usuário opta por reduzir:

- `pagit-reveal` força estado final
- Lenis é desabilitado
- Animações Motion ficam em snapshot final, não somem estruturalmente

---

## 8. Componentes

### Botão

| Variant | Quando usar |
|---|---|
| **primary** | CTA principal. `brand/700` + branco. |
| **secondary** | Ação alternativa lado-a-lado com primary. `surface/0` + borda. |
| **ghost** | Ações terciárias no header, "Saiba mais". |
| **link** | Inline em texto. |
| **inverse** | CTA sobre fundo `brand/950` (dark section). |

| Size | Height | Padding | Font |
|---|---|---|---|
| sm | 36px | `0 16px` | 14px |
| md | 44px | `0 20px` | 15px |
| lg | 48px | `0 24px` | 15px |

Sempre `border-radius: 12px` (`radius-md`). Transição 150ms standard.

### Card

| Variant | Fill | Border | Shadow | Uso |
|---|---|---|---|---|
| `light` | `surface/0` | 1px `line/200` | `sm` | default everywhere |
| `wash`  | `brand/50`  | 1px `brand/100/60` | none | section accents |
| `dark`  | `brand/900` | 1px `brand/800` | none | hero panel + dark moment |
| `outline` | transparent | 1px `line/200` | none | pricing comparison, FAQ |

Todos `border-radius: 16px` (`radius-lg`), `overflow: hidden`.

### Badge

Sempre pill (`radius: 9999px`), padding `4px 12px`, font 12px semibold.

| Variant | Bg | Color |
|---|---|---|
| `brand` | `#D1FAE5` | `#065F46` |
| `amber` | `#FEF3C7` | `#F59E0B` |
| `neutral` | `#F1F5F9` | `#334155` |
| `danger` | `#FEE2E2` | `#DC2626` |
| `outline` | `#FFFFFF` + border `#E2E8F0` | `#334155` |
| `inverse` (sobre dark) | `#065F46` + border `rgba(4,120,87,0.6)` | `#D1FAE5` |

### Input

- `border-radius: 12px`
- `height: 44px` (target mobile tap)
- Borda `line/200`, foco `border: brand/500 + outline brand/500`
- Placeholder em `ink/400`, texto em `ink/900`

### ChargeStatusBadge (app)

Padrão diferente do marketing — saturado para densidade de tabela. Padding `3px 8px`, radius 6px, font 11px medium, branco sobre cor:

| Status | Bg |
|---|---|
| Paid | `#16A34A` |
| Pending | `#EAB308` |
| Pending review | `#F97316` |
| Failed | `#DC2626` |
| Canceled | `#F1F5F9` + border `#CBD5E1` + texto `#334155` |

### Situation cell (app)

`dot + label`. O dot é 8×8 round, alinhado verticalmente com o label de 13px.

```
🟢 Pago em 12 mai
🔵 Vence hoje
⚪ Vence em 3d
🔴 Atrasado há 5d
🟡 Comprovante recebido
```

---

## 9. Iconografia

### Marketing — duotone SVG custom (20 ícones)

Contract em `components/icons/index.tsx`:

- **24×24 viewBox**, stroke 1.5px, linecap/linejoin round
- Cada ícone aceita `tone`: `"ink"` (default, ink/800 stroke + brand/100 fill), `"brand"` (brand/700 stroke + brand/100 fill), `"white"` (white stroke + 18% white fill), `"current"` (inherits)
- Estrutura: path filled "shadow" + path stroked "outline" — esse é o efeito duotone

**Sets:**

- **Feature:** `repeat`, `split`, `credit-card`, `message-circle`, `receipt`, `sparkles`, `key`, `code`
- **Audience:** `user-focus`, `stethoscope`, `graduation-cap`, `briefcase`, `play-circle`, `wrench`
- **Utility:** `arrow-right`, `check`, `chevron-down`, `external`, `shield`, `document`, `whatsapp`, `mail`, `instagram`

### App — Tabler Icons

O dashboard usa `@tabler/icons-react` para tudo, exceto a logo. É um split deliberado: marketing duotone = "voz de marca", Tabler = "ferramenta operacional".

CDN se precisar mockar: `https://unpkg.com/@tabler/icons@latest`

### Regras

- **Sem Lucide default**, sem Feather chapado, sem emojis de pagamento (💰💳).
- Stroke width consistente (1.5px no marketing, 2px no Tabler app).
- Cada seção tem 1 ícone "hero" maior (48px); resto é 24px no marketing, 18px no app.

---

## 10. Logo e marca

### Estrutura

Os SVGs têm 2 layers:

1. **Base:** shapes em emerald `#059669` (brand/600)
2. **Overlay:** shapes brancos em `opacity: 0.75` e `0.5` por cima, gerando o efeito duotone "destaque mais claro"

Não é uma cor sólida — quando você muda só uma das layers, o efeito quebra.

### Variantes

| Variante | Quando usar |
|---|---|
| Wordmark light | Default no header, footer, comunicação geral |
| Wordmark dark | Sobre `brand/950`. Base recolorida para `brand/300` `#34D399`, overlay branco mantido |
| Wordmark monochrome white | Tamanhos muito pequenos, contextos single-color (favicon-ish) |
| Symbol light | Em chips, avatares small, app sidebar |
| Symbol dark · transparent | Sobre dark, com base em `brand/300` e plate branco removido |
| Symbol dark · chip | Symbol branco dentro de chip `brand/600` 20px radius |

### Arquivos

```
assets/pagit-logo.svg    ← wordmark completo, 520×223
assets/pagit-icon.svg    ← símbolo quadrado, 220×220
assets/favicon.svg
```

> ⚠️ Os SVGs foram exportados via Fabric.js — usam entidades HTML
> (`&#x9;`) que algumas ferramentas de preview não decodificam, mas
> navegadores renderizam normalmente.

---

## 11. Layout e containers

### Grid

- Mobile: 1 col
- `md` (768px+): 2 col (features, "para quem")
- `lg` (1024px+): 3–4 col (features grid, integration bar)

### Header

- Sticky top. Transparente até `scrollY > 8`.
- Depois disso: `bg-surface/85` + `backdrop-blur-md` + bottom border `line-200/80`.
- Container default 1200px, gutter responsivo.
- Nav links com underline animado scaling de `left` (200ms standard).

### Dark moment

A seção "Como funciona" é a **única** com fundo `brand/950`. Cards dentro usam `brand/900` com borda `brand/800`. Não use dark em outros lugares do site.

### Hero

- Container `wide` (1320px)
- Background: gradient sutil de `brand/50/60` → branco
- Overlay radial decorativo: `radial-gradient(60% 40% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)`
- Layout: 1.1fr / 1fr (texto / visual mock)
- Gradient text na linha de ênfase do H1

---

## 12. App vs marketing — o split intencional

| Aspecto | Marketing | App |
|---|---|---|
| Width design | 1320px | 1440px (sidebar 256 + main fluido) |
| Surface | branco generoso + dark moment única | branco + `#F8FAFC` em surfaces de canvas |
| Cores de status | emerald sóbrio | saturado (`green-600`, `yellow-500`, `orange-500`) |
| Iconografia | Duotone custom SVG (20 ícones) | Tabler Icons stroke 2px |
| Cor do botão primary | `brand/700` emerald | `#0B1220` (ink/900) ou `brand/700` em contexto branded |
| Radius default | 12px botão / 16px card | 8px botão / 16px card |
| Densidade | generosa, pra ler | densa, pra operar |
| Fonte de origem | next/font + Tailwind v4 `@theme` | shadcn/ui + variáveis CSS tradicionais |

A regra mental: **marketing tem 1 minuto da atenção do empreendedor; app tem 8 horas do dia dele.**

---

## 13. Anti-padrões

❌ **Cores e gradientes**

- Gradient roxo/azul cripto no hero
- Cards neumórficos
- Cards com borda lateral colorida só

❌ **Tipografia**

- Sans condensado (Montserrat, Oswald)
- Headlines em 800 puro em texto longo
- Mistura de mais de 2 famílias

❌ **Iconografia**

- Lucide / Feather flat default (sem customização)
- Ícones chapados de uma cor só
- Emojis de pagamento (💰💳🚀)

❌ **Motion**

- Parallax 3D em mouse-move
- Scroll hijacking
- Animações que ignoram `prefers-reduced-motion`
- Modais grandes de cookies no primeiro scroll

❌ **Copy**

- "Revolucione", "Transforme", "Ecossistema completo"
- Depoimentos falsos
- Números de mercado sem fonte
- "Pix Automático" / "Pix Parcelado" como nome de produto Pagit
- "Em parceria com Stripe/Woovi" (use "integra com")

❌ **Layout**

- Site denso, padding apertado
- Mais de 1 H1 por página
- Containers acima de 1320px

---

## 14. Ressalvas

- **Fontes não estão fechadas.** A stack atual (Unbounded + Inter + JetBrains Mono) reflete o código de produção via `next/font/google`, mas é provisional. Trocar é uma edição de 3 linhas em `colors_and_type.css`.
- **Sem screenshots reais do dashboard** nos repos abertos. O UI kit do app foi reconstruído a partir do código (`app-sidebar.tsx`, `overview.tsx`, columns das charges) — visual vocabulary correto, mas spacing/states específicos podem divergir do produto vivo.
- **Simulador `ChargeRulerSimulator`** foi reproduzido em espírito, não 1:1 (é o componente mais complexo da landing).
- **Iconografia do app é Tabler aproximado** inline, não a lib completa.

---

## Index de arquivos no skill

```
README.md                  ← este documento, versão expandida
DESIGN_SYSTEM.md           ← este consolidado
SKILL.md                   ← skill manifest p/ Claude Code
colors_and_type.css        ← tokens como CSS custom properties

assets/
  pagit-logo.svg           ← wordmark
  pagit-icon.svg           ← símbolo
  favicon.svg
  integrations/            ← Stripe, Woovi, WhatsApp, Resend
  sources/                 ← Bacen, Sebrae, Serasa
  reference/               ← screenshots de produção

preview/                   ← 21 specimen cards (HTML)
ui_kits/
  website/                 ← landing inteira em JSX
  app/                     ← dashboard em JSX
```

— Fim do documento.
