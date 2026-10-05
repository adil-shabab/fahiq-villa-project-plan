import { Check, ChevronRight, PartyPopper } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Invoice } from "../../data/invoices";
import { formatINR, formatShortDate } from "../../lib/format";
import { cn } from "../../lib/utils";
import { PrimaryButton } from "../auth/PrimaryButton";
import { StatusPill } from "../payments/StatusPill";
import { displayStatus } from "../../lib/invoiceStatus";

interface Props {
  dues: Invoice[];
  today: string;
  onPay: (ids?: string[]) => void;
}

export function DuesTab({ dues, today, onPay }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  // Drop selections for invoices that have since been paid.
  const selected = dues.filter((d) => checked.has(d.id));
  const selectedTotal = selected.reduce((s, d) => s + d.balance, 0);
  const total = dues.reduce((s, d) => s + d.balance, 0);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (dues.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-rule bg-surface px-6 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ok/12 text-ok">
          <PartyPopper className="h-8 w-8" />
        </span>
        <p className="mt-4 text-lg font-bold text-ink">No dues right now</p>
        <p className="mt-1 text-sm text-ink-muted">Paid invoices and receipts are under History.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <section aria-label="Total outstanding" className="rounded-2xl border border-rule bg-surface p-5">
        <p className="text-sm font-semibold text-ink-muted">Total Outstanding</p>
        <p className="mt-0.5 text-[2rem] leading-10 font-extrabold tracking-tight text-ink tabular-nums">{formatINR(total)}</p>
        <PrimaryButton type="button" className="mt-4" onClick={() => onPay()}>
          Pay Now
        </PrimaryButton>
      </section>

      <ul className="flex flex-col gap-2.5" aria-label="Unpaid invoices">
        {dues.map((d) => {
          const on = checked.has(d.id);
          return (
            <li key={d.id} className={cn("flex items-stretch rounded-2xl border-2 bg-surface transition", on ? "border-accent" : "border-rule")}>
              <label className="flex shrink-0 cursor-pointer items-center pl-4 pr-1 has-[:focus-visible]:[&>span]:ring-4 has-[:focus-visible]:[&>span]:ring-accent/20">
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(d.id)} aria-label={`Select ${d.periodLabel}`} />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md border-2",
                    on ? "border-accent bg-accent text-on-accent" : "border-rule-strong",
                  )}
                >
                  {on && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
              </label>
              <Link
                to={`/invoices/${d.id}`}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-r-2xl py-3.5 pr-3 pl-2 focus-visible:bg-surface-sunken focus-visible:outline-none"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-base font-semibold text-ink">{d.periodLabel}</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-ink-faint">
                    <StatusPill status={displayStatus(d, today)} />
                    Due {formatShortDate(d.dueDate)}
                  </span>
                </span>
                <span className="text-base font-bold text-ink tabular-nums">{formatINR(d.balance)}</span>
                <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
              </Link>
            </li>
          );
        })}
      </ul>

      {selected.length >= 2 && (
        <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-[448px]">
          <PrimaryButton type="button" className="shadow-[0_12px_28px_-10px_rgba(15,92,77,0.6)]" onClick={() => onPay(selected.map((d) => d.id))}>
            Pay Selected ({formatINR(selectedTotal)})
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
