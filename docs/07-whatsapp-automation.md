# 07 — WhatsApp Automation

WhatsApp is the primary notification channel. Delivery is through a **BSP** (Business
Solution Provider) — AiSensy, Gupshup, Twilio, or Interakt — chosen by config and wrapped
in a single adapter so it can be swapped without touching domain code.

## 7.1 Why a BSP (vs Meta Cloud API directly)

| | BSP | Meta Cloud API direct |
|---|---|---|
| Setup speed | Fast (provider handles Meta onboarding) | Slower (own Business verification, WABA setup) |
| Template approval | Provider-assisted, dashboards | Self-managed |
| Pricing | Per message/conversation + provider fee | Meta conversation pricing only |
| Two-way + automation UI | Built-in | Build yourself |
| Lock-in | Provider APIs differ | Standard Graph API |

Decision: **BSP for v1**, behind an adapter. Migration to Cloud API later = new adapter +
re-register templates.

## 7.2 Adapter design

```
messaging/
  providers/
    base.py          # WhatsAppProvider protocol + dataclasses
    aisensy.py
    gupshup.py
    twilio_wa.py
    interakt.py
  registry.py        # event_code -> {provider_template_name, language, variable_order}
  router.py          # channel selection, quiet hours, opt-out, fallback
  tasks.py           # send_message, process_status_webhook, process_inbound
```

```python
@dataclass
class ProviderMessageResult:
    provider_message_id: str
    status: str            # queued | sent | rejected
    raw: dict

@dataclass
class DeliveryStatusEvent:
    provider_message_id: str
    status: str            # sent | delivered | read | failed
    error: str | None
    at: datetime

@dataclass
class InboundMessage:
    provider_message_id: str
    from_phone: str
    text: str | None
    media_url: str | None
    at: datetime

class WhatsAppProvider(Protocol):
    def send_template(self, *, to, template, language, variables, media_url=None) -> ProviderMessageResult: ...
    def parse_status_webhook(self, payload: dict) -> list[DeliveryStatusEvent]: ...
    def parse_inbound_webhook(self, payload: dict) -> list[InboundMessage]: ...
```

`settings.WHATSAPP_PROVIDER = "aisensy"` selects the concrete class. Credentials come from
`IntegrationCredentials` (encrypted).

## 7.3 Template catalogue

WhatsApp requires pre-approved templates for business-initiated messages. Each event maps to
one approved template. Keep variable **order** identical to what's registered on the BSP.

| Event code | Trigger | Variables (in order) | Phase | Attach |
|---|---|---|---|---|
| `enquiry_ack` | Website enquiry created | name, unit_title, area | P1 | — |
| `visit_reminder` | 2 h before a scheduled visit | name, unit_title, time, address, manager_phone | P2 | — |
| `visit_confirmed` | Visit scheduled | name, unit_title, date, time, address | P2 | — |
| `onboarding_welcome` | Tenancy activated | name, property, unit_code, rent, due_day, manager_phone, wifi | P1 | House-rules PDF |
| `agreement_ready` | Agreement generated, e-sign sent | name, sign_link, expiry | P2 | — |
| `agreement_signed_copy` | Agreement signed | name, property, unit_code | P2 | Signed PDF |
| `invoice_issued` | Monthly/ad-hoc invoice issued | name, month, amount, due_date, pay_link | P1 | Invoice PDF |
| `electricity_bill` | Electricity line billed (if sent separately) | name, month, units, rate, amount, pay_link | P1 | — |
| `water_bill` | Water line billed separately | name, month, amount, pay_link | P1 | — |
| `bill_generic` | Any other charge billed separately | name, charge_name, month, amount, pay_link | P1 | — |
| `rent_reminder_pre` | T-3 before due | name, month, amount, due_date, pay_link | P1 | — |
| `rent_due_today` | On due date | name, month, amount, pay_link | P1 | — |
| `rent_overdue_1` | T+1 | name, month, amount, pay_link | P1 | — |
| `rent_overdue_2` | T+3 | name, month, amount, days_overdue, pay_link | P2 | — |
| `rent_overdue_3` | T+7 | name, month, amount, days_overdue, late_fee_warning, pay_link | P2 | — |
| `rent_overdue_final` | T+15 | name, month, total_due, pay_link, manager_phone | P2 | — |
| `late_fee_applied` | Late fee added | name, month, late_fee, new_total, pay_link | P2 | — |
| `payment_received` | Payment success | name, amount, method, receipt_no, balance | P1 | Receipt PDF |
| `autopay_setup` | Mandate active | name, amount, debit_day | P2 | — |
| `autopay_failed` | Mandate debit failed | name, month, amount, pay_link | P2 | — |
| `agreement_expiry_60` / `_30` / `_7` | Renewal window | name, unit_code, end_date, manager_phone | P2 | — |
| `renewal_offer` | Renewal terms ready | name, new_rent, new_end_date, sign_link | P3 | — |
| `notice_ack` | Notice recorded | name, notice_date, vacate_date | P2 | — |
| `moveout_settlement` | Settlement finalized | name, dues, deductions, deposit, refund_amount | P2 | Statement PDF |
| `deposit_refund_initiated` | Refund payout created | name, amount, method, eta | P2 | — |
| `ticket_created` | Tenant/staff raises ticket | name, ticket_no, category | P2 | — |
| `ticket_status` | Ticket status change | name, ticket_no, status, note | P2 | — |
| `ticket_resolved` | Ticket resolved | name, ticket_no, rate_link | P2 | — |
| `preventive_notice` | Planned maintenance/outage | property, work, date, window | P2 | — |
| `announcement` | Admin broadcast | property, message | P2 | optional |
| `festival_greeting` | Manual/seasonal | name, message | P3 | optional |
| `meter_reading_request` | Ask tenant to submit reading | name, unit_code, submit_link | P2 | — |
| `otp_login` | Tenant portal login | code | P1 | — |

