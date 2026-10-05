# 05 — Data Model

Conceptual model. Field lists are representative, not exhaustive. All tables carry
`id (uuid)`, `created_at`, `updated_at`; money is `Decimal(12,2)` INR; most business tables
carry `organization_id` (single org in v1, but namespaced for a future SaaS).

## 5.1 Entity-relationship overview

```
Organization 1─┬─* User(staff) ─* PropertyAssignment *─ Property
               │
               ├─* Property 1─* Block 1─* Floor 1─* Unit 1─* Bed
               │                                     │
               │                                     ├─* MediaAsset
               │                                     ├─* UnitAmenity *─ Amenity
               │                                     └─* Meter 1─* MeterReading
               │
               ├─* Lead 1─* LeadActivity
               │       └─1 VisitSchedule
               │
               ├─* Tenant 1─* TenantDocument (KYC)
               │        └─* CoTenant / Guarantor
               │
               ├─* Tenancy ──1 Unit / Bed
               │        ├─1 RentalAgreement ─* AgreementVersion
               │        ├─* RecurringCharge ─ ChargeType
               │        ├─* Inspection (move-in / move-out) ─* InspectionItem
               │        ├─* Invoice 1─* InvoiceLineItem
               │        │        └─* Payment ─* PaymentAllocation
               │        │        └─* CreditNote
               │        ├─* LedgerEntry        (rent account, append-only)
               │        ├─* DepositLedgerEntry (deposit account, append-only)
               │        ├─* ReminderLog
               │        └─1 MoveOutSettlement
               │
               ├─* MaintenanceTicket ─* TicketComment / TicketAttachment ─ Vendor
               ├─* PreventiveMaintenance ─* PreventiveTask
               ├─* Asset (appliance register) ─ Unit
               │
               ├─* Expense ─ ExpenseCategory / Vendor / Property
               ├─* OwnerPayout ─ Property
               │
               ├─* NotificationTemplate
               ├─* MessageLog (whatsapp/sms/email, delivery status)
               ├─* InboundMessage
               ├─* Broadcast ─* BroadcastRecipient
               ├─* Announcement
               │
               ├─* Document (vault: polymorphic owner)
               ├─* AuditLog
               ├─* ChangeRequest (approvals)
               ├─* Review (property rating by verified tenant)
               └─1 Settings / IntegrationCredentials
```

## 5.2 Core tables

### Organization & access

**Organization** — `legal_name`, `display_name`, `address`, `gstin?`, `pan?`, `logo`,
`brand_color`, `contact_email`, `contact_phone`, `timezone` (`Asia/Kolkata`),
`currency` (`INR`), `financial_year_start_month` (4).

**Settings** — `default_due_day`, `grace_period_days`, `late_fee_type`
(`none|flat|percent|per_day`), `late_fee_value`, `late_fee_cap`, `invoice_prefix`,
`invoice_next_number`, `reminder_cadence` (JSON), `quiet_hours_start/end`,
`electricity_rate_per_unit`, `electricity_fixed_charge`, `water_charge_default`,
`allow_tenant_meter_submission` (bool), `tax_enabled` (bool), `gst_rate`.

**IntegrationCredentials** (encrypted) — `whatsapp_provider`, `whatsapp_api_key`,
`whatsapp_phone_id`, `razorpay_key_id`, `razorpay_key_secret`, `razorpay_webhook_secret`,
`sms_provider`+keys, `email_*`, `esign_provider`+keys, `maps_api_key`, `storage_*`,
`sentry_dsn`.

**User** (staff) — `email`, `password`, `name`, `phone`, `role`
(`owner|manager|accountant|field|frontdesk|readonly`), `is_active`, `totp_secret?`,
`waiver_limit`, `discount_limit`, `last_login`.

**PropertyAssignment** — `user`, `property`. (Owner/Admin implicitly all.)

### Property & inventory

**Property** — `name`, `type` (`apartment|independent_house|pg|hostel|commercial`),
`address_line1/2`, `locality`, `city`, `state`, `pincode`, `latitude`, `longitude`,
`description`, `cover_image`, `amenities` (M2M via `PropertyAmenity`), `rules` (JSON:
gate_time, guests_policy…), `nearby` (JSON list of {label, category, distance_km}),
`is_listed`.

**Block** — `property`, `name`. **Floor** — `block`, `number`, `label`.

