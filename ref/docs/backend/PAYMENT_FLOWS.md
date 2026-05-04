# Payment and Billing Flows Architecture

This document visually maps out the complex flows involving Payments, Charges, Subscriptions, Plans, and the Verification mechanisms within the Pagit architecture. It serves as a visual guide to the system's core financial behaviors and state machines, represented in ASCII diagrams.

## 1. Core Entity Relationships

At the center of our billing model are the relationships between the Tenant, the Customer, and the entities that represent the financial contract (`Plan`, `Subscription`) and the actual financial movement (`Charge`, `PaymentProof`).

```text
+------------------+       +------------------+       +-------------------+
| TENANT           | 1---* | CUSTOMER         | 1---* | SUBSCRIPTION      |
|------------------|       |------------------|       |-------------------|
| Id (PK)          |       | Id (PK)          |       | Id (PK)           |
| ExternalId       |       | TenantId (FK)    |       | CustomerId (FK)   |
| PrimaryCurrency  |       | ExternalId       |       | PlanId (FK)       |
+------------------+       +------------------+       | Status            |
         |                          |                 | RenewalAt         |
         |                          |                 +-------------------+
         | 1                        | 1                         | 1
         |                          |                           |
         | *                        | *                         | *
+------------------+       +------------------+       +-------------------+
| PLAN             | 1---* | CHARGE           | *---1 | PAYMENT_PROOF     |
|------------------|       |------------------|       |-------------------|
| Id (PK)          |       | Id (PK)          |       | Id (PK)           |
| BillingModel     |       | CustomerId (FK)  |       | ChargeId (FK)     |
| Interval         |       | SubscriptionId   |       | Source            |
+------------------+       | ChargeType       |       +-------------------+
                           | Status           |
                           | GatewayProvider  |
                           +------------------+
```

Operational reads follow those same links:

- `GET /api/subscriptions` exposes the tenant subscription inventory for operations.
- `GET /api/subscriptions/{id}` exposes subscription detail plus linked charges and the notification history/schedule coming both from subscription lifecycle events and linked recurring charges.
- `GET /api/charges` exposes the compact charge listing used by dashboard tables, including `dueDate`, `createdAt`, and `paidAt` so operators can reveal the relevant operational timeline without loading each charge detail individually.
- `GET /api/charges/{id}` exposes the linked subscription summary when the charge belongs to a recurring relationship.

---

## 2. Charge Creation and Gateway Routing

Charge creation is now split by intent:
- `CreateGatewayCharge` (`POST /api/charges/gateway`) persists a `Pending` gateway charge with one selected payment method and validates that the chosen method has at least one ready provider in the tenant's configured order.
- `CreateManualCharge` (`POST /api/charges/manual`) persists a manual charge and skips gateway routing entirely.
- `CreatePaymentSession` is the public side-effecting endpoint. It validates the public token, requires the internal kind `OneTimeGateway`, reuses the persisted session if the charge already has gateway session data, and otherwise executes the single stored payment method through `PaymentMethodsService`.
- In `Development`, the Stripe one-time charge mock short-circuits this flow: it marks the charge as paid immediately through the local webhook processor and returns the in-app success route instead of an external Stripe checkout URL.
- `CreateManualCharge` and manual recurrence both delegate manual payload assembly to `ManualChargeFactory`.
- `ChargeType` remains the outward field label, but internally it now stores `EChargeKind` values:
  `OneTimeGateway`, `OneTimeManual`, `SubscriptionGateway`, `SubscriptionManual`
- the public JSON `chargeType` contract still serializes the rollout-safe legacy vocabulary: `Gateway`, `Manual`, `Recurrence`
- charge-owned support services now live under `Application/Billing/Charges`, including manual payload assembly (`ManualChargeFactory`), recurring invoice charge materialization (`RecurringInvoiceChargeService`), receipt-verification application (`ChargeVerificationOrchestrator`), and PIX BR code generation (`BrCodePixCopyPasteGenerator`)
- Manual PIX now always requires one saved tenant PIX key selected from the tenant catalog (`TenantPixKey`).
- Tenant PIX settings keep a single default key only for organization-level preselection and operator convenience.
- Woovi activation (`POST /api/integrations/payments/methods/pix/providers/woovi/activations`) requires an explicit `tenantPixKeyId` chosen by the operator.
- Active Woovi integrations persist that linked tenant PIX key separately from the tenant default.
- Gateway PIX charge execution through Woovi resolves the linked Woovi tenant PIX key, not the current tenant default key.
- Editing the tenant default PIX key must not silently switch the active Woovi receiving account.

