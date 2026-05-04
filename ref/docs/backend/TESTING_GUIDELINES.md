# Testing Guidelines

## Goal

The backend test strategy is designed to protect the billing MVP and keep financial flows safe while development continues quickly. The guard rails focus first on the areas with the highest operational risk:

- gateway charge creation and routing
- manual charge creation and settlement
- public payment session creation
- receipt upload and manual conciliation
- subscription recurrence
- Stripe webhook reconciliation
- charge and subscription state transitions driven by billing events

## Testing Philosophy

Tests should protect business behavior, not mirror every internal branch.

Prefer:

- behavior-focused assertions
- risk-based coverage for money, status, permissions, and integration ordering
- a small number of strong tests over large combinatorial suites
- realistic setup for stateful workflows

Avoid:

- excessive mock-heavy tests that only prove implementation details
- exhaustive branch mirroring for defensive code with no real product scenario
- freezing refactors by asserting helper usage or incidental call order

## Test Suite Structure

The backend now uses two automated test projects.

### 1. Fast Suite

- Location: `backend/tests/Pagit.Api.Tests`
- Purpose: unit and slice-style tests for handlers, services, domain entities, validators, and event handlers
- Dependencies: fakes only
- Typical runtime: shortest feedback loop, used directly in day-to-day development

This suite should cover business branching and state transitions without requiring HTTP bootstrapping or Postgres.

### 2. Critical Integration Suite

- Location: `backend/tests/Pagit.Api.IntegrationTests`
- Purpose: critical HTTP flows executed against the real ASP.NET pipeline and a real Postgres database
- Infrastructure:
  - `WebApplicationFactory<Program>`
  - Postgres via `Npgsql`
  - database reset via `Respawn`
  - deterministic fakes for Stripe, Woovi, file storage, receipt verification, and usage guard
- Hosted services are removed from the integration test host to avoid background side effects

This suite verifies the core billing workflows end-to-end while still keeping external providers deterministic and local.

## Local Commands

Run these commands from `backend/`.

Use the `backend/Makefile` targets as the required entrypoint for automated backend tests. Do not use `dotnet test` directly for routine local verification, PR validation, or agent execution.

### Fast feedback

```bash
make test-unit
```

### PR-critical suite

Requires Docker locally because the integration tests use Postgres.

```bash
make test-integration
```

### Full backend suite

```bash
make test
```

### Coverage report

```bash
make test-coverage
```

### Focused runs

When you need a focused local run, keep using `make` and pass a filter instead of calling `dotnet test` directly.

```bash
make test-unit DOTNET_TEST_FILTER='FullyQualifiedName~NotificationTriggerServiceTests|FullyQualifiedName~NotificationDeliveryProcessorTests'
```

The coverage report runs against the full `Pagit.Api.Tests` unit-test target. CI uploads that report for inspection, but it does not enforce a hard project-wide threshold.

## Integration Test Host Rules

The integration suite uses a custom host under `backend/tests/Pagit.Api.IntegrationTests/TestHost`.

Important rules:

- use the real application startup with `WebApplicationFactory`
- keep Postgres real
- recreate the dedicated integration database (`pagit_test` by default) before applying migrations, so schema drift from prior local runs does not leak into the suite
- replace only outbound integrations and entitlements with deterministic test doubles
- replace outbound notification delivery with a deterministic fake while hosted services stay disabled
- authenticate test requests through the custom `TestScheme`
- reset the database and fake state before every test
- do not start hosted services inside the integration host

If a new critical billing endpoint is added, prefer extending this host instead of creating a separate bootstrap path.

## What Must Be Tested

Every change in the billing core should come with test updates in the same PR.

At minimum, changes touching these areas must add or update tests:

- `Application/Billing`
- `Features/Billing/Charges`
- `Features/Billing/Webhooks`
- `Application/Billing/Charges`
- `Domain/Entities/Charge`
- `Domain/Entities/Subscription`

Expected test coverage style:

- domain/entity change: unit tests
- handler/service orchestration change: fast suite tests
- HTTP contract or persistence-critical billing flow: integration tests

## CI and Deploy Guard Rails

CI now runs in layers:

- `backend-unit`: unit suite plus coverage report
- `backend-integration`: full backend suite on PR, push, schedule, and manual dispatch

Deploy workflows for staging and production must run the full backend suite before migration and publish steps.

Current PR and push validation uses deterministic backend suites only. Real-provider smoke coverage for Stripe and Woovi is not part of the current workflow. If that future layer is introduced, it should stay small, avoid duplicating the deterministic business matrix, run outside the PR-critical path, and act as a blocking pre-deploy gate.

## Current Critical Integration Coverage

The integration suite currently covers these end-to-end flows:

