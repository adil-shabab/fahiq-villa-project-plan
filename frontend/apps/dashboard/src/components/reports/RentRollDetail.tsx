import { ArrowLeft, Building2, Calendar, Download, FileText, Lock, Receipt, Search, SendHorizontal, TrendingUp, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { rentRoll, rentRollStats } from "../../data/reports";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

const statusClasses: Record<string, string> = {
  Occupied: "bg-accent-soft text-accent-ink",
  Available: "bg-ok/10 text-ok",
  Notice: "bg-gold-soft text-gold",
  "Under Maintenance": "bg-danger/15 text-danger",
  Booked: "bg-info/10 text-info",
};

const leaseSubClasses = { warn: "text-gold", danger: "text-danger", neutral: "text-ink-faint" } as const;

export function RentRollDetail({
  onBack,
  onOpenExport,
  onOpenSchedule,
}: {
  onBack: () => void;
  onOpenExport: () => void;
  onOpenSchedule: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return rentRoll.filter((r) => !search || `${r.unitCode} ${r.tenantName ?? ""}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const avgPrivateRent = Math.round(
    rentRoll.filter((r) => r.roomType.toLowerCase().includes("1bhk") || r.roomType.toLowerCase().includes("studio")).reduce((s, r) => s + r.rent, 0) /
      Math.max(1, rentRoll.filter((r) => r.roomType.toLowerCase().includes("1bhk") || r.roomType.toLowerCase().includes("studio")).length),
  );
  const avgSharedRent = Math.round(rentRollStats.totalMonthlyRent / Math.max(1, rentRollStats.occupied));

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-rule bg-surface p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button type="button" onClick={onBack} className="mb-1 flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Reports Hub
          </button>
          <h2 className="text-xl font-bold text-ink">Rent Roll</h2>
          <p className="text-sm text-ink-faint">Active lease commitments, deposit escrow balances, and monthly revenue receivables across portfolio.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-surface-sunken px-3 py-1.5">
            <Building2 className="h-4 w-4 text-accent" strokeWidth={2} />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase text-ink-faint">Property</span>
              <span className="text-sm font-semibold text-ink">All Properties (5)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-surface-sunken px-3 py-1.5">
            <Calendar className="h-4 w-4 text-accent" strokeWidth={2} />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase text-ink-faint">As Of Date</span>
              <span className="text-sm font-semibold text-ink">{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>
          <button type="button" onClick={onOpenSchedule} className="flex h-9 items-center gap-1.5 rounded-lg bg-surface-sunken px-3 text-sm font-semibold text-ink hover:bg-rule">
            <SendHorizontal className="h-4 w-4 text-gold" strokeWidth={2} />
            Schedule
          </button>
          <button type="button" onClick={onOpenExport} className="flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-sm font-semibold text-white hover:bg-accent-ink">
            <Download className="h-4 w-4" strokeWidth={2} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between text-ink-faint">
            <span className="text-[11px] font-semibold uppercase tracking-wide">Total Capacity</span>
            <UserRound className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
          </div>
          <div className="font-mono text-2xl font-bold text-ink">
            {rentRollStats.totalUnits} <span className="text-xs font-normal text-ink-faint">units</span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded bg-surface-sunken px-2 py-1 text-xs">
            <span className="flex items-center gap-1 font-semibold text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" /> {rentRollStats.occupied} Occupied
            </span>
            <span className="text-ink-faint">·</span>
            <span className="font-medium text-danger">{rentRollStats.vacant} Vacant</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between text-ink-faint">
            <span className="text-[11px] font-semibold uppercase tracking-wide">Total Monthly Rent</span>
            <TrendingUp className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
          </div>
          <div className="font-mono text-2xl font-bold text-ink">{formatINR(rentRollStats.totalMonthlyRent)}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
            +4.8% vs last month
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between text-ink-faint">
            <span className="text-[11px] font-semibold uppercase tracking-wide">Avg Rent / Unit</span>
            <Receipt className="h-[18px] w-[18px] text-gold" strokeWidth={2} />
          </div>
          <div className="font-mono text-2xl font-bold text-ink">{formatINR(avgSharedRent)}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
            <span>
              Pvt: <strong className="text-ink">{formatINR(avgPrivateRent || avgSharedRent)}</strong>
            </span>
            <span>
              Shared: <strong className="text-ink">{formatINR(Math.round(avgSharedRent * 0.75))}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between text-ink-faint">
            <span className="text-[11px] font-semibold uppercase tracking-wide">Security Deposits</span>
            <Lock className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
          </div>
          <div className="font-mono text-2xl font-bold text-ink">{formatINR(rentRollStats.totalDeposits)}</div>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-accent">
            <Lock className="h-3.5 w-3.5" strokeWidth={2} />
            100% Escrow Reconciled
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <div className="flex flex-col items-center justify-between gap-2.5 p-4 sm:flex-row">
          <div className="flex w-full items-center gap-2.5 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
              <input className="field pl-8" placeholder="Filter by room or tenant..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <span className="whitespace-nowrap text-xs text-ink-muted">
              Showing {filtered.length} of {rentRollStats.totalUnits} units
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-semibold">Unit &amp; Room</th>
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Tenant Details</th>
                <th className="px-4 py-3 text-right font-semibold">Monthly Rent</th>
                <th className="px-4 py-3 font-semibold">Occupancy Status</th>
                <th className="px-4 py-3 font-semibold">Lease Term</th>
                <th className="px-4 py-3 text-right font-semibold">Security Deposit</th>
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.unitId} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-accent">{r.unitCode}</span>
                      <span className="rounded bg-surface-sunken px-1.5 py-0.5 text-[10px] text-ink-muted">{r.roomType}</span>
                    </div>
                    <div className="text-[11px] text-ink-faint">{r.floor}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-ink">{r.propertyName}</div>
                    <div className="text-[11px] text-ink-faint">{r.locality}</div>
                  </td>
                  <td className="px-4 py-3">
                    {r.tenantName ? (
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={r.avatarInitials ?? "?"} size="sm" />
                        <div className="flex flex-col leading-tight">
                          <span className="font-semibold text-ink">{r.tenantName}</span>
                          <span className="font-mono text-[11px] text-ink-faint">{r.tenantPhone}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-ink-faint">Vacant</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-mono font-bold text-ink">{formatINR(r.rent)}</div>
                    <div className="text-[11px] text-ink-faint">{r.paymentStatusLabel}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", statusClasses[r.status])}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs text-ink">{r.leaseTermLabel ?? "—"}</div>
                    {r.leaseSubLabel && <div className={cn("text-[10px] font-medium", leaseSubClasses[r.leaseSubTone])}>{r.leaseSubLabel}</div>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-mono font-semibold text-ink">{r.deposit ? formatINR(r.deposit) : "—"}</div>
                    <div className="text-[10px] text-ink-faint">{r.depositSubLabel}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button type="button" title="View Tenancy Record" className="rounded p-1 text-ink-faint hover:bg-surface-sunken hover:text-accent">
                        <UserRound className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button type="button" title="View Financial Ledger" className="rounded p-1 text-ink-faint hover:bg-surface-sunken hover:text-accent">
                        <FileText className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-ink-faint">No units match this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between bg-surface-sunken/50 p-4 text-xs text-ink-muted">
          <span>
            Showing <strong className="text-ink">{filtered.length}</strong> of <strong className="text-ink">{rentRollStats.totalUnits}</strong> units
          </span>
        </div>
      </div>
    </section>
  );
}
