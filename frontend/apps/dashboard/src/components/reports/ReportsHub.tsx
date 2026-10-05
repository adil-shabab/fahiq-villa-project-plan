import { ArrowRight, History, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { reportCatalog, reportCategories, type ReportCategory } from "../../data/reports";
import { cn } from "../../lib/utils";
import { catalogIcons } from "./catalogIcons";

export function ReportsHub({ onOpenRentRoll }: { onOpenRentRoll: () => void }) {
  const [category, setCategory] = useState<ReportCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return reportCatalog.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, search]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-rule bg-surface p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {reportCategories.map((c) => {
            const count = c.id === "all" ? reportCatalog.length : reportCatalog.filter((r) => r.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide",
                  category === c.id ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-rule",
                )}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input className="field pl-8" placeholder="Search standard reports..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((r) => {
          const Icon = catalogIcons[r.id];
          const clickable = r.id === "rent-roll";
          return (
            <div
              key={r.id}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? onOpenRentRoll : undefined}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-rule bg-surface p-4 shadow-sm transition-all hover:shadow-md",
                clickable && "cursor-pointer",
              )}
            >
              {clickable && <div className="absolute inset-x-0 top-0 h-1 bg-accent" />}
              <div>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-sunken text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                  </div>
                  <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">{r.badge}</span>
                </div>
                <h3 className="text-base font-bold text-ink transition-colors group-hover:text-accent">{r.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{r.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ink-faint">
                <span className="flex items-center gap-1">
                  <History className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
                  {r.lastViewedLabel}
                </span>
                {clickable && <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" strokeWidth={2} />}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-ink-faint">No reports match these filters.</p>}
      </div>
    </section>
  );
}
