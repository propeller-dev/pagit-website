# Backend Architecture

This guide explains the current backend structure and the runtime conventions that shape the codebase. It is intentionally high signal: detailed implementation heuristics belong in the repo-local skills under `/.agents/skills`.

## Core structure

Pagit uses a vertical-slice backend organized around features rather than technical layers.

- `Features/` contains HTTP-facing slices: request/response models, validators, handlers, endpoint mapping, and feature-local specifications.
- `Application/` contains business orchestration and cross-slice application services.
- `Domain/` contains entities, enums, domain events, and aggregate behavior.
- `Infrastructure/` contains EF Core, hosting, background workers, observability wiring, external providers, and DI/bootstrap code.
- `External/` contains provider payload models and low-level integration contracts.

The intended effect is local change: most feature work should stay within one slice plus its tests.

## Request pipeline

The backend uses Minimal APIs and MediatR.

1. An endpoint in `Features/*/*Endpoints.cs` maps the route.
2. The endpoint creates or forwards a MediatR request.
3. FluentValidation runs through the validation behavior before the handler.
4. The handler returns `Result<T>` for business outcomes.
5. `ToHttpResult()` converts the result into HTTP responses and Problem Details payloads.

This keeps handlers focused on business flow instead of HTTP formatting.

## File organization conventions

Keep implementation-first ordering inside backend source files.

- place the main implementation types first
- place supporting interfaces after the implementation when they are only used to expose that implementation boundary
- place `Result` DTOs, response records, and small supporting request/response objects after the implementation when they are local to that slice or workflow

This keeps the reader on the happy path first and avoids opening a file with abstractions before the real behavior. Apply the same convention when refactoring existing files that still start with interface or result declarations.

## Business error model

Business failures use structured error codes from `Pagit.Api.Application.Shared.ErrorCodes`.

- Validation failures use `VAL_*`
- Auth and authorization use `AUTH_*`
- Business rules use `BIZ_*`
- External integration failures use `EXT_*`
- Internal failures use `SRV_*`

The frontend translates these codes instead of relying on raw error text.

See:

- `docs/ERROR_CODES.md`
- `backend/src/Pagit.Api/Application/Shared/ErrorCodes.cs`

## Data access

Feature handlers do not write ad-hoc LINQ queries directly.

- Queries go through `ISpecification<T>`
- Persistence goes through `IRepository<T>`
- Specifications are usually colocated with the feature that owns the read model or workflow

See `docs/backend/DATA_ACCESS.md` for the detailed rules.

## Observability

The backend uses structured logs and trace correlation across synchronous and asynchronous flows.

Key conventions:

- request correlation is created or propagated through `X-Request-Id` and `X-Correlation-Id`
- request middleware enriches logs with request, actor, and trace metadata
- HTTP request and response bodies are logged for mapped routes when `Observability:HttpBodyLogging:Enabled` is on; JSON bodies are capped and redacted by configured field names before they reach stdout/New Relic
- outbound HTTP calls are summarized through `OutboundHttpLoggingHandler`
- Stripe SDK calls are logged directly inside `Infrastructure/Payments/StripeGateway` with the same `request_body` / `response_body` sanitization and truncation rules used by the HTTP middleware because they do not flow through the Refit/`HttpClient` handler pipeline
- hosted workers and async processors keep observability wiring in infrastructure instead of leaking logging concerns into feature handlers

This is why logging and tracing infrastructure live under `Infrastructure/Hosting` and `Infrastructure/BackgroundJobs`, not inside feature handlers.

## Asynchronous execution

Pagit currently uses feature-owned workers that poll application state directly.

Feature-owned workers poll application state directly for workflows such as:

- notification delivery
- manual subscription renewal
- overdue gateway charge expiration

That model is:

1. a feature or application service persists domain-owned rows
2. a hosted worker polls the due rows directly from the database
3. a narrow application service reloads current state and applies the workflow
4. scheduling and retry state stay on the same feature-owned records when needed

Notification delivery uses this worker-owned model:

1. the trigger flow persists a `Notification` row with scheduling metadata
2. `NotificationDeliveryWorker` polls due `Notification` rows directly
3. `NotificationDeliveryProcessor` reloads current state and executes delivery
4. retry scheduling and delivery locks stay on the same `Notification` row

Manual subscription renewal follows the same ownership model:

1. `ManualSubscriptionRenewalHostedService` polls open manual subscriptions directly
2. `ManualSubscriptionWorkflow` loads the current cycle context for each subscription
3. the workflow classifies that cycle once (`not due`, `paid`, `open`, `overdue`, `missing`) and then applies the billing action
4. recurring charge creation, overdue handling, and `RenewalAt` updates stay in the same billing-owned flow