```text
 Gateway Client   API (CreateGatewayCharge)    Database        API (CreatePaymentSession)  PaymentMethodsService  Woovi/Stripe
      |                      |                     |                        |                        |                  |
      |-- POST /charges/gateway ----------------->|                        |                        |                  |
      |                      |-- validate method -->                        |                        |                  |
      |                      |--- Save Pending Charge -------------------->|                        |                  |
      |<-- charge id --------|                     |                        |                        |                  |
      |                      |                     |                        |                        |                  |
      |-- POST /public/charges/{id}/payment-sessions?token=... ---------->|                        |                  |
      |                      |                     |-- load charge -------->|                        |                  |
      |                      |                     |-- require OneTimeGateway charge -->|            |                  |
      |                      |                     |-- read stored method -->|                       |                  |
      |                      |                     |                        |-- resolve ready provider ->              |
      |                      |                     |                        |<-- payment data --------|                  |
      |                      |<-- persist provider/url --------------------|                        |                  |
      |<-- URL / PIX data ---|                     |                        |                        |                  |
```

Manual flow:

```text
 Tenant User        API (CreateManualCharge)          Database
     |                        |                          |
     |-- POST /charges/manual ------------------------->|
     |                        |-- validate manual fields |
     |                        |-- load selected saved PIX key |
     |                        |-- skip provider routing  |
     |                        |--- Save Pending Charge ->|
     |<-- charge id ----------|                          |
```

Customer subscription checkout flow:

- `POST /api/customers/{id}/subscription-checkout-sessions` creates a Stripe checkout session for a tenant customer subscribing to a tenant-owned gateway plan.
- the endpoint rejects plans whose `BillingModel` is not `GatewaySubscription`.
- The handler persists only an internal `SubscriptionCheckout` row keyed by the Stripe `GatewayCheckoutSessionId`.
- `SubscriptionCheckout` is the reconciliation record for checkout completion.
- before deciding whether to block a new session, the handler expires stale `Open` `SubscriptionCheckout` rows and only blocks when another active open intent still exists.
- The API returns the generated `checkoutUrl` to the operator.
- For gateway plans that are free (`price = 0`) or start with trial days, checkout uses `payment_method_collection=if_required` so Stripe can complete signup without forcing card collection.
- The frontend now keeps the operator in the modal and shows that link explicitly instead of redirecting immediately.
- After the session is created, the backend publishes a checkout-invitation notification event and attempts customer email delivery asynchronously through a dedicated event handler.
- This automatic invitation is email-only in the current flow; WhatsApp dispatch is not triggered for subscription checkout invitations.
- Subscription checkout still writes Pagit identifiers into Checkout Session metadata and `subscription_data.metadata` for traceability, but recurring invoice reconciliation no longer rebuilds local subscription identity from that metadata.
- Recurring invoice reconciliation also treats Stripe `period_end` as required input. If the invoice webhook does not carry `period_end`, the edge rejects that event instead of fabricating a local billing date fallback.
- `checkout.session.completed` creates or links the real `Subscription` only when there is a matching local `SubscriptionCheckout`, marks that checkout as `Completed`, and invoice settlement promotes that subscription to `Trial` / `Active`.
- checkout completion still reconciles by `GatewayCheckoutSessionId` even if the matching row has already crossed `ExpiresAt`.
- If recurring invoice webhooks arrive before the local subscription exists, the invoice workflow now fails closed: it does not recreate the missing `Subscription` from metadata and it does not consume any `SubscriptionCheckout` row.

### 2.1 Stripe One-Time Checkout Reconciliation

Tenant-generated gateway charges paid through Stripe use Checkout in `mode=payment`. This webhook path is separate from gateway subscriptions.

Webhook endpoints:
- `POST /api/webhooks/payments/stripe/account` for platform-account events
- `POST /api/webhooks/payments/stripe/connect` for connected-account events

```text
      Stripe                  Stripe Webhook Pipeline                 Database
        |                               |                                |
        |--- checkout.session.completed>|--- find charge by metadata --->|
        |                               |    or checkout session id      |
        |                               |--- mark charge Paid ---------->|
        |                               |                                |
        |--- payment_intent.succeeded -->|--- fallback lookup by charge  |
        |                               |    metadata or payment intent  |
        |                               |--- mark charge Paid ---------->|
        |                               |                                |
        |--- checkout.session.async_* -->|--- update async boleto state ->|
```

