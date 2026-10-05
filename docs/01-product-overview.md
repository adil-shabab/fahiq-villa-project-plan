# 01 — Product Overview

## Vision

Give a property owner who runs several buildings / PGs a **single operating system** for the
entire tenant lifecycle: list → market → enquire → onboard → bill → collect → maintain →
renew → move-out — with routine communication (bills, reminders, receipts, notices) fully
automated over WhatsApp.

## Problem it solves

Today this is run on WhatsApp chats, a notebook or spreadsheets, and manual UPI follow-ups:

- No single view of which rooms are vacant across properties.
- Rent and utility bills calculated by hand every month; reminders sent one by one.
- Electricity/water splits are error-prone and disputed.
- No tenant records, agreements or KYC in one place.
- Collections slip because follow-up is manual and inconsistent.
- Owner has no reliable numbers on occupancy, dues, or per-property profit.

## Goals

1. **Zero-effort billing cycle** — invoices auto-generate on the due day; WhatsApp reminders
   and payment links go out on a schedule; payments auto-reconcile.
2. **One source of truth** for properties, rooms, tenants, agreements, documents, money.
3. **Public storefront** so vacancies fill faster without depending only on brokers.
4. **Paperless onboarding** — application, KYC, agreement e-sign, inventory, move-in readings.
5. **Owner clarity** — occupancy %, expected vs collected rent, overdue aging, per-property P&L.

## Non-goals (v1)

- Multi-owner SaaS with self-serve signup and per-owner billing (kept as a later phase; the
  data model leaves room for it).
- Full accounting suite replacement (we integrate/export to Tally/Zoho instead).
- Short-stay / nightly booking engine (later phase).

## Personas

| Persona | Description | Primary needs |
|---|---|---|
| **Owner / Admin** | Runs the business, sees everything | Occupancy, cash position, per-property P&L, approvals |
| **Property Manager** | Day-to-day ops for assigned properties | Leads, onboarding, move-outs, tickets, meter readings |
| **Accountant** | Money in/out | Invoicing, reconciliation, expenses, payouts, reports |
| **Field / Maintenance staff** | On the ground | Assigned tickets, meter reading capture, inventory photos |
| **Prospective tenant** | Browsing the website | Find a room in budget/area, see photos & rules, enquire, book |
| **Tenant (onboarded)** | Living in a unit | See dues, pay, download receipts/agreement, raise complaints, notices |

## Core user journeys

1. **List a room** — Admin adds a property, then a unit (type, rent, deposit, amenities,
   photos), sets status *Available* and *available-from* date. It appears on the website.
2. **Enquiry → visit → conversion** — Visitor submits an enquiry form → lead created, auto
   WhatsApp ack → manager schedules a visit → after visit, converts the lead into a tenant
   onboarding.
3. **Onboarding** — Collect details + KYC → generate rental agreement → e-sign → record
   move-in inventory and meter readings → assign unit → unit becomes *Occupied* → welcome
   WhatsApp.
4. **Monthly billing** — On each tenancy's due day, system creates an invoice (rent +
   recurring charges), pulls the latest meter reading to compute electricity, adds carry-
   forward balance, sends invoice PDF + Razorpay link on WhatsApp.
5. **Collection** — Reminders on T-3, due day, T+1, T+3, T+7... Payment via UPI/link →
   webhook marks invoice paid → receipt auto-sent → reminders stop.
6. **Maintenance** — Tenant raises a ticket from the portal/WhatsApp → assigned to a
   vendor → status updates pushed to tenant → closed with a rating.
7. **Renewal / move-out** — 60/30-day expiry reminders → renew with new terms and re-sign,
   or process notice → final settlement (dues + damages − deposit) → refund → unit back to
   *Available*.

## Success metrics

- **Collection efficiency** (collected ÷ billed) per month — target ≥ 95% by day 10.
- **Average days-to-collect** after due date — trend down.
- **Average vacancy days** per unit turnover — trend down.
- **% invoices sent automatically** (no manual touch) — target 100%.
- **% onboardings fully digital** (agreement e-signed, KYC uploaded) — target ≥ 90%.
- **Occupancy %** across the portfolio.
- Manual hours/month spent on billing & reminders — target near zero.
