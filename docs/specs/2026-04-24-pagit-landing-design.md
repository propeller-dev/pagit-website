# Pagit — Landing Page Design Spec

**Data:** 2026-04-24
**Status:** Aprovado (Fase 0)
**Owner:** Raphael Pais
**Executor:** Claude Code (Opus 4.7)

---

## 1. Escopo

Landing page institucional única, multi-seção, PT-BR (com estrutura i18n pronta para EN/ES), para a **Pagit** — SaaS brasileiro de automação de cobrança, recorrência e gestão de recebíveis.

Fora de escopo: painel autenticado (já existe em `dash.pagit.com.br`), blog, documentação pública, páginas legais (serão `#` placeholder nesta entrega).

## 2. Público e posicionamento

- **Primário:** PMEs de serviço e profissionais autônomos com cobrança recorrente ou parcelada (personal trainers, fisioterapeutas, professores, terapeutas, contabilidades, agências, infoprodutores, academias, escolas).
- **Secundário:** empreendedores com parcelamento não-ortodoxo (gráficas, oficinas, manutenção) ou que operam sem nota fiscal formal.
- **Posicionamento:** _Receber em dia é simples e possível — a Pagit prova isso tirando o peso da cobrança da rotina do empreendedor._
- **Tom:** formal↔coloquial 3, técnico↔simples 3, sério↔bem-humorado 4, direto↔consultivo 3. Referências: mais Nubank que Itaú, mais Stone que C6.

## 3. Diretrizes de conteúdo (regulatórias)

Regras inegociáveis:

1. **Nunca** usar "Pix Parcelado" ou "Pix Automático" como nome de produto da Pagit. Usar: "parcelamento em Pix", "cobrança parcelada via Pix", "cobrança recorrente", "mensalidade automática", "régua de cobrança".
2. **"Sem taxa"** só como "sem custo por transação da Pagit"; sempre com clareza que o banco do lojista e o gateway de cartão têm taxas próprias.
3. **Zero invenção de números.** Estatísticas só com fonte (Sebrae, Serasa, BCB, Abecs, Febraban). Sem número confiável → não inclui.
4. Integrações (Stripe, Woovi, WhatsApp, Resend) aparecem como "integra com", não como parceria oficial co-marketing.
5. **Sem depoimentos falsos.** Prova social fica em: dado de mercado + integrações + seção "em breve: casos reais".

## 4. Identidade visual aprovada

### Paleta

Âncora extraída da logo: `#059669` (emerald-600).

| Token | Hex | Uso |
|---|---|---|
| `brand/600` | `#059669` | Primary CTA, logo, ícones de marca |
| `brand/700` | `#047857` | Hover, texto enfático em light |
| `brand/500` | `#10B981` | Highlights, top de gradient, badges |
| `brand/100` | `#D1FAE5` | Washes de seção, chips |
| `brand/950` | `#022C22` | Fundo da "dark section" (seção do momento uau) |
| `ink/900` | `#0B1220` | Texto principal em light |
| `ink/600` | `#475569` | Texto secundário |
| `surface/0` | `#FFFFFF` | Fundo base |
| `surface/50` | `#F8FAFC` | Fundo alternado de seção |
| `line/200` | `#E2E8F0` | Bordas, separadores |
| `accent/amber` | `#F59E0B` | "60 dias grátis", destaque em números (parcimonioso) |
| `danger/600` | `#DC2626` | Indicador de inadimplência em gráficos |

Decisão: base clara dominante + **uma única dark section** (momento uau + "Como funciona") usando `brand/950` como fundo.

### Tipografia

- **Display:** Geist (via `next/font/google`)
- **Body/UI:** Inter (via `next/font/google`)
- **Mono (simulador, números):** Geist Mono
- Escala: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72
- Line-height: 1.15 display, 1.35 subtítulos, 1.5 body

### Formas e superfícies

- Raio padrão: 16px (cards), 12px (inputs/buttons), 9999px (chips/badges)
- Sombra padrão: `shadow-sm` + bordas 1px `line/200`
- Ícones: duotone custom SVG (emerald + ink), não pacote genérico
- Motion: Framer Motion para entradas, Lenis para scroll suave; respeita `prefers-reduced-motion`

## 5. Headline aprovada

**Opção A — empática/provocativa:**

> **Receber em dia virou a parte chata do seu negócio? A Pagit assume pra você.**
> Cobrança recorrente, parcelamento em Pix, régua automática no WhatsApp. Você só confere o dinheiro entrar.

## 6. Preços — decisão

**Valores omitidos nesta entrega.** A seção de preços mostra os dois planos (**Piloto** e **Starter**) com descrição, features, CTA — mas com "em breve" no lugar do valor. Motivo: evita commit público antes de confirmação comercial final.

## 7. Estrutura da landing (ordem final)

1. **Header** — logo + menu (Funcionalidades, Para quem, Preços, FAQ) + CTAs (Entrar / Começar grátis)
2. **Hero** — headline A + sub + dois CTAs + visual
3. **Barra de integrações** — Stripe, Woovi, WhatsApp, Resend + disclaimer "Integra com as ferramentas que você já usa"
4. **Problema** — 3 dores com dado real de mercado (inadimplência, tempo perdido em cobrança, operação manual)
5. **Para quem é** — cards por segmento (reordenado para vir antes de "Como funciona")
6. **Como funciona** — 4 passos animados (conecta → configura → cobra → recebe)
7. **Funcionalidades** — grid 6-8 cards mapeando módulos reais do produto: `core_billing_ops` (cobrança + parcelamento Pix), `payment_channels` (Pix/cartão/boleto), `whatsapp` (régua), `ai_agent` (operador-assistente), `receipt_intelligence` (verificação de comprovantes por IA), relatórios/conciliação, multi-chave PIX, API/webhook
8. **Momento uau** — simulador interativo da régua de cobrança em dark section
9. **Preços** — Piloto / Starter (valores omitidos, "em breve")
10. **FAQ** — dividido em 2 blocos:
    - _Como funciona_ (operacional): parcelamento em Pix, régua, notificações, cartão, comprovantes, cancelamento
    - _Regulação e segurança_: "Pagit é banco/PSP?", acesso à conta, onde cai o Pix, nota fiscal, sem registro formal
