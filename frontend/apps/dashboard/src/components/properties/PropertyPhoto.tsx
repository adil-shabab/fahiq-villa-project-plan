import { Building2 } from "lucide-react";
import { cn } from "../../lib/utils";

// On-brand duotone gradients, picked deterministically from a seed string so
// the same property always renders the same "photo" without any network
// dependency — used in place of real photography in this dummy-data prototype.
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

const iconSizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export function PropertyPhoto({
  seed,
  className,
  iconSize = "lg",
}: {
  seed: string;
  className?: string;
  iconSize?: keyof typeof iconSizeClasses;
}) {
  const gradient = gradients[hashSeed(seed) % gradients.length];
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)} style={{ background: gradient }}>
      <Building2 className={cn(iconSizeClasses[iconSize], "text-white/40")} strokeWidth={1.5} />
    </div>
  );
}
