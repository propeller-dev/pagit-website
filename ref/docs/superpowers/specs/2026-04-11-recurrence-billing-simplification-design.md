# Recurrence and Billing Simplification Design

Date: 2026-04-11
Status: Proposed
Owner: Codex + Eduardo review

## Scope

This design covers backend recurrence and billing simplification for:

- recurring subscription lifecycle
- recurring receivable modeling
- gateway checkout intent
- manual recurrence orchestration
- gateway recurrence orchestration
- billing and access projection boundaries

It does not propose a second recurring aggregate or a separate persistence model for manual vs gateway subscriptions.

## Outcome

Keep:

- one `Subscription` aggregate
- one `Charge` aggregate
- one `SubscriptionCheckout` aggregate

Simplify by:

- making each entity mean one thing only
- making each recurring mode have one visible workflow owner
- moving display and access interpretation out of domain entities
- deleting stale compatibility states and naming overload

## Recommended Direction

Three directions were considered:

1. Keep the current model and only clean service structure.
2. Keep one `Subscription` and one `Charge`, but make their meanings strict.
3. Push more recurring runtime state back onto `Subscription`.

Recommendation: option 2.

Reason:

- it preserves the current aggregate count
- it keeps the rollout reversible
- it removes ambiguity instead of adding abstraction
- it fits the existing codebase direction, where manual and gateway recurrence already behave like separate engines

## Current Problems

The current architecture has improved, but recurrence is still harder to reason about than it should be because meaning and workflow ownership are still overloaded.

Current friction points:

- `Subscription` still mixes recurring lifecycle, scheduled cancellation signaling, and product-facing payment/access interpretation
- `Charge` still mixes one-time receivable, manual recurring receivable, and mirrored gateway invoice receivable behind weak naming
- `SubscriptionCheckout` has a good responsibility in theory, but stale open rows can still block new intent creation
- manual recurrence is split across cycle progression and conciliation
- gateway recurrence is split across multiple services that still share one mental model
- some Stripe naming is misleading, especially invoice identity stored in payment-intent fields

## Target Entity Model

### Subscription

`Subscription` should represent only the recurring contract between customer and plan.

Keep:

- `TenantId`
- `CustomerId`
- `PlanId`
- `Status`
- `GatewaySubscriptionId`
- `CancelAtPeriodEnd`
- `TrialEndsAt`
- recurring-boundary date field
- `StartDate`
- `CreatedAt`

Recommended rename:

- rename `NextBillingDate` to `RenewalAt`

Meaning of `RenewalAt`:

- the next recurring billing boundary only
- for manual recurrence, the next local billing boundary
- for gateway recurrence, the provider-confirmed billing boundary

It should no longer mean:

- generic grace-until date
- generic access-until date
- fake cancellation effective date
- catch-all “important subscription date”

`Subscription` should stop owning:

- checkout intent
- access/grace projection rules
- fake display states
- provider recovery heuristics

### Subscription Status Model

The subscription lifecycle should remain:

- `Pending`
- `Trial`
- `Active`
- `PastDue`
- `Canceled`
- `Failed`

Meanings:

- `Pending`: recurring contract exists, but the first qualifying cycle has not been successfully settled
- `Trial`: active under a non-billable trial window
- `Active`: healthy current cycle
- `PastDue`: unresolved overdue recurring debt exists
- `Canceled`: recurring contract ended
- `Failed`: unrecoverable early failure before or around healthy lifecycle establishment

Rules:

- scheduled cancellation is never a lifecycle state
- `CancelAtPeriodEnd` remains a flag
- `Grace` is a projection concern, not a subscription state

### Charge

`Charge` remains the single receivable aggregate.

One `Charge` means one amount owed or settled.

That includes:

- one-time gateway charges
- one-time manual charges
- manual recurring charges linked to `SubscriptionId`
- gateway recurring charges linked to `SubscriptionId`

Recommended rename:

- replace `EChargeType` with `EChargeKind`

Recommended values:

- `OneTimeGateway`
- `OneTimeManual`
- `SubscriptionGateway`
- `SubscriptionManual`

This is preferred over the current `Gateway` / `Manual` / `Recurrence` naming because it tells the truth directly without creating a second recurring aggregate.

Gateway recurring charges should store invoice identity explicitly:

- add `GatewayInvoiceId`
- keep `GatewayPaymentIntentId` only for actual payment intent identity

This removes the current invoice-id/payment-intent naming mismatch.

### SubscriptionCheckout

`SubscriptionCheckout` should remain the gateway signup-intent aggregate.

Keep:

- `Open`
- `Completed`
- `Expired`

Remove:

- `Abandoned`, unless the product gets a real user-visible operational workflow for it

Add:

- `ExpiresAt` or equivalent stale-intent expiration rule

Reason:

- stale open checkout rows should not block new checkout attempts forever

## Target Workflow Ownership

The simplified model should not introduce a central billing manager. It should assign one owner per real workflow.

### SubscriptionCheckoutWorkflow

