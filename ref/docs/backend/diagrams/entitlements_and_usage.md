# Tenant Entitlements and Usage Limits Architecture

This document describes the flow of validating module entitlements, enforcing limits, and recording usage across the application.

## 1. Core Concepts

*   **Plan / Subscriptions:** Tenants are customers of the Master Tenant (Pagit itself). The current active subscription determines which `Plan` they are on.
*   **Modules (Entitlements):** Boolean flags indicating if a feature is active for the tenant (e.g., `whatsapp`).
*   **Limits:** Numeric quotas defined per plan (e.g., `charges.created.max`, `customers.active.max`). Limits can be absolute or windowed (monthly).
*   **Usage (`TenantMonthlyUsage`):** A table storing the current monthly consumption of windowed limits for a specific tenant.

## 2. Abstractions

The system uses three primary interfaces to manage entitlements:

*   `IEntitlementService`: Reads the current `Tenant` access projection + platform plan rows directly from the database and returns an `EntitlementContext` containing allowed modules and limits.
*   `IUsageGuard`: Validates if a tenant has access to a module or if they have not exceeded a specific limit. It checks the database and returns a `Result<Unit>`.
*   `IUsageRecorder`: Asynchronously increments the `TenantMonthlyUsage` table after an action has been successfully completed.

## 3. High-Level Validation Flow (Pipeline Behavior)

For most standard API requests, usage limits and modules are enforced using MediatR Pipeline Behaviors (`EntitlementValidationBehavior`) and Custom Attributes (`[RequiresModule]`, `[EnforceLimit]`).

```text
  Client          Endpoint          Behavior           Guard       EntitlementSvc         DB          Handler
    |                |                 |                 |               |               |              |
    |- POST /charge >|                 |                 |               |               |              |
    |                |--- Handle() --->|                 |               |               |              |
    |                |                 |                 |               |               |              |
    |                |                 |-- EnsureLimit ->|               |               |              |
    |                |                 |                 |--- GetEnts -->|               |              |
    |                |                 |                 |               |-- FetchPlan -->|              |
    |                |                 |                 |               |-- FetchLimit->|              |
    |                |                 |                 |               |<-- (e.g. 500)-|              |
    |                |                 |                 |               |               |              |
    |                |                 |                 |-- QueryUsg -->|               |              |
    |                |                 |                 |               |<- (e.g. 499)--|              |
    |                |                 |                 |               |               |              |
    |                |                 |<--- Success ----|               |               |              |
    |                |                 |                 |               |               |              |
    |                |                 |--- next() ---------------------------------------------------->|
    |                |                 |<--------------------------------------------- Success (Charge)-|
    |<-- 201 Created |<----------------|                 |               |               |              |
```

## 4. Usage Recording Flow (Event-Driven)

The system does *not* record usage during the pre-flight check in the pipeline behavior. This prevents "stealing" limits if a transaction fails (e.g., database error or invalid input).

Instead, usage recording happens **after** the successful completion of the business action, usually via Domain Events.

### Example: Creating a Charge

```text
   Handler              DB               Events        HandlerEvent      Recorder        UsageDB
      |                 |                  |                |                |              |
      |-- AddAsync() -->|                  |                |                |              |
      |                 |                  |                |                |              |
      |- SaveChanges() >|                  |                |                |              |
      |                 |-- Dispatch() --->|                |                |              |
      |                 |                  |                |                |              |
      |                 |                  |-- Handle() --->|                |              |
      |                 |                  |                |-- Record(+1) ->|              |
      |                 |                  |                |                |-- UPSERT --->|
      |                 |                  |                |                |              |
```

## 5. Direct Service Integration (e.g., Notifications)

For infrastructure services that do not use MediatR handlers directly (like `INotificationService`), the system uses the **Decorator Pattern** to enforce limits and record usage atomically.

The `MeteredNotificationService` decorates the base `NotificationService`.

```text
     Job              MeteredSvc            Guard            InnerSvc          Recorder
      |                   |                   |                 |                 |
      |- SendWhatsApp() ->|                   |                 |                 |
      |                   |                   |                 |                 |
      |                   |--- EnsureMod() -->|                 |                 |
      |                   |<---- Success -----|                 |                 |
      |                   |--- EnsureLim() -->|                 |                 |
      |                   |<---- Success -----|                 |                 |
      |                   |                   |                 |                 |
      |                   |--- SendWhatsApp() ----------------->|                 |
      |                   |<------------------- Success --------|                 |
      |                   |                   |                 |                 |
      |                   |--- RecordAsync(+1) ---------------------------------->|
      |<--- Success ------|                   |                 |                 |
```

## Summary of the Lifecycle

1.  **Definition:** Master tenant defines a `Plan` with `PlatformPlanLimit` and `PlatformPlanEntitlement`.
2.  **Assignment:** A tenant subscribes to a plan. Billing sync materializes effective access on `Tenant`.
3.  **Protection (Pre-flight):** 
    *   Via `[EnforceLimit]` on MediatR Requests.
    *   Or programmatically calling `IUsageGuard.EnsureWithinLimitAsync()`.
4.  **Execution:** The core business logic runs.
5.  **Recording (Post-flight):**
    *   Via Domain Event Handlers (e.g., `ChargeCreatedEventHandler`).
    *   Or programmatically calling `IUsageRecorder.RecordAsync()` upon success.
