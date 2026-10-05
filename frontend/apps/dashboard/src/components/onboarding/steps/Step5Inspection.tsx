import { Camera, Plus } from "lucide-react";
import type { InventoryItem, OnboardingDraft } from "../../../data/onboarding";
import { cn } from "../../../lib/utils";

const conditions: InventoryItem["condition"][] = ["New", "Good", "Fair", "Damaged"];

export function Step5Inspection({ draft, onChange }: { draft: OnboardingDraft; onChange: (patch: Partial<OnboardingDraft>) => void }) {
  function updateItem(id: string, patch: Partial<InventoryItem>) {
    onChange({ inventory: draft.inventory.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  }

  function addItem() {
    onChange({ inventory: [...draft.inventory, { id: `inv${Date.now()}`, label: "", condition: "Good", notes: "" }] });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Move-in Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-xs uppercase tracking-wide text-ink-faint">
                <th className="py-2 pr-3 font-semibold">Item</th>
                <th className="py-2 pr-3 font-semibold">Condition</th>
                <th className="py-2 pr-3 font-semibold">Photo</th>
                <th className="py-2 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {draft.inventory.map((item) => (
                <tr key={item.id} className="border-b border-rule last:border-b-0">
                  <td className="py-2 pr-3">
                    <input
                      className="field"
                      value={item.label}
                      onChange={(e) => updateItem(item.id, { label: e.target.value })}
                      placeholder="Item name"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex gap-1">
                      {conditions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => updateItem(item.id, { condition: c })}
                          className={cn(
                            "rounded-md border px-2 py-1 text-[11px] font-medium",
                            item.condition === c ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-faint hover:border-rule-strong",
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 pr-3">
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-rule-strong text-ink-faint hover:border-accent hover:text-accent">
                      <Camera className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </td>
                  <td className="py-2">
                    <input className="field" value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder="Optional" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={addItem} className="mt-3 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-ink">
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add Item
        </button>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Opening Meter Readings</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Electricity Reading</label>
            <div className="flex gap-2">
              <input
                className="field"
                value={draft.openingElectricityReading}
                onChange={(e) => onChange({ openingElectricityReading: e.target.value })}
                placeholder="e.g. 4820"
              />
              <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-rule-strong text-ink-faint hover:border-accent hover:text-accent">
                <Camera className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Water Reading</label>
            <div className="flex gap-2">
              <input
                className="field"
                value={draft.openingWaterReading}
                onChange={(e) => onChange({ openingWaterReading: e.target.value })}
                placeholder="e.g. 112"
              />
              <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-rule-strong text-ink-faint hover:border-accent hover:text-accent">
                <Camera className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
