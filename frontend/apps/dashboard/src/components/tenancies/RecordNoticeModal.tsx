import { useState } from "react";
import { createPortal } from "react-dom";
import type { Tenancy } from "../../data/tenancies";
import { cn } from "../../lib/utils";

export function RecordNoticeModal({
  tenancy,
  onClose,
  onConfirm,
}: {
  tenancy: Tenancy;
  onClose: () => void;
  onConfirm: (noticeDate: string, vacateDate: string, by: "Tenant" | "Owner") => void;
}) {
  const [by, setBy] = useState<"Tenant" | "Owner">("Tenant");
  const [noticeDate, setNoticeDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  const vacateDate = new Date(noticeDate);
  vacateDate.setDate(vacateDate.getDate() + tenancy.noticePeriodDays);
  const vacateDateStr = vacateDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Record Notice to Vacate</h2>
          <p className="mt-1 text-sm text-ink-muted">
            For <b className="text-ink">{tenancy.tenantName}</b> &middot; {tenancy.unitCode}
          </p>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Notice Given By</span>
            <div className="flex gap-2">
              {(["Tenant", "Owner"] as const).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBy(o)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium",
                    by === o ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong",
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Notice Date</span>
            <input type="date" className="field" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} />
          </label>

          <div className="rounded-lg bg-accent-soft px-3 py-2.5 text-sm text-accent-ink">
            <span className="font-semibold">Earliest Vacate Date: {vacateDateStr}</span>
            <p className="mt-0.5 text-xs">Based on the {tenancy.noticePeriodDays}-day notice period</p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Notes</span>
            <textarea className="field resize-none" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(noticeDate, vacateDate.toISOString().slice(0, 10), by);
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Record Notice
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
