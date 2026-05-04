# WhatsApp Integration (Frontend)

This document explains the WhatsApp-related frontend surfaces and the product boundaries they rely on.

## Product split

Pagit currently has two separate WhatsApp concerns:

1. tenant-managed WhatsApp integration for outbound billing notifications
2. Pagit-managed operator assistant on Pagit's own official number

These concerns share backend infrastructure, but they are not the same product flow.

## Tenant notification integration

Frontend entrypoint:

- `/dashboard/integrations/whatsapp`

This page is operational. It lets a tenant:

- create or connect the tenant WhatsApp instance
- view QR code and connection status
- send a test message
- disconnect or delete the instance

In the local mock environment, the QR flow is short-circuited: once the connection endpoint is requested after instance creation, the mock marks the tenant integration as connected and returns an open session so the UI can continue without waiting on a real pairing step.

The UI should treat Evolution connection state as integration status, not as a general chat product.

## Notification templates

Frontend entrypoint:

- `/dashboard/integrations/notification-templates`

This area manages notification-template content for supported billing events and channels.

## Customer notification settings

Customer notification configuration is channel-specific.

Current shape:

- email events + local send time
- WhatsApp events + local send time

Important rules:

- email and WhatsApp are configured independently
- WhatsApp requires a customer phone number
- notification send time is interpreted in the tenant business timezone
- not every backend notification type needs a direct UI control

## Operator assistant

The frontend does not configure the assistant directly.

The current product contract is:

- the tenant operator sends a message to Pagit's official number
- backend resolves the tenant from the sender phone
- backend applies safety guards, tool execution, and reply delivery

This is an operator-assistant workflow, not a tenant customer-service chat product.

## Relevant frontend routes

- `/dashboard/integrations/whatsapp`
- `/dashboard/integrations/notification-templates`
- `/dashboard/notifications`

## Relevant backend endpoints

Frontend work in this area usually touches one of these groups:

- WhatsApp integration endpoints under `Features/Integrations/Notifications`
- notification dispatch and retry endpoints under `Features/Notifications`
- inbound webhook processing under `Features/Webhooks/WhatsAppWebhookEndpoint.cs`

## Documentation rule

Keep this file focused on product boundaries and frontend behavior. Do not turn it into a copy of provider payload shapes or low-level Evolution API field mapping.
