import type { InvoiceDisplayStatus } from "../../lib/invoiceStatus";
import { cn } from "../../lib/utils";

const styles: Record<InvoiceDisplayStatus, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-ok/12 text-ok" },
  overdue: { label: "Overdue", className: "bg-danger/12 text-danger" },
  due_soon: { label: "Due Soon", className: "bg-warn/12 text-warn" },
  due: { label: "Due", className: "bg-info/12 text-info" },
};

export function StatusPill({ status, className }: { status: InvoiceDisplayStatus; className?: string }) {
  const s = styles[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", s.className, className)}>
      {s.label}
    </span>
  );
}
