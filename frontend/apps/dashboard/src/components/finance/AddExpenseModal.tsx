import { Paperclip, Save } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/properties";
import { cn } from "../../lib/utils";

const categories = ["Repairs & Maintenance", "Utilities (BESCOM / Water)", "Salaries & Staffing", "Society Maintenance", "Supplies & Housekeeping"];
const methods = ["Cash", "Card", "NEFT", "UPI"];

export function AddExpenseModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(categories[0]);
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? "");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [memo, setMemo] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div>
            <h3 className="text-base font-bold text-ink">Add New Expense</h3>
            <p className="text-xs text-ink-faint">Live Ledger Entry System</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Transaction Date</span>
            <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Expense Category</span>
            <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Property Assigned</span>
            <select className="field" value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              <option value="portfolio">Portfolio-wide (Shared Cost)</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Vendor Entity</span>
            <input className="field" placeholder="Vendor name" value={vendor} onChange={(e) => setVendor(e.target.value)} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Disbursement Amount (₹)</span>
            <input className="field font-mono" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Payment Method</span>
            <div className="grid h-9 grid-cols-4 gap-1 rounded-lg bg-surface-sunken p-0.5">
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={cn("rounded text-[11px] font-semibold", method === m ? "bg-accent text-white" : "text-ink-muted hover:text-ink")}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Expense Narrative / Memo</span>
          <input className="field" placeholder="Short description of this expense..." value={memo} onChange={(e) => setMemo(e.target.value)} />
        </label>

        <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-3">
          <div className="flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-accent" strokeWidth={2} />
            <span className="text-xs text-ink-muted">Attach receipt / invoice (optional)</span>
          </div>
          <button type="button" className="text-xs font-semibold text-accent hover:underline">Browse</button>
        </div>

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
            disabled={!amount.trim() || !vendor.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" strokeWidth={2} />
            Add Expense
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
