# Backend Domain Model

This document summarizes the backend entities that matter most to understanding Pagit's current billing model. It is not meant to duplicate every EF mapping detail in `PagitDbContext`.

## Platform context

Pagit is a multi-tenant SaaS billing platform.

- a `Tenant` is an organization using Pagit
- a `User` belongs to a tenant and operates the dashboard
- a `Customer` belongs to a tenant and represents the tenant's end-customer

The platform also dogfoods its own billing model through the master tenant:

- master tenant id: `00000000-0000-0000-0000-000000000001`

## Core business entities

### Tenant

Represents the primary isolation boundary.

Important fields:

- `ExternalId`
- `Name`
- `FullName`
- `Document`
- `PrimaryCurrency`
- `TimeZoneId`
- `PlatformPlanId`

Notes:

- `TimeZoneId` is used for date-based tenant workflows and monthly usage windows.
- `PlatformPlanId` is a compatibility projection; effective access is still resolved through billing state services.

### User

Represents an authenticated operator account inside a tenant.

Important fields:

- `TenantId`
- `Email`
- `Role`
- `IsEmailVerified`

Notes:

- `Email` is normalized to trimmed lowercase before persistence so auth and duplicate checks use a stable value.

### Customer

Represents the tenant's billable end-customer.

Important fields:

- `TenantId`
- `ExternalId`
- `Name`
- `Email`
- `Phone`
- `GatewayCustomerId`
- `ReferenceId`

Customer notification preferences are stored in a dedicated 1:1 entity:

- `CustomerNotificationSettings`

### Plan

Represents either:

- a platform plan used to grant Pagit entitlements to a tenant
- a tenant-owned product plan sold to end-customers

Important fields:

- `TenantId`
- `Name`
- `Price`
- `Interval`
- `BillingModel`
- `ManualPixKeyId`
- `Status`

Because `Plan` is reused in both contexts, entitlement configuration is stored in dedicated platform-plan tables instead of directly on `Plan`.

### Subscription

Represents the recurring relationship between a customer and a plan.

Important fields:

- `TenantId`
- `CustomerId`
- `PlanId`
- `Status`
- `GatewaySubscriptionId`
- `CancelAtPeriodEnd`
- `RenewalAt`

Notes:

- `Subscription` no longer stores pre-checkout state. Gateway signup intent lives in `SubscriptionCheckout`.
- `CancelAtPeriodEnd` is the runtime source of truth for scheduled cancellation. `EPaymentStatus.CancelScheduled` remains a payment/access projection, not a persisted subscription status.
- customer payment display and tenant platform access now reuse the same subscription projection rules through `CustomerPaymentSnapshot`, with `TenantPlatformBillingStateService` adapting that shared projection for tenant-facing reads
- manual recurrence and gateway recurrence share the same subscription aggregate, but not the same execution path.
- the EF column stays `next_billing_date`; outward read models still expose `NextBillingDate` during this rollout

### SubscriptionCheckout

Represents a persisted gateway checkout intent before it becomes a real recurring subscription.

Important fields:

- `TenantId`
- `CustomerId`
- `PlanId`
- `GatewayCheckoutSessionId`
- `Status`
- `ExpiresAt`
- `CompletedAt`
- `SubscriptionId`

Notes:

- this model is now written during checkout creation and completed by checkout/webhook reconciliation
- its purpose is to keep checkout intent out of the recurring subscription lifecycle
- open checkout intents expire 24 hours after creation
- stale rows that are still `Open` transition to `Expired`
- it is an internal persistence record, so it does not expose a prefixed `ExternalId`

### Charge

`Charge` is currently the central billing aggregate.

It represents:

- what is owed
- the current billing status
- the public checkout or public-proof reference
- the current settlement context

Important fields:

- `TenantId`
- `CustomerId`
- `SubscriptionId`
- `ChargeType`
- `Status`
- `Amount`
- `DueDate`
- `SecureToken`
- `GatewayProvider`
- `GatewayInvoiceId`
- `GatewayPaymentIntentId`
- `GatewayCheckoutSessionId`
- `PaymentUrl`
- `TenantPixKeyId`

Current modeling note:

