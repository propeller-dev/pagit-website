# Backend Complexity Review

This file records the current architectural assessment of the most complex backend areas in Pagit and the simplification direction that should guide future refactors.

It is not a source-of-truth runtime guide. Current behavior still lives in the code and in the dedicated backend docs such as:

- `docs/backend/ARCHITECTURE.md`
- `docs/backend/PAYMENT_FLOWS.md`
- `docs/backend/NOTIFICATION_ORCHESTRATION_PLAN.md`
- `docs/backend/DATA_ACCESS.md`

## Conclusion

The main backend problem is no longer only imperative style. The bigger issue is structural complexity:

- a small number of central services own too many workflow axes at once
- several flows require too much hidden context before a reader can understand or execute one action
- some entities represent more than one state machine at the same time
- folder boundaries and type names often describe implementation style instead of business responsibility

This creates high reading cost, high change cost, and fragile workflow behavior even where the code is technically correct.

## Main findings

### 1. Complexity is concentrated, not evenly distributed

The HTTP feature handlers are not the main problem. Many slices are relatively small and explicit.

The main complexity is concentrated in a few central classes:

- `backend/src/Pagit.Api/Application/Billing/Webhooks/BillingWebhookProcessor.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationTriggerService.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDispatcher.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDeliveryProcessor.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionChargeService.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionConciliationService.cs`
- `backend/src/Pagit.Api/Application/Integrations/Payments/PaymentMethodManagementService.cs`
- `backend/src/Pagit.Api/Application/Ai/WhatsAppCommandOrchestrator.cs`

These classes mix multiple concerns such as normalization, lookup, business decision, state reconciliation, persistence, provider behavior, retries, and side effects.

### 2. Folder structure and names are increasing ambiguity

The current backend layout mixes several kinds of cuts at once:

- by business area: `Billing`, `Charges`, `Customers`, `Notifications`
- by technical role: `Runtime`, `Models`, `Admin`, `Manual`, `Webhooks`
- by architecture layer: `Features`, `Application`, `Infrastructure`, `External`

As a result, one business capability is spread across several places before its real owner becomes clear.

Example:

- subscription creation starts in `Features/Customers`
- manual recurrence progression lives in `Application/Billing/Subscriptions`
- gateway subscription reconciliation lives in `Application/Billing/Webhooks`
- cancellation sync currently lives under `Features/Billing/Webhooks`

This is workable, but it raises the cost of understanding one billing capability from end to end.

### 3. Some names are too generic and attract unrelated rules

Several names currently act as complexity magnets:

- `BillingWebhookProcessor`
- `NotificationTriggerService`
- `NotificationDispatcher`
- `PaymentMethodManagementService`
- `WhatsAppCommandOrchestrator`

These names are broad enough that almost any new rule can be added to them. That usually means the type does not represent a narrow enough boundary.

### 4. Workflows require too much implicit context

A recurring issue in the current backend is that a flow begins with one piece of input and then gradually discovers many more variables while it is already executing:

- which billing model is in effect
- whether the action is manual or gateway-driven
- whether the object is one-time or recurring
- whether the current state came from local data or a provider callback
- whether the action is planning or delivery
- whether automation and manual behavior differ

This makes many actions harder to reason about than they need to be. The reader has to keep too much invisible state in mind before understanding whether a given action is allowed.

### 5. Some entities hold more than one state machine

This is one of the main causes of branching.

`Charge` currently combines:

- receivable state
- gateway session state
- manual collection details
- reconciliation evidence
- recurrence linkage

See:

- `backend/src/Pagit.Api/Domain/Entities/Charge.cs`

`Subscription` currently combines:

- checkout reservation behavior
- active billing lifecycle
- trial lifecycle
- scheduled cancellation lifecycle
- access-related semantics

See:

- `backend/src/Pagit.Api/Domain/Entities/Subscription.cs`

`Notification` currently combines:

- notification intent
- durable queue record
- delivery retry state
- lock state
- history state

See:

- `backend/src/Pagit.Api/Domain/Entities/Notification.cs`

This does not mean the entities are wrong. It means too many distinct workflow meanings currently share the same object, which multiplies state-dependent paths.

Current simplification progress on `Charge`:

- `SubmitPaymentProof` no longer re-evaluates proof eligibility through multiple local `if` branches
- `Charge` now exposes whether it accepts customer payment proofs, so the handler focuses on token validation, upload, verification, and persistence instead of rebuilding charge capability rules inline

## Subscription simplification target

The preferred simplification for subscription billing is:

- move pre-checkout out of `Subscription`
- stop persisting `CancelScheduled` as a core subscription state
- keep tenant billing/access as a projection, not as another state machine inside the entity
- avoid introducing many new fields just to reorganize the same ambiguity

This direction is consistent with the simpler patterns used by Stripe, Paddle, Chargebee, Kill Bill, UniBee, and Lago:

- real subscription lifecycle stays small
- scheduled cancellation is modeled as a flag or scheduled change
- checkout intent does not share the same state machine as the recurring subscription
- access/entitlement is derived, not treated as the exact same thing as billing state

### Proposed minimal model

#### `SubscriptionCheckout`

This is the new pre-subscription entity. Use this name consistently. Do not use `SubscriptionCheckoutReservation`.

Suggested fields:

- `Id`
- `TenantId`
- `CustomerId`
- `PlanId`
- `GatewayCheckoutSessionId`
- `Status`
- `CreatedAt`
- `ExpiresAt`
- `CompletedAt`
- `SubscriptionId`

Suggested statuses:

- `Open`
- `Completed`
- `Expired`

Responsibility:

