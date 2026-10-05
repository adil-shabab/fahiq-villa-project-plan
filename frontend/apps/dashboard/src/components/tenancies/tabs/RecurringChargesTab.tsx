import { Plus } from "lucide-react";
import { useState } from "react";
import type { RecurringCharge, Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";
import { AddRecurringChargeModal } from "../AddRecurringChargeModal";

export function RecurringChargesTab({ tenancy, onAdd }: { tenancy: Tenancy; onAdd: (charge: RecurringCharge) => void }) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="rounded-xl border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
        <h3 className="text-sm font-semibold text-ink">Recurring Charges</h3>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-ink"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add Charge
        </button>
      </div>
      <ul>
        {tenancy.recurringCharges.map((charge) => (
          <li key={charge.id} className="flex items-center justify-between border-b border-rule px-5 py-3 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-ink">{charge.type}</p>
              <p className="text-xs text-ink-faint">From {charge.startPeriod}{charge.notes ? ` · ${charge.notes}` : ""}</p>
            </div>
            <span className="font-medium tabular-nums text-ink">{formatINR(charge.amount)}/mo</span>
          </li>
        ))}
        {tenancy.recurringCharges.length === 0 && <li className="px-5 py-6 text-center text-sm text-ink-faint">No recurring charges set.</li>}
      </ul>

      {showAdd && <AddRecurringChargeModal onClose={() => setShowAdd(false)} onAdd={onAdd} />}
    </div>
  );
}
