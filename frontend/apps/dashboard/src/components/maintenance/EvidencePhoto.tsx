import { Camera } from "lucide-react";
import { cn } from "../../lib/utils";

const gradients = [
  "linear-gradient(135deg, #cfe3da 0%, #6fa98f 100%)",
  "linear-gradient(135deg, #f3dfc0 0%, #c99a5a 100%)",
  "linear-gradient(135deg, #d6e4ef 0%, #7f9cc2 100%)",
  "linear-gradient(135deg, #e7d9ef 0%, #9d84b5 100%)",
  "linear-gradient(135deg, #dce8c9 0%, #8aab6a 100%)",
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function EvidencePhoto({ seed, label, className }: { seed: string; label: string; className?: string }) {
  const gradient = gradients[hashSeed(seed) % gradients.length];
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-lg", className)} style={{ background: gradient }}>
      <Camera className="h-6 w-6 text-white/40" strokeWidth={1.5} />
      <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{label}</span>
    </div>
  );
}