Owns:

- create checkout intent
- prevent conflicting open intent/contract
- persist `SubscriptionCheckout`
- complete or expire checkout intent

Does not own:

- recurring charge creation
- recurring subscription activation

### ManualSubscriptionWorkflow

Owns the manual recurrence path end to end.

Top-level shape:

1. load current subscription + cycle truth
2. classify the cycle
3. apply one action

Actions:

- not due
- open current-cycle charge exists
- current-cycle charge paid
- overdue debt exists
- current-cycle charge missing

This replaces the current split between manual charge progression and manual conciliation.

### GatewaySubscriptionWorkflow

Owns the gateway recurrence path end to end.

Top-level shape:

1. normalize provider event at the edge
2. load or recover `Subscription`
3. sync linked recurring `Charge`
4. apply lifecycle transition

This replaces the current distributed mental model across invoice processor, invoice recovery, and lifecycle service, while still allowing a charge-owned helper for recurring charge persistence.

### SubscriptionCancellationWorkflow

Owns:

- cancellation request
- scheduled cancellation persistence only after provider confirmation
- final cancellation after provider lifecycle confirmation
- unschedule or recovery handling from provider events

### TenantBillingProjectionService

Owns:

- `paymentStatus`
- `accessStatus`
- `accessEndsAt`
- effective plan/access projection

This logic should move out of `Subscription` over time.

## State and Projection Rules

Projection rules should be explicit and live outside the entity.

Recommended projection rules:

- `paymentStatus=CancelScheduled` = `Status in (Trial, Active)` and `CancelAtPeriodEnd = true`
- active access should be derived, not persisted
- access-until date should be a projection output, not a reason to overload `Subscription`

Over time, remove from `Subscription`:

- `ToPaymentStatus()`
- `GetPlatformAccessStatus(...)`
- `HasPlatformAccess(...)`

The entity should answer lifecycle questions. The projection should answer product/UI questions.

## What Stays Shared

Shared code should stay limited to real shared concepts:

- schedule calculation
- charge persistence rules
- projection mapping
- provider-edge normalization

Manual and gateway recurrence should share aggregates, but not share the same orchestration owner.

## What We Are Deliberately Not Introducing

Do not introduce:

- a second `Subscription` persistence model
- a recurring cycle aggregate
- a generic `BillingManager`
- a generic `Resolve*` orchestration layer
- a state-machine framework
- event chains for the main happy path

## Rollout Plan

### Phase 1: Tighten meanings

- treat `NextBillingDate` as the recurring boundary only
- rename or introduce the stricter charge-kind concept in code
- add explicit invoice identity for gateway recurring charges
- add checkout-intent expiration
- move payment/access projection logic toward the projection service

### Phase 2: Collapse workflow ownership

- merge manual recurrence progression and conciliation into one workflow owner
- collapse gateway recurrence into one workflow owner
- keep checkout and cancellation as separate workflows

### Phase 3: Delete compatibility logic

- remove unused checkout states
- remove stale grace/cancel display helpers from entities
- remove invoice-id/payment-intent overload
- remove workflow branches that exist only because entity meaning is still ambiguous

## Expected End State

Keep:

- one `Subscription`
- one `Charge`
- one `SubscriptionCheckout`
- one billing/access projection service

Merge:

- `ManualSubscriptionChargeService`
- `ManualSubscriptionConciliationService`

into one explicit manual recurrence owner.

Collapse into one gateway recurrence owner:

- invoice recovery
- invoice orchestration
- lifecycle application

while keeping recurring charge persistence as a narrow charge-owned helper.

## Deletion Targets

Delete over time:

- `ChargeType.Recurrence`
- `SubscriptionCheckoutStatus.Abandoned`
- entity-level payment/access projection helpers
- naming that uses payment-intent fields for invoice identity
- stale compatibility branches around checkout and scheduled-cancel semantics

## Main Complexity Risk Being Contained

The main risk is reintroducing ambiguity through “shared” abstractions that know both manual and gateway rules.

Containment strategy:

- one owner per workflow
- one meaning per entity
- one meaning per important field
- projection logic outside the domain entity

## Testing Expectations

Entity-level tests should lock:

- subscription lifecycle transitions
- charge kind semantics
- checkout expiration behavior

Workflow-level integration tests should lock:

- manual recurrence `load -> decide -> act`
- gateway invoice recovery and lifecycle progression
- scheduled cancellation and final cancellation
- duplicate and out-of-order webhook delivery

The most important simplification rule for tests:

- each business rule should have one primary owner boundary
- avoid asserting the same recurrence rule through multiple overlapping services

## Success Criteria

This design is successful when:

- a developer can understand manual recurrence by reading one workflow owner
- a developer can understand gateway recurrence by reading one workflow owner
- `Subscription` no longer carries display/access ambiguity
- `Charge` no longer hides recurring meaning behind weak naming
- checkout intent can expire without blocking future work
- recurring gateway invoice identity is explicit and not hidden in payment-intent naming
