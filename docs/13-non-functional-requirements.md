# 13 — Non-Functional Requirements

## 13.1 Security

### AuthN / AuthZ
- Staff: email + password (Argon2 hashing), **mandatory TOTP 2FA** for Owner/Admin &
  Accountant, optional for others. Lockout after 5 failed attempts (exponential backoff).
- Tenant: phone + OTP (6-digit, 5-min TTL, max 5/hour/number, single-use). Optional device
  PIN.
- Short-lived access JWT (15 min) + rotating refresh token (httpOnly, `Secure`,
  `SameSite=Lax`); refresh reuse detection → revoke family.
- **RBAC + object scoping** on every endpoint (see [03](03-user-roles-and-permissions.md)).
  Deny by default. Property scoping enforced at the queryset layer, not just the view.
- Session/token revocation on role change, deactivation, or password reset.
- Amount-limited actions (waivers, discounts) + approval workflow for sensitive changes.

### Data protection
- **TLS 1.2+** everywhere; HSTS; secure cookies.
- **Encryption at rest**: DB volume encryption; `IntegrationCredentials` and KYC document
  *metadata* (ID numbers) encrypted at the field level (Fernet/KMS). KYC files in a
  separate, stricter bucket with tighter IAM and shorter signed-URL TTLs (2–5 min).
- **PII minimization**: store masked ID numbers (`XXXX-XXXX-1234`); full number only if a
  concrete need, encrypted. Mask PII in logs and error reports (Sentry `before_send`
  scrubber).
- Signed, expiring URLs for all media/document downloads; no public buckets.
- Payment data never touches our servers — Razorpay Checkout / hosted links only. We are
  **not in PCI scope** beyond SAQ-A.
- Webhooks: verify signatures (Razorpay `X-Razorpay-Signature`, BSP secret), IP allowlist
  where offered, idempotent processing, raw payload stored for replay/audit.
