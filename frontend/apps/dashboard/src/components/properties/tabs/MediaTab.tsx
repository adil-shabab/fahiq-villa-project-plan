import type { Property } from "../../../data/properties";
import { PropertyPhoto } from "../PropertyPhoto";

export function MediaTab({ property }: { property: Property }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <h3 className="text-sm font-semibold text-ink">Photo Gallery</h3>
      <p className="mt-0.5 text-xs text-ink-faint">{property.gallerySeeds.length + 1} photos</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <PropertyPhoto seed={property.photoSeed} className="h-40 w-full rounded-lg" iconSize="md" />
        {property.gallerySeeds.map((seed) => (
          <PropertyPhoto key={seed} seed={seed} className="h-40 w-full rounded-lg" iconSize="md" />
        ))}
      </div>
    </div>
  );
}
