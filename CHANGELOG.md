# Changelog

Todos os ajustes notáveis nesta entrega da landing da Pagit.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [0.1.1] — 2026-04-28

### Alterado
- Fonte de display trocada de **Geist** para **Unbounded** (grotesque
  geométrica largada, Etcetera Type Company, Google Fonts) em todos
  os headings do site. Inter permanece como fonte de corpo. Tracking
  recalibrado para `-0.04em` em hero/section/pricing/cta e `-0.025em`
  em cards. Pesos importados: 700 e 800 (subset `latin`).
- Performance Lighthouse mobile: **82** (baseline anterior ~72),
  CLS mantido em 0 — sem layout shift introduzido pela troca.

## [0.1.0] — 2026-04-25

### Adicionado
- Landing page institucional completa com 12 seções: Header, Hero,
  Integrations, Problem, Audience, How It Works, Features, Charge Ruler
  Simulator, Pricing, FAQ, CTA Final, Footer.
- Stack: Next.js 15 (App Router), React 19, TypeScript strict,
  Tailwind CSS v4 (config CSS-first via `@theme`), next-intl 3.
- Suporte i18n via JSON em `messages/`. PT-BR é default; EN e ES estão
  presentes como placeholders com a mesma estrutura, prontos para tradução.
- Design system em `components/ui/` (Button, Card, Badge, Input, Container,
  Section, SectionHeader, Eyebrow, Logo, Reveal/StaggerItem).
- Iconografia duotone custom em `components/icons/` (20 ícones).
- Página interna não-indexável `/styleguide` para validação visual.
- Simulador interativo da régua de cobrança em
  `components/interactive/ChargeRulerSimulator.tsx`. Auto-play ao entrar
  em viewport, 3 cenários, timeline de 5 passos, mock de WhatsApp com
  bubbles em sequência. Lazy-loaded via `next/dynamic`.
- Animações de entrada via CSS keyframes (sem JS), respeitando
  `prefers-reduced-motion`.
- Scroll suave via Lenis com fallback para `prefers-reduced-motion`.
- SEO: metatags completas, Open Graph, Twitter Card, JSON-LD
  (Organization, Product, FAQPage), `sitemap.xml` e `robots.txt`
  gerados automaticamente.
- Headers de segurança no `next.config.ts`
  (X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy).
- Deploy via Docker (Dockerfile multi-stage + docker-compose.yml).

### Performance e qualidade
- Build de produção limpo, sem warnings.
- Bundle First Load JS ~174 KB (target < 200 KB).
- Lighthouse mobile (test local com throttling 4G simulado):
  Performance 72, Accessibility 96, Best Practices 100, SEO 100.
  Em hospedagem real com CDN espera-se ganho expressivo em Performance.
- Acessibilidade WCAG 2.1 AA validada nas seções principais.
- Navegação por teclado em todos os interativos.

### Documentação
- README com onboarding < 5 min para devs novos.
- Spec de design em [docs/specs/2026-04-24-pagit-landing-design.md](docs/specs/2026-04-24-pagit-landing-design.md).
- Mood board em [docs/design/moodboard.md](docs/design/moodboard.md).
- Pesquisa de mercado citável em [docs/research.md](docs/research.md).

### Conhecidos / próximos passos
- Vulnerabilidades moderadas em PostCSS via Next.js (sem impacto
  prático para landing) e em next-intl < 4.9.1 (open redirect, sem
  superfície de ataque por aqui pois não usamos `redirect()` com input
  externo). Atualizar `next-intl` para 4.x em release futuro.
- Texto dos planos Piloto e Starter está com `Em breve` no preço.
  Atualizar quando o valor comercial for definido.
- `en.json` e `es.json` precisam de tradução real (hoje carregam o
  conteúdo PT-BR como placeholder).
