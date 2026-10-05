import { Megaphone, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { useState } from "react";
import type { OverdueTenant } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

const reminderIcon = { whatsapp: MessageCircle, call: Phone, notice: TriangleAlert, none: Phone } as const;

function agingClasses(days: number) {
  if (days > 60) return "bg-danger text-white";
  if (days > 15) return "bg-danger/15 text-danger";
  return "bg-gold-soft text-gold";
}

export function OverdueTenantsTable({
  tenants,
  onRecordPayment,
  onLogPromise,
}: {
  tenants: OverdueTenant[];
  onRecordPayment: (t: OverdueTenant) => void;
  onLogPromise: (t: OverdueTenant) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(tenants.map((t) => t.id)));

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedRows = tenants.filter((t) => selected.has(t.id));
  const batchSum = selectedRows.reduce((sum, t) => sum + t.amountDue, 0);

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="h-11 bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="w-10 px-4 text-center">
                <input
                  type="checkbox"
                  checked={selected.size === tenants.length && tenants.length > 0}
                  onChange={() => setSelected((prev) => (prev.size === tenants.length ? new Set() : new Set(tenants.map((t) => t.id))))}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
              </th>
              <th className="px-4 py-2 font-semibold">Tenant Details</th>
              <th className="px-4 py-2 font-semibold">Unit &amp; Property</th>
              <th className="px-4 py-2 text-right font-semibold">Amount Due</th>
              <th className="px-4 py-2 text-center font-semibold">Aging &amp; Status</th>
              <th className="px-4 py-2 font-semibold">Last Reminder Sent</th>
              <th className="px-4 py-2 text-right font-semibold">Inline Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => {
              const ReminderIcon = reminderIcon[t.reminderChannel];
              return (
                <tr key={t.id} className="h-14 border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                  <td className="px-4 py-2 text-center">
                    <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleRow(t.id)} className="h-4 w-4 accent-[var(--color-accent)]" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={t.avatarInitials} size="sm" />
                      <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-ink">{t.tenantName}</span>
                        <span className="font-mono text-[11px] text-ink-faint">{t.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-ink">Unit {t.unitLabel}</span>
                      <span className="text-xs text-ink-muted">{t.propertyName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex flex-col items-end leading-tight">
                      <span className="font-mono font-bold text-danger">{formatINR(t.amountDue)}</span>
                      {t.originalAmount && <span className="text-[10px] text-ink-faint">Adjusted from {formatINR(t.originalAmount)}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", agingClasses(t.daysOverdue))}>
                      {t.daysOverdue} days overdue
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-ink-muted">
                    <div className="flex items-center gap-1.5">
                      <ReminderIcon className={cn("h-4 w-4", t.reminderChannel === "whatsapp" ? "text-[#25D366]" : t.reminderChannel === "notice" ? "text-danger" : "text-ink-faint")} strokeWidth={2} />
                      <span>{t.reminderLabel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button type="button" title="Send WhatsApp Reminder" className="rounded-lg bg-surface-sunken p-1.5 text-[#128C7E] hover:bg-rule">
                        <MessageCircle className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button type="button" title="Direct Phone Call" className="rounded-lg bg-surface-sunken p-1.5 text-ink hover:bg-rule">
                        <Phone className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onLogPromise(t)}
                        className="rounded-lg bg-surface-sunken px-2 py-1 text-xs font-semibold text-accent hover:bg-rule"
                      >
                        Promise
                      </button>
                      <button
                        type="button"
                        onClick={() => onRecordPayment(t)}
                        className="rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-white hover:bg-accent-ink"
                      >
                        + Record
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {tenants.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-faint">
                  No overdue tenants match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRows.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-2 bg-surface-sunken px-4 py-3 text-xs text-ink-muted sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-accent">{selectedRows.length} rows selected</span>
            <span>·</span>
            <span>
              Batch sum: <strong className="font-mono text-ink">{formatINR(batchSum)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded bg-surface px-2.5 py-1 font-semibold text-ink hover:bg-rule">
              Bulk Notice PDF
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded bg-[#25D366] px-2.5 py-1 font-semibold text-white hover:opacity-90">
              <Megaphone className="h-3.5 w-3.5" strokeWidth={2} />
              Send WhatsApp Blast ({selectedRows.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
