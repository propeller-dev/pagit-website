# Recurrence Testing Workflow Design

Date: 2026-04-11
Status: Draft approved for implementation planning

## Summary

This design defines the first milestone for improving recurrence-related testing in Pagit. The goal is to harden the existing deterministic backend suites for recurring billing behavior before introducing any real-provider smoke coverage.

The first milestone stays inside the current backend test structure:

- fast deterministic tests in `backend/tests/Pagit.Api.Tests`
- critical HTTP and persistence integration tests in `backend/tests/Pagit.Api.IntegrationTests`

It does not introduce a new test framework, browser E2E, or real Stripe/Woovi calls.

## Context

Pagit currently has two recurrence paths with different execution models:

- automatic recurrence driven by Stripe webhooks
- manual recurrence driven by internal charge generation and conciliation workflows

The current deterministic test coverage is already meaningful:

- Stripe recurrence has broad unit and integration coverage for checkout reconciliation, invoice ordering, idempotency, retries, and failure recovery.
- Manual recurrence has good coverage for subscription creation, payment proof upload, manual review, manual settlement, and some renewal/conciliation service behavior.
- Woovi has basic deterministic coverage for webhook authorization and the main paid/expired transitions.

The remaining risk is not the total absence of tests. The risk is that some important recurrence branches are still implicit in code rather than explicitly protected by tests.

## Goals

- Increase deterministic confidence for recurrence behavior in the existing backend suites.
- Close the highest-value gaps in manual renewal, manual conciliation, Woovi webhook handling, and Stripe subscription lifecycle integration.
- Keep the change additive and local to the existing test owners.
- Preserve fast PR feedback by staying fully deterministic.
- Prepare the codebase for a future real-provider smoke suite without mixing that concern into this milestone.

## Non-goals

- No real Stripe test-mode or Woovi sandbox calls in this milestone.
- No browser or frontend end-to-end tests.
- No broad production refactor unless a tiny testability fix is required by a critical branch.
- No new generic recurrence test harness unless a very small helper extraction removes obvious duplication.
- No attempt to exhaustively enumerate every interval-state-provider combination.

## Current Coverage Assessment

### Automatic recurrence

Strong deterministic coverage already exists in:

- `backend/tests/Pagit.Api.Tests/Application/Billing/BillingWebhookProcessorTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/InvoiceWebhookWorkflowTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/CheckoutWebhookWorkflowTests.cs`
- `backend/tests/Pagit.Api.Tests/Features/Billing/Webhooks/StripeWebhookHandlerTests.cs`
- `backend/tests/Pagit.Api.IntegrationTests/Features/Billing/Webhooks/StripeInvoiceWebhookFlowTests.cs`
- `backend/tests/Pagit.Api.IntegrationTests/Features/Billing/Webhooks/StripeCheckoutWebhookFlowTests.cs`

Those tests already protect:

- `invoice.created`, `invoice.paid`, and `invoice.payment_failed`
- duplicate and out-of-order invoice delivery
- recurrence charge creation and recovery
- subscription checkout materialization
- Stripe signature validation

The main remaining gap is integration-level coverage for provider-driven subscription lifecycle events:

- `customer.subscription.updated`
- `customer.subscription.deleted`

### Manual recurrence

Manual deterministic coverage already exists in:

- `backend/tests/Pagit.Api.IntegrationTests/Features/Customers/CreateCustomerSubscriptionFlowTests.cs`
- `backend/tests/Pagit.Api.IntegrationTests/Features/Charges/ManualRecurringSubscriptionFlowTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/ManualSubscriptionBillingTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/ManualSubscriptionConciliationServiceTests.cs`

Those tests already protect:

- creation of the first recurring manual charge for all supported intervals
- proof upload activating a pending subscription
- manual review approval and rejection behavior
- manual settlement activating a pending subscription
- overdue and charge-creation-failure handling in the renewal service

The main remaining gaps are renewal-state branches and conciliation precedence rules that are present in code but not explicitly covered.

### Woovi

Woovi deterministic coverage already exists in:

- `backend/tests/Pagit.Api.Tests/Application/Billing/WooviChargeWebhookWorkflowTests.cs`
- `backend/tests/Pagit.Api.IntegrationTests/Features/Integrations/Payments/Woovi/WooviWebhookFlowTests.cs`

Those tests currently cover:

- missing webhook key rejection
- successful paid transition
- expired transition
- workflow-level not-found behavior
- terminal-state protection for expired events on already paid charges

The main remaining gaps are HTTP contract edges and replay behavior.

## Proposed Design

The deterministic suite should keep the current split of responsibilities.

### Fast suite ownership

The fast suite should own business-state branching and precedence rules.

Use it for:

- manual renewal state-machine branches
- manual conciliation precedence
- Woovi workflow idempotency and terminal-state rules

### Integration suite ownership

The integration suite should own HTTP contracts, endpoint behavior, persistence effects, and real host wiring.

Use it for:

- Woovi webhook endpoint contract behavior
- Stripe subscription lifecycle webhook integration coverage
- existing manual recurring flow coverage that already spans endpoint to database behavior

