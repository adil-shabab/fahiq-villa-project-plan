import { ChevronDown, ReceiptText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Invoice } from "../../data/invoices";
import { formatINR } from "../../lib/format";
import { StatusPill } from "../payments/StatusPill";

const monthHeader = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" });
const paidOn = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

interface Props {
  history: Invoice[];
  onReceipt: (invoice: Invoice) => void;
}

export function HistoryTab({ history, onReceipt }: Props) {
  const years = [...new Set(history.map((i) => i.payment!.paidAt.slice(0, 4)))].sort().reverse();
  const [year, setYear] = useState(years[0] ?? "");

  const rows = history.filter((i) => i.payment!.paidAt.startsWith(year));
  // Group under the month the payment was made, newest first.
  const groups = new Map<string, Invoice[]>();
  for (const inv of rows) {
    const key = monthHeader.format(new Date(inv.payment!.paidAt));
    groups.set(key, [...(groups.get(key) ?? []), inv]);
  }

  if (history.length === 0) {
    return <p className="rounded-2xl border border-rule bg-surface px-5 py-10 text-center text-sm text-ink-muted">No payments yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="relative self-start">
        <span className="sr-only">Year</span>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-11 appearance-none rounded-xl border border-rule bg-surface pr-10 pl-4 text-sm font-semibold text-ink focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink-muted" />
      </label>

      {[...groups].map(([month, invoices]) => (
        <section key={month} aria-label={month}>
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">{month}</h3>
          <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex items-center">
                <Link
                  to={`/invoices/${inv.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 transition hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{inv.periodLabel}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs text-ink-faint">
                      <StatusPill status="paid" />
                      {paidOn.format(new Date(inv.payment!.paidAt))} · {inv.payment!.method}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-ink tabular-nums">{formatINR(inv.total)}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => onReceipt(inv)}
                  aria-label={`Receipt for ${inv.periodLabel}`}
                  className="mx-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
                >
                  <ReceiptText className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
