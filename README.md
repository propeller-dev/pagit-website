# Pagit — Site institucional

Landing page de marketing da **Pagit** — SaaS brasileiro de automação de cobrança, recorrência e gestão de recebíveis.

- **Produção:** https://pagit.com.br
- **App:** https://dash.pagit.com.br

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS v4 (configuração CSS-first via `@theme` em [app/globals.css](app/globals.css))
- next-intl 3 (i18n via JSON; rotas `/` PT-BR default, `/en` e `/es` preparadas)
- Motion (ex-Framer Motion) + Lenis (scroll suave)
- ESLint + Prettier + EditorConfig

## Requisitos

- Node.js ≥ 20 (testado em 24)
- npm 10+ (ou pnpm, se preferir)

## Desenvolvimento

```bash
npm install
npm run dev
```

O site fica em http://localhost:3000. Rotas:

- `/` → português (default, sem prefixo)
- `/en` → inglês (placeholder, mesmo conteúdo)
- `/es` → espanhol (placeholder, mesmo conteúdo)

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Type-check com `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (CI) |

## Estrutura

```
app/
  [locale]/
    layout.tsx           Layout raiz com fontes e NextIntlClientProvider
    page.tsx             Landing completa (12 seções)
  globals.css            Tokens Tailwind v4 (@theme) + base styles
components/
  ui/                    Design system (Button, Card, ...)
  sections/              Hero, Problem, Features, ...
  interactive/           ChargeRulerSimulator (o "momento uau")
  icons/                 Ícones duotone custom
i18n/
  routing.ts             Configuração de rotas do next-intl
  request.ts             Loader de mensagens por locale
lib/
  brand-tokens.ts        Tokens em TS (referência, não consumidos pelo Tailwind v4)
  utils.ts               cn() para compor classes
messages/
  pt-BR.json             Copy do site — fonte única de conteúdo
  en.json                Placeholder (valores em PT, traduzir)
  es.json                Placeholder (valores em PT, traduzir)
public/
  brand/                 Logo, favicon, ícones derivados
docs/
  specs/                 Decisões de design (Fase 0)
  design/moodboard.md    Direção visual (Fase 1)
  research.md            Pesquisa de mercado (Fase 2)
ref/                     IMUTÁVEL — briefing e SVGs originais
```

## Como editar conteúdo (para não-devs)

Todo texto do site está em [messages/pt-BR.json](messages/pt-BR.json). Cada seção tem sua própria chave (`hero`, `problem`, `features`, `faq`, etc.). Edite o JSON e recarregue — o texto atualiza em dev sem rebuild.

Para mudar um preço, CTA ou adicionar/remover uma pergunta do FAQ, basta editar o JSON.

## Identidade visual

- Paleta, tipografia e motion: [docs/design/moodboard.md](docs/design/moodboard.md)
- Tokens Tailwind v4: [app/globals.css](app/globals.css) (bloco `@theme`)
- Tokens em TypeScript (se precisar em runtime): [lib/brand-tokens.ts](lib/brand-tokens.ts)

## Conteúdo

- Regras de copy e distinção regulatória (Pix Automático, Pix Parcelado): [docs/specs/2026-04-24-pagit-landing-design.md](docs/specs/2026-04-24-pagit-landing-design.md) § 3
- Dados de mercado citáveis com fontes: [docs/research.md](docs/research.md)

## Deploy

(A ser documentado na Fase 9.)

## Links oficiais

- WhatsApp: https://wa.me/5521936183583
- Instagram: https://instagram.com/pagit.fin
- E-mail: contato@pagit.com.br
