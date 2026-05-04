# API Error Handling

Our backend API uses the **Problem Details** standard (RFC 7807) for reporting errors. The frontend uses a unified API layer (`src/lib/api.ts`) that automatically transforms these errors into consistent `ApiError` instances for easy handling across both client-side and server-side code.

## Success Response (2xx)

A successful response will always have a `2xx` status code and contain the requested data directly in the response body.

**Example: Successful Login (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Response (4xx / 5xx)

Any error response will have a `4xx` or `5xx` status code and the body will contain a Problem Details JSON object.

### Key Fields

- `type`: A URI identifier for the problem type.
- `title`: A short, human-readable summary of the problem.
- `status`: The HTTP status code.
- `detail`: A human-readable explanation specific to this occurrence of the problem.
- `errors`: (Optional) An object containing validation errors. This is present for `400 Bad Request` responses.

### Example: Not Found (404)

If a resource is not found, the API will return something like this:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "detail": "The requested resource was not found."
}
```

### Example: Validation Error (400 Bad Request)

When a form submission fails due to invalid data (e.g., sign-up or login), the API will return a `400 Bad Request` with an `errors` object. The keys of this object correspond to the invalid form fields.

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Password": [
      "Password must be at least 8 characters"
    ],
    "Document": [
      "Document is required"
    ]
  }
}
```

## Frontend Error Handling

The frontend API layer (`src/lib/api.ts`) automatically handles error responses and throws `ApiError` instances that expose:

- `status`: HTTP status code
- `message`: The human-readable message from the API (fallback)
- `title`: Error title from Problem Details
- `errors`: Validation errors object (for 400 responses)
- `code`: Structured error code (e.g., `USER_ALREADY_EXISTS`)

## Error Translation

To support multiple languages, we translate API errors on the frontend based on the structured `code` returned by the backend.

### Translation Logic

We use a central mapping in `src/lib/error-messages.ts` and a translation utility in `src/lib/error-translation.ts`.

1.  **Check for code**: If the error has a structured `code`, we look it up in the dictionary for the current locale.
2.  **Fallback to message**: If no translation is found for the code, we display the `message` (usually in English) provided by the API.
3.  **Generic Fallback**: If everything else fails, we show a generic "Internal Error" message.

### Usage in Components

```typescript
import { useFormErrorHandler } from '@/hooks/use-form-error-handler';

export function MyForm() {
  const form = useForm(...);
  const handleApiError = useFormErrorHandler(form);

  const onSubmit = async (data) => {
    try {
      await api.post('/endpoint', data);
    } catch (error) {
      // Automatically translates based on code and maps to form fields
      handleApiError(error); 
    }
  };
}
```

### Manual Translation

If you need to translate an error outside of a form (e.g., in a toast):

```typescript
import { translateError } from '@/lib/error-translation';
import { useTranslation } from '@/i18n/I18nContext';

const { locale } = useTranslation();
const message = translateError(error.code, locale, error.message);
toast.error(message);
```

For broad buckets such as `BIZ_INVALID_OPERATION` or `VAL_INVALID_VALUE`, `translateError(...)` should prefer the backend detail when it exists. This keeps structured codes as the default contract while avoiding vague copy like "invalid operation" when the API already returned the real rule.

## Result Object Pattern

Instead of throwing exceptions, our API layer and Server Actions use the **Result Object** pattern. This ensures that errors are captured safely and are never masked by Next.js in production.

### ApiResult Type

```typescript
export type ApiResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; code?: string; status: number; errors?: Record<string, string[]> } };
```

For `204 No Content` endpoints, use `ApiResult<void>` and treat success as `error === null` (do not rely on `result.data` truthiness).

### Usage in Server Actions

Server Actions should simply return the result from the API layer:

```typescript
// src/lib/actions/example.ts
'use server';

import { serverApi, ApiResult } from '@/lib/api';

export const createItem = async (data: any): Promise<ApiResult<Item>> => {
  return serverApi.post('/api/items', data);
};
```

Command-style mutations should usually return `Promise<ApiResult<void>>` when the frontend does not consume a success body.

### Usage in Components

In form components, we check for the `error` property and use the handler:

```typescript
const handleApiError = useFormErrorHandler(form);

const onSubmit = async (values) => {
  const { data, error } = await createItem(values);
  
  if (error) {
    handleApiError(error);
    return;
  }
  
  // Handle success
  router.push('/success');
};
```

For `ApiResult<void>`:

```typescript
const result = await runCommand(values);
if (result.error) {
  handleApiError(result.error);
  return;
}
// success
```

### Benefits

- **Safe for Production**: Next.js won't mask error details because no error is thrown.
- **Predictable**: The `{ data, error }` pattern makes it clear how to handle responses.
- **Clean Code**: No more `try/catch` blocks or complex wrappers around every action.
- **Consistent**: Same pattern used for both client-side and server-side API calls.