**Unit** — `property`, `block?`, `floor?`, `code` (e.g. "A-101"), `name?`,
`unit_type` (`1rk|studio|1bhk|2bhk|3bhk|4bhk_plus|pg_bed|commercial`),
`sharing_type?` (`single|double|triple|dormitory` — PG only),
`furnishing` (`unfurnished|semi|full`), `area_sqft`, `facing`, `bathroom` (`attached|common`),
`balcony` (bool),
`rent`, `deposit`, `maintenance_charge`, `lock_in_months`, `notice_period_days`,
`escalation_percent`, `due_day`,
`status` (`available|booked|occupied|notice|maintenance|blocked`),
`available_from` (date), `allowed_tenant_types` (array), `food_pref` (`veg|nonveg|any`),
`pets_allowed`, `smoking_allowed`,
`electricity_billing_mode` (`submeter|fixed|shared`), `electricity_fixed_amount?`,
`electricity_share_basis?` (`equal|headcount|ratio`), `electricity_share_ratio?`,
`water_billing_mode`, `is_listed`, `listing_title`, `listing_description`, `slug`.

**Bed** — `unit`, `label`, `rent`, `status`, `available_from`. (PG only.)

**Amenity** — `name`, `category`, `icon`. **UnitAmenity** — `unit`, `amenity`.
**PropertyAmenity** — `property`, `amenity`.

**MediaAsset** — `owner_type` (`property|unit|bed`), `owner_id`, `kind` (`image|video|floorplan|tour`),
`file`, `caption`, `order`, `is_cover`.

**Meter** — `unit`, `type` (`electricity|water|gas`), `identifier`, `unit_of_measure`,
`is_submeter`.

**MeterReading** — `meter`, `reading_date`, `previous_value`, `current_value`,
`units_consumed` (derived), `rate_applied`, `fixed_charge_applied`, `amount` (derived),
`photo`, `entered_by`, `source` (`staff|tenant|iot`), `billed_in_invoice?`.

### Leads

**Lead** — `name`, `phone`, `email?`, `source`
(`website_enquiry|website_booking|whatsapp|call|walkin|broker|referral|marketplace`),
`interested_units` (M2M), `interested_property?`, `budget_min`, `budget_max`,
`move_in_date?`, `tenant_type?`, `stage`
(`new|contacted|visit_scheduled|visited|negotiating|won|lost`), `lost_reason?`,
`assigned_to?`, `follow_up_at?`, `advance_paid` (bool), `converted_tenancy?`.

**LeadActivity** — `lead`, `type` (`note|call|status_change|message|visit`), `body`,
`by`, `at`.

**VisitSchedule** — `lead`, `unit?`, `scheduled_for`, `staff?`, `status`
(`scheduled|done|no_show|cancelled`), `outcome_note`.

### Tenants & tenancies

**Tenant** — `name`, `phone` (unique per org), `email?`, `dob?`, `gender?`,
`current_address`, `permanent_address`, `occupation` (`working|student|business`),
`company_or_college?`, `income_band?`, `emergency_contact_name`, `emergency_contact_phone`,
`vehicle` (JSON list), `photo?`, `kyc_status` (`pending|partial|verified`),
`is_blacklisted`, `blacklist_reason?`, `portal_user?`.

**TenantDocument** — `tenant`, `doc_type` (`aadhaar|pan|dl|passport|photo|other`),
`file`, `number_masked`, `status` (`pending|verified|rejected`), `verified_by?`, `note?`,
`expires_at?`.

**CoTenant** — `tenancy`, `tenant`. **Guarantor** — `tenancy`, `name`, `phone`,
`relation`, `documents` (M2M TenantDocument-like).

**Tenancy** — `unit` (or `bed`), `primary_tenant`, `co_tenants` (M2M),
`start_date`, `end_date`, `rent`, `deposit`, `maintenance_charge`, `lock_in_months`,
`notice_period_days`, `escalation_percent`, `escalation_last_applied_on?`,
`due_day`, `utilities_included` (array), `parking_included` (bool),
`billing_status` (`active|paused|ended`),
`status` (`onboarding|active|notice|ended|transferred`),
`notice_given_on?`, `notice_by?` (`tenant|owner`), `computed_vacate_date?`,
`autopay_mandate?` (Razorpay token ref), `opening_balance`.

**RentalAgreement** — `tenancy`, `template_version`, `status`
(`draft|sent|signed|uploaded|expired`), `pdf`, `esign_provider?`, `esign_ref?`,
`signed_at?`, `stamp_details` (JSON), `police_verification_pdf?`.

**AgreementTemplate** / **AgreementVersion** — `name`, `body` (HTML with merge fields),
`version`, `is_active`.