- represent a gateway checkout that has been started but has not yet become a real subscription
- provide a stable local record for checkout reconciliation
- absorb what is currently modeled as `Subscription.Status == AwaitingCheckout`

#### `Subscription`

Keep `Subscription` focused on recurring billing lifecycle only.

Target shape:

- keep:
  - `Id`
  - `TenantId`
  - `CustomerId`
  - `PlanId`
  - `GatewaySubscriptionId`
  - `Status`
  - `TrialEndsAt`
  - `NextBillingDate`
  - `CreatedAt`
  - `StartDate`
- add:
  - `CancelAtPeriodEnd`
- remove from this entity over time:
  - `GatewayCheckoutSessionId`
  - `AwaitingCheckout`
  - `CancelScheduled`

Target status set:

- `Pending`
- `Trial`
- `Active`
- `PastDue`
- `Canceled`
- `Failed`

Notes:

- `NextBillingDate` should remain in storage for now to keep the rollout small. Treat it semantically as the renewal/current-period-end date, not as a generic "everything date".
- `CancelScheduled` should become a computed payment projection from `Status + CancelAtPeriodEnd`, not a persisted core status.

### Tenant billing state impact

This simplification must preserve `TenantPlatformBillingStateService`, because tenant access and effective plan selection currently depend on `Subscription` and its derived statuses.

Current code coupling:

- `Subscription.GetPlatformAccessStatus(...)`
- `Subscription.ToPaymentStatus()`
- `TenantPlatformBillingStateService`
- `CustomerPaymentSnapshot`
- `TenantEntitlementSyncService`

Target direction:

- keep `EPaymentStatus.CancelScheduled` for UI and API output
- compute it from:
  - `subscription.Status in (Trial, Active)`
  - `subscription.CancelAtPeriodEnd == true`
- keep access projection simple:
  - one projection owner should answer both `HasAccess` and the richer `paymentStatus/accessStatus` payload
  - avoid a second wrapper service that only converts that projection into a boolean
  - `Trial` and `Active` => access active
  - final `Canceled` => no access
  - everything else => no access

This means:

- tenant billing state remains available without adding a new persisted entitlement model right now
- access and payment display stay compatible with current APIs
- the domain entity stops needing checkout and scheduled-cancel behavior in the same state machine

### Why this is simpler

This model removes two of the most confusing status meanings:

- `AwaitingCheckout` stops contaminating the recurring subscription lifecycle
- `CancelScheduled` stops being both a lifecycle state and a UI/payment state

It also avoids a larger redesign:

- no new access-end date field right now
- no extra entitlement aggregate right now
- no second timeline field beyond the existing `NextBillingDate`

## Technical state of `Subscription` and `SubscriptionCheckout`

This cleanup is no longer only planned. The main substitutive simplification is already in place.

### What changed

- `SubscriptionCheckout` is now the only persisted pre-checkout record
- `Subscription` no longer stores `GatewayCheckoutSessionId`
- `AwaitingCheckout` was removed from the runtime subscription lifecycle
- `CancelScheduled` was removed from persisted `Subscription.Status`
- `CancelAtPeriodEnd` is the only persisted signal for scheduled cancellation

### Current runtime rules

- checkout creation writes only `SubscriptionCheckout`
- `checkout.session.completed` creates or links the real `Subscription` only when there is a matching local checkout and then completes that checkout
- invoice reconciliation only acts on an existing local `Subscription`
- scheduled cancellation is persisted as `CancelAtPeriodEnd = true`
- tenant-facing `PaymentStatus.CancelScheduled` is computed from `Status + CancelAtPeriodEnd`

### Data migration rules already applied

- legacy `AwaitingCheckout` rows are backfilled into `subscription_checkouts`
- legacy `CancelScheduled` rows are normalized into `Active` or `Trial` plus `cancel_at_period_end = true`
- `subscriptions.gateway_checkout_session_id` is removed after the backfill/cleanup migration

### Remaining subscription simplification work

The model is materially smaller now, but there are still cleanup opportunities:

- keep `Subscription` focused on recurring billing lifecycle only
- continue trimming helper methods that only rename direct state changes
- keep tenant billing/access as a projection over `Status + CancelAtPeriodEnd + NextBillingDate`
- avoid reintroducing compatibility paths for `AwaitingCheckout` or `CancelScheduled`

## Tests required before behavior change

The migration can only proceed safely if behavior is protected first. The test suite should lock current product behavior before each phase that changes rules or projections.

Must-have coverage:

- checkout creation produces a pending local checkout record and not a real active subscription
- checkout completion promotes the checkout into a real subscription only once
- invoice-paid fails closed when the local subscription is missing and leaves checkout reservations untouched
- scheduled cancellation still appears as `PaymentStatus.CancelScheduled` in tenant-facing responses while lifecycle remains `Active` or `Trial`
- final `Canceled` means no access
- cancel-at-period-end removal restores normal active or trial display without requiring a fake `CancelScheduled` status

Primary test areas:

- `backend/tests/Pagit.Api.Tests/Application/Billing/BillingWebhookProcessorTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/InvoiceWebhookWorkflowTests.cs`
- `backend/tests/Pagit.Api.Tests/Application/Billing/ManualSubscriptionBillingTests.cs`
- `backend/tests/Pagit.Api.Tests/Domain`
- `backend/tests/Pagit.Api.IntegrationTests/Features/Webhooks/StripeInvoiceWebhookFlowTests.cs`

## Most complex flows

### 1. Billing webhooks

Primary files:

- `backend/src/Pagit.Api/Application/Billing/Webhooks/BillingWebhookProcessor.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/CheckoutWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/InvoiceWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/SubscriptionWebhookWorkflow.cs`

Why this flow is the highest-risk complexity area:

