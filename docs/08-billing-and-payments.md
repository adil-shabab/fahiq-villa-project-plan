# 08 — Billing & Payments

## 8.1 Concepts

| Term | Meaning |
|---|---|
| **Charge type** | A kind of money owed: rent, electricity, water, maintenance, wifi, mess, parking, gas, late fee, damage, one-time, custom. |
| **Recurring charge** | A charge type + fixed amount attached to a tenancy, billed every period (e.g. Wi-Fi ₹500/mo). |
| **Billing period** | A calendar month, `YYYY-MM`. |
| **Invoice** | The immutable monthly (or ad-hoc) bill for one tenancy: line items + tax + carry-forward + total + due date. |
| **Ledger** | Append-only running account per tenancy (charges debit, payments credit). Balance = last running balance. |
| **Deposit ledger** | Separate account tracking security deposit collected / deducted / refunded. |
| **Carry-forward** | Prior unpaid balance rolled onto the new invoice as an opening line. |

## 8.2 Monthly billing run

`billing.run_daily_invoicing` — daily 06:00 IST. For each **active** tenancy whose
`due_day` matches today (optionally `due_day - lead_days`):

1. **Idempotency**: skip if an invoice already exists for `(tenancy, period)`.
2. **Rent line**: current `tenancy.rent` (post-escalation). Prorate if the tenancy started
   mid-period (`rent * days_active / days_in_month`).
3. **Recurring charges**: one line each (Wi-Fi, parking, maintenance, mess, …), prorated if
   applicable.
4. **Electricity line** — per `unit.electricity_billing_mode`:
   - `submeter`: find the `MeterReading` for this period. Amount =
     `(current − previous) × rate + fixed_charge`. If no reading exists → **do not bill
     electricity**, flag the invoice `electricity_pending=true`, and alert staff. A later
     reading generates a supplementary line/invoice.
   - `fixed`: `unit.electricity_fixed_amount`.
   - `shared`: parent property bill split across sibling units by `equal` / `headcount` /
     `ratio`.
5. **Water line** — analogous (`fixed` / `per head` / `metered`).
6. **Taxes**: if `Settings.tax_enabled`, apply `gst_rate` to taxable lines; produce a GST
   invoice format.
7. **Carry-forward**: if the tenancy has an unpaid balance from prior invoices, add an
   opening line "Previous balance" = that amount (or reference prior invoices without
   double-charging — configurable: carry-forward line vs. keep invoices independent and rely
   on the ledger). Default: **independent invoices**, ledger shows the aggregate; reminders
   reference each unpaid invoice.
8. Compute `subtotal`, `discount` (none by default), `tax`, `total`, `balance = total`.
9. Assign the next **invoice number** from the series (gap-free, per financial year,
   prefix from settings).
10. Render **branded PDF** (WeasyPrint) → store → attach.
11. Write `LedgerEntry` (charge, debit = total).
12. Set `status = issued`, queue notification (`invoice_issued` or itemized templates per
    `bill_delivery_mode`).

