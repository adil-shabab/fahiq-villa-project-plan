import { ShieldCheck } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgba(15,92,77,0.6)]">
        <ShieldCheck className="h-7 w-7" strokeWidth={2.25} />
      </div>
      <div className="text-center">
        <p className="text-xl font-extrabold tracking-tight text-ink">Fahiq</p>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Tenant Portal</p>
      </div>
    </div>
  );
}