- one-time checkout reconciliation and recurring subscription reconciliation meet in the same processor
- the same class historically handled missing-state reconstruction, idempotency, charge creation, charge settlement, and lifecycle transitions in one place
- invoice lifecycle policy is still dense even after the recovery branches were removed

Current assessment:

- the Stripe edge adapters are already partially split by event type
- the main business processor is still too central
- idempotency is explicit, but too much of the workflow still depends on one class understanding the whole matrix
- first simplification pass already applied:
  - paid recurring invoices now advance `NextBillingDate` safely through a small domain method on `Subscription`
  - duplicate zero-amount trial invoices no longer promote `Trial` to `Active`
  - recurring invoice retries can recover a charge from `Failed` to `Paid`
  - stale `invoice.payment_failed` deliveries no longer push an already paid subscription back to `PastDue`
- second simplification pass already applied:
  - invoice subscription handling now lives in a dedicated gateway-subscription owner
  - recurring invoice charge creation and paid/failed application now live in `RecurringInvoiceChargeService`
  - `BillingWebhookProcessor` still owns the orchestration and lifecycle branch, but no longer owns the full invoice reconciliation stack alone
- third simplification pass already applied:
  - invoice subscription lifecycle application now lives in the gateway subscription webhook owner instead of `BillingWebhookProcessor`
  - `BillingWebhookProcessor` keeps the invoice orchestration order, but no longer owns subscription lookup, charge handling, and lifecycle transitions in the same class
- fourth simplification pass already applied:
  - gateway subscription recovery now reads as known-subscription lookup first, then recovery-only logic
  - reservation promotion and missing-subscription recreation are no longer interleaved with the normal gateway-id lookup path
  - paid lifecycle handling now reads as early exits, trial path, billable path, then save
  - trial handling and billable paid-cycle handling are still in one workflow path, but no longer share the same inline branch soup
- fifth simplification pass already applied:
  - gateway subscription recovery now fails early on missing gateway subscription id
  - the top-level flow is linear: known subscription, resolve metadata context, try open checkout, create from metadata
  - the redundant second gateway-id lookup inside the recovery path was removed
- sixth simplification pass already applied:
  - `BillingWebhookProcessor` now treats invoice subscription resolution as one local step instead of repeating the full service call shape three times
  - repeated success logs for recurring invoice charge creation/synchronization were removed from the processor
- seventh simplification pass already applied:
  - `RecurringInvoiceChargeService` now uses a small recurring-invoice context internally instead of passing provider, invoice id, amount, currency, due date, operation label, and transition delegate through one large terminal method
  - recurring charge terminal handling is now expressed as `load or create -> apply target status -> persist`, which reduces parameter fan-out without changing webhook behavior
- module-3 ownership pass already applied:
  - `RecurringInvoiceChargeService` now lives under `Application/Billing/Charges`, making recurring charge materialization explicitly charge-owned even though it is invoked from invoice webhooks
  - `ChargeVerificationOrchestrator` and `BrCodePixCopyPasteGenerator` also moved under `Application/Billing/Charges`, so the feature folder is back to HTTP-facing slices plus specifications
  - direct unit coverage now exists for recurring invoice charge creation, failed-to-paid recovery, and paid-charge protection against late failed events
- eighth simplification pass already applied:
  - paid invoice lifecycle handling now normalizes invoices into a small lifecycle context and classifies the lifecycle action before executing it
  - the paid-invoice path now reads as `load plan -> classify action -> apply`, instead of interleaving cancel-scheduled, trial, duplicate-trial, and billable-cycle branches inline
  - the difference between `invoice.created`, `invoice.paid`, and `invoice.payment_failed` is now more visible in the body of each method
- ninth simplification pass already applied:
  - checkout-session and invoice-driven subscription reconstruction now live in dedicated gateway subscription webhook owners
  - `BillingWebhookProcessor` now depends on one gateway-subscription owner instead of separate checkout and invoice services
  - `checkout.session.completed` no longer synthesizes recurring invoice events; it only materializes or links the local subscription and completes `SubscriptionCheckout`
- tenth simplification pass already applied:
  - the gateway subscription recovery path no longer uses `ResolveCreationContextAsync` or a local `SubscriptionCreationContext` record
  - the recovery path now reads as explicit load steps: find known subscription, load plan, load customer, create from open checkout, create from metadata
  - invoice lookup in `BillingWebhookProcessor` now calls `FindSubscriptionForInvoiceAsync`, matching the concrete business step
- eleventh simplification pass already applied:
  - checkout handling is now split into concrete steps like `HandleCompletedExistingCheckoutAsync` and metadata-based creation inside the gateway checkout owner
  - invoice recovery is now split into a short `FindOrCreateFromInvoiceAsync` flow plus explicit metadata-based recovery inside the gateway invoice owner
  - the public methods now read as short business flows, with the nested recovery/detail branches moved into concrete helper names instead of inline condition ladders
- twelfth simplification pass already applied:
  - checkout reconstruction now lives in `GatewaySubscriptionCheckoutService`
  - invoice-driven subscription recovery and invoice lifecycle orchestration now live in `GatewaySubscriptionWorkflow`
  - `BillingWebhookProcessor` now routes invoice events into one gateway-subscription workflow owner instead of splitting recovery, orchestration, and lifecycle ownership across multiple services
  - provider-driven `customer.subscription.updated` and `customer.subscription.deleted` reconciliation now lives in `GatewaySubscriptionCancellationService`, leaving `SubscriptionWebhookWorkflow` as the Stripe payload adapter
  - `RecurringInvoiceChargeService` remains the charge-owned helper that creates or settles recurring invoice charges without taking over subscription lifecycle ownership