Gateway charge expiration follows the same worker-owned model:

1. `OverdueGatewayChargeExpirationHostedService` polls pending gateway charges directly
2. `ProcessOverdueGatewayChargesHandler` loads each tenant's current business date
3. the handler expires only charges whose `DueDate` is older than that tenant-local date
4. the due-date boundary stays on the `Charge` row instead of being copied into a separate queue record

This keeps external side effects out of entity persistence while avoiding a second generic queue model for workflows that already have feature-owned source data.

## Webhook boundaries

Provider webhooks are treated as edge adapters.

- Stripe billing webhooks enter through `Features/Billing/Webhooks`
- recurring Stripe invoice handling is owned by `GatewaySubscriptionWorkflow`, while `RecurringInvoiceChargeService` stays the narrow charge-owned helper and Stripe payload fallback rules stay in the webhook edge mapper
- Woovi webhooks enter through `Features/Integrations/Payments/Woovi`
- WhatsApp inbound webhooks enter through `Features/Integrations/WhatsApp/WhatsAppWebhookEndpoint.cs`

Webhook entrypoints should parse provider payloads, normalize them into internal models, and hand control to application workflows. Provider field names and compatibility quirks should stay near the edge.

## Billing model

Pagit has two recurring-billing paths:

- gateway-managed subscription billing, primarily through Stripe webhooks
- manual recurrence handled inside the application through scheduled charge generation

Important current modeling choices:

- `Charge` is still the central billing aggregate for receivables and settlement state
- `Subscription.RenewalAt` is the internal recurring boundary and still maps to the `next_billing_date` column
- outward HTTP/read models still expose that boundary as `NextBillingDate` in this rollout
- `Charge.ChargeType` now stores `EChargeKind` semantics:
  `OneTimeGateway`, `OneTimeManual`, `SubscriptionGateway`, `SubscriptionManual`
- subscription lifecycle decisions depend on linked charge and webhook state
- `SubscriptionCheckout` is now the primary persistence model for gateway checkout intent and checkout/webhook reconciliation
- `Subscription` no longer carries checkout reservation state; gateway pre-checkout is modeled only through `SubscriptionCheckout`

See:

- `docs/backend/PAYMENT_FLOWS.md`

## Entitlements and platform access

Platform subscription state and tenant entitlements are related but not identical.

- billing resolves the tenant's effective platform-access state
- entitlement reads use that effective state to expose enabled modules and limits
- usage guard and recorder services enforce feature/module access and billable quotas

The backend intentionally keeps this concern out of feature handlers as much as possible.

See `docs/backend/MODULE_ENTITLEMENTS_AND_CREDITS.md`.

## Notification architecture

Notification delivery is split into planning, queueing, and dispatch.

- domain events and feature actions create notification intents
- `INotificationTriggerService` validates customer notification requests and persists `Notification` rows
- `NotificationDeliveryWorker` claims due notifications from the database
- `NotificationDeliveryProcessor` loads fresh state, revalidates applicability, and owns status/retry updates
- `NotificationDispatcher` handles channel-specific rendering and provider sends for an already-persisted notification
- `Notification` records schedule, retry, and history state for charge and subscription contexts
- tenant-owner alerts are intentionally narrower: charge and subscription status handlers enqueue those rows explicitly as automation-only email alerts instead of routing them through the generic trigger matrix

Manual sends reuse the customer trigger path. Retry still works for any persisted notification row.

See `docs/backend/NOTIFICATION_ORCHESTRATION_PLAN.md`.

## Receipt verification

Manual payment proof verification is intentionally asynchronous and application-owned.

- public proof upload attaches a `PaymentProof` to a charge
- AI verification extracts amount and transaction hints
- replay-risk and missing-reference cases fall back to manual review
- review and manual settlement endpoints decide the final charge outcome

This keeps AI extraction as evidence, not as an independent billing aggregate.

## Testing guard rails

Two backend suites enforce the architecture:

- `Pagit.Api.Tests` for fast domain, validator, handler, and application coverage
- `Pagit.Api.IntegrationTests` for critical HTTP, persistence, and billing workflows

Treat tests as mandatory when changing:

- billing orchestration
- charges
- subscriptions
- webhook workflows
- event handlers
- notification dispatch behavior

See `docs/backend/TESTING_GUIDELINES.md`.

## Where to look next

- data-access rules: `docs/backend/DATA_ACCESS.md`
- payment behavior: `docs/backend/PAYMENT_FLOWS.md`
- notification orchestration: `docs/backend/NOTIFICATION_ORCHESTRATION_PLAN.md`
- entitlements and limits: `docs/backend/MODULE_ENTITLEMENTS_AND_CREDITS.md`
- testing expectations: `docs/backend/TESTING_GUIDELINES.md`
