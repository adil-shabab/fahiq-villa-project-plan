import { Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { tenancies } from "../../data/tenancies";
import { formatINR } from "../../lib/format";

interface DraftLine {
  id: string;
  chargeType: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const chargeTypes = ["Rent", "Electricity", "Water", "Maintenance", "Wi-Fi", "Late Fee", "Damage", "One-time", "Custom"];

export function GenerateInvoiceModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [tenancyId, setTenancyId] = useState(tenancies[0]?.id ?? "");
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lines, setLines] = useState<DraftLine[]>([{ id: "l1", chargeType: "Rent", description: "Monthly Rent", quantity: 1, unitPrice: 0 }]);

  const total = lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);

  function updateLine(id: string, patch: Partial<DraftLine>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function addLine() {
    setLines((prev) => [...prev, { id: `l${Date.now()}`, chargeType: "Custom", description: "", quantity: 1, unitPrice: 0 }]);
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Generate Ad-hoc Invoice</h2>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Tenancy</span>
              <select className="field" value={tenancyId} onChange={(e) => setTenancyId(e.target.value)}>
                {tenancies.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.tenantName} &middot; {t.unitCode}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Due Date</span>
              <input type="date" className="field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </label>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Line Items</span>
            <div className="flex flex-col gap-2">
              {lines.map((line) => (
                <div key={line.id} className="flex items-end gap-2 rounded-lg border border-rule bg-surface-sunken p-2.5">
                  <select className="field !bg-surface" value={line.chargeType} onChange={(e) => updateLine(line.id, { chargeType: e.target.value })}>
                    {chargeTypes.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    className="field !bg-surface"
                    placeholder="Description"
                    value={line.description}
                    onChange={(e) => updateLine(line.id, { description: e.target.value })}
                  />
                  <input
                    type="number"
                    className="field w-20 !bg-surface"
                    placeholder="Qty"
                    value={line.quantity}
                    onChange={(e) => updateLine(line.id, { quantity: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    className="field w-28 !bg-surface"
                    placeholder="Rate"
                    value={line.unitPrice}
                    onChange={(e) => updateLine(line.id, { unitPrice: Number(e.target.value) })}
                  />
                  <span className="w-24 shrink-0 text-right text-sm font-medium tabular-nums text-ink">{formatINR(line.quantity * line.unitPrice)}</span>
                  <button type="button" onClick={() => removeLine(line.id)} className="shrink-0 text-ink-faint hover:text-danger">
                    <X className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addLine} className="mt-2 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-ink">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Add Line
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-rule pt-3 text-sm">
            <span className="text-ink-faint">Total</span>
            <span className="text-lg font-bold tabular-nums text-ink">{formatINR(total)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg border border-rule px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong">
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => {
              onCreate();
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Create &amp; Issue Invoice
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