Operational notes:
- one-time Stripe checkout persists `GatewayCheckoutSessionId` (`cs_...`) when the payment session is created
- `GatewayPaymentIntentId` is filled only with the actual settlement id (`pi_...`) after webhook reconciliation
- recurring Stripe subscription invoices do not use `GatewayPaymentIntentId`; they persist the invoice id (`in_...`) in `GatewayInvoiceId`
- `charge.succeeded` remains informational and is not used as the primary state transition signal
- checkout `success_url` and `cancel_url` are derived from the public checkout request origin (`Origin`/`Referer`) when available, with `Application:BaseUrl` kept as fallback for non-browser contexts
- the Connect endpoint must be configured to receive connected-account events for `account.updated`, `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `payment_intent.succeeded`, `invoice.created`, `invoice.paid`, and `invoice.payment_failed`
- the account endpoint should receive platform-account events for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `payment_intent.succeeded`, `invoice.created`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, and `customer.subscription.deleted`
- recurring invoice reconciliation should prefer the invoice top-level `subscription` id, then fall back to legacy nested subscription details and line-item subscription ids from the webhook payload

### 2.2 Gateway Charge Expiration by Due Date

Gateway charges now expire automatically after the tenant's local business date passes the stored `DueDate`.

```text
 OverdueGatewayChargeExpirationHostedService   TenantTimeService        Charge DB
                    |                                |                    |
                    |--- Poll pending gateway charges ------------------->|
                    |                                |                    |
                    |--- Get tenant today date ----->|                    |
                    |<-- DateOnly -------------------|                    |
                    |                                |                    |
                    |--- If DueDate < tenant today --------------------->|
                    |                                | Mark Expired       |
                    |                                |                    |
```

Operational notes:
- the charge remains `Pending` during the due date itself and only expires after the tenant's business date moves past `DueDate`
- this policy is intentionally local to gateway one-time charges; there is no separate due-date validation in `CreatePaymentSession`, and it does not change manual recurrence overdue handling
- once the background job has transitioned the charge to `Expired`, the existing `CreatePaymentSession` status guard prevents opening a new checkout session for that charge
- if Stripe or Woovi later confirms that the expired gateway charge was actually paid, webhook reconciliation is allowed to recover the charge from `Expired` to `Paid`
- provider-specific failure webhooks (`checkout.session.async_payment_failed`, Woovi charge expired) still transition charges to `Expired` immediately when they arrive
- `Features/Integrations/Payments/Woovi/WooviWebhookEndpoint` now stays provider-edge only: it validates the webhook header, recognizes test payloads, and normalizes Woovi charge identifiers before delegating charge reconciliation to `Features/Billing/Webhooks/WooviChargeWebhookWorkflow`

---

## 3. Subscription Lifecycles

Subscriptions are divided into two primary models: **Gateway-managed** (Stripe) and **System-managed Manual Recurrence**.

### 3.1. Gateway Subscription Sync (Stripe Webhooks)

When a plan is a `GatewaySubscription`, the source of truth for the billing cycle is Stripe. Pagit acts as a reactive system listening to Stripe Webhooks.

Internally, gateway subscription handling is split into four responsibilities:

- `BillingWebhookProcessor` routes one-time checkout settlement, async checkout settlement, payment-intent settlement, and delegates subscription invoice work to the gateway-invoice owner
- `GatewaySubscriptionCheckoutService` materializes or links the local subscription from `checkout.session.completed`
- `GatewaySubscriptionWorkflow` owns `invoice.created`, `invoice.paid`, and `invoice.payment_failed` for known local subscriptions, including invoice lifecycle transitions
- `RecurringInvoiceChargeService` creates or settles the recurring charge for that invoice
- `GatewaySubscriptionCancellationService` applies provider-driven cancel-at-period-end and final cancellation transitions

`checkout.session.completed` now only creates or links the local `Subscription` when the matching `SubscriptionCheckout` exists and completes that checkout. It does not synthesize `invoice.created` or `invoice.paid`; recurring charge creation and recurring lifecycle transitions remain owned by the real Stripe invoice webhooks.

```text
      Stripe                 BillingWebhookProcessor                Database
        |                              |                                |
        | === Scenario: Cycle renewal starts ========================== |
        |--- invoice.created --------->|                                |
        |    (Amount > 0)              |--- Idempotency Check (Cache) ->|
        |                              |--- Create SubscriptionGateway Charge -->|
        |                              |    (Status=Pending)            |
        |                              |                                |
        | === Scenario: Customer pays ================================= |
        |--- invoice.paid ------------>|                                |
        |                              |--- Mark Charge 'Paid' -------->|
        |                              |--- Update Sub (Active) ------->|
        |                              |                                |
        | === Scenario: Free invoice (0 total) ======================== |
        |--- invoice.paid ------------>|                                |
        |                              |--- Skip SubscriptionGateway Charge ----->|
        |                              |--- Update Sub (Trial/Active) -->|
        |                              |                                |
        | === Scenario: Payment fails (Out of balance) ================ |
        |--- invoice.payment_failed -->|                                |
        |                              |--- Mark Charge 'Failed' ------>|
        |                              |--- Update Sub (PastDue) ------>|
        |                              |                                |
        | === Scenario: Cancel at period end ========================= |
        |--- customer.subscription.updated --------------------------->|
        |                              |--- Clear/Set CancelAtPeriodEnd|
        |                              |--- Refresh boundary/state --->|
        |                              |                                |
        | === Scenario: Final cancellation happens =================== |
        |--- customer.subscription.deleted --------------------------->|
        |                              |--- Mark Sub Canceled -------->|
