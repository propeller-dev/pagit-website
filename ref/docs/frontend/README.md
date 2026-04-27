# Frontend Documentation

These docs explain how the frontend works and which conventions it follows. AI-specific implementation guidance lives in the repo-local skills under `/.agents/skills`.

## Core docs

- [API Architecture](API_ARCHITECTURE.md): shared API layer, server actions, auth, and polling conventions
- [API Error Handling](API_ERROR_HANDLING.md): Problem Details handling and frontend error translation
- [UX & UI Design Guidelines](UX_UI_GUIDELINES.md): layout and interaction conventions
- [Internationalization](I18N.md): translation structure and lookup helpers

## Feature docs

- [Admin Features](ADMIN_FEATURES.md)
- [Customer Management](CUSTOMER_MANAGEMENT.md)
- [User Management](USER_MANAGEMENT.md)
- [WhatsApp Integration](WHATSAPP_INTEGRATION.md)

## Implementation conventions

- keep API/auth/error behavior centralized in `src/lib/api.ts` and `src/lib/actions/*`
- keep feature-specific UI logic inside `src/features/*`
- keep user-facing copy in i18n dictionaries
- update the relevant existing doc when a backend contract or user-facing behavior changes
- the `/signup` registration form now requires explicit acceptance of the Terms of Service and Privacy Policy via a required checkbox before submission

## File structure summary

```text
src/
  app/          App Router entrypoints
  features/     Feature-specific UI modules
  components/   Reusable UI building blocks
  lib/          API layer, server actions, utilities
  hooks/        Shared hooks
  i18n/         Dictionaries and lookup helpers
  types/        Shared TypeScript contracts
```
