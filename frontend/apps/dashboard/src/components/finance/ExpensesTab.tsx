import { CreditCard, Landmark, MoreVertical, Paperclip, QrCode, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { properties } from "../../data/properties";
import { expenseCategories, expenses, totalExpenseEntriesThisMonth, type ExpenseCategory } from "../../data/finance";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { ExpenseCategoryTiles } from "./ExpenseCategoryTiles";

const categoryClasses: Record<ExpenseCategory, string> = {
  Repairs: "bg-gold-soft text-gold",
  Utilities: "bg-info/10 text-info",
  Salaries: "bg-surface-sunken text-ink-muted",
  "Society Maint": "bg-accent-soft text-accent-ink",
  Supplies: "bg-ok/10 text-ok",
};

const methodIcon = { UPI: QrCode, "UPI Autopay": QrCode, "Bank Auto": RefreshCw, "Bank (NEFT)": Landmark, "Corp Card": CreditCard } as const;

export function ExpensesTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof expenseCategories)[number]>("All Categories");
  const [property, setProperty] = useState("all");

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (search && !`${e.description} ${e.vendor} ${e.refLabel}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All Categories" && e.category !== category) return false;
      if (property !== "all" && e.propertyName !== property) return false;
      return true;
    });
  }, [search, category, property]);

  return (
    <section className="flex flex-col gap-4">
      <ExpenseCategoryTiles />

      <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2.5" style={{ minWidth: 300 }}>
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
              <input className="field pl-9" placeholder="Search expense description, vendor, invoice #..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="field w-auto" value={category} onChange={(e) => setCategory(e.target.value as (typeof expenseCategories)[number])}>
              {expenseCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select className="field w-auto" value={property} onChange={(e) => setProperty(e.target.value)}>
              <option value="all">All Properties ({properties.length})</option>
              {properties.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
              <option value="Portfolio-wide">Portfolio-wide</option>
            </select>
          </div>
          <span className="text-xs text-ink-muted">01 Oct 2026 - 31 Oct 2026</span>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Vendor</th>
                <th className="px-4 py-3 text-right font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 text-center font-semibold">Receipt</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const MethodIcon = methodIcon[e.method as keyof typeof methodIcon] ?? QrCode;
                return (
                  <tr key={e.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                    <td className="px-4 py-3.5 font-mono text-xs text-ink">{e.date}</td>
                    <td className="max-w-[240px] px-4 py-3.5">
                      <div className="truncate font-medium text-ink" title={e.description}>{e.description}</div>
                      <span className="text-xs text-ink-faint">{e.refLabel}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", categoryClasses[e.category])}>{e.category}</span>
                    </td>
                    <td className="px-4 py-3.5 text-ink">{e.propertyName}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-ink">{e.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-ink">{formatINR(e.amount)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 text-xs text-ink-muted">
                        <MethodIcon className="h-4 w-4 text-accent" strokeWidth={2} />
                        <span>{e.method}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 rounded bg-surface-sunken px-2 py-1 text-[11px] text-accent">
                        <Paperclip className="h-3.5 w-3.5" strokeWidth={2} />
                        {e.receiptLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button type="button" className="rounded p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink">
                        <MoreVertical className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm text-ink-faint">No expenses match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-ink-muted">
          <span>
            Showing {filtered.length} of {totalExpenseEntriesThisMonth} expenses recorded in October 2026
          </span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded bg-surface-sunken px-2.5 py-1 text-ink hover:bg-rule">Previous</button>
            <button type="button" className="rounded bg-accent px-2.5 py-1 font-bold text-white">1</button>
            <button type="button" className="rounded bg-surface-sunken px-2.5 py-1 text-ink hover:bg-rule">2</button>
            <button type="button" className="rounded bg-surface-sunken px-2.5 py-1 text-ink hover:bg-rule">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
