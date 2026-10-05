import { CheckCircle2 } from "lucide-react";
import type { Tenancy } from "../../../data/tenancies";

const inventoryItems = ["Bed", "Wardrobe", "Fan", "Geyser", "Wi-Fi Router"];

export function InspectionsTab({ tenancy }: { tenancy: Tenancy }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <h3 className="text-sm font-semibold text-ink">Move-in Inspection</h3>
      <p className="mt-0.5 text-xs text-ink-faint">
        Recorded on {new Date(tenancy.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {inventoryItems.map((item) => (
          <li key={item} className="flex items-center gap-2 rounded-lg bg-surface-sunken px-3 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" strokeWidth={2} />
            <span className="text-ink">{item}</span>
            <span className="ml-auto text-xs text-ink-faint">Good</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