- thirteenth simplification pass already applied:
  - recurring invoice webhooks now require an existing local subscription and no longer rebuild local identity from invoice metadata or open checkout heuristics
  - `checkout.session.completed` now requires an existing `SubscriptionCheckout` reservation and fails closed when the reservation is missing
  - `customer.subscription.updated` now treats `cancel_at_period_end=false` as scheduling sync only; it clears `CancelAtPeriodEnd` and refreshes the billing boundary without rewriting local lifecycle state

Current assessment:

- module 1 is now split into explicit checkout, invoice, and cancellation owners
- `BillingWebhookProcessor` no longer owns one-time checkout settlement, invoice idempotency, missing-state recovery, recurring charge transitions, and subscription lifecycle transitions in the same class
- the main remaining complexity hotspot inside this module is now policy-level lifecycle behavior inside `GatewaySubscriptionWorkflow`, not structural ownership confusion across the module

Business-risk observations:

- local subscription or checkout persistence gaps now fail closed instead of self-healing, so operational visibility matters more than provider metadata quality
- the main remaining policy risk is invoice lifecycle interaction with `CancelAtPeriodEnd`, stale paid replays, and failed-to-paid recovery
- the cancellation sync path is smaller now, but it still depends on Stripe carrying a usable current billing boundary

Opinionated simplification direction:

- keep the happy path extremely short: known gateway subscription id should be almost trivial to read
- do not reintroduce invoice metadata recovery or checkout reconstruction fallback unless a real production incident justifies it
- keep provider metadata parsing/validation at the edge and keep the runtime branch focused on known local records
- do not introduce a generic resolver abstraction or another central manager here

The concrete next refactor should be small:

- keep the current single workflow if desired, but make the top-level method read as:
  - load known subscription
  - apply recurring charge transition
  - apply lifecycle transition
  - save
- if that still feels too dense after the split, then and only then consider a narrower lifecycle-policy helper instead of another recovery service

#### 1.2 `GatewaySubscriptionWorkflow`

Primary file:

- `backend/src/Pagit.Api/Application/Billing/Webhooks/GatewaySubscriptionWorkflow.cs`

Current happy path:

- recover or load the local subscription for the Stripe invoice
- let `RecurringInvoiceChargeService` create or settle the recurring charge state for that invoice
- apply the paid or failed subscription lifecycle transition once the charge result reaches the target state

Necessary guard rails that should remain:

- do not reactivate or advance a subscription already marked with `CancelAtPeriodEnd`
- do not move `NextBillingDate` backwards on stale paid invoice deliveries
- do not promote duplicate non-billable trial invoices from `Trial` to `Active`
- do not move an already-paid subscription back to `PastDue`

Current excess complexity:

- paid invoice handling inside the workflow still combines too many semantic cases in one place:
  - first trial invoice
  - duplicate trial invoice
  - regular paid activation
  - renewal
  - stale replay
  - unsupported state
- the workflow still fetches `Plan` for paid lifecycle application and uses plan-level branching inline with lifecycle branching
- some of the code is domain policy, but some of it is replay-protection and recovery behavior; those concerns are still interleaved

Business-risk observations:

- `CancelAtPeriodEnd` short-circuit is probably correct operationally, but it deserves explicit product confirmation because it means a paid invoice does not restore lifecycle locally
- plan lookup failure currently just logs and exits; that is safe, but it can leave a paid recurring charge without the corresponding lifecycle transition
- `ApplyFailedInvoiceAsync` is intentionally minimal, but that also means any richer dunning policy will eventually collide with this boundary

Opinionated simplification direction:

- keep this as a single lifecycle service, but split the paid flow into two internal paths:
  - `ApplyTrialInvoice`
  - `ApplyBillablePaidCycle`
- make replay protection an early-return branch rather than something the reader has to discover inside the billable path
- keep `ResolveNextBillingDate` as a small helper, but avoid growing more fallback policy around it
- continue preferring small domain methods on `Subscription` only when they remove real branching, not to turn the entity into a workflow engine

The concrete next refactor should be small:

- restructure `ApplyPaidInvoiceAsync` so the reader sees:
  - early exits
  - trial path
  - billable path
  - save
- avoid adding more abstractions unless that rewrite still leaves the method semantically overloaded

### 2. Notifications

Primary files:

- `backend/src/Pagit.Api/Application/Notifications/NotificationTriggerService.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDispatcher.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDeliveryProcessor.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationEventApplicability.cs`

Why this flow is structurally complex:

- the flow combines target, context, event, channel, and source
- planning, queueing, dispatch, retry, and stale-state revalidation are all present
- some of the same business rules appear in more than one stage
- delivery logic still partly recreates notification rows instead of acting purely on already-planned work

Current assessment:

- the architecture direction is good
- the matrix is still too centralized
- the planning boundary is not strict enough yet

Current simplification progress:

- `NotificationDispatcher` now sends only persisted `Notification` rows and no longer creates or reuses notification records during delivery
- `NotificationDeliveryProcessor` is now the single owner of `Sent` / `Skipped` / `Failed` / retry transitions after a delivery attempt
- customer and tenant-owner notifications now share the same persisted delivery pipeline while owner-recipient resolution stays at send time
- `NotificationTriggerService` is now limited to the two customer planning flows instead of carrying the full customer-plus-owner matrix
- `NotificationEventApplicability` now shares the same base charge-event compatibility rules for queue-time and delivery-time, keeping only future-schedule exceptions separate
- customer-channel resolution in `NotificationTriggerService` now happens in explicit charge/subscription resolvers instead of a generic validate-then-filter chain

### 3. Manual recurrence

Primary files:

- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionChargeService.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionConciliationService.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/RecurringScheduleCalculator.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CreateCustomerSubscription.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CancelSubscription.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CancelCustomerSubscription.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/RecurringSubscriptionChargeStatusChangedEventHandler.cs`

Why this flow is complex:

- subscription progression depends on schedule, due date, linked charges, conciliation outcome, and current status
- recurring progression and status reconciliation are related but triggered from multiple entry points
- the flow is more temporal than it first appears

Current assessment:

- this area is simpler than webhook billing and notifications
- the logic is still more spread out than ideal
- the main risk is not imperative style alone, but too many entry points re-evaluating the same subscription state

Current simplification progress:

- `ManualSubscriptionChargeService` now follows a smaller `load -> classify -> act` shape for cycle handling
- the current cycle is classified once (`not due`, `paid`, `open`, `overdue`, `missing`) before the service applies any billing action
- helper methods no longer re-open the same branching through `bool saveSubscription` and `HandleExistingChargeAsync(...)`
- manual recurrence no longer hides schedule calculation, conciliation, and cycle progression inside a single `ManualSubscriptionBilling.cs` file
- platform and customer cancellation handlers now share only the gateway `cancel_at_period_end` request path through `GatewaySubscriptionCancellationRequestService`, leaving validation and local transition rules explicit in each handler

### 4. Payment routing and PIX management

Primary files:

- `backend/src/Pagit.Api/Application/Integrations/Payments/PaymentMethodsService.cs`
- `backend/src/Pagit.Api/Application/Integrations/Payments/PaymentProviderRoutingService.cs`
- `backend/src/Pagit.Api/Application/Integrations/Payments/PaymentMethodManagementService.cs`

Why this flow is becoming complex:

- provider routing, provider readiness, PIX key selection, route ordering, and Woovi-specific constraints are closely related but not the same concern
- the routing service is still relatively narrow
- the administrative service is absorbing more rules than it should

Current assessment:

- provider selection and provider execution are already separated in a useful way
- admin-side billing configuration is broader than necessary

Current simplification progress:

- `PaymentMethodsService` now uses `ResolvedPaymentGateway` directly instead of wrapping routing results in another tuple shape
- charge request creation no longer fans provider details out through multiple scalar parameters
- success-path payment logs were reduced so the service mainly logs failures and unusual reconciliation details
- one-time gateway charges now persist one selected payment method instead of an operator-configured method list, so public session creation no longer needs a second payment-choice step on the happy path
- `PaymentMethodManagementService.GetMethodsOverviewAsync(...)` now reads routing snapshots directly instead of loading full method details and PIX-specific state for every payment method
- `PaymentMethodManagementService.GetMethodDetailsAsync(...)` now follows one routing path for every method and leaves PIX-only loading in a short dedicated branch
- `PaymentMethodManagementService.UpdatePixSettingsAsync(...)` now separates delete guards, key upsert, and default-key resolution instead of mixing all PIX rules in one large method body
- `WooviWebhookEndpoint` now keeps only Woovi-specific authorization, test-payload handling, and payload normalization at the integration edge
- charge reconciliation for Woovi webhook events now lives in `Billing/Webhooks/WooviChargeWebhookWorkflow`, so provider payload details no longer leak into charge state transitions

## Simplification direction

## Refactor safety rule

Before any drastic change to billing, notification, recurrence, or integration flows, the current behavior must be protected by tests first.

That means:

- identify the real supported behavior before refactoring
- add or strengthen tests around that behavior when coverage is weak
- only then change the structure or workflow

The goal is to reduce complexity without silently changing product behavior while the refactor is still underway.

## 1. Reorganize around business capability first

Future refactors should favor folder and type names that describe the business action or owned subdomain.

Preferred direction:

- `Billing/Charges`
- `Billing/Subscriptions`
- `Billing/Webhooks`
- `Notifications`
- `Integrations/Payments`
- `Integrations/WhatsApp`

Avoid growing new broad buckets such as:

- `Runtime`
- `Processor`
- `Manager`
- `Admin`
- `Helper`
- `Workflow` when it is only a generic wrapper over conditionals

The goal is not to rename everything at once. The goal is to stop creating new generic centers that attract unrelated rules.

### Proposed target tree

This is the current preferred direction for the backend business-facing areas. It is intentionally small and should be treated as the default destination for future refactors unless a narrower case proves otherwise.

```text
Features/
  Billing/
    Charges/
    Subscriptions/
    Webhooks/
  Notifications/
  Integrations/
    Payments/
    WhatsApp/
  Auth/
  Dashboard/
  Tenants/
  Users/

Application/
  Shared/
  Tenancy/
  Entitlements/
  BackgroundJobs/
  Security/
  Behaviors/

