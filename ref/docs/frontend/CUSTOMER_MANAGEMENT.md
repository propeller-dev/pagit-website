# Customer Management (Frontend)

This document describes the frontend implementation for the customer management feature, which is available to all tenants.

## Page Overview

- **Location:** `/dashboard/customers`
- **Component:** `src/app/dashboard/customers/page.tsx`
- **Navigation:** A "Customers" link is available in the main sidebar for all authenticated users.

## Functionality

The Customers page provides tenants with a comprehensive view of their own customer list.

### 1. Data Fetching

- The page uses the centralized `api.get()` client from `src/lib/api.ts` to request `PaginatedResponse<Customer>` data (`/api/customers?pageNumber=X&pageSize=Y`).
- Authentication headers (including impersonation when active) are injected automatically by `api.get()`.
- The component syncs pagination with the URL using `nuqs` (`useQueryState`) so refreshes and share links keep the same page.

### 2. Data Display

- Results render through the reusable `DataTable` component in `src/components/ui/table/data-table.tsx` together with the shared `DataTableToolbar`.
- Columns cover the core customer fields (`name`, `email`, `document`, `phone`, `createdAt`) and surface row actions via `CustomerCellAction`.
- The page handles loading and error states locally so tenants see instant feedback while the fetch runs.

### 3. Customer Forms

- The customer creation and editing interface (`src/features/customers/components/customer-form.tsx`) uses a structured **two-column layout** on large screens (`lg` and above).
- The left column contains the section title and description, while the right column contains a `Card` wrapping the relevant form inputs (e.g., "Personal Information", "Notification Settings").
- On smaller screens, the layout stacks vertically for better usability.

### 4. Customer Detail, Subscriptions and Embedded Charges

- The customer detail page (`/dashboard/customers/[id]`) renders a charges table using the shared charge table component.
- That shared charge table now keeps the default view compact: `payment date` stays visible, while `created at` and `due date` remain available through the column-visibility control when operators need more timeline detail.
- The same page also renders subscription-plan context in the "Subscription Details" card when `customer.subscription` is present.
- The card shows app-level payment status plus a simplified subscription summary with nested plan data (`subscription.plan.name`, `subscription.plan.price`, `subscription.plan.interval`, `subscription.plan.billingModel`) and lifecycle fields (`status`, `startDate`, `nextBillingDate`, `trialEndsAt`).
- **Manual Recurrence Creation**: If the customer has no open subscription, a "New Subscription" button is displayed in the page header. Clicking it opens a modal (`CreateSubscriptionModal`) that allows the tenant to assign an existing `Manual` plan to the customer.
- The customer subscription modal dispatches by plan billing model:
  `Manual` plans post to `POST /api/customers/{id}/subscriptions` with `planId`, `startDate`, and `billingDay` when the interval is month-based.
  `GatewaySubscription` plans post to `POST /api/customers/{id}/subscription-checkout-sessions` and now keep the operator in the modal, showing a shareable checkout link instead of redirecting immediately.
- Manual recurring plans are now responsible for the PIX receiving account choice. The customer subscription modal does not ask for a PIX key because that decision already lives on the selected plan.
- Gateway checkout creation no longer materializes a fake `Subscription` before the first payment lands. The pending gateway signup is represented only by the returned checkout link and the backend `SubscriptionCheckout` record.
- The modal only lists recurring plans that can actually be linked to a customer. `OneTime` / "Vitalício" plans are excluded from this flow and should be handled by the charge creation flow instead.
- The start date field is only required for manual recurring plans.
- The checkout-success state in the modal is operational on purpose:
  - it exposes the generated checkout URL
  - it supports copy/open actions
  - it warns the operator to send the link to the customer
  - the backend also attempts automatic email delivery of that same checkout link asynchronously
- Plan-related UI surfaces expose the billing model explicitly so operators can distinguish manual recurrence, gateway-managed subscriptions, and one-time plans at a glance.
- The subscription modal itself shows both the billing interval and the billing model of the selected plan before confirmation.
- Monthly-derived cadences require an explicit billing day (`1..28`). Daily, weekly, and biweekly cadences do not accept one.
- When the customer already has an open recurrence or an open checkout, the UI should block a second gateway signup attempt instead of depending on a fake subscription row.
- The subscription creation modal checks `ApiResult.error` explicitly (compatible with endpoints that return `204 No Content` on success).
- The customer detail header includes a direct "New Charge" action that routes to `/dashboard/charges/new?customerId={id}`.
- The charge creation form reads `customerId` from the query string and preselects/locks the customer, reducing navigation friction.
- In manual charge mode, the creation form supports `pix`, `boleto`, and `cash` payment types; selecting `cash` is a valid flow and does not require PIX/Boleto fields.
- For manual PIX charges, the operator must select one saved tenant PIX key from the organization catalog. The default tenant key can be preselected in the UI, but the charge still submits the explicit selected key id.
- The backend payload from `GET /api/customers/{id}` must include each charge `chargeType` field so the UI can render translated charge-type badges correctly.
- The backend payload from `GET /api/customers/{id}` now also includes an optional `subscription` summary object used by the customer detail card.
- The customer detail page no longer preloads the plans list; subscription creation and checkout flows should fetch only the data they need.
- Customer create/update server actions are command-style mutations (`204` on success), so form flows navigate/refresh based on `error === null` instead of response body data.
- If a charge type is missing, the UI now falls back to a neutral "Not available" label instead of showing a raw translation key.
- Manual recurring PIX charges reuse the existing public PIX charge page and proof-upload flow; no dedicated recurring checkout screen exists in the frontend.
- Manual recurring subscription creation remains a command-style operation (`204 No Content` on success), but customer communication is now triggered asynchronously from backend events instead of inline UI flow logic.

## Data Structures

- The `Customer` type, which defines the shape of the customer data, is located in the main types file at `src/types/index.ts`.
- Paginated endpoints use the shared `PaginatedResponse<T>` wrapper from the same file.
