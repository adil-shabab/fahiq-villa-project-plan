import { Bolt, Camera, Dumbbell, ParkingSquare, ShieldCheck, Sofa, Wifi, Wind } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { amenityCategories } from "../../data/settings";
import { cn } from "../../lib/utils";

const iconChoices = [Bolt, Wifi, Wind, Sofa, Dumbbell, ParkingSquare, ShieldCheck, Camera];

export function AddAmenityModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(amenityCategories[0]);
  const [iconIndex, setIconIndex] = useState(0);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-rule bg-surface p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-1.5">
            <Sofa className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
            <h3 className="text-sm font-bold text-ink">Catalog Amenity &amp; Spec</h3>
          </div>
          <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] font-semibold text-accent">Building Master</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink-faint">Amenity Name</span>
            <input className="field" placeholder="e.g. Smart Inverter Backup 24/7" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink-faint">Category</span>
            <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {amenityCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-1 block text-xs font-semibold text-ink-faint">Display Icon Badge</span>
          <div className="grid grid-cols-8 gap-1.5">
            {iconChoices.map((Icon, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIconIndex(i)}
                className={cn("flex h-8 items-center justify-center rounded shadow-sm", iconIndex === i ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-rule")}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </button>
            ))}
          </div>
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
            disabled={!name.trim()}
            className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Amenity
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
