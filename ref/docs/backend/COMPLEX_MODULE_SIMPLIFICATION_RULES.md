# Complex Module Simplification Rules

This is a temporary refactoring guide.

It records the current direction for simplifying the most complex Pagit modules:

- billing
- notifications
- integrations
- projections and state-derived flows

It is intentionally short and prescriptive.

## Goal

Reduce:

- hidden business rules
- workflow branching
- state-dependent behavior spread across many files
- helper objects that only move values around
- generic service names that hide the real behavior

Prefer:

- small explicit workflows
- concrete module ownership
- fewer helper types
- fewer persisted states
- fewer indirect side effects in the main flow

## Main rules

### 1. Prefer one explicit flow

For complex application flows, prefer one readable method that follows:

1. load
2. decide
3. act

Do not split a readable workflow into many services, records, or helper abstractions unless that clearly removes real complexity.

### 2. Avoid generic names

Do not default to names like:

- `Resolve*`
- `Try*`
- `Ensure*`
- `Processor`
- `Manager`
- `LifecycleService`
- `Context`
- `Scenario`
- `Decision`

Prefer concrete names like:

- `FindSubscriptionByGatewayIdAsync`
- `CreateSubscriptionFromCheckoutAsync`
- `ApplyPaidInvoice`
- `MarkSubscriptionPastDue`
- `CreateRecurringChargeFromInvoice`
- `SendCustomerChargeNotification`

### 3. Avoid helper records unless they earn their cost

Do not create local records or objects just to move a few primitive values through one workflow.

Only create a helper type when:

- it removes real parameter fan-out
- it crosses multiple methods cleanly
- it represents a real business concept

Otherwise, keep the values as local variables in the workflow.

### 4. Keep state machines local

State-machine style modeling is acceptable inside one small entity lifecycle.

Do not use a general state-machine framework as the main architecture for:

- gateway billing flows
- notification orchestration
- manual recurrence orchestration
- integration reconciliation

Complexity should become more explicit, not more indirect.

### 5. Use events only for side effects

Events are good for:

- notifications
- projections
- audit/history
- metrics
- derived reactions

Events are not the preferred way to coordinate the main happy path of a workflow.

## Module directions

### Billing

Split concretely by business mode, not only by folder:

- `GatewaySubscriptions`
- `ManualSubscriptions`
- `Charges`
- `BillingProjections`

Each module should own its own workflow and state decisions instead of sharing one generic runtime service.

### Notifications

Keep the flow simple:

1. event or action decides that a notification should exist
2. planner persists rows
3. worker delivers rows

Do not let dispatcher, processor, and planner all decide business rules at once.

### Integrations

Keep provider quirks at the edge.

Do not let provider payload flexibility leak into the core business workflow through many fallbacks and compatibility branches.

### Projections

Derived state such as tenant billing status, access status, or snapshots should stay explicit and separate from the core entity lifecycle.

Do not keep pushing projection logic back into domain entities if that makes them carry extra state meanings.

## Refactor priorities

1. gateway subscription flows
2. manual subscription flows
3. charge capabilities and settlement flows
4. notification planning and delivery rules
5. integration management and routing rules
6. tenant/access/payment projections

## What to avoid

- generic workflow engines
- saga-style coordination inside the monolith
- central runtime services that keep accumulating rules
- new enums or records that only rename existing branching
- classifier/context sprawl
- defensive fallback chains without real production evidence

## Working style

When simplifying a complex module:

- start from the current code
- identify the real owner of the rule
- remove duplicated branching first
- keep the happy path visible
- rename generic pieces before adding new ones
- prefer deleting code over moving code

## Related files

- `docs/backend/ARCHITECTURE.md`
- `docs/backend/PAYMENT_FLOWS.md`
- `docs/backend/NOTIFICATION_ORCHESTRATION_PLAN.md`
- `docs/backend/COMPLEXITY_REVIEW_TODO.md`
