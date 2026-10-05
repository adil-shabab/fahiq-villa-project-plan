import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { FollowUpRow } from "../../data/dashboard";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";

export function SendReminderModal({ row, onClose }: { row: FollowUpRow; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSend() {
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Send Payment Reminder</h2>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar initials={row.avatarInitials} />
            <div>
              <p className="text-sm font-medium text-ink">{row.tenantName}</p>
              <p className="text-xs text-ink-faint">
                {row.unitCode} &middot; {row.propertyName}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-sm">
            <span className="text-ink-muted">Amount due</span>
            <span className="font-semibold tabular-nums text-danger">{formatINR(row.amountDue)}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-sm">
            <span className="text-ink-muted">Days overdue</span>
            <span className="font-semibold tabular-nums text-ink">{row.daysOverdue}</span>
          </div>

          <p className="mb-1.5 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            Message preview &middot; via WhatsApp
          </p>
          <div className="rounded-xl rounded-tl-sm bg-ok/10 px-3 py-2.5 text-sm text-ink">
            Hi {row.tenantName.split(" ")[0]}, your rent of <b>{formatINR(row.amountDue)}</b> for {row.unitCode} is{" "}
            {row.daysOverdue} day{row.daysOverdue === 1 ? "" : "s"} overdue. Pay now: rzp.io/i/fahiq-demo
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={status !== "idle"}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-70"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            {status === "idle" && "Send Reminder"}
            {status === "sending" && "Sending..."}
            {status === "sent" && "Sent ✓"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