Domain/
Infrastructure/
External/
```

### Structural decisions already made in this review

- `Billing` should become the umbrella for charge, subscription, and payment-webhook behavior
- `Application/EventHandlers` should stop being a permanent central bucket; event handlers should move closer to the owning feature when possible
- `Runtime`, `Admin`, and `Manual` should not keep growing as long-lived structural categories inside billing
- new code should prefer business ownership names over implementation-role names

### Naming guidance

Prefer names like:

- `CreateManualSubscription`
- `ApplyPaidInvoiceToSubscription`
- `SubscriptionStatusChangedHandler`
- `CustomerChargeNotificationScheduler`
- `ResolveReadyPaymentProvider`

Avoid names like:

- `Processor`
- `Manager`
- `RuntimeService`
- `AdminService`
- `Helper`
- `Workflow` when the type is only a generic wrapper around conditionals

The main test for a name is whether it still makes sense when ten new rules are added. If a type name can absorb any new rule without becoming obviously wrong, it is probably too broad.

### Current-to-target direction

This review currently sees the following broad migration direction as the most coherent one:

- the legacy `Features/Charges` area has already been moved into `Features/Billing/Charges`
- `Features/Billing` subscription endpoints and `Features/Customers` subscription creation/cancellation paths -> `Features/Billing/Subscriptions`
- Stripe billing webhook feature files have already been moved into `Features/Billing/Webhooks`
- `Application/Notifications` remains a candidate owner, but its internal structure should move toward smaller owners under the `Notifications` capability rather than one central matrix
- `Features/Integrations/Payments` plus billing payment-configuration logic should converge under `Features/Integrations/Payments`
- `Features/Webhooks/WhatsApp`, `Application/Ai`, and WhatsApp integration behavior should converge under `Features/Integrations/WhatsApp` plus a narrow application boundary only where cross-feature concerns are real

This direction is not a command to move everything now. It is the current map for where things should gradually land.

### Billing capability breakdown

`Billing` is now the preferred umbrella for the parts of the backend that create, settle, reconcile, expire, renew, or cancel monetary relationships.

The billing area should be split into three primary sub-capabilities:

- `Features/Billing/Charges`
- `Features/Billing/Subscriptions`
- `Features/Billing/Webhooks`

These three areas should be treated as different owners, even when they touch the same entities.

#### Billing/Charges

This area owns charge-facing operator and customer actions.

It should own:

- charge creation
- payment-session start for gateway charges
- manual charge creation
- public charge payment entry
- payment proof submission
- manual review and settlement
- charge detail and listing queries
- charge-local helpers and specifications

It should not own:

- subscription lifecycle orchestration
- provider webhook reconciliation
- tenant payment integration administration

Current files that fit this owner:

- `backend/src/Pagit.Api/Features/Billing/Charges/CreateGatewayCharge.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/CreateManualCharge.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/CreatePaymentSession.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/SubmitPaymentProof.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/ReviewPayment.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/MarkChargeAsPaidManual.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/GetChargeById.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/GetChargePublicInfo.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/GetCharges.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/GetPendingReviews.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/UpdateChargeAmount.cs`
- `backend/src/Pagit.Api/Features/Billing/Charges/Services/*`
- `backend/src/Pagit.Api/Features/Billing/Charges/Specifications/*`

#### Billing/Subscriptions

This area owns the customer-to-plan relationship and its billing lifecycle.

It should own:

- creating or reserving subscriptions
- subscription cancellation requests
- subscription detail and listing queries
- manual recurrence progression
- manual recurrence reconciliation
- current subscription and platform billing views
- subscription-local event handlers and specifications

It should not own:

- one-time charge workflows
- Stripe or Woovi webhook transport adaptation
- payment provider onboarding and routing administration

Current files that fit this owner or should move into it:

- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CancelSubscription.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/GetCurrentSubscription.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/GetSubscriptionById.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/GetSubscriptions.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CreateCustomerCheckoutSession.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CreateCustomerSubscription.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/CancelCustomerSubscription.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionChargeService.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/ManualSubscriptionConciliationService.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/RecurringScheduleCalculator.cs`
- `backend/src/Pagit.Api/Application/Billing/Subscriptions/TenantPlatformBillingStateService.cs`
- `backend/src/Pagit.Api/Features/Billing/Subscriptions/Specifications/SubscriptionSpecifications.cs`

Discussion point:

- `CreateCheckoutSession.cs` may stay under subscriptions if it is strictly platform-subscription checkout
- if it mixes tenant platform billing and tenant customer billing too heavily, it should be revisited as a separate billing capability later

#### Billing/Webhooks

This area owns provider-originated billing state reconciliation after the provider payload has been normalized.

It should own:

- provider event normalization for billing callbacks
- one-time charge settlement from provider webhooks
- recurring invoice reconciliation
- subscription recovery from provider metadata
- provider-driven subscription status synchronization
- billing webhook idempotency and ordering rules

It should not own:

- generic transport security or signature middleware concerns outside the billing callback edge
- charge review/manual proof flows
- provider administration screens and settings

Current files that fit this owner or should move into it:

- `backend/src/Pagit.Api/Features/Billing/Webhooks/CheckoutWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/InvoiceWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/PaymentIntentWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Features/Billing/Webhooks/SubscriptionWebhookWorkflow.cs`
- `backend/src/Pagit.Api/Application/Billing/Webhooks/BillingWebhookProcessor.cs`
- billing-oriented portions of `backend/src/Pagit.Api/Features/Webhooks/Woovi/WooviWebhookEndpoint.cs`

The important rule here is:

- provider-specific payload mapping should stay at the webhook edge
- business reconciliation should live in billing-owned webhook flows

### Billing file migration map

This is the current recommended destination map for the main billing-related files.

#### Completed in the first structural move

- `Features/Charges/*` -> `Features/Billing/Charges/*`
- `Features/Webhooks/Stripe/*` -> `Features/Billing/Webhooks/*`

Reason:

- charge handlers, specifications, and helpers are now under the billing umbrella
- Stripe billing webhook feature files now sit next to the billing capability they support

#### Billing/Charges ownership status

- charge-owned application services now live under `Application/Billing/Charges`
- the remaining `Features/Billing/Charges` area is primarily HTTP-facing slices plus feature-local specifications

#### Completed in the second structural move

- `Features/Billing/CancelSubscription.cs` -> `Features/Billing/Subscriptions/CancelSubscription.cs`
- `Features/Billing/GetCurrentSubscription.cs` -> `Features/Billing/Subscriptions/GetCurrentSubscription.cs`
- `Features/Billing/GetSubscriptionById.cs` -> `Features/Billing/Subscriptions/GetSubscriptionById.cs`
- `Features/Billing/GetSubscriptions.cs` -> `Features/Billing/Subscriptions/GetSubscriptions.cs`
- `Features/Billing/CreateCustomerCheckoutSession.cs` -> `Features/Billing/Subscriptions/CreateCustomerCheckoutSession.cs`
- `Features/Customers/CreateCustomerSubscription.cs` -> `Features/Billing/Subscriptions/CreateCustomerSubscription.cs`
- `Features/Customers/CancelCustomerSubscription.cs` -> `Features/Billing/Subscriptions/CancelCustomerSubscription.cs`
- `Features/Billing/Specifications/SubscriptionSpecifications.cs` -> `Features/Billing/Subscriptions/Specifications/SubscriptionSpecifications.cs`

Reason:

- subscription-facing handlers and specifications now live under the same billing sub-capability
- customer management endpoints remain in `Features/Customers`, but subscription actions now point into the subscription slice explicitly

#### Completed in the third structural move

- `Application/Billing/Manual/ManualSubscriptionBilling.cs` -> `Application/Billing/Subscriptions/ManualSubscriptionChargeService.cs`
- `Application/Billing/Subscriptions/ManualSubscriptionBilling.cs` -> `Application/Billing/Subscriptions/ManualSubscriptionChargeService.cs` + `Application/Billing/Subscriptions/ManualSubscriptionConciliationService.cs` + `Application/Billing/Subscriptions/RecurringScheduleCalculator.cs`
- `Application/Billing/Runtime/TenantPlatformBillingStateService.cs` -> `Application/Billing/Subscriptions/TenantPlatformBillingStateService.cs`
- `Application/EventHandlers/SubscriptionCreatedEventHandler.cs` -> `Application/Billing/Subscriptions/SubscriptionCreatedEventHandler.cs`
- `Application/EventHandlers/SubscriptionStatusChangedEventHandler.cs` -> `Application/Billing/Subscriptions/SubscriptionStatusChangedEventHandler.cs`

#### Module 4 simplification pass

- `TenantPlatformBillingStateService` is now the single projection boundary for tenant billing access
- master-tenant projection no longer depends on mirror-customer lookup
- `TenantBillingAccessService` was removed; callers that only need a boolean now read `state.HasAccess` from the same projection source
- `Application/EventHandlers/RecurringSubscriptionChargeStatusChangedEventHandler.cs` -> `Application/Billing/Subscriptions/RecurringSubscriptionChargeStatusChangedEventHandler.cs`
- `Application/EventHandlers/SubscriptionCheckoutInvitationRequestedEventHandler.cs` -> `Application/Billing/Subscriptions/SubscriptionCheckoutInvitationRequestedEventHandler.cs`

Reason:

- these files are primarily about subscription lifecycle, platform-access state, or subscription-originated reactions
- the remaining charge-oriented handlers should live under `Application/Billing/Charges`, not in a central event-handler bucket

#### Move to Billing/Webhooks

- `Application/Billing/Webhooks/BillingWebhookProcessor.cs`
- billing-reconciliation parts of `WooviWebhookEndpoint`

Reason:

- this keeps provider callback normalization and billing reconciliation under one capability

#### Completed in the fifth structural move

- billing-reconciliation part of `Features/Integrations/Payments/Woovi/WooviWebhookEndpoint.cs` -> `Features/Billing/Webhooks/WooviChargeWebhookWorkflow.cs`

Reason:

- the integration endpoint now owns only Woovi header validation, test-webhook handling, and payload normalization
- charge load-and-transition rules are billing-owned again instead of being embedded in the provider edge

#### Completed in the fourth structural move

- `Application/Billing/Admin/PaymentMethodManagementService.cs` -> `Application/Integrations/Payments/PaymentMethodManagementService.cs`
- `Application/Billing/PaymentProviderRoutingService.cs` -> `Application/Integrations/Payments/PaymentProviderRoutingService.cs`
- `Application/Billing/Runtime/PaymentMethodsService.cs` -> `Application/Integrations/Payments/PaymentMethodsService.cs`
- `Application/Billing/Runtime/PaymentCapabilityService.cs` -> `Application/Integrations/Payments/PaymentCapabilityService.cs`
- `Features/Integrations/Payments/*`
- payment-integration activation webhook handling currently under `Features/Billing/Webhooks/PaymentIntegrationWebhookWorkflow.cs`

Reason:

- these files are primarily about provider availability, routing, integration readiness, and tenant configuration
- they support billing, but they are not themselves the billing lifecycle owner

### Billing ownership rules

When choosing where a new billing-related file belongs, prefer these questions in order:

1. Is this about an individual receivable or payment attempt?
   Then it probably belongs in `Billing/Charges`.

2. Is this about a recurring customer-plan relationship over time?
   Then it probably belongs in `Billing/Subscriptions`.

3. Is this about reconciling provider-originated billing events into local state?
   Then it probably belongs in `Billing/Webhooks`.

4. Is this about configuring providers, routing, keys, readiness, or activation?
   Then it probably belongs in `Integrations/Payments`, not in billing.

If a file seems to belong to more than one of those at once, that is usually a sign the boundary is too broad and should be split before moving.

## 2. Normalize flow input before business branching

Each high-risk workflow should move toward a small internal context model before making business decisions.

A flow should become:

1. normalize provider or API input
2. load current persisted truth
3. decide one business outcome
4. persist the state transition
5. run follow-up side effects

Avoid flows that discover new dimensions while already halfway through execution.

## 3. Reduce multi-purpose entity state

The next meaningful simplifications should reduce how many workflow meanings are stored inside the same aggregate.

Target direction:

- keep `Charge` centered on receivable state, while moving gateway session details and manual collection details toward narrower boundaries
- keep `Subscription` centered on billing lifecycle, while treating checkout reservation as a separate concern
- keep `Notification` centered on durable notification work, while preventing dispatch logic from acting like a second planning path

This does not require an immediate schema rewrite. The first step can be narrowing behavior and ownership even before splitting persistence structures.

## 4. Prefer explicit small flows over central matrices

When a workflow grows across several axes, prefer a small number of explicit flows over one universal dispatcher.

For example, in notifications it is more acceptable to have separate owners for:

- customer charge notifications
- customer subscription notifications
- tenant-owner charge notifications
- tenant-owner subscription notifications

than to keep expanding one central matrix that understands every combination.

## 5. Do not prematurely unify manual and gateway billing

Manual recurrence and gateway-managed subscriptions share some concepts, but their operational behavior is still different enough that forcing one generalized engine would likely increase complexity.

What can stay shared:

- schedule calculation
- common status vocabulary where it is truly identical
- reusable specifications and persistence helpers

What should remain separate unless behavior truly converges:

- provider-driven reconciliation
- manual overdue handling
- payment-session execution
- cancellation and recovery rules

## Refactor priorities

### Priority 1

Simplify billing webhook processing by splitting business flows inside billing, not only provider event adapters.

Expected result:

- one-time checkout settlement easier to read
- recurring invoice synchronization easier to test
- subscription recovery from provider metadata narrower and more explicit

### Priority 2

Make notification planning and notification delivery strict boundaries.

Expected result:

- delivery stops creating notification work on the fly
- event applicability rules become easier to verify
- target/context/channel matrices shrink into smaller owners

### Priority 3

Simplify manual subscription progression into explicit progression and reconciliation paths.

Expected result:

- fewer entry points re-evaluating the same state
- easier tests around overdue behavior and first-cycle charge generation

### Priority 4

Split billing configuration concerns from payment routing concerns.

Expected result:

- PIX key catalog and default-key policy stop living inside the same administrative owner as provider route ordering
- provider routing remains narrow

## Non-goals

This review does not recommend:

- rewriting the backend architecture in one pass
- introducing a generic workflow engine
- introducing a saga framework
- merging all recurrence behavior into one shared abstraction
- replacing explicit code with broad indirection just to reduce file length

## Structural migration plan

The folder reorganization should happen in phases, not as a repo-wide rename.

### Phase 1: freeze the taxonomy

Do now:

- use the target tree in this file as the default direction for new code
- stop introducing new broad buckets such as `Runtime`, `Admin`, and generic `EventHandlers`
- when touching a feature, prefer placing new code in the target destination even if adjacent legacy code still exists elsewhere

Expected result:

- the codebase stops getting more structurally inconsistent
- future refactors have a stable destination

### Phase 2: low-risk moves

Do before the heavier business simplifications:

- move obvious billing endpoints and handlers under `Features/Billing/*`
- move feature-owned event handlers out of the central `Application/EventHandlers` folder
- converge payment integration configuration under one clearer payments capability

Expected result:

- ownership becomes easier to scan
- later refactors happen inside better boundaries

### Phase 3: moves coupled to model changes

Do together with business refactors:

- anything that depends on separating checkout reservation from subscription lifecycle
- anything that depends on splitting charge execution details from charge receivable state
- anything that depends on replacing the current notification matrix with smaller owners

Expected result:

- folder boundaries follow the new business design instead of forcing it prematurely

### What not to do

Avoid:

- mass renames before ownership decisions are clear
- moving files only because another folder name sounds nicer
- changing namespaces and locations in bulk without reducing actual coupling
- rewriting the entire backend tree before the first complex flow is simplified

## Implementation stance

The preferred simplification strategy is:

- small refactors
- stronger business naming
- narrower runtime ownership
- fewer generic centers
- smaller flow inputs
- fewer multi-purpose state machines

When in doubt, prefer one explicit business flow over one reusable abstraction that still needs many conditionals to work.

## Completed structural moves

The following low-risk structural moves have already been executed:

- `Features/Charges/*` moved to `Features/Billing/Charges/*`
- `Features/Webhooks/Stripe/*` moved to `Features/Billing/Webhooks/*`
- charge and Stripe billing webhook namespaces/usings were updated to match the new locations

These moves were intentionally limited to areas whose business ownership was already clear from the review.
## 2026-04-02 - Charge notification planning simplification

- Automatic charge-notification planning no longer materializes `ChargeDueToday` on the same channel when a new charge is created already due today and that channel is already receiving `ChargeCreated`.
- This keeps the planner simple and avoids two immediate customer notifications for the same new charge.
- The suppression happens in `ChargeNotificationPlanBuilder`, not in delivery, because the problem is planning duplication rather than dispatch behavior.
- The planner now also uses one `utcNow` snapshot plus the tenant timezone for the whole build, so the same execution cannot disagree about whether a charge is "due today" versus "scheduled for tomorrow".

## 2026-04-02 - Charge capability simplification

- `CreatePaymentSession` now resolves one stored gateway method on the happy path and keeps one explicit compatibility branch only for legacy multi-method charges.
- This keeps the gateway session rule in one place without adding new types or expanding the workflow matrix.
- `Charge` also exposes `CanBeManuallySettled()` so manual settlement no longer recomposes type and reconciliation-state checks in the handler.
- Internal charge state transitions now go through one private transition helper instead of duplicating the same state-change ceremony in each public method.
- `ChargeVerificationOrchestrator` no longer carries a logger dependency or success-path logging; it now just maps receipt verification into the charge state change.
