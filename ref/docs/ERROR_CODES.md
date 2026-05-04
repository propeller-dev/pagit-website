# Error Codes

This document summarizes the structured error-code system used between backend and frontend.

The source of truth is:

- `backend/src/Pagit.Api/Application/Shared/ErrorCodes.cs`

## Prefixes

| Prefix | Meaning |
| --- | --- |
| `VAL_` | validation failure |
| `AUTH_` | authentication or authorization |
| `NOT_FOUND` / `*_NOT_FOUND` | missing resource |
| `CONFLICT_` or legacy conflict aliases | state or uniqueness conflict |
| `BIZ_` | business rule failure |
| `EXT_` | external integration failure |
| `SRV_` | internal server failure |

## Current code families

### Validation

- `VAL_VALIDATION_FAILED`
- `VAL_REQUIRED_FIELD`
- `VAL_INVALID_EMAIL`
- `VAL_PASSWORD_TOO_SHORT`
- `VAL_INVALID_VALUE`

### Auth

- `AUTH_INVALID_CREDENTIALS`
- `AUTH_UNAUTHORIZED`
- `AUTH_FORBIDDEN`
- `AUTH_INVALID_PASSWORD_RESET_TOKEN`
- `AUTH_EXPIRED_PASSWORD_RESET_TOKEN`
- `AUTH_INVALID_EMAIL_VERIFICATION_TOKEN`
- `AUTH_EXPIRED_EMAIL_VERIFICATION_TOKEN`
- `AUTH_EMAIL_NOT_VERIFIED`
- `AUTH_INVALID_RECAPTCHA`

### Not found

- `NOT_FOUND`
- `CUSTOMER_NOT_FOUND`
- `CHARGE_NOT_FOUND`
- `USER_NOT_FOUND`
- `TENANT_NOT_FOUND`
- `PLAN_NOT_FOUND`

### Conflict

- `CONFLICT_ENTITY_EXISTS`
- legacy aliases still present in code: `USER_ALREADY_EXISTS`, `CUSTOMER_ALREADY_EXISTS`, `TENANT_DOCUMENT_ALREADY_EXISTS`

### Business

- `BIZ_INVALID_OPERATION`
- `BIZ_PAYMENT_PROVIDER_NOT_READY`
- `BIZ_PAYMENT_PROVIDER_NOT_ACTIVATED`
- `BIZ_PLAN_INACTIVE`
- `BIZ_INVALID_CHARGE_STATUS`
- `BIZ_SUBSCRIPTION_NOT_FOUND`
- `BIZ_SUBSCRIPTION_ALREADY_CANCELED`
- `BIZ_MODULE_NOT_ENABLED`
- `BIZ_LIMIT_EXCEEDED`
- `BIZ_UNAUTHORIZED_ACCESS`
- `BIZ_PLATFORM_ACCESS_REQUIRED`

### External

- `EXT_PAYMENT_GATEWAY_ERROR`
- `EXT_WHATSAPP_NOT_CONNECTED`
- `EXT_NOTIFICATION_FAILED`

### Server

- `SRV_INTERNAL_ERROR`

## Frontend usage

Frontend UI should translate codes rather than display raw backend text.
Exception: for generic buckets like `BIZ_INVALID_OPERATION`, `VAL_INVALID_VALUE`, and `VAL_VALIDATION_FAILED`, the frontend may prefer the backend detail message when it is present, because the code alone is too broad for user-facing feedback.

Relevant files:

- `frontend/src/lib/error-messages.ts`
- `frontend/src/lib/error-translation.ts`

## Documentation rule

If you add, remove, or rename an error code in `ErrorCodes.cs`, update this document and the matching frontend translations in the same task.
