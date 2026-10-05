import { CheckCheck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/properties";
import { cn } from "../../lib/utils";

const methods = ["NEFT/RTGS", "UPI", "Cheque"];

export function RecordPayoutModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? "");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("NEFT/RTGS");
  const [beneficiary, setBeneficiary] = useState("");
  const [utr, setUtr] = useState("");
  const [notes, setNotes] = useState("");

  const amountNum = Number(amount.replace(/[^0-9]/g, "")) || 0;
  const tds = Math.round(amountNum * 0.1);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div>
            <h3 className="text-base font-bold text-ink">Record Owner Payout</h3>
            <p className="text-xs text-ink-faint">Equity Yield &amp; Profit Distribution</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Target Property / SPV</span>
            <select className="field" value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              <option value="portfolio">Consolidated Portfolio Distribution</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Distribution Date</span>
            <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Net Disbursal Sum (₹)</span>
            <input className="field font-mono" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Payout Mechanism</span>
            <div className="grid h-9 grid-cols-3 gap-1 rounded-lg bg-surface-sunken p-0.5">
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={cn("rounded text-[11px] font-semibold", method === m ? "bg-gold text-white" : "text-ink-muted hover:text-ink")}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Beneficiary Bank Account</span>
          <div className="relative flex items-center">
            <input className="field pr-8" placeholder="e.g. HDFC Bank · A/c ending 4821 (Owner Name)" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} />
            <ShieldCheck className="absolute right-2.5 h-4 w-4 text-accent" strokeWidth={2} />
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reference / Bank UTR #</span>
            <input className="field font-mono" placeholder="UTR number" value={utr} onChange={(e) => setUtr(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">TDS 194-I Retained (10%)</span>
            <input className="field cursor-not-allowed bg-surface-sunken font-mono" readOnly value={`₹${tds.toLocaleString("en-IN")} (Challan Pending)`} />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Distribution Notes &amp; Clauses</span>
          <input className="field" placeholder="e.g. Q4 rental yield distribution post maintenance reserve deductions" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            disabled={!amount.trim() || !beneficiary.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck className="h-4 w-4" strokeWidth={2} />
            Record Disbursal
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