The run is guarded by a Redis lock; a manual `POST /billing/run` can (re)build a period for
one tenancy/property (won't duplicate).

## 8.3 Electricity billing detail

**Reading capture** — staff (or tenant, if `allow_tenant_meter_submission`) records
`previous_value` (auto-filled from last reading), `current_value`, `reading_date`, photo.
`units_consumed` and `amount` are derived and shown before save for confirmation.

**Rate config** — `Settings.electricity_rate_per_unit` + `electricity_fixed_charge`
(global default), overridable per unit. Optional **slab** support (P3):
`[{upto_units, rate}, …]` for tiered pricing.

**Shared meter** — one physical meter for several rooms:

```
parent_amount = (parent_current − parent_previous) × rate + fixed
per unit:
  equal      -> parent_amount / n_units
  headcount  -> parent_amount × occupants_in_unit / total_occupants
  ratio      -> parent_amount × unit.share_ratio / Σ share_ratio
```

Rounding: round each share to 2 dp; assign the rounding remainder to the largest share so
the split reconciles exactly to `parent_amount`.

**Disputes** — a `CreditNote` (type `correction`) adjusts a wrong electricity line; the
meter reading is corrected and re-linked; audit-logged.

## 8.4 Proration & mid-cycle events

| Event | Handling |
|---|---|
| Move-in on day 12 of a 30-day month | First invoice rent = `rent × 19/30` (days 12–30 inclusive per policy), recurring charges likewise; deposit billed in full on invoice 1. |
| Move-out on day 8 | Final invoice rent = `rent × 8/30`; final utilities from move-out readings; then settlement. |
| Rent change mid-month (rare) | Two rent lines split at the change date. |
| Transfer to another unit on day 20 | Old tenancy final invoice prorated to day 20; new tenancy invoice prorated from day 20; deposit carried. |

Proration basis (`actual/actual` vs `30/30`) is a documented policy setting; default
`actual days in month`.

## 8.5 Late fees

`billing.apply_late_fees` — daily 09:00 IST. For each issued invoice with `balance > 0` and
`today > due_date + grace_period_days`, if no late fee line yet for this invoice:

```
flat     -> late_fee_value
percent  -> balance × late_fee_value / 100
per_day  -> late_fee_value × (today − due_date − grace_period_days)
```

Capped at `late_fee_cap`. Adds a `late_fee` line to the invoice (invoice total & ledger
updated — the one permitted post-issue mutation, fully audited), queues `late_fee_applied`.
Waivable via `CreditNote` (type `waiver`) within the user's `waiver_limit` or with approval.

## 8.6 Payments

### Online (Razorpay)

- `POST /payments/link` creates a **Razorpay Payment Link** for an invoice (amount =
  `balance`), 10–15 day expiry, `notes = { invoice_id, tenancy_id }`, customer phone
  prefilled. The link URL is what goes into WhatsApp/email templates.
- Tenant pays via **UPI / card / netbanking / wallet**.
- **Webhook** `payment_link.paid` / `payment.captured`:
  1. Verify `X-Razorpay-Signature`.
  2. Dedupe on Razorpay event id (`WebhookEvent`).
  3. Create `Payment` (`status = success`, `gateway = razorpay`), `PaymentAllocation` to the
     invoice (and to older invoices if overpaid, oldest-first).
  4. Update invoice `amount_paid` / `balance` / `status`; write `LedgerEntry` (credit).
  5. Generate **receipt PDF**, queue `payment_received` (with receipt attached).
  6. Cancel any pending reminders for that invoice.

### UPI Autopay / e-mandate (P2)

- `POST /autopay/mandate` → Razorpay subscription/authorization link; tenant approves once.
- On the due day, Razorpay auto-charges; `subscription.charged` webhook books the payment
  exactly like above. `subscription.halted` / charge failure → `autopay_failed` template +
  fall back to normal reminder cadence.

### Offline

- `POST /payments/offline` — `{ amount, method: cash|cheque|bank_transfer, reference,
  proof_file, allocations[] }`. Created as `status = pending` unless the recorder is
  Accountant/Admin. `POST /payments/{id}/approve` confirms → same downstream
  (allocation, ledger, receipt, `payment_received`).

### Partial payments & allocation

- A payment may be less than the invoice balance → invoice `partially_paid`.
- Allocation order: **oldest invoice first**, then within an invoice by charge priority
  (rent → utilities → other → late fee) — configurable.
- Overpayment → credit on the ledger, auto-applied to the next invoice.

### Refunds & payouts

- Deposit refund at move-out: `POST /payments/{id}/refund` or a settlement action →
  **Razorpay Payout** to the tenant's UPI/bank, or manual with reference. Tracked on the
  **deposit ledger**; `deposit_refund_initiated` template sent.
- **Owner payouts** (P3): record transfers of collected funds to the owner, per property,
  for the P&L / cash position.

## 8.7 Ledgers & statements

**Tenant (rent) ledger** — append-only `LedgerEntry` rows:

| date | description | debit | credit | balance |
|---|---|---:|---:|---:|
| 2026-09-01 | Invoice INV-2026-0043 (Sep) | 16,462.00 | | 16,462.00 |
| 2026-09-04 | Payment UPI · RCPT-0091 | | 16,462.00 | 0.00 |
| 2026-10-01 | Invoice INV-2026-0061 (Oct) | 15,930.00 | | 15,930.00 |
| 2026-10-09 | Late fee (Oct) | 300.00 | | 16,230.00 |

- `GET /ledger/{tenancy}/statement.pdf` — date-ranged statement (also used for tenant HRA
  proof: itemized rent receipts).
- **Aging report**: for each unpaid invoice, bucket by `today − due_date` into
  `0–30 / 31–60 / 61–90 / 90+`; roll up per tenancy / property / portfolio.

**Deposit ledger** — `collected` on onboarding, `deduction` at move-out (damages, dues),
`refund` / `forfeit` on settlement. Never mixed with rent.

## 8.8 Move-out settlement

```
refund = deposit_held
       − outstanding_rent_ledger_balance
       − Σ inspection damage_deductions
       − other_deductions (cleaning, unpaid utilities from final readings)
       (floored at 0; if negative, tenant owes -> final invoice)
```

Produces a **settlement statement PDF** (itemized), sent via `moveout_settlement`; on tenant
acknowledgement, refund payout is initiated and the unit is released.

## 8.9 Reporting hooks

- **Collections dashboard**: `expected` = Σ issued invoice totals for the period;
  `collected` = Σ allocations dated in the period; `outstanding` = Σ balances;
  `efficiency` = collected ÷ expected.
- **Rent roll**: every unit with tenant, contracted rent, status, agreement window, deposit
  held.
- **Utility consumption**: units & ₹ per unit/property over time from `MeterReading`.
- **P&L (P3)**: income (allocations by charge type) − expenses (per property) → net, with
  occupancy and yield.

## 8.10 Edge cases & policies to confirm with the owner

- Carry-forward as a line vs independent invoices (default: independent).
- Proration basis: actual days vs 30-day (default: actual).
- Does electricity go on the main invoice or a separate bill/message? (`bill_delivery_mode`)
- Grace period length and late-fee formula & cap.
- Allocation priority order.
- Whether tenants can submit their own meter readings.
- GST registered? (turns on tax invoice format.)
- Security deposit: months held, non-refundable deductions (painting) fixed or actual.
- Token/advance amount for website bookings and hold duration.