```

Operational notes for gateway cancellation:

- `POST /api/billing/subscription/cancel` now schedules gateway cancellation at period end instead of marking the local subscription as immediately canceled
- `DELETE /api/customers/{customerId}/subscriptions/{subscriptionId}` must follow the same provider rule for gateway-managed customer subscriptions: call Stripe `cancel_at_period_end`, require explicit confirmation in the response, and only then persist `CancelAtPeriodEnd=true`
- `DELETE /api/customers/{customerId}/subscriptions/{subscriptionId}` resolves the active Stripe payment capability before calling Stripe so the cancel request is sent against the tenant's connected account when Stripe Connect is in use
- the cancel request only persists local scheduled cancellation after Stripe responds with `cancel_at_period_end=true`; if Stripe does not confirm that flag, the local subscription must remain unchanged and the API returns a failure
- tenant-facing reads should expose `paymentStatus=CancelScheduled` from `Status + CancelAtPeriodEnd`, while the persisted subscription status remains the underlying billing lifecycle state
- `GET /api/billing/subscription` should keep returning the persisted lifecycle `status` for the current subscription while also exposing a projected display status so tenant UIs can show scheduled cancellation without pretending that `Subscription.Status` became `CancelScheduled`
- `invoice.created` and `invoice.paid` can still arrive after a cancellation was scheduled, especially for the final cycle boundary or pending billable items
- when `CancelAtPeriodEnd=true`, invoice reconciliation can still create or settle the linked recurring charge, but it must not reactivate the subscription or push `RenewalAt` into a new paid cycle
- when Stripe later unschedules cancellation (`cancel_at_period_end=false`), webhook reconciliation must clear `CancelAtPeriodEnd` and refresh the billing boundary from Stripe without trying to reconstruct lifecycle state from the provider payload
- when the local subscription is already `Active`, a new paid invoice must advance `RenewalAt`, but stale or replayed paid invoices must not move that date backwards
- duplicate zero-amount paid invoices for a trialing subscription must keep the subscription in `Trial`; they must not silently promote it to `Active`
- if Stripe first emits `invoice.payment_failed` and later settles the same invoice, recurring charge reconciliation must recover that charge from `Failed` to `Paid`
- a late or replayed `invoice.payment_failed` for an invoice that is already `Paid` must not move the subscription to `PastDue`
- the final `Canceled` state is now driven by Stripe subscription lifecycle webhooks, not by the initial cancel request
- recurring Stripe invoice charge identity is `GatewayInvoiceId`; `GatewayPaymentIntentId` remains reserved for real payment-intent settlement flows such as one-time Stripe checkout

### 3.2. Manual Subscription Motor

When a plan is `Manual`, Pagit itself orchestrates the billing cycle via the `ManualSubscriptionRenewalHostedService` hosted in `Infrastructure.BackgroundJobs`.

```text
 RenewalHostedService       TenantTimeService        Subscription DB         Charge DB
        |                           |                       |                    |
        |--- Poll Active/Pending Subscriptions ------------>|                    |
        |--- Get Tenant Today's Date ->|                    |                    |
        |                           |                       |                    |
        | === Loop for each Subscription ======================================= |
        |                           |                       |                    |
        |--- Look for Overdue Unpaid linked charges ---------------------------->|
        |                           |                       |                    |
        |     [If Has Overdue Charge]                       |                    |
        |-------------------------------------------------->| Update Status:     |
        |                           |                       | 'PastDue'          |
        |-------------------------------------------------->| Keep RenewalAt     |
        |                           |                       | unchanged          |
        |                           |                       |                    |
        |     [Else (Time to Bill & No Overdue)]            |                    |
        |----------------------------------------------------------------------->| Create Manual PIX 
        |                           |                       |                    | Charge (Pending)
        |-------------------------------------------------->| Advance RenewalAt  |
        |                           |                       |                    |
        |                           |                       |                    |
