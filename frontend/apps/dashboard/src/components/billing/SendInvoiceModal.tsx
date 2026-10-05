import { useState } from "react";
import { createPortal } from "react-dom";
import type { BillingInvoice } from "../../data/billing";
import { formatINR } from "../../lib/format";

export function SendInvoiceModal({ invoice, onClose, onSend }: { invoice: BillingInvoice; onClose: () => void; onSend: () => void }) {
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Send Invoice</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {invoice.number} &middot; {invoice.tenantName}
          </p>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]" />
            WhatsApp
          </label>
          {whatsapp && (
            <div className="rounded-xl rounded-tl-sm bg-ok/10 px-3 py-2.5 text-sm text-ink">
              Hi {invoice.tenantName.split(" ")[0]}, your invoice for {invoice.periodLabel} of <b>{formatINR(invoice.total)}</b> is ready. Pay now:
              rzp.io/i/fahiq-demo
            </div>
          )}
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={email} onChange={(e) => setEmail(e.target.checked)} className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]" />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]" />
            SMS
          </label>

          <div className="mt-2 flex rounded-lg border border-rule p-0.5">
            <button
              type="button"
              onClick={() => setScheduled(false)}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium ${!scheduled ? "bg-accent text-white" : "text-ink-muted"}`}
            >
              Send Now
            </button>
            <button
              type="button"
              onClick={() => setScheduled(true)}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium ${scheduled ? "bg-accent text-white" : "text-ink-muted"}`}
            >
              Schedule
            </button>
          </div>
          {scheduled && <input type="datetime-local" className="field" />}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={!whatsapp && !email && !sms}
            onClick={() => {
              onSend();
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            {scheduled ? "Schedule Send" : "Send Invoice"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
