# Pagit App — UI kit

Recreation of the dashboard at `dash.pagit.com.br`. Sourced from
`propeller-dev/pagit/frontend` (Next.js 15 + shadcn/ui + Tabler Icons).

## Files

| File | What |
|---|---|
| `index.html` | Click-through dashboard. Sidebar navigates between screens. |
| `components/Primitives.jsx` | `ShadButton`, `ShadCard`, `ShadInput`, `ChargeStatusBadge`, `Situation` + the Tabler icon subset used by the app. |
| `components/Layout.jsx` | `Sidebar` (tenant switcher slot + grouped nav + plan card + user dropdown), `TopBar` (sidebar trigger + breadcrumbs + locale/theme switchers). |
| `components/Screens.jsx` | `OverviewScreen` (KPI grid + bar chart + recent activity), `ChargesScreen` (filterable table), `CustomersScreen` (card grid), `NewChargeScreen` (full form). |

## Design notes

- **Width:** 1440px design. The dashboard layout has a 256px sidebar +
  fluid main, sized to fit a standard laptop.
- **Status colours** are intentionally **more saturated** than the
  marketing emerald — they need to read at table density. See
  `ChargeStatusBadge.tsx` in source: paid=`green-600`, pending=`yellow-500`,
  pending-review=`orange-500`, failed=`destructive`, canceled=`slate`.
- **Sidebar grouping** mirrors `app-sidebar.tsx`: Overview · Management ·
  Billing · Settings, with a sticky footer (plan card + user dropdown).
- **The sidebar logo header** shows the square symbol + wordmark side by
  side; when collapsed (production behaviour, not exposed here), only the
  symbol stays.
- **KPI tile pattern** uses a 36px rounded tinted icon chip + ink/900
  title + 36px Unbounded tabular-num value. Each KPI has its own tint pair
  — violet, blue, amber, emerald — matching `overview.tsx`.
- **Charges table** uses the situation column (coloured dot + relative
  date) **and** a separate status badge column. They communicate
  different facts: situation = where the customer is in the lifecycle
  (overdue / today / upcoming / paid); status = what the system thinks
  (pending / pending-review / paid / failed).
- **New charge form** uses the radio-card pattern for type selection
  (recurrent / installments / one-time). The active card switches border
  + fill to brand emerald.

## What's NOT in this kit

- The full `charge-detail-view` (72kB) and `charge-form` (46kB) — both
  ship a lot of business logic. We surface their visual vocabulary in
  the new-charge stub.
- The KBar command palette, the onboarding banner, the payment-setup
  banner — all real but not central to the visual system.
- Dark mode. The shadcn theme has it; we ship the light surface only.
- Recharts — the bar graph is a hand-rolled minimal version, since
  Recharts in production renders with the same emerald gradient bars.

## On icons

The dashboard uses **Tabler Icons** (`@tabler/icons-react`) — a deliberate
break from the marketing duotone set. We approximate the most-used
Tabler icons inline in `Primitives.jsx` rather than pulling the full
package. For a production mock you can swap to
`https://unpkg.com/@tabler/icons@latest` and call the real icons.
