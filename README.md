# Fahiq — Rental & PG Management Platform

A complete platform for a single owner/operator to manage **multiple rental properties**
(apartments, independent rooms, PG/hostel beds, commercial units) from one admin dashboard,
publish available rooms on a public website, onboard tenants digitally, and run collections
with **automated WhatsApp notifications** for rent, electricity, water and other bills.

## What it does (in one line)

Admin lists rooms with photos, rent, amenities and status → prospective tenants browse and
enquire on the website → admin onboards them digitally → the system auto-generates monthly
invoices and sends WhatsApp reminders with a **Razorpay/UPI payment link** → payments
auto-reconcile → dashboards show occupancy and collections.

## Target context

| Aspect        | Decision                                                        |
|---------------|----------------------------------------------------------------|
| Scale         | Single owner, multiple properties (not multi-tenant SaaS in v1) |
| Backend       | Python + Django + Django REST Framework                         |
| Frontend      | React (Vite + TypeScript) — admin dashboard + public website    |
| WhatsApp      | BSP provider (AiSensy / Gupshup / Twilio / Interakt) via adapter |
| Payments      | Razorpay (Payment Links, UPI, UPI Autopay, Payouts)             |
| Region        | India — INR, GST-ready, +91 phone formats, English/Hindi        |
| Async / jobs  | Celery + Celery Beat + Redis                                    |

## Documentation index

| # | Doc | Purpose |
|---|-----|---------|
| 01 | [Product Overview](docs/01-product-overview.md) | Vision, goals, personas, success metrics |
| 02 | [Feature Catalogue](docs/02-features.md) | The full "maximum features" list, module by module |
| 03 | [User Roles & Permissions](docs/03-user-roles-and-permissions.md) | Who can do what |
| 04 | [Architecture](docs/04-architecture.md) | System design, services, integrations, infra |
| 05 | [Data Model](docs/05-data-model.md) | Entities, relationships, key fields |
| 06 | [API Design](docs/06-api-design.md) | REST resource groups and representative endpoints |
| 07 | [WhatsApp Automation](docs/07-whatsapp-automation.md) | BSP integration, templates, triggers, scheduler |
| 08 | [Billing & Payments](docs/08-billing-and-payments.md) | Charges, invoices, meters, Razorpay, ledgers, dunning |
| 09 | [Admin Dashboard](docs/09-admin-dashboard.md) | Screens, navigation, KPI widgets |
| 10 | [Public Website](docs/10-public-website.md) | Pages, search/filters, enquiry & booking flow, SEO |
| 11 | [Tenant Self-Service Portal](docs/11-tenant-portal.md) | What a logged-in tenant can see and do |
| 12 | [Tech Stack](docs/12-tech-stack.md) | Libraries, project layout, local setup |
| 13 | [Non-Functional Requirements](docs/13-non-functional-requirements.md) | Security, performance, compliance, DevOps |
| 14 | [Roadmap](docs/14-roadmap.md) | Phased delivery plan (MVP → advanced) |
| 15 | [Glossary](docs/15-glossary.md) | Domain terms |
| 20 | [Backend Implementation Plan](docs/20-backend-implementation-plan.md) | Backend architecture, locked decisions (ADRs), UI↔spec gap analysis, sprint build order |

## Status

Admin dashboard UI built on mock data (`frontend/apps/dashboard`). Backend not started —
see [20 — Backend Implementation Plan](docs/20-backend-implementation-plan.md) for the build plan.