> If the owner prefers **one consolidated monthly invoice** message, only `invoice_issued`
> is used and the per-utility templates stay dormant. Config flag:
> `Settings.bill_delivery_mode = consolidated | itemized`.

## 7.4 Reminder cadence engine

`Settings.reminder_cadence` (editable in the dashboard, P2) is a list:

```json
[
  { "offset_days": -3, "event": "rent_reminder_pre",   "channel": "whatsapp" },
  { "offset_days":  0, "event": "rent_due_today",       "channel": "whatsapp" },
  { "offset_days":  1, "event": "rent_overdue_1",       "channel": "whatsapp" },
  { "offset_days":  3, "event": "rent_overdue_2",       "channel": "whatsapp" },
  { "offset_days":  7, "event": "rent_overdue_3",       "channel": "whatsapp" },
  { "offset_days": 15, "event": "rent_overdue_final",   "channel": "whatsapp", "also": ["sms"] }
]
```

`collections.run_reminders` (daily 08:00 IST):

```
for invoice in issued invoices where balance > 0 and tenancy.billing_status == active:
    days = today - invoice.due_date
    rule = cadence entry where offset_days == days
    if not rule: continue
    if already sent ReminderLog(invoice, rule.offset): continue          # idempotent
    if tenant.opted_out(whatsapp): result = skipped_optout
    elif now within quiet_hours: defer to next window
    elif promise_to_pay exists and promised_date >= today: result = skipped_promise
    else: enqueue messaging.send_message(event=rule.event, tenancy, variables, attach?)
    write ReminderLog(...)
```

Stops automatically when `balance == 0` (payment webhook flips status). Escalating tone is
just different templates. Manager gets a staff alert at `rent_overdue_final`.

## 7.5 Two-way messaging (P2)

Inbound webhook → `InboundMessage`, matched to a `Tenant`/`Lead` by phone.

Keyword auto-replies (case-insensitive, first word):

| Keyword | Action |
|---|---|
| `BALANCE` / `DUE` | Reply with current outstanding + `pay_link` |
| `PAY` | Reply with a fresh payment link for the oldest unpaid invoice |
| `RECEIPT` | Reply with the last receipt PDF |
| `STATEMENT` | Reply with ledger statement PDF |
| `TICKET <text>` | Create a maintenance ticket from the text, reply with ticket no. |
| `STOP` / `UNSUBSCRIBE` | Set opt-out; confirm |
| `START` | Clear opt-out |
| `HELP` / anything else | Send help text + route to staff inbox (unhandled queue) |

Everything not auto-handled appears in **Inbox** in the dashboard for staff to reply
(within the 24-hour session window a free-form reply is allowed; outside it, only a
template).

## 7.6 Delivery tracking & fallback

- Every send writes a `MessageLog` (`queued → sent → delivered → read` / `failed`).
- Status webhook updates it; `read` receipts recorded when the BSP supports them.
- `messaging.retry_failed` (every 15 min): retry `failed` up to 3× with backoff; after that,
  if the event has a fallback channel (`also` / template default), send via **SMS** then
  **email**.
- Per-message **cost** captured from the BSP for the cost report.

## 7.7 Compliance & guardrails

- **Opt-in**: capture consent at onboarding (checkbox + logged). Only message opted-in
  tenants; prospects get a one-time enquiry ack (legitimate response to their request).
- **Opt-out** always honoured (`STOP`); stored per tenant per channel.
- **Quiet hours**: default 21:00–08:00 IST; no non-critical sends; queued for morning.
- **Rate limiting**: respect BSP throughput; broadcast jobs throttled.
- **Template discipline**: no free-form business-initiated messages; all business-initiated
  content goes through approved templates. Utility vs marketing category chosen correctly
  (bills/reminders = utility; festival greetings/offers = marketing, and marketing respects
  opt-out strictly).
- **PII**: payment links are per-invoice and expire; no sensitive IDs in message bodies.
- **DPDP Act**: consent record, purpose limitation, opt-out, retention policy on message
  logs (e.g. purge bodies after 18 months, keep metadata).

## 7.8 Testing

- Provider adapters have contract tests against recorded fixtures for each BSP.
- A `console` provider (logs instead of sends) for local/dev and CI.
- Staging uses the BSP sandbox / a whitelisted test number.
- `POST /messages/test` sends any event to a chosen number for template QA.
- Simulated webhook payloads for delivery + inbound in the test suite.
