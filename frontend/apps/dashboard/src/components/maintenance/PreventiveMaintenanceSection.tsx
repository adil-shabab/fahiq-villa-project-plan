import { CalendarPlus, ShieldCheck } from "lucide-react";
import { preventiveActiveCount, preventiveSchedules, recentCompletions } from "../../data/maintenance";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

export function PreventiveMaintenanceSection({ onAddSchedule }: { onAddSchedule: () => void }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink">Preventive Maintenance</h3>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-ink">{preventiveActiveCount} Active</span>
          </div>
          <p className="text-sm text-ink-muted">Recurring servicing schedules, statutory inspections &amp; equipment warranty compliance.</p>
        </div>
        <button
          type="button"
          onClick={onAddSchedule}
          className="flex items-center gap-1.5 self-start rounded-lg bg-surface-sunken px-3 py-1.5 text-sm font-semibold text-ink hover:bg-rule sm:self-auto"
        >
          <CalendarPlus className="h-4 w-4" strokeWidth={2} />
          Add Schedule
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Schedule Name</th>
              <th className="px-3 py-2.5 font-semibold">Property / Units</th>
              <th className="px-3 py-2.5 font-semibold">Frequency</th>
              <th className="px-3 py-2.5 font-semibold">Next Due Date</th>
              <th className="px-3 py-2.5 font-semibold">Assigned Vendor</th>
              <th className="px-3 py-2.5 font-semibold">Last Completed</th>
              <th className="px-4 py-2.5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {preventiveSchedules.map((s) => (
              <tr key={s.id} className="hover:bg-surface-sunken/60">
                <td className="px-4 py-3 font-semibold text-ink">{s.name}</td>
                <td className="px-3 py-3 text-ink-muted">{s.scope}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-medium text-accent">{s.frequency}</span>
                </td>
                <td className={cn("px-3 py-3 font-mono text-xs font-semibold", s.dueSoon ? "text-warn" : "text-ink")}>{s.nextDueLabel}</td>
                <td className="px-3 py-3 text-ink-muted">{s.vendorName}</td>
                <td className="px-3 py-3 font-mono text-xs text-ink-faint">{s.lastCompletedLabel}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className={cn(
                      "rounded px-2.5 py-1 text-xs font-semibold",
                      s.dueSoon ? "bg-accent text-white hover:bg-accent-ink" : "bg-surface-sunken text-ink hover:bg-rule",
                    )}
                  >
                    Generate Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Recent Completion Log &amp; Work Proofs</span>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {recentCompletions.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg bg-surface-sunken p-3 shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-ink">{c.name}</span>
                <span className="text-xs text-ink-muted">{c.vendor} · {c.date}</span>
                <span className="mt-1 font-mono text-[11px] font-semibold text-accent">Invoice: {formatINR(c.invoiceAmount)} · Approved</span>
              </div>
              <ShieldCheck className="h-6 w-6 shrink-0 text-ok" strokeWidth={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
