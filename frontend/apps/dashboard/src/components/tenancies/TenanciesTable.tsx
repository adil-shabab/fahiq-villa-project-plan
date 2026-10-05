import { FileCheck, FileClock, FileX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tenancy } from "../../data/tenancies";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { DropdownMenu } from "../ui/DropdownMenu";

const statusTone = {
  Active: "info",
  Notice: "warn",
  "Ending Soon": "warn",
  Ended: "neutral",
} as const;

const agreementIcon = {
  Signed: { icon: FileCheck, tone: "text-ok" },
  Pending: { icon: FileClock, tone: "text-warn" },
  Expired: { icon: FileX, tone: "text-danger" },
};

export function TenanciesTable({
  tenancies,
  onRenew,
  onRecordNotice,
}: {
  tenancies: Tenancy[];
  onRenew: (t: Tenancy) => void;
  onRecordNotice: (t: Tenancy) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Tenant</th>
            <th className="px-3 py-2.5 font-semibold">Unit</th>
            <th className="px-3 py-2.5 text-right font-semibold">Rent</th>
            <th className="px-3 py-2.5 font-semibold">Lease Period</th>
            <th className="px-3 py-2.5 font-semibold">Status</th>
            <th className="px-3 py-2.5 text-right font-semibold">Outstanding</th>
            <th className="px-3 py-2.5 font-semibold">Agreement</th>
            <th className="w-12 px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {tenancies.map((t) => {
            const AgreementIcon = agreementIcon[t.agreementStatus].icon;
            return (
              <tr
                key={t.id}
                onClick={() => navigate(`/tenancies/${t.id}`)}
                className="cursor-pointer border-b border-rule last:border-b-0 hover:bg-surface-sunken/60"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={t.avatarInitials} size="sm" />
                    <span className="font-medium text-ink">{t.tenantName}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-muted">
                  {t.unitCode} &middot; {t.propertyName}
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{formatINR(t.rent)}</td>
                <td className="px-3 py-3 text-ink-muted">
                  {new Date(t.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })} &ndash;{" "}
                  {new Date(t.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                </td>
                <td className="px-3 py-3">
                  <Badge tone={statusTone[t.status]}>{t.status}</Badge>
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {t.outstandingBalance > 0 ? (
                    <span className="font-semibold text-danger">{formatINR(t.outstandingBalance)}</span>
                  ) : (
                    <span className="text-ok">Paid up</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <AgreementIcon className={`h-4 w-4 ${agreementIcon[t.agreementStatus].tone}`} strokeWidth={2} />
                </td>
                <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu
                    actions={[
                      { label: "View", onSelect: () => navigate(`/tenancies/${t.id}`) },
                      { label: "Record Payment", onSelect: () => navigate(`/tenancies/${t.id}`) },
                      { label: "Send Reminder", onSelect: () => {} },
                      { label: "Renew", onSelect: () => onRenew(t) },
                      { label: "Record Notice", onSelect: () => onRecordNotice(t) },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
          {tenancies.length === 0 && (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-sm text-ink-faint">
                No tenancies match these filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