```

Manual recurrence and gateway subscription activation both use `RecurringScheduleCalculator` as the single source of truth for interval progression.

Operational notes for manual recurrence:

- the manual plan itself stores the selected PIX key (`Plan.ManualPixKeyId`)
- recurring manual billing reuses that plan-level key directly when generating the PIX copy-paste payload
- recurring manual charges inherit that plan-level PIX key instead of resolving from the customer or a global tenant-only field
- this keeps the receiving account decision stable per commercial plan, which is important when the tenant splits volume across banks, businesses, or partners
- the runtime now evaluates manual recurrence as `load cycle context -> classify cycle state -> apply action`, instead of mixing due-date checks, current-charge checks, overdue checks, and persistence branches throughout the same method
- manual recurrence ownership now stays inside `ManualSubscriptionWorkflow` for cycle progression and reconciliation, with `RecurringScheduleCalculator` kept as the interval helper
- subscription cancellation requests now share `GatewaySubscriptionCancellationRequestService` only for the Stripe `cancel_at_period_end` edge call; platform and customer handlers still own their local validation and final domain transition

Recurring charges generated for subscription cycles do not all follow the same customer notification policy:

- manual recurring charges (`SubscriptionManual`) continue to participate in the automatic charge-notification planning (`ChargeCreated`, reminders, due-today, overdue) because the customer still needs to act on that charge
- gateway-managed recurring charges (`SubscriptionGateway`) do not enqueue automatic charge notifications; customer communication should come from the subscription lifecycle events instead (`SubscriptionActive`, `SubscriptionPastDue`, `SubscriptionFailed`, `SubscriptionCanceled`)
- recurring invoice charge handling now keeps a small normalized invoice context internally, so `invoice.created`, `invoice.paid`, and `invoice.payment_failed` reuse the same recurring charge identity and amount/currency/due-date data without passing a long parameter fan-out through the core method
- that recurring invoice identity is the Stripe invoice id stored in `GatewayInvoiceId`; legacy recurrence rows are backfilled to that field and no longer keep the invoice id in `GatewayPaymentIntentId`
- paid invoice lifecycle handling now also normalizes the invoice into a small lifecycle context before deciding whether the result is `start trial`, `skip duplicate trial`, `skip because cancellation was scheduled`, or `apply billable paid cycle`

Both kinds of recurring charges remain linked back to the originating subscription so the subscription detail timeline can show the active cycle charge and its history.

When a manual recurring subscription is created through `POST /api/customers/{id}/subscriptions`, the `Subscription` aggregate raises a `SubscriptionCreatedEvent`. Customer email delivery for that creation flow is handled asynchronously by an event handler, not inline in the command handler.
The request `startDate` is only mandatory when the selected plan is a recurring manual plan; `OneTime` / vitalicio payloads must not fail validation just because `startDate` is omitted.

---

## 4. Manual Payment Conciliation (AI Proofs)

For manual charges (like direct PIX transfers to the Tenant's account), Pagit offers a receipt upload flow that utilizes the standardized AI stack (`Microsoft.Extensions.AI` + Google GenAI) to automate conciliation.

```text
                    +-----------------+
                    |     Pending     | (Charge Created - OneTimeManual / SubscriptionManual)
                    +-----------------+
                             |
                             v (Customer Uploads Receipt)
                    +-----------------+
                    |    Uploaded     |
                    +-----------------+
                             |
     +-----------------------+-----------------------+
     |              AI Job (Google GenAI)            |
     |                                               |
     |                 +------------+                |
     |                 | Analyzing  |                |
     |                 +------------+                |
     |                   /   |   \                   |
     |    (Not receipt) /    |    \ (Amount Mismatch)|
     |                 v     |     v                 |
     |     +-------------+   |   +----------------+  |
     |     |   Invalid   |   |   | Valid_Mismatch |  |
     |     +-------------+   |   +----------------+  |
     |                       |                       |
     |                (Match)|                       |
     |                       v                       |
     |                 +------------+                |
     |                 | Valid_Match|                |
     |                 +------------+                |
     +-----------------------------------------------+
          |                  |                   |
          v                  v                   v
    +----------+       +----------+       +---------------+
    | Rejected |       |   Paid   |       | PendingReview |
    +----------+       +----------+       +---------------+
          |                                  |        |
          | (Try Again)       (Tenant Approv)|        |(Tenant Reject)
          v                                  v        v
    [Uploaded]                         [Paid]       [Rejected]
