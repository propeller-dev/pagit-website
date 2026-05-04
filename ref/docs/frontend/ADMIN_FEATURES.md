# Admin Features (Frontend)

This document describes the frontend implementation of features that are exclusively available to users of the main "Pagit" tenant.

## Authorization and Conditional UI

Access to admin features is controlled on the frontend by checking **both**:
- `tenantId` (must be the main/Pagit tenant)
- `role` (must be `Owner` or `Admin`)

This logic is centralized in `src/lib/authz.ts` (`isPagitPlatformManager`) and is used by the sidebar and tenant switcher, while still respecting impersonation state stored by the tenant switcher.

- **Main Tenant ID Constant:** A constant for the main tenant ID is defined in `src/constants/app.ts` to avoid hardcoding.

### Example: Conditional Sidebar Link

The main dashboard sidebar (`src/components/layout/app-sidebar.tsx`) dynamically constructs its navigation items. It checks the user's `tenantId`, detects whether the admin is impersonating another tenant, and only adds the "Tenants" link when the viewer is the master tenant **and** not impersonating someone else.

```tsx
// src/components/layout/app-sidebar.tsx

import { AppConstants } from '@/constants/app';
import { useAuth } from '@/contexts/AuthContext';

// ...

export default function AppSidebar() {
  const { user } = useAuth();
  const navItems = [ /* ... standard nav items ... */ ];

  const isImpersonating = user?.tenantId === AppConstants.MainTenantId &&
    localStorage.getItem('selectedTenantId') &&
    localStorage.getItem('selectedTenantId') !== AppConstants.MainTenantId;

  if (user?.tenantId === AppConstants.MainTenantId && !isImpersonating) {
    navItems.push({
      title: 'Tenants',
      url: '/dashboard/tenants',
      icon: 'user2',
    });
  }

  // ... render navItems ...
}
```

This pattern ensures that users who are not Pagit platform managers do not see links to pages they are not authorized to view.

## Master Tenant Payment Channels

- On `/dashboard/payments/credit-card` and `/dashboard/payments/boleto`, the master tenant is shown a **platform-managed Stripe** channel instead of a Stripe Connect onboarding flow.
- That UI reflects the backend rule that Pagit's main Stripe account is used directly for the master tenant's card/boleto channels.
- The master tenant can still configure and review the payment channel page, but tenant-level connect/disconnect actions are not shown for that platform-managed path.

## In-app API Docs

- **Location:** `/dashboard/platform/api-docs`
- **Sidebar link:** bottom section (`SidebarFooter`) in `src/components/layout/app-sidebar.tsx`
- **Visibility:** visible in the sidebar for all users; page content is filtered by access profile metadata so users only see endpoints relevant to their access level
- **Behavior:** Loads backend OpenAPI JSON (`/openapi/v1.json`) and injects:
  - `Authorization: Bearer <token>`
  - optional `X-Impersonate-Tenant-Id` (toggleable while impersonating, when available)

This provides a stable, easy-to-remember API docs entry point inside the dashboard while preserving role-aware endpoint visibility in the UI.

## Admin Pages

### Tenants Dashboard

- **Location:** `/dashboard/tenants`
- **Component:** `src/app/dashboard/tenants/page.tsx`
- **Description:** This page displays a data table of all tenant accounts in the system. It fetches data from the backend using direct API calls with automatic authentication.
- **Security:** Even if a user could navigate to this page directly, the backend API call would fail with a `403 Forbidden` error, preventing any data from being loaded.

### Tenant Detail Pages

- **Location:** `/dashboard/tenants/[tenantId]`
- **Component:** `src/app/dashboard/tenants/[tenantId]/page.tsx`
- **Description:** This server component fetches the organization detail view used by platform admins.
- **Architecture:** Uses `getTenant()` server action from `src/lib/actions/tenants.ts`, which calls the backend API server-side and renders:
  - organization identifiers (`id`, `externalId`)
  - platform access status and access end date
  - current platform plan summary
  - enabled modules and effective limits/usage
- **Routing rule:** tenant list/detail navigation should use `externalId`, while impersonation still uses the internal tenant `id`.

### Tenant Edit Pages

- **Location:** `/dashboard/tenants/[tenantId]/edit`
- **Component:** `src/app/dashboard/tenants/[tenantId]/edit/page.tsx`
- **Description:** Separate edit route for organization metadata updates, keeping the detail page operational instead of form-first.
