import { Hammer } from "lucide-react";

/** Placeholder for portal tabs not built yet (docs/19 pages 3+). */
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-rule-strong bg-surface px-6 py-12 text-center">
        <Hammer className="h-8 w-8 text-ink-faint" />
        <p className="mt-3 text-base font-semibold text-ink">Coming soon</p>
        <p className="mt-1 text-sm text-ink-muted">This section is being built.</p>
      </div>
    </div>
  );
}
