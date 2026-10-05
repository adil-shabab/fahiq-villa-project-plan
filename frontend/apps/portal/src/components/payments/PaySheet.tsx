import { Building2, Check, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import type { Invoice } from "../../data/invoices";
import { formatINR, formatShortDate } from "../../lib/format";
import { payInvoices } from "../../lib/store";
import { cn } from "../../lib/utils";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
  dues: Invoice[];
  /** Invoice ids to pre-select; defaults to all unpaid invoices. */
  initialSelected?: string[];
  onPaid: (amount: number) => void;
}

export function PaySheet({ open, onClose, dues, initialSelected, onPaid }: Props) {
  // Mounted fresh each time it opens, so the selection resets on every open.
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initialSelected ?? dues.map((d) => d.id)));
  const [paying, setPaying] = useState(false);

  const chosen = dues.filter((d) => selected.has(d.id));
  const total = chosen.reduce((s, d) => s + d.balance, 0);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handlePay() {
    setPaying(true);
    try {
      const amount = await payInvoices(chosen.map((d) => d.id));
      onPaid(amount);
    } finally {
      setPaying(false);
    }
  }

  return (
    <BottomSheet
      open={open}
      onClose={paying ? () => {} : onClose}
      title="Pay Now"
      footer={
        <>
          <PrimaryButton type="button" onClick={handlePay} loading={paying} disabled={chosen.length === 0}>
            {paying ? "Processing payment…" : `Pay ${formatINR(total)} via UPI / Card`}
          </PrimaryButton>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-medium text-ink-faint" aria-label="Accepted payment methods">
            <span className="inline-flex items-center gap-1"><Smartphone className="h-4 w-4" />UPI</span>
            <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4" />Visa / Mastercard</span>
            <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" />Netbanking</span>
          </div>
        </>
      }
    >
      {dues.length > 1 && (
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-ink-muted">Choose what to pay</legend>
          <ul className="flex flex-col gap-2">
            {dues.map((d) => {
              const on = selected.has(d.id);
              return (
                <li key={d.id}>
                  <label
                    className={cn(
                      "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-3.5 py-3 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20",
                      on ? "border-accent bg-accent-soft/50" : "border-rule bg-surface",
                    )}
                  >
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(d.id)} />
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2",
                        on ? "border-accent bg-accent text-on-accent" : "border-rule-strong",
                      )}
                    >
                      {on && <Check className="h-4 w-4" strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">{d.periodLabel}</span>
                      <span className="block text-xs text-ink-faint">{d.number} · due {formatShortDate(d.dueDate)}</span>
                    </span>
                    <span className="text-sm font-bold text-ink tabular-nums">{formatINR(d.balance)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      <div className="rounded-xl bg-surface-sunken p-4">
        <p className="mb-2 text-sm font-semibold text-ink-muted">You're paying</p>
        {chosen.length === 0 ? (
          <p className="text-sm text-ink-faint">Select at least one invoice.</p>
        ) : (
          <dl className="flex flex-col gap-1.5 text-sm">
            {chosen.flatMap((d) =>
              d.lines.map((l) => (
                <div key={`${d.id}-${l.label}`} className="flex justify-between gap-3">
                  <dt className="text-ink-muted">{l.label}</dt>
                  <dd className="font-medium text-ink tabular-nums">{formatINR(l.amount)}</dd>
                </div>
              )),
            )}
            <div className="mt-2 flex justify-between gap-3 border-t border-rule pt-2.5 text-base">
              <dt className="font-bold text-ink">Total</dt>
              <dd className="font-extrabold text-ink tabular-nums">{formatINR(total)}</dd>
            </div>
          </dl>
        )}
      </div>
    </BottomSheet>
  );
}
