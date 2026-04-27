# Data Access Guide

This guide describes the data-access rules used by the backend today. It focuses on the patterns that are actually present in the codebase.

## Source of truth

The core contracts live in:

- `backend/src/Pagit.Api/Infrastructure/Data/EfRepository.cs`
- feature-local specification files under `Features/*/Specifications`
- entity mapping in `backend/src/Pagit.Api/Infrastructure/Data/PagitDbContext.cs`

## Core rules

Pagit uses a thin repository plus specification pattern.

- Feature handlers should not build ad-hoc LINQ queries inline.
- Queries should be expressed through `ISpecification<T>`.
- Reads and writes should go through `IRepository<T>`.
- Specifications should stay close to the feature or domain area that owns them.

This keeps handlers focused on orchestration and business decisions rather than persistence mechanics.

## Current contracts

`ISpecification<T>` supports:

- `Criteria`
- `Includes`
- `OrderBy`
- `OrderByDescending`
- `Skip`
- `Take`

`IRepository<T>` currently exposes:

- `GetFirstOrDefaultAsync`
- `GetAllAsync`
- `GetAllPaginatedAsync`
- `AddAsync`
- `Update`
- `Delete`
- `SaveChangesAsync`
- `BeginTransactionAsync`

## Recommended usage

Use specifications for:

- aggregate lookups by id or external id
- filtered list queries
- paginated reads
- read models that need eager includes
- reusable workflow predicates

Keep handlers responsible for:

- calling the right specification
- applying business rules
- deciding whether to persist mutations

## Anti-patterns to avoid

- direct `.Where()`, `.Include()`, or `.OrderBy()` chains inside handlers
- shared "catch-all" specifications that hide unrelated business cases
- large read queries placed in endpoints instead of specifications
- bypassing the repository for ordinary feature work

## Specification placement

The common pattern is:

- `Features/<Area>/Specifications/*.cs` for feature-owned queries
- `Application/<Area>/Specifications/*.cs` when a reusable application service owns the query

Prefer the narrowest ownership that still keeps the query reusable.

## Pagination

Use `PaginationSpecification<T>` or feature-specific paginated specs when the endpoint needs:

- total count
- deterministic ordering
- page/size semantics

The repository computes the total count before applying `Skip` and `Take`.

## Transactions

Use `BeginTransactionAsync` only when a workflow genuinely needs an explicit multi-step transaction boundary. Most ordinary feature handlers can rely on the default EF Core unit of work behind `SaveChangesAsync`.

## Migrations

Schema changes must use EF Core migrations.

Preferred commands from the `backend` directory:

```bash
make migration-add name=MeaningfulName
make migration-update
make migration-remove
```

From repo root:

```bash
make -C backend migration-add name=MeaningfulName
make -C backend migration-update
make -C backend migration-remove
```

Use `environment=LocalStaging` or `environment=Development` when needed.

## Documentation rule

If a schema change, repository contract, or query convention changes, update this guide and any affected feature documentation in the same task.
