# Module Entitlements and Limits

This document explains the current entitlement model implemented in Pagit. Earlier versions of this file mixed implemented behavior with future planning; it now focuses on what exists in the codebase today.

## Purpose

Platform billing grants tenants access to modules and quotas without coupling those rules to ordinary feature handlers.

The model has two parts:

- modules: boolean feature access
- limits: numeric caps or monthly quotas

## Current catalogs

Modules are defined in `Application/Entitlements/EntitlementKeys.cs`:

- `core_billing_ops`
- `payment_channels`
- `whatsapp`
- `ai_agent`
- `receipt_intelligence`

Limits are also defined there:

- `customers.active.max`
- `users.seats.max`
- `notifications.whatsapp.send.max`
- `notifications.email.send.max`
- `charges.created.max`
- `ai_agent.messages.max`

The supported catalog is validated through `EntitlementCatalog`.

## Data model

The current persistence model uses:

- `PlatformPlanEntitlement`
- `PlatformPlanLimit`
- `TenantMonthlyUsage`

Tenant access also depends on billing state:

- runtime access is resolved through `ITenantPlatformBillingStateService`
- that service reuses the shared subscription payment/access projection instead of maintaining a second status-mapping path
- `Tenant.PlatformPlanId` remains a compatibility projection and fallback

## Read path

`IEntitlementService` reads the tenant's effective platform state and returns:

- enabled modules
- resolved limits

The important behavior is:

- billing state is checked first
- `Tenant.PlatformPlanId` is used only as fallback when runtime billing state is unavailable
- no effective platform plan means an empty entitlement context

## Enforcement path

Pagit keeps entitlement checks out of ordinary business flow where possible.

The current building blocks are:

- `RequiresModuleAttribute`
- `EnforceLimitAttribute`
- `EntitlementValidationBehavior`
- `IUsageGuard`
- `IUsageRecorder`

This allows request preflight validation to fail early without pushing module and limit logic into each handler.

## Structural limits vs monthly quotas

Absolute limits are derived from current state:

- customer count
- user count

Monthly quotas are tracked in `TenantMonthlyUsage` using tenant-local billing periods, not raw UTC month boundaries.

Current monthly quotas include:

- WhatsApp sends
- email sends
- charge creation
- metered operator-assistant replies

## Metering rules

Current billable updates are centralized:

- charge creation increments the monthly charge counter
- successful email and WhatsApp notification sends increment the corresponding channel counter
- successful final operator-assistant replies increment the AI-agent message quota

Auxiliary assistant responses such as greeting, clarification, prompt-injection blocking, and handoff responses are intentionally not metered.

## Platform tenant behavior

The Pagit master tenant is not automatically exempt from module and limit rules. If the platform should bypass a rule, that exception needs to be explicit in code rather than assumed by documentation.

## What this document should not do

This file is not an ADR backlog and not a pricing strategy document. Avoid adding:

- speculative future catalogs
- open-ended monetization ideas
- implementation plans that are not in code yet

If a future change is still only a proposal, keep it in a review or planning document instead.
