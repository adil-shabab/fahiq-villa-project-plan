import { CalendarClock, PartyPopper } from "lucide-react";
import { formatINR, formatShortDate } from "../../lib/format";
import { cn } from "../../lib/utils";
import type { Invoice } from "../../data/invoices";
import { PrimaryButton } from "../auth/PrimaryButton";

interface Props {
  dues: Invoice[];
  nextDueDate: string;
  /** Today's date (ISO yyyy-mm-dd), captured once by the page. */
  today: string;
  onPay: () => void;
}

export function DueCard({ dues, nextDueDate, today, onPay }: Props) {
  const total = dues.reduce((s, d) => s + d.balance, 0);
  const earliest = dues.map((d) => d.dueDate).sort()[0];
  const overdue = earliest !== undefined && earliest < today;

  if (dues.length === 0) {
    return (
      <section aria-label="Amount due" className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_1px_2px_rgba(23,33,29,0.05),0_14px_34px_-18px_rgba(23,33,29,0.18)]">
        <div className="h-1.5 bg-ok" />
        <div className="flex flex-col items-center px-5 py-7 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ok/12 text-ok">
            <PartyPopper className="h-8 w-8" />
          </div>
          <p className="mt-4 text-xl font-bold tracking-tight text-ink">You're all paid up! 🎉</p>
          <p className="mt-1 text-sm text-ink-muted">Next bill due {formatShortDate(nextDueDate)}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Amount due" className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_1px_2px_rgba(23,33,29,0.05),0_14px_34px_-18px_rgba(23,33,29,0.18)]">
      <div className={cn("h-1.5", overdue ? "bg-danger" : "bg-accent")} />
      <div className="px-5 pt-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold whitespace-nowrap text-ink-muted">Amount due</p>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
              overdue ? "bg-danger/12 text-danger" : "bg-warn/12 text-warn",
            )}
          >
            <CalendarClock className="h-3.5 w-3.5" />
            {overdue ? `Overdue since ${formatShortDate(earliest)}` : `Due ${formatShortDate(earliest)}`}
          </span>
        </div>
        <p className="mt-1 text-[2.5rem] leading-[3rem] font-extrabold tracking-tight text-ink tabular-nums">{formatINR(total)}</p>
        <p className="text-sm text-ink-faint">
          {dues.length === 1 ? dues[0].periodLabel : `${dues.length} unpaid invoices`}
        </p>
        <PrimaryButton type="button" className="mt-5" onClick={onPay}>
          Pay Now
        </PrimaryButton>
      </div>
    </section>
  );
}
