# Pagit Website — Guia para futuras sessões do Claude Code

Este arquivo é lido automaticamente toda vez que uma sessão do Claude
Code é iniciada neste projeto. Mantém a IA com contexto sem precisar
re-explorar tudo.

## O que é

Site institucional (landing page) da **Pagit** — SaaS brasileiro de
automação de cobrança, recorrência e gestão de recebíveis para PMEs.

- Produção: https://pagit.com.br
- Painel: https://dash.pagit.com.br
- WhatsApp: https://wa.me/5521936183583

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS v4 (CSS-first via `@theme` em [app/globals.css](app/globals.css))
- next-intl 3 (i18n via JSON; rotas: `/` PT-BR, `/en`, `/es`)
- Motion (ex-Framer Motion) — só usado no simulador, dynamic-loaded
- Lenis para scroll suave (com fallback `prefers-reduced-motion`)

## Layout do código

```
app/[locale]/         layout, landing, styleguide
app/sitemap.ts        sitemap dinâmico
app/robots.ts         robots
components/ui/        design system primitives
components/sections/  Header, Hero, Problem, Features, Faq, etc.
components/interactive/   ChargeRulerSimulator (lazy)
components/icons/     20 ícones duotone custom
i18n/                 routing + request loader
messages/             pt-BR.json (fonte), en.json, es.json (placeholders)
lib/                  brand-tokens.ts, utils.ts
public/brand/         logo + favicon derivados de ref/
docs/                 specs, design, research, lighthouse-mobile.json
ref/                  IMUTÁVEL — briefing original e SVGs
```

## Regras inegociáveis

1. **Nunca** modificar arquivos em `ref/`. É o briefing original.
2. **Nunca** usar termos "Pix Parcelado" ou "Pix Automático" como nome
   de produto da Pagit. São produtos regulamentados pelo Banco Central.
   Usar: "parcelamento em Pix", "cobrança recorrente via Pix",
   "lembretes automáticos". Detalhes em
   [docs/specs/2026-04-24-pagit-landing-design.md](docs/specs/2026-04-24-pagit-landing-design.md) § 3.
3. **Nunca** inventar números de mercado. Toda estatística no copy
   precisa estar em [docs/research.md](docs/research.md) com fonte.
4. **Nunca** afirmar parceria comercial com Stripe / Woovi / WhatsApp /
   Resend. São integrações técnicas; copy deve dizer "integra com".
5. **Sem depoimentos falsos.** A Pagit ainda não tem prova social
   própria; seção fica como "em breve" ou usa dados de mercado.
6. **Mobile-first.** Validar em 375px antes de considerar pronto.
7. **Respeitar `prefers-reduced-motion`** em qualquer animação nova.

## Comandos de dia-a-dia

```bash
npm run dev          # Servidor de desenvolvimento (3000)
npm run build        # Build de produção
npm run start        # Servir build local
npm run lint         # ESLint flat config
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write
```

## Conteúdo

Todo texto da landing está em [messages/pt-BR.json](messages/pt-BR.json).
Cada seção tem sua chave (`hero`, `problem`, `features`, `faq`, etc).
Para mudar copy, edite o JSON — não procure strings no código.

## Atualizando preços

Os planos `pricing.plans[]` em pt-BR.json têm `price: "Em breve"` por
decisão comercial. Para publicar valores: edite os campos `price` e
`priceSuffix` nos planos `piloto` e `starter`. Não esqueça de atualizar
`en.json` e `es.json` quando traduzir.

## Deploy

- Vercel: subir o repo, sem env vars necessárias. Build automático.
- VPS próprio: `docker compose up -d --build`. Container expõe 3000.
- Para usar standalone build no Docker, descomente
  `output: "standalone"` em `next.config.ts` antes de buildar.

## Testes locais

- Lighthouse: `PORT=4000 npm start &` depois
  `npx lighthouse http://localhost:4000 --form-factor=mobile`.
- Visual: `npm run dev` + abrir http://localhost:3000 e
  http://localhost:3000/styleguide.

## Conhecido / aberto

- `next-intl` 3.x tem advisory GHSA-8f24-v5vv-gm5j (open redirect).
  Não afeta este site (não usamos `redirect()` com input externo),
  mas vale subir para 4.x quando houver oportunidade — é major bump.
- Performance Lighthouse local fica em ~72 (mobile, throttling
  simulado). Em CDN real espera-se 85+. Se subir para staging/prod,
  remedir lá antes de otimizar mais.
- `/styleguide` é página interna; está bloqueada em `robots.ts` mas
  ainda é acessível por URL. Adicionar auth básica se for necessário
  esconder de visitantes.

## Histórico

Construído em sessão única através de 10 fases (0 a 9) com aprovação
incremental do Raphael (owner da Pagit). Decisões e racional ficaram
documentados em `docs/specs/2026-04-24-pagit-landing-design.md`.