**Inspection** — `tenancy`, `kind` (`move_in|move_out`), `date`, `by`, `tenant_ack` (bool),
`tenant_ack_at?`. **InspectionItem** — `inspection`, `label`, `condition`
(`new|good|fair|damaged`), `notes`, `photos` (M2M MediaAsset), `deduction_amount?` (move-out).

### Billing & ledger

**ChargeType** — `name`, `code` (`rent|deposit|electricity|water|maintenance|wifi|mess|
housekeeping|parking|gas|late_fee|damage|one_time|custom`), `is_recurring_default`,
`default_amount?`, `taxable` (bool).

**RecurringCharge** — `tenancy`, `charge_type`, `amount`, `start_period`, `end_period?`,
`notes`.

**Invoice** — `tenancy`, `number` (series, gap-free), `billing_period` (YYYY-MM),
`issue_date`, `due_date`, `status` (`draft|issued|partially_paid|paid|void`),
`subtotal`, `discount`, `tax`, `carry_forward`, `total`, `amount_paid`, `balance`,
`pdf`, `notes`, `is_prorated`, `sent_channels` (array), `idempotency_key`
(`tenancy_id:period`).

**InvoiceLineItem** — `invoice`, `charge_type`, `description`, `quantity`, `unit_price`,
`amount`, `tax_amount`, `meter_reading?` (FK when electricity/water metered),
`period_from?`, `period_to?` (proration).

**CreditNote** — `invoice`, `amount`, `reason`, `type` (`discount|waiver|adjustment|
correction`), `created_by`, `approved_by?`, `pdf`.

**Payment** — `tenancy`, `amount`, `method` (`upi|card|netbanking|wallet|cash|cheque|
bank_transfer|autopay`), `status` (`pending|success|failed|refunded`), `paid_at`,
`gateway` (`razorpay|offline`), `razorpay_payment_id?`, `razorpay_order_id?`,
`razorpay_link_id?`, `proof_file?`, `recorded_by?`, `approved_by?`, `receipt_pdf?`,
`idempotency_key`.

**PaymentAllocation** — `payment`, `invoice`, `amount`. (A payment can span invoices.)

**LedgerEntry** (append-only) — `tenancy`, `date`, `type` (`charge|payment|credit_note|
late_fee|opening`), `source_type`, `source_id`, `debit`, `credit`, `running_balance`
(materialized), `description`.

**DepositLedgerEntry** (append-only) — `tenancy`, `date`, `type` (`collected|deduction|
refund|forfeit`), `amount`, `source_id`, `note`.

**MoveOutSettlement** — `tenancy`, `final_meter_readings` (JSON), `outstanding_dues`,
`damage_deductions`, `other_deductions`, `deposit_held`, `refund_amount` (derived),
`refund_method`, `refund_status`, `refund_ref?`, `statement_pdf`, `tenant_ack_at?`.

### Collections

**ReminderRule** — part of `Settings.reminder_cadence` JSON: list of
`{offset_days, template_code, channel, tone}` where `offset_days` is relative to `due_date`
(negative = before).

**ReminderLog** — `invoice`, `rule_offset`, `channel`, `template_code`, `message_log?`,
`sent_at`, `result` (`sent|skipped_paid|skipped_optout|skipped_quiet|failed`).

**PromiseToPay** — `tenancy`/`invoice`, `promised_date`, `amount?`, `logged_by`, `note`,
`kept` (bool?).

### Maintenance

**MaintenanceTicket** — `property`, `unit?`, `tenancy?`, `raised_by`
(`tenant|staff`), `category`, `title`, `description`, `priority`
(`low|medium|high|urgent`), `status` (`open|assigned|in_progress|on_hold|resolved|closed`),
`assignee_staff?`, `assignee_vendor?`, `sla_due_at?`, `sla_breached` (bool),
`cost`, `billable_to_tenant` (bool), `resolved_at?`, `rating?`, `rating_comment?`.

**TicketComment** — `ticket`, `by`, `body`, `visibility` (`internal|tenant`), `at`.
**TicketAttachment** — `ticket`, `file`, `by`.

**Vendor** — `name`, `trades` (array), `phone`, `email?`, `rate_card` (JSON), `rating_avg`,
`notes`.

**PreventiveMaintenance** — `property`, `unit?`, `title`, `frequency` (`monthly|quarterly|
half_yearly|yearly|custom_days`), `next_due_on`, `vendor?`, `checklist` (JSON).
**PreventiveTask** — `preventive`, `due_on`, `status`, `completed_on?`, `cost?`, `notes`.

