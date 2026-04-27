# UX & UI Design Guidelines

This document outlines the standard user experience and interface design patterns used across the Pagit frontend application, ensuring consistency, responsiveness, and a premium feel.

## 1. Responsiveness & Breakpoints

We use Tailwind CSS's default breakpoints to manage responsive layouts.

### Main Breakpoints

- **`sm` (640px)**: Mobile landscape / small tablets.
- **`md` (768px)**: Tablets (e.g., iPad portrait).
- **`lg` (1024px)**: Laptops / large tablets. _Primary breakpoint for switching from stacked to side-by-side complex layouts._
- **`xl` (1280px)**: Desktop monitors. _Primary breakpoint for constraining maximum widths._
- **`2xl` (1536px)**: Ultra-wide / 4K monitors.

### Layout Constraints

To prevent content from stretching uncomfortably on large monitors, we constrain main content areas and complex forms:

- **Standard Forms**: Use `max-w-2xl` for simple, single-column forms (e.g., sign-in, basic profile edits).
- **Complex/Two-Column Forms**: Use a responsive wrapper that fills the container up to the `xl` breakpoint, then constrains and centers the content to prevent infinite stretching.
  - _Implementation Pattern_: `<div className="w-full space-y-8 xl:mx-auto xl:max-w-5xl">`

## 2. Form Layouts

We follow a structured, card-based approach for forms to improve readability and group related information.

### Two-Column Sectioned Forms

For complex entities (like Customers or Settings), use a two-column layout consisting of descriptive sections and accompanying form cards.

- **Mobile to Tablet (`< lg`)**: The section title and description stack vertically **on top** of the form card.
- **Laptop and Desktop (`>= lg`)**: The section title and description sit in a fixed-width column on the left, while the form card takes up the remaining flexible space on the right.

### Example Implementation

```tsx
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
  {/* Left Column: Description */}
  <div className="lg:w-[280px] shrink-0 space-y-1 text-left">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>

  {/* Right Column: Form Card */}
  <Card className="flex-1">
    <CardContent className="p-6 space-y-6">{/* Form Fields */}</CardContent>
  </Card>
</div>
```

## 3. Cards

- We use the customized `Card` component from our Shadcn UI implementation.
- **Padding**: By default, our `Card` component does _not_ enforce vertical padding (`py`). Use `CardContent` with specific padding classes (e.g., `p-6`) to manage internal spacing.

## 4. Components

### FormCheckboxGroup

- Use `FormCheckboxGroup` for selecting multiple options.
- **Badges**: By default, it displays selected items as badges below the checkboxes. If this is visually redundant or clutters the UI (e.g., in notification settings), disable them by passing the `showBadges={false}` prop.

## 5. Global Styles & Theme

- **Primary Color**: Ensure interactive elements like primary buttons use the global CSS variable for primary colors (e.g., `bg-primary`). Avoid overriding this with context-specific themes (like `theme-default` classes on the body) unless explicitly building a theme switcher feature, to ensure the UI remains consistent with the brand guidelines.

## 6. Payment Proof Review Patterns

For `Pending Reviews` and `Review Receipt` flows, use a review-first layout focused on fast operator decisions:

- **Queue Page**: Keep a top summary block (total pending, due today, overdue) followed by a focused table with customer, proof file, due urgency, and review action.
- **Detail Page**: Use a two-column layout with charge context + AI validation on the left and proof preview + metadata on the right.
- **Primary Actions**: Keep `Approve` and `Reject` visible in the header area of the detail screen so reviewers can decide without scrolling to the bottom.
- **Underpayment Friction**: When the extracted amount is lower than the charge amount, surface a prominent warning and require an explicit confirmation before approving the proof. The UI should make it clear that approval will settle the full charge.

## 7. Subscription Operations Screens

For tenant-facing recurring billing operations, prefer a clear relationship-first layout:

- **Subscription Listing**: Show customer, plan, next billing date, and lifecycle status in a compact operational table. This screen is for diagnosis and navigation, not analytics.
- **Subscription Detail**: Split the screen into:
  - a relationship section (`customer` + `plan`)
  - a billing timeline section (`created`, `start`, `trial end`, `next billing`, gateway reference)
  - a gateway fee disclosure block with the currently supported payment methods and a short disclaimer when values come from public provider pricing instead of a custom contract
  - a linked charges section with direct navigation to each charge
