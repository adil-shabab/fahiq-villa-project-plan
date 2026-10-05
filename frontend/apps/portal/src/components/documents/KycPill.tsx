import type { KycStatus } from "../../data/documents";
import { cn } from "../../lib/utils";

const meta: Record<KycStatus, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-ok/12 text-ok" },
  pending: { label: "Pending", className: "bg-warn/12 text-warn" },
  rejected: { label: "Rejected", className: "bg-danger/12 text-danger" },
};

export function KycPill({ status }: { status: KycStatus }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", meta[status].className)}>{meta[status].label}</span>;
}
