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

### Vercel (mais simples)

1. Subir o repositório no GitHub.
2. Importar em [vercel.com/new](https://vercel.com/new).
3. Sem variáveis de ambiente necessárias. Build e deploy automáticos.

### Docker (VPS próprio)

```bash
docker compose up -d --build
```

O container expõe a porta 3000. Coloque atrás de um proxy reverso
(Caddy, Nginx, Traefik) para HTTPS. Build usa multi-stage com
`output: "standalone"` para imagem pequena (~150MB).

Para apontar `pagit.com.br` para o container:

```nginx
# Exemplo Nginx
server {
  listen 443 ssl http2;
  server_name pagit.com.br;
  # ssl_certificate / ssl_certificate_key...

  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### SEO

`sitemap.xml` e `robots.txt` são gerados automaticamente:
- `https://pagit.com.br/sitemap.xml`
- `https://pagit.com.br/robots.txt`

Submeta o sitemap no [Google Search Console](https://search.google.com/search-console)
após o primeiro deploy.

## Links oficiais

- WhatsApp: https://wa.me/5521936183583
- Instagram: https://instagram.com/pagit.fin
- E-mail: contato@pagit.com.br