11. **CTA final** — reforço "2 meses grátis, sem cartão"
12. **Footer** — logo + contatos (WhatsApp, e-mail, Instagram) + links legais placeholder

## 8. Stack técnica

- **Next.js 15** (App Router), **TypeScript strict**, **Tailwind CSS v4**, **pnpm**
- **Framer Motion** + **Lenis** (leves, bem integrados; sem GSAP nem Three.js)
- **next-intl** para i18n (rotas `/[locale]`)
- **clsx + tailwind-merge** para composição
- **ESLint + Prettier** configurados
- Fontes auto-hospedadas via `next/font`

## 9. Momento "uau" — decisão

**Opção (a) do briefing: simulador interativo da régua de cobrança.**

Usuário digita um valor e escolhe um cenário (mensalidade R$ 200 / parcelado 3x R$ 500 / serviço único R$ 1.500). O simulador dispara uma timeline animada mostrando:

1. Cobrança gerada (mock card com QR Pix)
2. Notificação enviada (WhatsApp mock bubble com "✓✓ lido")
3. Lembrete 1 dia antes
4. Pagamento confirmado (check animado + som opcional)
5. Recibo conciliado

Implementado em `components/interactive/ChargeRulerSimulator.tsx`. Fallback em `prefers-reduced-motion`: mostra estado final estático com legenda.

## 10. Targets de qualidade

- Lighthouse mobile & desktop: Performance ≥95, A11y 100, Best Practices 100, SEO 100
- Bundle JS inicial < 200kb gzipped
- LCP < 2.0s, CLS < 0.1, INP < 200ms
- WCAG 2.1 AA validado com axe
- Keyboard navigation 100%
- `prefers-reduced-motion` respeitado em todas animações
- Mobile-first (testado em 375px)
- Build de produção sem warnings

## 11. Estrutura de pastas

```
/
├── app/[locale]/              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx               # landing
│   └── styleguide/page.tsx    # oculto, para validação visual
├── components/
│   ├── ui/                    # design system primitives
│   ├── sections/              # Hero, Features, Pricing, FAQ, etc.
│   ├── interactive/           # ChargeRulerSimulator
│   └── icons/
├── messages/
│   ├── pt-BR.json             # fonte
│   ├── en.json                # placeholder (valores em PT)
│   └── es.json                # placeholder (valores em PT)
├── lib/
│   ├── utils.ts
│   └── brand-tokens.ts
├── public/
│   ├── brand/                 # logo, favicon, ícones derivados
│   └── images/
├── ref/                       # IMUTÁVEL — briefing
│   ├── pagit_mkt-logo.svg
│   ├── pagit_mkt-icon.svg
│   └── docs/
├── docs/specs/                # specs deste processo
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## 12. Fases de execução

| Fase | Entrega | Gate |
|---|---|---|
| 0 | Este spec | ✅ aprovado |
| 1 | Tokens (`brand-tokens.ts`) + `tailwind.config.ts` + mood board MD | Visual review |
| 2 | `research.md` com dados de mercado e fontes | Review do copy base |
| 3 | `messages/pt-BR.json` completo | Revisão textual |
| 4 | App Next.js rodando, deps instaladas, commit inicial | Build clean |
| 5 | Design system em `/styleguide` | Visual review |
| 6 | 12 seções implementadas (paralelo com 5 agentes) | Screenshots |
| 7 | Simulador + animações polish | Demo |
| 8 | Lighthouse + code-review + security-review + axe | Todos targets batidos |
| 9 | README + CLAUDE.md + CHANGELOG + deploy config | Entrega final |

## 13. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Claim regulatório impreciso | Revisão obrigatória da Fase 3 contra seção 3 deste spec antes de implementar |
| Simulador pesado afeta LCP | Lazy-load via `next/dynamic` com `ssr: false`; fallback estático no SSR |
| Fontes custom atrasando FCP | `next/font` com `display: swap` + subsetting automático |
| Momento uau espalhado (scope creep) | **Um único** componente interativo; outras seções usam apenas Framer entry animations |
| Copy inventando features | Cross-check toda Fase 3 contra `ref/docs/backend/` e `ref/docs/frontend/` |

## 14. Definição de pronto

- [ ] Todas as 12 seções implementadas e conectadas ao JSON
- [ ] Zero hardcoded copy fora do JSON
- [ ] Todos os targets da seção 10 batidos
- [ ] Screenshots em 375/768/1440 aprovados contra Stripe/Abacatepay/Finray
- [ ] Momento uau funcional e polido (não placeholder)
- [ ] FAQ com 11+ perguntas da lista obrigatória respondidas
- [ ] CTAs apontam para URLs corretas (signup, WhatsApp, email, IG)
- [ ] i18n estruturado, `en.json` e `es.json` presentes como placeholders
- [ ] README permite onboarding < 5min
- [ ] Nenhum dado sensível commitado