**Asset** — `unit`, `name`, `category`, `make_model?`, `serial?`, `purchase_date?`,
`warranty_expiry?`, `service_history` (JSON).

### Messaging

**NotificationTemplate** — `event_code` (see [07](07-whatsapp-automation.md) event list),
`channel` (`whatsapp|sms|email|inapp`), `provider_template_name?`, `language`,
`variable_order` (array), `body_preview`, `is_active`.

**MessageLog** — `channel`, `to`, `event_code`, `template_name?`, `tenancy?`, `lead?`,
`variables` (JSON), `provider_message_id?`, `status` (`queued|sent|delivered|read|failed`),
`error?`, `cost?`, `retry_count`, `queued_at`, `updated_at`.

**InboundMessage** — `channel`, `from`, `tenant?`, `body`, `media?`, `provider_message_id`,
`handled` (bool), `auto_reply_sent?`, `routed_to?`, `received_at`.

**Broadcast** — `name`, `segment` (`all_tenants|overdue|property|on_notice|prospects|custom`),
`segment_filter` (JSON), `template`, `variables_map` (JSON), `scheduled_for?`, `status`.
**BroadcastRecipient** — `broadcast`, `tenant`/`lead`, `message_log?`, `status`.

**Announcement** — `property?` (null = all), `title`, `body`, `pinned`, `published_at`,
`require_ack` (bool). **AnnouncementAck** — `announcement`, `tenant`, `at`.

### Finance

**ExpenseCategory** — `name`, `code`.
**Expense** — `property?`, `category`, `vendor?`, `amount`, `tax_amount?`, `date`,
`description`, `payment_method`, `receipt_file?`, `recorded_by`, `paid` (bool).

**OwnerPayout** — `property?`, `amount`, `date`, `method`, `reference?`, `note`,
`gateway` (`razorpay_payout|manual`).

### Docs, audit, misc

**Document** — `owner_type` (`tenant|tenancy|unit|property|invoice|payment|settlement`),
`owner_id`, `category`, `file`, `title`, `uploaded_by`, `expires_at?`, `is_signed`.

**AuditLog** — `actor?`, `action`, `target_type`, `target_id`, `before` (JSON),
`after` (JSON), `ip`, `user_agent`, `at`.

**ChangeRequest** — `type`, `payload` (JSON), `status` (`pending|approved|rejected`),
`requested_by`, `reviewed_by?`, `review_note?`, `applied_at?`.

**Review** — `property`, `tenancy`, `rating` (1–5), `title?`, `body`, `is_published`,
`reply?`.

## 5.3 Important derived values / rules

| Value | Rule |
|---|---|
| Unit `status` = `occupied` | Set when a Tenancy becomes `active`; back to `available` on `ended` (or `maintenance` if turnover task open). |
| Invoice `balance` | `total - amount_paid`; `status` transitions on each PaymentAllocation. |
| Tenancy outstanding | Sum of unpaid invoice balances = last `LedgerEntry.running_balance` (rent account). |
| Aging bucket | `today - invoice.due_date` for each unpaid invoice. |
| Electricity line amount (submeter) | `(current - previous) * rate + fixed_charge`; reading must exist for the period or billing job flags it. |
| Electricity (shared) | Parent bill amount split by `equal` / `headcount` / `ratio` across sibling units. |
| Proration | `rent * days_occupied_in_period / days_in_period`, rounded per policy. |
| Late fee | Applied once per invoice after `due_date + grace_period_days`; `flat` | `percent*balance` | `per_day*days` capped at `late_fee_cap`. |
| Rent escalation | On `start_date` anniversary: `rent *= (1 + escalation_percent/100)`; writes `escalation_last_applied_on`. |
| Deposit refund | `deposit_held - outstanding_dues - damage_deductions - other_deductions`, floored at 0; negative → tenant owes. |
| Move to `Booked` | Website booking token payment success → unit `booked`, lead `advance_paid=true`, hold expires after N days if not onboarded. |

## 5.4 Indexing (initial)

- `Unit (organization, status, is_listed)`, `Unit (property, status)`, `Unit.slug` unique.
- `Invoice (tenancy, billing_period)` unique; `Invoice (status, due_date)` for reminders.
- `Payment.razorpay_payment_id` unique; `Payment (tenancy, status)`.
- `LedgerEntry (tenancy, date)`; `MessageLog (status, queued_at)`,
  `MessageLog (tenancy, event_code)`.
- `Tenant.phone` unique per org; `Lead.phone`.
- `MeterReading (meter, reading_date)` unique.
- `MaintenanceTicket (status, sla_due_at)`.