- `POST /api/charges/gateway` plus `POST /api/public/charges/{id}/payment-sessions`
- `POST /api/charges/manual` plus `GET /api/public/charges/{id}`
- `POST /api/public/charges/{id}/payment-proofs`
- `POST /api/charges/{id}/manual-settlements`
- `POST /api/charges/{id}/payment-reviews`
- manual recurring conciliation from customer proof upload to subscription activation
- manual recurring conciliation from finance review approval or rejection to subscription state
- manual recurring conciliation from tenant manual settlement to subscription activation
- `POST /api/webhooks/payments/stripe/account` for platform-account `invoice.created`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`, idempotency, and out-of-order delivery
- `POST /api/webhooks/payments/stripe/connect` for connected-account `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `payment_intent.succeeded`, and `account.updated`
- `POST /api/webhooks/payments/woovi` rejects missing API key, invalid correlation ids, and missing charges, ignores unknown events without mutating charge state, and accepts valid `X-Woovi-Webhook-Key`
- `POST /api/customers/{id}/subscriptions` for all supported manual recurring intervals with immediate first-cycle charge creation
- `POST /api/customers/{id}/subscription-checkout-sessions` should cover `SubscriptionCheckout` persistence for the checkout session, conflict protection when the customer already has an open relationship, webhook materialization of the real subscription from that checkout, and strict no-op behavior when `checkout.session.completed` arrives without a matching local checkout; `SubscriptionCheckout` is internal and should not need a front-facing external id contract

Current billing protection rules exercised by the suite include:

- `invoice.payment_failed` moves gateway subscriptions to `PastDue`, preserving retry/dunning recovery instead of treating the failure as terminal
- a paid recurring invoice for an already `Active` gateway subscription must advance `NextBillingDate` instead of leaving the cycle stale
- a stale or replayed `invoice.paid` event must not move `NextBillingDate` backwards for an already active subscription
- a duplicate zero-amount paid invoice for a trial subscription must not promote that subscription from `Trial` to `Active`
- recurring invoice retries can recover the same charge from `Failed` to `Paid`
- a late or replayed `invoice.payment_failed` event must not move an already paid subscription back to `PastDue`
- recurring gateway charges are linked back to `SubscriptionId` for traceability and reconciliation
- gateway-managed recurring charges do not enqueue automatic charge notifications; customer-facing automation should come from subscription lifecycle events instead
- invoice webhook coverage should prove that a recurring invoice with an unknown local subscription fails closed: it must not recreate the local subscription from Stripe metadata, it must not create a recurring charge, and it must leave existing `SubscriptionCheckout` rows untouched because invoice events do not carry session-level proof
- invoice webhook coverage should reject Stripe invoice payloads that are missing `period_end`, because recurring lifecycle and recurring charge due dates no longer use local fallback date calculation in that flow
- checkout webhook coverage should verify that `checkout.session.completed` only creates or links the local subscription when a matching `SubscriptionCheckout` exists and marks that row as `Completed`; recurring charge creation and recurring lifecycle changes must wait for the real Stripe invoice webhooks
- one-time gateway charge coverage should verify that charge creation stores one selected payment method, public payment-session creation executes that stored method without a second customer choice, and legacy multi-method charges only keep the narrow compatibility path when an explicit method is still provided
- proof auto-approval requires a reusable transaction reference; missing or reused references go to manual review
- Stripe duplicate deliveries are protected by cache dedupe plus database uniqueness on gateway subscription, subscription checkout session, and payment intent identifiers
- public payment session creation is idempotent per charge after gateway session data is persisted
- payment review endpoints reject charges that are not currently in `PendingReview`
- underpayment review approval requires an explicit override flag before a partial receipt can settle the full charge
- platform-access gated actions (for example provider onboarding) return `BIZ_PLATFORM_ACCESS_REQUIRED` when `accessStatus=NoAccess`
- cancellation scheduling keeps platform access until `NextBillingDate` while exposing `paymentStatus=CancelScheduled`
- the final `paymentStatus=Canceled` should appear only after Stripe confirms effective subscription cancellation
- the cancel-subscription request must not persist scheduled cancellation locally unless the Stripe update response explicitly confirms `cancel_at_period_end=true`
- automatic charge-notification planning should not enqueue both `ChargeCreated` and `ChargeDueToday` for the same channel when a new charge is created already due "today"; in that case `ChargeCreated` wins and `ChargeDueToday` is suppressed
- charge and subscription detail history should expose both customer notifications and persisted tenant-owner alerts when those rows exist
- tenant-owner notification coverage should stay narrow: `ChargePendingReview`, `SubscriptionPastDue`, and `SubscriptionFailed` persist `TargetType=TenantOwner` rows and resolve the current owner email only at delivery time

## Current Deterministic Fast-Suite Coverage

- `ManualSubscriptionBillingTests` covers `NotDueYet`, `CurrentCycleOpen`, `CurrentCyclePaid`, current-cycle charge-creation failure, and terminal-subscription no-op behavior
- `ManualSubscriptionConciliationServiceTests` covers overdue debt precedence over historical paid evidence and terminal-subscription no-op behavior
- `WooviChargeWebhookWorkflowTests` covers replay-safe workflow behavior for completed and expired charge events

## Writing New Tests

Prefer these conventions:

- name tests as `Action_Should_Result_When_Condition`
- seed only the minimum data needed
- keep gateway/storage/AI behavior deterministic in test doubles
- avoid real external HTTP calls in automated tests
- avoid using EF InMemory as a substitute for integration coverage when persistence behavior matters

When adding new billing behavior, start by asking:

1. Does this change alter domain state transitions?
2. Does it change handler orchestration or business branching?
3. Does it change the HTTP contract or persistence behavior of a critical flow?

If the answer is yes, add the corresponding unit and/or integration coverage before merging.