- CSRF protection on session-authenticated routes; CORS locked to known origins.
- Security headers: CSP (strict on public site), `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, frame-ancestors none.
- Dependency scanning (`pip-audit`, `npm audit`, Dependabot/Renovate); secret scanning in
  CI (gitleaks).
- Rate limiting / throttling: auth, OTP, public enquiry/booking, export endpoints.
- Bot protection on public forms (hCaptcha/Turnstile) + honeypot.
- Input validation via serializers/Zod; output encoding; parameterized ORM only (no raw
  SQL with interpolation).
- File uploads: type + size allowlist, image re-encoding to strip metadata/EXIF-GPS,
  antivirus scan (ClamAV) on documents (P2), store outside webroot.
- **Audit log** for every money/status/agreement/KYC/permission change (actor, before,
  after, IP, UA, time) — immutable, exportable.
- Admin: Django admin restricted to superusers, behind 2FA, separate URL, IP-allowlisted in
  prod.

### Compliance (India)
- **DPDP Act 2023**: explicit consent capture (WhatsApp opt-in, KYC purpose), consent
  records, purpose limitation, data-retention schedule, data-subject request handling
  (access/erasure), breach-notification process, named grievance officer in privacy policy.
- **KYC / tenant verification**: police verification form generation per state norms;
  documents retained per legal requirement, then purged.
- **Payments**: RBI/Razorpay compliance handled by the gateway; store only tokens/refs.
- **WhatsApp**: Meta Business & Commerce policy — approved templates, correct
  utility/marketing categorization, opt-out honoured.
- **GST** (if registered): compliant tax invoice format, sequential numbering, retention.
- Retention defaults (configurable): financial records 8 years; KYC per statutory need;
  WhatsApp/SMS message *bodies* 18 months (metadata longer); server logs 90 days;
  access logs 1 year.

## 13.2 Performance & scalability

- API p95 latency < 300 ms for list/detail endpoints at expected scale
  (≤ 2,000 units, ≤ 5,000 active tenancies, ≤ 50 staff).
- Public listing pages: LCP < 2.5 s on 4G mid-tier mobile; INP < 200 ms; CLS < 0.1.
- Pagination everywhere; no unbounded queries; `select_related` / `prefetch_related` to kill
  N+1; DB indexes per [05 §5.4](05-data-model.md).
- Redis caching for: public listing/facet queries (short TTL + invalidate on unit change),
  dashboard KPI aggregates (5–15 min), report results.
- Media via CDN with long cache + content-hash URLs; responsive images (AVIF/WebP).
- Billing run designed for batch: chunked, resumable, idempotent; can process the whole
  portfolio in minutes; per-tenancy failures isolated (one bad tenancy doesn't fail the run).
- Celery: separate queues (`default`, `billing`, `messaging`, `pdf`, `exports`) with
  independent concurrency; long jobs off the request path.
- Stateless API containers → horizontal scale behind a load balancer; sticky-free.
- Exports and broadcasts are jobs with progress, not synchronous responses.
- Connection pooling (PgBouncer) if needed.
- Load test target: 100 concurrent staff + 500 concurrent public visitors without
  degradation.

## 13.3 Reliability & availability

- Target **99.5%** monthly availability for the app; billing/reminder jobs must run on
  schedule with alerting on missed runs ("last successful run" freshness monitor).
- **Backups**: automated daily PostgreSQL snapshots + PITR (WAL) with ≥ 14-day retention;
  object storage versioning + lifecycle; **quarterly restore drills** (documented RPO ≤ 24 h
  for DB via snapshots / ≤ 5 min with PITR, RTO ≤ 4 h).
- Idempotency + Redis locks on all scheduled jobs; safe to re-run.
- Webhook processing: at-least-once with dedupe; dead-letter queue + retry with backoff;
  manual replay tool.
- Outbound send failures: retry then channel fallback (WhatsApp → SMS → email); never lose a
  bill silently — staff alerted if a tenant can't be reached on any channel.
- Graceful degradation: if the BSP or Razorpay is down, invoices still generate and queue;
  sends/links flush when the provider recovers.
- Health endpoint `/healthz` (DB + Redis + storage) for the load balancer; readiness vs
  liveness separated.
- Zero-downtime deploys; backward-compatible migrations (expand → migrate → contract).
- Error budget & on-call runbook for: missed billing run, webhook backlog, payment
  reconciliation mismatch, mass send failure.

## 13.4 Data integrity

- Invoices immutable post-issue (only the audited late-fee append); corrections via credit
  notes.
- Ledgers append-only; balances derived + materialized, with a nightly reconciliation check
  (sum of ledger == sum of invoice balances − payments) that alerts on drift.
- Gap-free invoice/receipt numbering (DB sequence + unique constraint per FY).
- Soft-delete for entities with financial history; hard delete blocked by FK + policy.
- Every financial mutation inside a DB transaction; money math in `Decimal` with documented
  rounding.
- Foreign-key constraints enforced; no orphan media/documents (periodic sweeper).

## 13.5 Observability

- Structured JSON logging with correlation ids (request id, task id, tenancy id).
- Sentry (API + workers + frontends) with release + environment tags, PII scrubbing.
- Business metrics dashboard: invoices generated, messages sent/delivered/failed, reminder
  queue depth, payments reconciled, reconciliation lag, webhook processing latency, Celery
  queue lengths, billing-run duration & failures.
- Alerts (paging vs notify): billing run failed/late, webhook backlog > N, message failure
  rate > X%, reconciliation drift, disk/DB CPU, error rate spike, backup failed.
- Audit log searchable in-app.
- Uptime monitoring (external) on public site, API, and job freshness.

## 13.6 Accessibility & UX quality

- WCAG 2.1 AA on public site and tenant portal: semantic HTML, labelled controls, keyboard
  navigation, visible focus, colour-contrast AA, alt text, reduced-motion support.
- Responsive: public site & portal mobile-first; dashboard usable on tablet, field flows
  (meter reading, ticket) usable on phone.
- Clear error messages (map RFC-7807 `detail` to friendly copy); empty states with next
  action; destructive actions confirmed with reason capture.
- Localization-ready (INR, `Asia/Kolkata`, `dd MMM yyyy`, English/Hindi).

## 13.7 Maintainability & delivery

- `ruff` + `mypy` (backend), `eslint` + `tsc` (frontend) enforced in CI; no merge on red.
- Test coverage gates: backend ≥ 80% on `apps/*/services.py` and `tasks.py`; critical money
  paths (billing run, allocation, settlement, proration, late fee, splits) have exhaustive
  unit tests + property-based tests where sensible.
- E2E (Playwright) smoke on each deploy: enquiry → lead, onboarding → active tenancy,
  billing run → invoice → payment link → webhook → paid + receipt, raise ticket.
- Contract tests for each BSP adapter + Razorpay against recorded fixtures.
- OpenAPI schema is the source of truth for the TS client; schema diff checked in CI.
- Seed/demo data command for onboarding new devs and for staging.
- ADRs (Architecture Decision Records) in `docs/adr/` for notable choices.
- Runbooks in `docs/runbooks/` (billing run, refunds, provider outage, restore drill).
- Semantic versioning of the API (`/v1`), additive changes only within a version.
- Feature flags for phased rollout (e-sign, autopay, two-way WhatsApp, CMS).

## 13.8 Cost awareness

- WhatsApp: per-conversation cost — batch/consolidate messages, prefer one monthly invoice
  message + targeted reminders; track cost per tenant in the cost report.
- Razorpay: transaction fees — optional convenience-fee pass-through setting.
- Storage: image compression + lifecycle rules; move old documents to cold storage.
- Compute: scale workers on schedule (billing days need more; nights need less).
