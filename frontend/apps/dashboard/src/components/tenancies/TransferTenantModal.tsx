import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/properties";
import type { Tenancy } from "../../data/tenancies";
import { formatINR } from "../../lib/format";

export function TransferTenantModal({ tenancy, onClose, onConfirm }: { tenancy: Tenancy; onClose: () => void; onConfirm: (newUnitCode: string) => void }) {
  const availableUnits = useMemo(
    () => properties.flatMap((p) => p.units.filter((u) => u.status === "Available").map((u) => ({ ...u, propertyName: p.name }))),
    [],
  );
  const [selected, setSelected] = useState(availableUnits[0]?.id ?? "");
  const [effectiveDate, setEffectiveDate] = useState(() => new Date().toISOString().slice(0, 10));
  const unit = availableUnits.find((u) => u.id === selected);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Transfer to Another Unit</h2>
          <p className="mt-1 text-sm text-ink-muted">
            For <b className="text-ink">{tenancy.tenantName}</b>
          </p>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">New Unit</span>
            <select className="field" value={selected} onChange={(e) => setSelected(e.target.value)}>
              {availableUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.code} &middot; {u.propertyName} &middot; {formatINR(u.rent)}/mo
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Effective Date</span>
            <input type="date" className="field" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
          </label>

          {unit && (
            <div className="rounded-lg bg-accent-soft px-3.5 py-3 text-sm text-accent-ink">
              The current tenancy at {tenancy.unitCode} will end on {effectiveDate}, and a new tenancy will start in {unit.code} carrying over the
              deposit of {formatINR(tenancy.depositHeld)}.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={!unit}
            onClick={() => {
              if (unit) onConfirm(unit.code);
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
