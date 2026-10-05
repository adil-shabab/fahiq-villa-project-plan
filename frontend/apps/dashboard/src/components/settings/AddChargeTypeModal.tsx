import { CreditCard } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { chargeTypeDefaults } from "../../data/settings";
import { cn } from "../../lib/utils";

export function AddChargeTypeModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [title, setTitle] = useState(chargeTypeDefaults.title);
  const [amount, setAmount] = useState(chargeTypeDefaults.amount);
  const [recurring, setRecurring] = useState(chargeTypeDefaults.recurring);
  const [taxable, setTaxable] = useState(chargeTypeDefaults.taxable);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-rule bg-surface p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-1.5">
            <CreditCard className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
            <h3 className="text-sm font-bold text-ink">Add Custom Billable Charge Type</h3>
          </div>
          <span className="font-mono text-[10px] text-ink-faint">CODE: {chargeTypeDefaults.code}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink-faint">Charge Title</span>
            <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink-faint">Default Amount (₹)</span>
            <input className="field font-mono" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-ink">Recurring Monthly Ledger Item</span>
            <span className="text-[10px] text-ink-faint">Auto-adds to regular rent invoice cycle</span>
          </div>
          <button
            type="button"
            onClick={() => setRecurring((v) => !v)}
            className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", recurring ? "bg-accent" : "bg-rule-strong")}
          >
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: recurring ? "translateX(16px)" : "translateX(0)" }} />
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-ink">Taxable Under GST (18% HSN 9984)</span>
            <span className="text-[10px] text-ink-faint">Calculates IGST / CGST breakdown</span>
          </div>
          <button
            type="button"
            onClick={() => setTaxable((v) => !v)}
            className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", taxable ? "bg-accent" : "bg-rule-strong")}
          >
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: taxable ? "translateX(16px)" : "translateX(0)" }} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-ink"
          >
            Save Charge
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