### Deliberate constraints

This milestone should not create a third recurrence-specific suite. The existing files are already close to the behavior they protect, and expanding them in place is cheaper than inventing a new abstraction layer.

## Test Additions by Owner

### 1. Manual renewal service

File:

- `backend/tests/Pagit.Api.Tests/Application/Billing/ManualSubscriptionBillingTests.cs`

Add tests for:

- `ProcessSubscriptionAsync_WhenSubscriptionIsNotDueYet_ShouldOnlyReconcile`
- `ProcessSubscriptionAsync_WhenCurrentCycleChargeIsStillOpen_ShouldNotCreateAnotherCharge`
- `ProcessSubscriptionAsync_WhenCurrentCycleChargeIsPaid_ShouldAdvanceNextBillingDate_WithoutCreatingCharge`
- `ProcessSubscriptionAsync_WhenSubscriptionIsCanceled_ShouldDoNothing`
- `ProcessSubscriptionAsync_WhenSubscriptionIsFailed_ShouldDoNothing`

Behavior protected:

- no duplicate charge creation for the current cycle
- billing-date advancement when the current cycle is already settled
- explicit no-op behavior for terminal subscriptions

### 2. Manual conciliation service

File:

- `backend/tests/Pagit.Api.Tests/Application/Billing/ManualSubscriptionConciliationServiceTests.cs`

Add tests for:

- `ReconcileAsync_Should_KeepSubscriptionUnchanged_WhenThereIsNoPaidCharge_AndNoOverdueDebt`
- `ReconcileAsync_Should_PreferPastDue_WhenOverdueDebtExists_EvenIfAnotherChargeWasPaid`
- `ReconcileAsync_Should_IgnoreCanceledSubscription`
- `ReconcileAsync_Should_IgnoreFailedSubscription`

Behavior protected:

- overdue debt has higher priority than historical paid evidence
- a subscription should not change state without a real trigger
- terminal manual subscriptions stay out of the recurrence loop

### 3. Woovi workflow

File:

- `backend/tests/Pagit.Api.Tests/Application/Billing/WooviChargeWebhookWorkflowTests.cs`

Add tests for:

- `HandleChargeCompletedAsync_Should_LeavePaidChargeUnchanged_WhenEventIsReplayed`
- `HandleChargeExpiredAsync_Should_LeaveExpiredChargeUnchanged_WhenEventIsReplayed`

Behavior protected:

- replayed provider events remain safe
- terminal-state handling stays explicit and deterministic

### 4. Woovi webhook endpoint contract

File:

- `backend/tests/Pagit.Api.IntegrationTests/Features/Integrations/Payments/Woovi/WooviWebhookFlowTests.cs`

Add tests for:

- `WooviWebhook_Should_ReturnBadRequest_WhenCorrelationIdIsInvalid`
- `WooviWebhook_Should_ReturnNotFound_WhenChargeDoesNotExist`
- `WooviWebhook_Should_IgnoreUnknownEvent_WithoutMutatingCharge`

Optional follow-up in the same file only if the production contract is intentional:

- `WooviWebhook_Should_UsePixTransactionId_WhenChargeTransactionIdIsMissing`

Behavior protected:

- endpoint contract correctness
- safe handling of malformed provider payloads
- safe handling of ignored events

### 5. Stripe subscription lifecycle integration

Add a small integration owner under:

- `backend/tests/Pagit.Api.IntegrationTests/Features/Billing/Webhooks`

Add tests for:

- `customer.subscription.updated` scheduling cancellation locally
- `customer.subscription.deleted` finalizing cancellation locally

Behavior protected:

- the deterministic integration suite exercises the full ASP.NET webhook path for Stripe subscription lifecycle events, not only invoice and checkout flows

## What This Milestone Deliberately Does Not Add

- worker-hosted integration tests for manual renewal polling
- large matrix helpers for every recurrence combination
- duplicate integration coverage for rules that are already better expressed in the fast suite
- real-provider contract checks

## Documentation Impact

Implementation of this design should update the existing backend testing documentation in:

- `docs/backend/TESTING_GUIDELINES.md`

That update should:

- reflect the stronger deterministic recurrence coverage
- explicitly distinguish deterministic PR coverage from the future provider smoke suite
- keep the testing doc focused on the current system rather than implementation history

No new source-of-truth architecture doc is needed for the first milestone beyond this design spec and the later update to `TESTING_GUIDELINES.md`.

## Verification Expectations

The implementation plan for this milestone should verify the changed scope with the existing backend Make targets, not ad-hoc `dotnet test` commands.

Expected verification shape:

- focused `make test-unit` coverage while developing
- focused `make test-integration` coverage for the changed integration files
- full relevant backend verification before completion

## Future Follow-up

After this deterministic hardening milestone lands, the next step should define a small real-provider smoke suite for Stripe and Woovi.

That future suite should run:

- nightly
- on manual dispatch
- as a blocking pre-deploy gate

It should remain small and contract-oriented rather than duplicating the deterministic business matrix.
