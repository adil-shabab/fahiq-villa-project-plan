import { Download } from "lucide-react";
import type { LedgerRow } from "../../lib/ledger";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const rowDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

interface Props {
  rows: LedgerRow[];
  onDownload: () => void;
}

export function StatementTab({ rows, onDownload }: Props) {
  const balance = rows[0]?.balance ?? 0;
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onDownload}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-accent bg-surface text-base font-semibold text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
      >
        <Download className="h-5 w-5" />
        Download Statement
      </button>

      <div className="flex items-baseline justify-between px-1">
        <p className="text-sm font-semibold text-ink-muted">Current balance</p>
        <p className={cn("text-lg font-extrabold tabular-nums", balance > 0 ? "text-danger" : "text-ok")}>{formatINR(balance)}</p>
      </div>

      <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface" aria-label="Statement of account, newest first">
        {rows.map((r) => {
          const charge = r.amount > 0;
          return (
            <li key={r.id} className="flex items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{r.description}</span>
                <span className="block text-xs text-ink-faint">{rowDate.format(new Date(`${r.date}T00:00:00`))}</span>
              </span>
              <span className="text-right">
                <span className={cn("block text-sm font-bold tabular-nums", charge ? "text-danger" : "text-ok")}>
                  {charge ? "+" : "−"}
                  {formatINR(Math.abs(r.amount))}
                </span>
                <span className="block text-xs text-ink-faint tabular-nums">Bal {formatINR(r.balance)}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