```

## 5. Charge State Machine

Regardless of how a charge is created (`OneTimeGateway`, `OneTimeManual`, `SubscriptionGateway`, `SubscriptionManual`), its status transitions are strictly controlled by domain methods (`MarkAsPaid`, `MarkAsFailed`, etc.).

```text
                     +-------------+
                     |     [*]     |
                     +-------------+
                            |
                            v
                    +---------------+
                    |    Pending    |
                    +---------------+
                      /   |   |   \
                     /    |   |    \ (AI Amount Mismatch)
   (Webhook Success)/     |   |     \
  (AI Auto-approve)/      |   |      v
 (Manual Settle.) /       |   |   +---------------+
                 /        |   |   | PendingReview |
                v         |   |   +---------------+
        +----------+      |   |      |         |
        |   Paid   |      |   |      |         | (Tenant Approve)
        +----------+      |   |      |         |
          ^     ^         |   |      |         | (Tenant Reject)
          |     |         |   |      v         v
          |     |         |   |    [Paid]  +----------+
          |     |         |   |            | Rejected |<--+
          |     |         |   |            +----------+   | (AI Invalid Receipt /
          |     |         |   \              |      |     |  Tenant Reject)
          |     |         |    \ (Tenant date > DueDate)
          |     |         |     \            |      |     |
          |     |         |     v            |      |     |
          |     |         |  +---------+     |      |     |
          |     |         |  | Expired |     |      |     |
          |     |         |  +---------+     |      |     |
          |     |         |                  |      |     |
          |     |         v                  |      |     |
          |     |    +---------+             |      |     |
          |     |    |  Failed |             |      |     |
          |     |    +---------+             |      |     |
          |     |                            |      |     |
          |     +----------------------------+      |     |
          |       (Tenant Override Settle.)         |     |
          |                                         |     |
          +-----------------------------------------+-----+
                      (Tenant Override)
```

---

## 6. Automated Safety Net

These flows are protected by the current automated suite:

- fast tests validate routing rules, manual charge assembly, webhook processing, event handlers, and charge/subscription state transitions
- integration tests validate the public and authenticated HTTP paths for:
  - gateway charge creation plus payment session creation
  - manual charge creation plus public retrieval
  - payment proof upload
  - manual settlement
  - manual review
  - Stripe checkout and invoice webhook reconciliation

The integration suite runs against real Postgres and the real ASP.NET pipeline, while Stripe, Woovi, file storage, and receipt verification are replaced with deterministic test doubles. This keeps the financial workflows reproducible locally and stable in CI.

It now also validates:

- Stripe checkout webhook reconciliation for immediate and async one-time charges
- Stripe invoice webhook ordering (`invoice.created`, `invoice.paid`, `invoice.payment_failed`, duplicates, and paid-before-created delivery)
- Stripe webhook duplicate safety with database uniqueness backing invoice and gateway payment intent identifiers
- Stripe one-time fallback reconciliation through `payment_intent.succeeded` when checkout completion is insufficient
- gateway subscription activation uses the webhook-provided next billing date (`period_end`) instead of recomputing the cycle locally when that provider date is available
- manual recurring subscription creation across every supported recurring interval (`Daily`, `Weekly`, `Biweekly`, `Monthly`, `Bimonthly`, `Quarterly`, `Semiannual`, `Yearly`)
- manual recurring conciliation end to end: auto-approved proof activates subscriptions, finance review approval activates subscriptions, review rejection keeps subscriptions pending, and tenant manual settlement activates subscriptions
- receipt replay protection: proofs without a reusable transaction reference or reusing an existing reference are routed to manual review instead of auto-approval
- underpayment approvals in manual review require explicit confirmation; plain approval no longer silently settles a smaller extracted amount
- payment session creation is idempotent per charge and returns the persisted session on duplicate public requests once a gateway intent/url already exists
- Woovi webhook access control via static `X-Woovi-Webhook-Key`
