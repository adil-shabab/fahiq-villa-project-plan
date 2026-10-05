import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import type { Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";
import { Avatar } from "../../ui/Avatar";
import { Badge } from "../../ui/Badge";

export function OverviewTab({ tenancy }: { tenancy: Tenancy }) {
  const daysUntilEnd = useMemo(() => Math.ceil((new Date(tenancy.endDate).getTime() - Date.now()) / 86400000), [tenancy.endDate]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="rounded-xl border border-rule bg-surface p-4">
          <div className="flex items-start gap-3">
            <Avatar initials={tenancy.avatarInitials} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink">{tenancy.tenantName}</p>
                <Badge tone={tenancy.kycStatus === "Verified" ? "ok" : "warn"}>
                  <ShieldCheck className="mr-1 inline h-3 w-3" strokeWidth={2} />
                  KYC {tenancy.kycStatus}
                </Badge>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                <a href={`tel:${tenancy.phone}`} className="flex items-center gap-1 hover:text-ink">
                  <Phone className="h-3 w-3" strokeWidth={2} /> {tenancy.phone}
                </a>
                <a href={`https://wa.me/${tenancy.phone.replace(/\D/g, "")}`} className="flex items-center gap-1 text-ok">
                  <MessageCircle className="h-3 w-3" strokeWidth={2} /> WhatsApp
                </a>
                <a href={`mailto:${tenancy.email}`} className="flex items-center gap-1 hover:text-ink">
                  <Mail className="h-3 w-3" strokeWidth={2} /> {tenancy.email}
                </a>
              </div>
              <p className="mt-2 text-xs text-ink-faint">
                Emergency: {tenancy.emergencyContact.name} &middot; {tenancy.emergencyContact.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-rule bg-surface p-4">
          <h3 className="mb-3 text-sm font-semibold text-ink">Lease Terms</h3>
          <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
            <Fact label="Start Date" value={new Date(tenancy.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
            <Fact label="End Date" value={new Date(tenancy.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
            <Fact label="Deposit" value={formatINR(tenancy.depositHeld)} />
            <Fact label="Maintenance" value={formatINR(tenancy.maintenanceCharge)} />
            <Fact label="Lock-in" value={`${tenancy.lockInMonths} months`} />
            <Fact label="Notice Period" value={`${tenancy.noticePeriodDays} days`} />
            <Fact label="Escalation" value={`${tenancy.escalationPercent}% / yr`} />
            <Fact label="Due Day" value={String(tenancy.dueDay)} />
          </dl>
          {tenancy.coOccupants.length > 0 && (
            <div className="mt-3 border-t border-rule pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Co-occupants</p>
              <p className="mt-1 text-sm text-ink">{tenancy.coOccupants.join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <StatTile label="Outstanding" value={formatINR(tenancy.outstandingBalance)} tone={tenancy.outstandingBalance > 0 ? "danger" : "ok"} />
          <StatTile label="Deposit Held" value={formatINR(tenancy.depositHeld)} />
          <StatTile label="Next Due" value={`${tenancy.dueDay}th`} />
          <StatTile label="Days to End" value={String(Math.max(daysUntilEnd, 0))} />
        </div>

        <div className="rounded-xl border border-rule bg-surface p-4">
          <h3 className="mb-3 text-sm font-semibold text-ink">Recent Activity</h3>
          <ul className="flex flex-col gap-2.5">
            {tenancy.commLog.slice(0, 4).map((c, i) => (
              <li key={i} className="text-sm">
                <p className="text-ink">{c.summary}</p>
                <p className="text-xs text-ink-faint">
                  {c.channel} &middot; {new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}

function StatTile({ label, value, tone }: { label: string; value: string; tone?: "ok" | "danger" }) {
  const toneClass = tone === "ok" ? "text-ok" : tone === "danger" ? "text-danger" : "text-ink";
  return (
    <div className="rounded-xl border border-rule bg-surface p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={`mt-1 text-base font-bold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  );
}
