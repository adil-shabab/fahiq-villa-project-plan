import { Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { hsmTemplates } from "../../data/messaging";

export function SendTemplateModal({
  tenantName,
  onClose,
  onSend,
}: {
  tenantName: string;
  onClose: () => void;
  onSend: () => void;
}) {
  const [templateId, setTemplateId] = useState(hsmTemplates[0]?.id ?? "");
  const [billingCycle, setBillingCycle] = useState("October 2026");
  const [amount, setAmount] = useState("₹16,462");
  const [dueDate, setDueDate] = useState("05 Oct 2026");
  const [payLink, setPayLink] = useState("https://pay.fahiq.in/inv/98450");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-rule pb-3">
          <div>
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-bold text-gold">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
              Meta WhatsApp Cloud API Validated
            </span>
            <h3 className="text-base font-bold text-ink">Send Approved WhatsApp Template</h3>
            <p className="text-xs text-ink-faint">Re-engage {tenantName} outside the active 24h session window.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Select Meta Approved Template</span>
          <select className="field" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
            {hsmTemplates.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2 rounded-lg bg-surface-sunken p-3">
          <span className="text-xs font-bold uppercase tracking-wide text-ink-faint">Dynamic Variable Payloads</span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-mono text-[11px] text-ink-faint">{"{{1}}"} Tenant Name</span>
              <input className="field !bg-surface" value={tenantName} readOnly />
            </div>
            <div>
              <span className="font-mono text-[11px] text-ink-faint">{"{{2}}"} Billing Cycle</span>
              <input className="field !bg-surface" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)} />
            </div>
            <div>
              <span className="font-mono text-[11px] text-ink-faint">{"{{3}}"} Amount Due</span>
              <input className="field !bg-surface font-mono" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <span className="font-mono text-[11px] text-ink-faint">{"{{4}}"} Due Date</span>
              <input className="field !bg-surface" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
          <div>
            <span className="font-mono text-[11px] text-ink-faint">{"{{5}}"} Direct UPI / Portal Link</span>
            <input className="field !bg-surface font-mono" value={payLink} onChange={(e) => setPayLink(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg bg-surface-sunken p-3">
          <span className="text-xs font-semibold text-ink-faint">Live Recipient Preview</span>
          <div className="rounded-xl bg-surface p-3 text-sm leading-relaxed text-ink shadow-sm">
            Dear <mark className="rounded bg-accent-soft px-1 font-semibold text-accent-ink">{tenantName}</mark>, your rent for{" "}
            <mark className="rounded bg-accent-soft px-1 font-semibold text-accent-ink">{billingCycle}</mark> of{" "}
            <mark className="rounded bg-accent-soft px-1 font-mono font-bold text-accent-ink">{amount}</mark> was due on{" "}
            <mark className="rounded bg-accent-soft px-1 font-semibold text-accent-ink">{dueDate}</mark>.<br />
            Kindly settle via Instant UPI or Card: <span className="font-mono text-info underline">{payLink}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSend();
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            <Send className="h-4 w-4" strokeWidth={2} />
            Send Template Message
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
