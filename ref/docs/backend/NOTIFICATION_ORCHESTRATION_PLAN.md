# Notification Orchestration

This file keeps the historical filename, but its content now documents the current notification architecture instead of an implementation rollout plan.

## Purpose

Pagit splits notification work into planning, queueing, and delivery so that external sends do not happen directly inside persistence or domain-event publication.

## Current model

The main pieces are:

- domain events and feature actions that decide a notification should happen
- `IChargeNotificationPlanBuilder` for reminder scheduling logic
- `INotificationTriggerService` for customer-targeted validation and notification persistence
- `NotificationDeliveryWorker` for durable async polling and claim
- `NotificationDeliveryProcessor` for freshness checks plus `Sent` / `Failed` / `Skipped` / retry state updates
- `INotificationDispatcher` for channel-specific rendering and provider delivery only
- `Notification` rows for schedule, retry, lock, and history state

## Targets and contexts

Current targets:

- customer
- tenant owner

Current contexts:

- charge
- subscription

The runtime split is intentionally narrower than the storage model:

- customer notifications go through `INotificationTriggerService`
- tenant-owner notifications are automation-only email alerts queued explicitly by charge and subscription status handlers
- both targets still persist normal `Notification` rows, so history and retry remain unified

Subscription lifecycle notifications intentionally distinguish between:

- cancellation scheduled at period end
- cancellation finalized

The current customer-facing automatic event only exists for finalized cancellation. Scheduling `cancel_at_period_end` locally must not enqueue `SubscriptionCanceled`, otherwise the timeline shows "subscription canceled" before Stripe actually ends the subscription.

Charge lifecycle planning also distinguishes between recurring charge types:

- manual recurrence still uses charge-level notification planning because the generated charge is an action item for the customer
- gateway-managed recurrence skips charge-level automatic notifications and relies on subscription lifecycle notifications instead, to avoid duplicate or misleading emails like "charge created" or "due today" for an automatic renewal
- when a new charge is created with a due date that is already "today" in the tenant timezone, automatic planning suppresses `ChargeDueToday` for any channel that is already receiving `ChargeCreated`, so the customer does not get two immediate messages for the same new charge
- the charge planner now evaluates that suppression and its schedule timestamps from one shared `utcNow` snapshot per build, so "due today" does not drift when the process crosses a timezone boundary mid-planning or when tests run near UTC date changes

## Customer trigger flow

The trigger service accepts a normalized request:

- target
- context
- optional channel override
- optional process-after timestamp
- source (`Manual` or `Automation`)

It validates:

- tenant ownership and access
- target/context consistency
- allowed channels
- event compatibility with current state

When valid, it routes into one of two customer planning paths:

- customer charge
- customer subscription

Each path validates its current context and creates one or more persisted notification rows.

Tenant-owner alerts do not use this generic trigger contract. They are queued explicitly from:

- `ChargeStatusChangedEventHandler` for `ChargePendingReview`
- `SubscriptionStatusChangedEventHandler` for `SubscriptionPastDue` and `SubscriptionFailed`

Those alerts are always `TargetType=TenantOwner`, `Channel=Email`, `Source=Automation`.

## Delivery flow

Dispatch execution is asynchronous.

1. `NotificationDeliveryWorker` polls due `Notification` rows
2. the worker atomically claims each row by updating lock and attempt metadata
3. `NotificationDeliveryProcessor` loads current state fresh from the database
4. eligibility is rechecked
5. `INotificationDispatcher` renders and sends the persisted notification
6. `NotificationDeliveryProcessor` updates the row to `Sent`, `Failed`, `Skipped`, or a bounded retry schedule

## Channel semantics

Channel resolution uses intersection semantics:

- `null` channel means all eligible channels
- an explicit channel means only that channel if it is eligible

For customer notifications, behavior differs by source:

- manual requests fail clearly when the requested channel is invalid or unavailable
- automation may skip unsupported combinations when that is the safer outcome

Tenant-owner alerts do not participate in channel selection. They are always email-only.

## Persistence model

`Notification` is the schedule/history record.

The entity stores:

- target type
- context type
- optional recipient user reference for historical rows
- event type
- charge or subscription reference
- channel
- status
- scheduling and delivery timestamps
- attempt and lock metadata used by the worker
- failure reason when relevant

This keeps history and retry context together without introducing a second generic delivery ledger.

## Manual send and retry

Manual charge-notification sends use:

- `POST /api/notifications/dispatches`

Retry of failed notification records uses:

- `POST /api/notifications/{notificationId}/retry`

Manual sends only support the customer trigger flow. Retry works for both customer and tenant-owner rows because delivery still resolves against the persisted `Notification`.

## Planning vs dispatch

Planning and delivery stay separate on purpose.

- planning decides which reminders or events should exist
- trigger validation creates normalized persisted notification work
- dispatch performs provider delivery against current data and does not create or reuse notification rows

This prevents reminder logic, channel policy, and provider I/O from collapsing into one service.

## Source-of-truth files

Use these files for implementation details:

- `backend/src/Pagit.Api/Application/Notifications/NotificationTriggerService.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationEventApplicability.cs`
- `backend/src/Pagit.Api/Application/Notifications/ChargeNotificationPlanBuilder.cs`
- `backend/src/Pagit.Api/Infrastructure/Notifications/NotificationDeliveryWorker.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDeliveryProcessor.cs`
- `backend/src/Pagit.Api/Application/Notifications/NotificationDispatcher.cs`
- `backend/src/Pagit.Api/Features/Notifications/*`
