import {
  Baby,
  Camera,
  Car,
  CheckCircle2,
  Dumbbell,
  FlameKindling,
  Flower2,
  Lamp,
  PhoneCall,
  ShieldCheck,
  Sofa,
  Sparkles,
  TreePine,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Property } from "../../../data/properties";

const amenityIcons: Record<string, LucideIcon> = {
  Lift: Lamp,
  "Power Backup": FlameKindling,
  "Gated Community": ShieldCheck,
  "Visitor Parking": Car,
  "Fire Safety": FlameKindling,
  CCTV: Camera,
  "Security Guard": ShieldCheck,
  Intercom: PhoneCall,
  Garden: Flower2,
  "Children's Play Area": Baby,
  "Swimming Pool": Waves,
  Gym: Dumbbell,
  Housekeeping: Sparkles,
  "Common Lounge": Sofa,
  "Terrace Access": TreePine,
};

export function AmenitiesTab({ property }: { property: Property }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <h3 className="text-sm font-semibold text-ink">Building &amp; Common Amenities</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {property.amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] ?? CheckCircle2;
          return (
            <div key={amenity} className="flex items-center gap-2.5 rounded-lg border border-rule bg-surface-sunken px-3 py-2.5 text-sm text-ink">
              <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
              {amenity}
            </div>
          );
        })}
      </div>
    </div>
  );
}
