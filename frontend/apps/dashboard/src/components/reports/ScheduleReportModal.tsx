import { AlarmClock, Send, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

const frequencies = ["Daily (08:00 AM)", "Weekly (Mondays)", "Monthly (1st)"] as const;

export function ScheduleReportModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [frequency, setFrequency] = useState<(typeof frequencies)[number]>("Monthly (1st)");
  const [formats, setFormats] = useState({ pdf: true, excel: true });
  const [recipients, setRecipients] = useState(["priya.sharma@fahiq.in", "ankit.verma@fahiq.in"]);
  const [newEmail, setNewEmail] = useState("");

  function addEmail() {
    const trimmed = newEmail.trim();
    if (trimmed && !recipients.includes(trimmed)) {
      setRecipients((r) => [...r, trimmed]);
      setNewEmail("");
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-soft text-gold">
              <AlarmClock className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Schedule This Report</h3>
              <p className="text-xs text-ink-faint">Automated recurring email reports to team and stakeholders</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Dispatch Frequency</span>
            <div className="grid grid-cols-3 gap-2">
              {frequencies.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold",
                    frequency === f ? "bg-accent text-white shadow-sm" : "bg-surface-sunken text-ink-muted hover:bg-rule",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <AlarmClock className="h-4 w-4 text-accent" strokeWidth={2} />
              Dispatches {frequency.toLowerCase()} · IST
            </span>
            <span className="text-ink-faint">UTC+5:30</span>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Attachment Formats</span>
            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formats.pdf} onChange={(e) => setFormats((f) => ({ ...f, pdf: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                PDF Summary Brief
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formats.excel} onChange={(e) => setFormats((f) => ({ ...f, excel: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                Excel Full Ledger (.xlsx)
              </label>
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Recipients List</span>
            <div className="flex min-h-12 flex-wrap items-center gap-1.5 rounded-lg bg-surface-sunken p-2">
              {recipients.map((r) => (
                <span key={r} className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] text-ink">
                  {r}
                  <button type="button" onClick={() => setRecipients((prev) => prev.filter((e) => e !== r))} className="text-ink-faint hover:text-danger">
                    <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="email"
                className="field flex-1"
                placeholder="Enter stakeholder email..."
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addEmail();
                  }
                }}
              />
              <button type="button" onClick={addEmail} className="shrink-0 rounded-lg bg-surface-sunken px-3 py-2 text-xs font-semibold text-ink hover:bg-rule">
                + Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <Send className="h-4 w-4" strokeWidth={2} />
            Save Schedule
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
