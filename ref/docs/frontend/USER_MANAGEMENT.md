# User Management (Frontend)

This document describes the frontend implementation for the user management feature, which is available to all tenants.

## Page Overview

- **Location:** `/dashboard/users`
- **Component:** `src/app/dashboard/users/page.tsx`
- **Navigation:** A "Users" link is available in the main sidebar for all authenticated users.

## Functionality

The Users page allows tenants to view a list of all user accounts associated with their tenant.

### 1. Data Fetching

- The page utilizes the centralized `api.get()` client from `src/lib/api.ts` to request `PaginatedResponse<User>` data from `/api/users`.
- URL parameters (`page`, `perPage`) are kept in sync with component state through `nuqs`.
- Authentication (and optional impersonation) headers are injected automatically by `api.get()`.

### 2. Data Display

- The fetched user data is displayed in the reusable `DataTable` component located at `src/components/ui/table/data-table.tsx`.
- The table is configured with columns for `Email`, `Role`, and `Created At`.
- Row-level actions are handled by `UserCellAction`, keeping edit/delete logic modular.
- The page includes standard loading and error states.

## Data Structures

- **`AuthenticatedUser`**: This interface, defined in `src/types/index.ts`, represents the currently logged-in user's claims (e.g., from the JWT).
- **`User`**: This interface, also in `src/types/index.ts`, represents the data for a single user record as returned by the API.
- **`PaginatedResponse<T>`**: Shared wrapper for paginated list endpoints used across dashboard pages.
