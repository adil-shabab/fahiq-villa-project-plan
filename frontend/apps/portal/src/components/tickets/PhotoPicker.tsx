import { Camera, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export interface PickedPhoto {
  file: File;
  /** Object URL for the preview; created on add, revoked on remove / unmount. */
  url: string;
}

interface Props {
  photos: PickedPhoto[];
  onChange: (photos: PickedPhoto[]) => void;
  max?: number;
  size?: "md" | "sm";
}

/** Thumbnails of picked photos plus an "Add" tile. */
export function PhotoPicker({ photos, onChange, max = 4, size = "md" }: Props) {
  const latest = useRef(photos);
  useEffect(() => {
    latest.current = photos;
  }, [photos]);
  useEffect(() => () => latest.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const box = size === "md" ? "h-18 w-18" : "h-12 w-12";

  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((p, i) => (
        <div key={p.url} className={cn("relative overflow-hidden rounded-xl border border-rule bg-surface-sunken", box)}>
          <img src={p.url} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(p.url);
              onChange(photos.filter((x) => x !== p));
            }}
            aria-label={`Remove photo ${i + 1}`}
            className="absolute top-0.5 right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      {photos.length < max && (
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-dashed border-rule-strong text-xs font-semibold text-ink-muted transition hover:border-accent hover:text-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20",
            box,
          )}
        >
          <Camera className="h-5 w-5" />
          {size === "md" && "Add"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            aria-label="Add photos"
            onChange={(e) => {
              const picked = Array.from(e.target.files ?? []).slice(0, max - photos.length);
              if (picked.length) onChange([...photos, ...picked.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
              e.target.value = "";
            }}
          />
        </label>
      )}
    </div>
  );
}