- one-time gateway, manual settlement, and recurring billing all still converge on `Charge`
- `ChargeType` is the persisted property name, but the underlying enum is now `EChargeKind`
- supported charge kinds are `OneTimeGateway`, `OneTimeManual`, `SubscriptionGateway`, and `SubscriptionManual`
- Stripe recurring invoice charges persist the Stripe invoice identifier in `GatewayInvoiceId`
- Stripe one-time settlement still persists the real payment intent identifier (`pi_...`) in `GatewayPaymentIntentId`

### PaymentProof

Represents uploaded or generated evidence attached to a manual charge.

Important fields:

- `ChargeId`
- `FileUrl`
- `ExtractedAmount`
- `AmountMatches`
- `TransactionReference`
- `TransactionDate`
- `Reason`
- `Source`

This entity stores evidence and extraction output. The final billing state still belongs to `Charge`.

### Notification

Represents persisted notification schedule/history state.

Important fields:

- `TenantId`
- `CustomerId`
- `UserId`
- `TargetType`
- `ContextType`
- `Channel`
- `EventType`
- `ChargeId`
- `SubscriptionId`
- `Status`
- `ScheduledFor`
- `AttemptCount`
- `LastAttemptAt`
- `LockedUntil`

The current model supports both customer and tenant-owner targets.

In the current notification workflow:

- customer rows are created through `NotificationTriggerService`
- tenant-owner rows are created only by narrow automation event handlers
- delivery resolves the current tenant owner from `TenantId`; `UserId` is optional history data, not a required runtime dependency

## Integration and settings entities

### PaymentIntegration

Represents tenant payment-provider connectivity and readiness.

Providers currently include:

- `Stripe`
- `Woovi`

Important fields:

- `TenantId`
- `Provider`
- `Status`
- `ExternalAccountId`
- `TenantPixKeyId`

Notes:

- For `Woovi`, `TenantPixKeyId` is the tenant-owned PIX key explicitly linked to the integration.
- For `Woovi`, `ExternalAccountId` still stores the provider-side PIX-key identifier used by balance / withdraw operations in the current implementation.
- The tenant default PIX key is not the source of truth for an active Woovi integration.

### TenantPaymentSettings

Stores tenant payment configuration that is not tied to a single provider implementation, mainly PIX-related defaults shared by billing flows.

Important fields:

- `TenantId`
- `DefaultPixKeyId`

Notes:

- `DefaultPixKeyId` points to the tenant-owned PIX key currently treated as the organization default for preselection in the UI and general operator convenience.
- this entity no longer stores a mirrored PIX string; the saved key catalog remains the source of truth through `TenantPixKey`
- changing `DefaultPixKeyId` does not retarget an active Woovi integration

### TenantPixKey

Represents one saved PIX receiving key owned by the tenant.

Important fields:

- `TenantId`
- `Key`
- `KeyType`

Notes:

- fixed PIX types (`Document`, `Phone`, `Email`) are unique per tenant
- random keys can exist multiple times for the same tenant
- operators can pick one saved key per manual charge, while manual recurring plans bind one saved key at the `Plan` level

### TenantPaymentMethodRoute

Stores per-tenant provider priority by payment method. This routing model still exists in the current codebase and is used by payment runtime services.

### NotificationIntegration

Stores tenant WhatsApp integration state, including Evolution instance information.

### TenantNotificationTemplate

Stores tenant-customized notification template content per event and channel.

## Entitlement entities

Platform entitlements and quotas are materialized through dedicated tables:

- `PlatformPlanEntitlement`
- `PlatformPlanLimit`
- `TenantMonthlyUsage`

These tables support module access and monthly usage enforcement without mixing platform billing policy into tenant product plans.

## Relationship summary

- `Tenant` owns `User`, `Customer`, `Plan`, `Subscription`, `Charge`, `PaymentIntegration`, `NotificationIntegration`, `TenantPaymentSettings`, and `TenantPixKey`
- `Customer` owns notification settings and is the primary party for charges and subscriptions
- `Subscription` links `Customer` and `Plan`
- `Charge` optionally links to `Subscription`
- `Charge` can optionally point to the saved tenant PIX key used for that manual PIX lifecycle
- `PaymentProof` attaches to `Charge`
- `Notification` can point to a charge or subscription context
- `Notification` acts as the durable queue and history record for notification delivery

## Source of truth

Use this document as a domain overview. For exact persistence details, indexes, and column mappings, use:

- `backend/src/Pagit.Api/Infrastructure/Data/PagitDbContext.cs`
- entity definitions under `backend/src/Pagit.Api/Domain/Entities`