- **Upcoming Renewal Preview**: Tenant billing screens may show an informational preview of the next automatic renewal using current plan price plus `NextBillingDate`, but this preview must stay clearly distinct from a real persisted charge. It should disappear when cancellation is already scheduled for period end.
- **Scheduled Cancellation**: When a gateway subscription is canceled at period end, show it as a distinct scheduled-cancellation state. Keep the next billing/access-end date visible, explain that access remains active until that date, and avoid reusing the same copy or emphasis as an already terminated subscription.
- **Stripe Payment Setup Shell Banner**: The dashboard shell banner for Stripe setup should be driven by `/api/integrations/payments/providers/stripe/status`, not by payment-method readiness summaries. Show it whenever a tenant already has plan access but Stripe still reports one of these account states: no account started, account pending (`chargesEnabled=false` or otherwise not ready), or action required.
- **Gateway Detail Pages**: On `/dashboard/payments/credit-card`, `/dashboard/payments/boleto`, and `/dashboard/payments/pix`, keep the fee cards informational only. Do not show outbound pricing links or the public-pricing disclaimer copy on these detail screens.
- **Cross-links**: Whenever a charge belongs to a subscription, expose a direct link from the charge detail screen to the related subscription.

## 8. Charge Listing Screens

For `/dashboard/charges` and any embedded reuse of the shared charge table:

- Keep the default table compact enough to avoid unnecessary horizontal scrolling.
- When multiple timeline fields exist, prefer a single default-visible date column (`payment date`) and leave secondary dates (`created at`, `due date`) available through the column visibility menu.
- Keep optional timeline columns at the end of the table so the primary operational fields remain stable.

## 9. PIX Settings and Manual Billing Forms

For tenant-facing PIX setup and manual billing screens:

- Treat saved PIX keys as an organization-owned catalog, not as a provider-only credential field.
- The PIX settings screen should support:
  - a single repeated input pattern for each saved key instead of separate fields per type
  - automatic key-type inference from the typed value (`CPF/CNPJ`, `Phone`, `Email`, `Random`)
  - local pre-save validation for uniqueness and the fixed-type limit before submitting to the API
  - use the raw PIX key value as the identifier in operational selectors and cards
  - one explicit primary/default action directly on each saved key row
- Manual charge forms should require selecting one saved tenant PIX key for the charge.
- For manual PIX charges, prefer a default-first chooser that shows the organization default key inline and reveals alternative saved keys in a compact list only when the operator asks to change it. Avoid long dropdown labels for this flow.
- The tenant default PIX key may be preselected to reduce clicks, but the form contract should still submit the explicit chosen key id.
- Provider setup flows that create or bind provider-side receiving accounts must not infer their target account from the organization default PIX key alone. When the provider keeps balance or payout state, expose an explicit linked PIX key selection in the provider card and explain that changing the organization default later does not retarget that provider.
- Manual recurring plan forms should expose the saved PIX key selector directly on the plan. Do not push this choice down to the customer form.

## 10. Charge-Flow Onboarding and Contextual UI

For tenant-facing payment onboarding and charge creation screens:

- Treat onboarding as activation guidance, not as a page tour. The primary onboarding entry is a dedicated fullscreen flow under `/dashboard/onboarding`.
- The onboarding flow should always include:
  - the plan-activation prerequisite when the tenant still has no active access
  - a clear explanation of manual and automatic billing paths
  - a visual preview of the end-customer journey
  - a short start summary that leads into real setup tasks
