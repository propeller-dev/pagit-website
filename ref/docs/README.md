# Pagit

Pagit is an API-first, multi-tenant SaaS billing platform designed as a "billing orchestrator" that lets businesses automate billing for their end-customers.

## Project Structure

```
pagit/
├── backend/          # .NET 9 API
│   ├── src/          # Source code
│   └── tests/        # Unit and integration tests
├── frontend/         # Next.js 15 application
│   └── src/          # Source code
└── docs/             # Documentation
    ├── backend/      # Backend architecture and guides
    └── frontend/     # Frontend architecture and guides
```

## Quick Start

### Backend

```bash
cd backend/src
docker-compose up -d        # Start dependencies (Postgres, etc.)
dotnet run --project Pagit.Api
```

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

## Documentation

- **Agent Instructions**: See [AGENTS.md](./AGENTS.md) for development guidelines
- **Error Codes Catalog**: See [docs/ERROR_CODES.md](./docs/ERROR_CODES.md) for API error standards
- **Backend Architecture**: See [docs/backend/](./docs/backend/)
- **Frontend Architecture**: See [docs/frontend/](./docs/frontend/)
- **Project Skills**: See [.agents/skills/](./.agents/skills/) for repo-local AI execution guides. Docs explain how Pagit works; skills guide how the AI should act when changing it.

## Tech Stack

- **Backend**: .NET 9, Entity Framework Core, PostgreSQL
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui
- **Infrastructure**: Docker, Stripe Connect

## License

Proprietary - All rights reserved
