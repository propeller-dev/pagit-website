# API Architecture (Frontend)

This document explains the current frontend API structure. It focuses on stable conventions instead of listing every route-specific action.

AI-specific execution guidance belongs in the repo-local skills under `/.agents/skills`.

## Overview

The frontend uses a shared API layer in `src/lib/api.ts` and thin server actions in `src/lib/actions/*`.

The goals are:

- one place for fetch/auth/error behavior
- consistent browser and server-side API calls
- minimal API logic inside page and component files

## Core pieces

### `src/lib/api.ts`

This file is the shared HTTP boundary.

It exposes:

- `api` for client-side calls
- `serverApi` for server actions and server components

It also owns:

- base URL resolution through `NEXT_PUBLIC_API_URL`
- auth header injection
- impersonation header support
- Problem Details parsing
- `ApiResult<T>` shaping
- `204 No Content` handling for command-style mutations
- `cache: 'no-store'` on server-side `GET` requests so tenant-scoped operational state does not get stuck behind Next.js fetch caching

### `src/lib/actions/*`

Server actions are thin wrappers over `serverApi`.

They should:

- read cookies through the server-side path already built into the API layer
- call backend routes
- keep endpoint-specific typing close to the feature

They should not become a second business-service layer.

## Current conventions

### Authentication

- client-side calls read the `token` cookie through `js-cookie`
- server-side calls use Next.js `cookies()`
- logout should clear the auth cookie on both the client and the server-side cookie store, then force a full navigation out of `/dashboard` so middleware-protected routes do not remain mounted in a half-signed-out state
- impersonation uses `X-Impersonate-Tenant-Id`

### Error handling

- both `api` and `serverApi` normalize backend Problem Details into `ApiResult<T>`
- UI-facing copy should normally come from backend error codes, not raw backend `detail` strings
- for generic buckets such as `BIZ_INVALID_OPERATION` and `VAL_INVALID_VALUE`, preserve the backend detail when present so users see the specific rule that blocked the action
- translation helpers live in `src/lib/error-translation.ts`

### Data loading split

Use:

- server actions for initial page loads and secure server-side work
- client-side calls for interaction, polling, and post-render refresh

### Polling

For async backends such as notification dispatches:

- use `useSWR(...)` with server-rendered fallback data
- revalidate on focus
- prefer conditional refresh intervals over aggressive fixed polling

### Calendar-date behavior

Charge due dates must be treated as calendar dates (`yyyy-MM-dd` semantics), not as browser-local conversions of midnight UTC timestamps. This matters for labels like due today, overdue, and manual notification suggestions.

## Notable API contracts

These behaviors are important enough to call out because UI logic depends on them:

- mutation helpers treat `204` as success
- platform subscription summary may return `200 OK` with a `null` body when no active platform subscription exists
- `GET /api/billing/subscription` returns the persisted subscription lifecycle `status` plus a projected `displayStatus`; for cancel-at-period-end gateway subscriptions, `status` stays `Active` or `Trial` while `displayStatus` becomes `CancelScheduled`
- charge and subscription detail payloads include notification history metadata used by polling tables and retry UI
- onboarding checklist state is aggregated by `GET /api/auth/onboarding` so the shell does not fan out into multiple tenant-scoped requests on every reload
- `billingInfo.appStatus` may return `CancelScheduled` for gateway subscriptions canceled at period end even though the persisted subscription status remains `Active` or `Trial`; the frontend must treat this as active access until the backend `accessStatus` or the final subscription status says otherwise

## Where feature-specific details live

- notification-specific UI behavior: `docs/frontend/WHATSAPP_INTEGRATION.md`
- error formatting and Problem Details usage: `docs/frontend/API_ERROR_HANDLING.md`
- i18n and error-code translation: `docs/frontend/I18N.md`

## What to avoid in this document

Avoid turning this file into:

- a dump of every server action
- a release-notes log of small route changes
- a duplicate of `src/lib/api.ts`

If a detail is only relevant to one feature, document it in that feature's doc instead.