- The visual flow preview should use a diagram component that responds to the available container width across mobile, tablet, and desktop. Avoid hand-crafted raw SVG layouts for the main onboarding journey, because they are harder to keep aligned and legible across breakpoints.
- Keep a persistent checklist in the dashboard shell while the initial setup is incomplete. Checklist steps must be derived from real tenant state, not from client-only completion flags.
- That checklist should be unified. Do not branch the shell checklist based on a saved billing-mode preference.
- For tenants without an active plan, make plan activation the first suggested checklist step. This should block onboarding progress, not dashboard navigation.
- In that checklist, completed steps should be visually obvious at a glance. Use stronger contrast, a clear completion badge, and a distinct completed-state marker instead of relying on subtle background tint alone.
- Incomplete setup items should look unfinished at a glance. Prefer amber/orange pending styling over neutral cards that can be mistaken for completed states.
- Completing the fullscreen onboarding should clear any temporary dismissal state from the checklist banner so the first dashboard visit still shows the next setup steps.
- Components that derive checklist dismissal from browser storage must re-read that state on route changes inside the dashboard shell. The onboarding flow and the dashboard share the same shell, so a value read only on first mount can get stale and split the header reminder from the main banner.
- When the checklist banner is dismissed, the header reminder should use clear onboarding language and reopen the banner in place. Do not label that reminder with a vague flow name alone.
- Do not render checklist progress from placeholder snapshot data. Wait for the real checklist fetch to settle before deciding whether all steps are pending or complete, otherwise previously configured tenants will briefly see a false "everything pending" state.
- Checklist state changes caused by real setup actions should revalidate immediately. Do not depend on route refreshes or cache expiry to advance the suggested next step.
- The shell onboarding visibility should follow the backend user flag (`user.onboardingCompleted`). Use browser storage only for temporary dismissal while onboarding is still in progress, not as the final source of truth for completion.
- Treat the onboarding `plan` step as complete only when the tenant has a real contracted plan state (`Pending`, `Trial`, or `Active`). Grace/canceled access can keep the tenant temporarily usable, but it should not mark the onboarding plan step as done.
- WhatsApp connection and automatic payment integrations are optional checklist steps. They can appear in the shell guidance, but they must not block the required setup progression.
- When all required setup steps are complete and only optional steps remain, replace the normal "next step" treatment with a completion state that celebrates the milestone and points clearly to the first pending optional setup for later continuation.
- In that optional end state, offer an explicit "finish onboarding" action that updates the backend completion flag and hides the shell onboarding guidance. Do not keep the header reminder prompting the user to continue an optional step as if it were still required.
- Treat that global checklist as the primary onboarding guidance. Avoid stacking large contextual onboarding banners inside payment detail pages and setup screens, because they compete with the shell-level checklist and overload the page.
- When a Stripe payout account already exists but remains pending or requires more information, surface that as a shell-level status banner with the same visual family as the onboarding shell banner. This is operationally important and should not depend on the user opening the payment detail screen to notice it.
- Global shell banners should look like shell context, not page content. Prefer a full-bleed tinted band in the shell instead of a second nested card with extra outer padding.
- When that shell onboarding banner is visible, the dashboard top bar should share the same tonal surface and avoid a separator line between the header and the banner so the shell reads as one contextual block.
- On mobile, large shell banners should support a collapsed compact state. When collapsed, keep it as a full-width sticky shell band that shares the same surface as the expanded shell banner instead of rendering a second floating card inside it. Avoid horizontal step-chip scrollers in that mobile-collapsed state; keep only the compact summary and actions there.
- Keep the dashboard top bar compact. Favor a shorter shell header over pushing more vertical space into repeated navbar chrome.
- When a payment screen serves both manual and automatic flows, explain that mixed purpose in the page description or section copy instead of adding another onboarding-style banner on top of the content.
- On mixed PIX screens, keep automatic-flow explainers close to the provider section and make them compact. Do not place a large automatic-only explainer above the tenant PIX-key area, because that area also supports the manual flow.
- When the tenant has zero required onboarding progress (`0/4` in the current flow) and has not completed onboarding, redirect dashboard navigation to the fullscreen onboarding experience before letting them continue through the app. Skip that redirect only for the fullscreen onboarding route itself and the billing activation route inside the flow.
- Rate-limit that first-run fullscreen redirect with a short browser cooldown. If the tenant has already seen the fullscreen onboarding recently, prefer sending `/dashboard` to the normal overview and keep guidance in the shell banner instead. The current cooldown is 2 days and should stay client-side only.
- The fullscreen onboarding route should visually bypass the dashboard shell. Use a fixed fullscreen overlay layout for `/dashboard/onboarding`, matching the focused treatment used by billing activation.
- Treat that fullscreen onboarding as a compact primer for how the platform flow works, not as the place where onboarding is fully completed. After the user leaves it, the shell checklist should continue guiding the real setup work.
- Keep the fullscreen onboarding surface mostly neutral. Use warm or amber tones as accents for selected states and emphasis, not as the dominant page background.
- Keep that fullscreen primer non-scrollable at the page level on desktop-sized viewports, but allow normal vertical scrolling on small mobile screens. Use the available width without outer shell padding, keep the main CTA near the top controls, and avoid detached footer rows or a darker nested card surface around the whole experience.
- In that fullscreen primer, keep the selection between manual and automatic charging visually prominent. Prefer two clear selectable cards over a subtle segmented control.
- On larger screens, prefer the lane-based diagram layout so the platform, operator, and customer flow stay readable at a glance.
- Do not repeat shell checklist cards inside the fullscreen primer. That route should explain the charging model first; the shell banner can handle setup progress afterward.
- Instruction cards on payment detail pages should only render while the related setup is still incomplete. Once the provider or method is active, keep the page focused on operational data instead of repeating the setup walkthrough.
- When payment setup guidance appears inside a detail page, prefer a compact tinted setup block with short numbered steps over a large neutral card. It should read as temporary setup context, not as the main content surface.
- WhatsApp onboarding previews should mirror the real connection flow: create the tenant instance, show the QR code from Evolution API, and only then show the connected state and message preview.
- The onboarding should explain both billing paths, but the operational UI should stay stable after onboarding. Do not re-order major payment surfaces or hide controls based on a saved "main billing mode".
- Automatic payment detail pages should explain setup expectations in plain language. For card/boleto flows, clarify when the user may need to create a connected payout account and provide identity/bank details. For automatic PIX flows, clarify which PIX key is linked, whether the integration keeps a separate balance, and where confirmation/withdraw behavior happens.
