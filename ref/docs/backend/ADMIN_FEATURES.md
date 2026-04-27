# Admin Features

This document outlines features and API endpoints that are restricted to users of the main "Pagit" tenant (also known as the "Master Tenant"). These features are designed for administrative oversight of the entire platform.

## Authorization Mechanism

Access to admin-level features is controlled by **endpoint policies + handler validation**:

- Route-level policy: `PagitPlatformManager`
  - authenticated user
  - role `Owner` or `Admin`
  - JWT `tenant_id == PagitConstants.MasterTenantId`
- Handler-level validation:
  - critical platform queries still validate master-tenant access using `ITenantProvider` (impersonation-aware)

The `ITenantProvider` also honours impersonation headers (`X-Impersonate-Tenant-Id`) sent by the dashboard when a Pagit manager is acting inside another tenant context.

- **Main Tenant ID:** `00000000-0000-0000-0000-000000000001` (defined in `PagitConstants.cs`)

Admin endpoint handlers additionally enforce the master-tenant boundary (`PagitConstants.MasterTenantId`) before executing platform-wide queries. Requests from non-master tenants return **403 Forbidden**.

## Master Tenant Payment Channels

- `CreditCard` and `Boleto` payment-channel configuration for the master tenant runs in **platform Stripe mode**.
- Backend readiness checks and one-time charge routing use Pagit's main Stripe account directly for that path.
- No tenant-scoped Stripe Connect / Express `PaymentIntegration` row is required for the master tenant to expose those channels.

## Documentation Endpoint

### `GET /openapi/v1.json`

- **Description:** OpenAPI document for the backend API (used by the in-app API Docs page).
- **Access:** Any authenticated user.
- **Notes:** The document includes access-profile metadata per operation and bearer-token authentication scheme documentation. The frontend API Docs page filters out endpoints the current user should not see.

## Admin Endpoints

### `GET /api/admin/tenants`

- **Feature:** `GetAllTenants.cs`
- **Description:** Retrieves a list of all tenant accounts in the system. This is used by the main tenant's dashboard to view all of its "customers" (i.e., the other tenants).
- **Access:** Restricted to `Owner`/`Admin` of the main tenant (supports admin impersonation scenarios through handler validation).
- **Contract note:** list rows expose both the internal tenant `id` and the public `externalId`. Platform-admin detail/edit navigation should use `externalId`, while impersonation still uses the internal `id`.

### `GET /api/tenants/{externalId}`

- **Feature:** `GetTenantById.cs`
- **Description:** Retrieves the platform-admin tenant detail payload for a single organization.
- **Access:** Authenticated users with `ITenantProvider` access validation; master-tenant admins can inspect tenant detail even during impersonation-aware flows.
- **Response adds operational admin context:**
  - `externalId`
  - materialized platform-access status / access end date
  - current platform plan summary
  - enabled modules
  - effective limits with current usage values
