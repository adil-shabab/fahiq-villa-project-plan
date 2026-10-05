import { ChevronLeft, ChevronRight, FileImage, FileText, MoreVertical, Receipt, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { properties } from "../../data/properties";
import { transactionTabs, transactions, type TxnStatus } from "../../data/payments";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";
import { channelIcons } from "./channelIcons";

const statusClasses: Record<TxnStatus, string> = {
  Success: "bg-ok/10 text-ok",
  "Needs Verification": "bg-gold-soft text-gold",
  "Auto-Debit Failed": "bg-danger/15 text-danger",
  "Refund Settled": "bg-info/10 text-info",
  "In Clearing": "bg-gold-soft text-gold",
};

const tabFilter: Record<(typeof transactionTabs)[number], (t: (typeof transactions)[number]) => boolean> = {
  "All Transactions": () => true,
  "UPI & Online": (t) => t.channelIcon === "upi" || t.channelIcon === "qr",
  "Bank Transfer / NEFT": (t) => t.channelIcon === "bank" || t.channelIcon === "failed",
  "Cash / Cheque": (t) => t.channelIcon === "cheque",
  "Refunds & Disputes": (t) => !!t.isRefund,
};

export function TransactionsTable() {
  const [tab, setTab] = useState<(typeof transactionTabs)[number]>("All Transactions");
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (!tabFilter[tab](t)) return false;
      if (search && !`${t.id} ${t.tenantName} ${t.unitCode} ${t.channelRef}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (property !== "all" && t.propertyName !== property) return false;
      if (status !== "all" && t.status !== status) return false;
      return true;
    });
  }, [tab, search, property, status]);

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto px-4 pt-4">
        {transactionTabs.map((t) => {
          const count = transactions.filter(tabFilter[t]).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                tab === t ? "bg-accent text-white shadow-sm" : "text-ink-muted hover:bg-surface-sunken",
              )}
            >
              <span>{t}</span>
              <span className={cn("rounded-full px-1.5 py-0.5 text-[11px]", tab === t ? "bg-white/20" : "bg-surface-sunken text-ink-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-stretch gap-2.5 p-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input className="field pl-9" placeholder="Search by Txn ID, Tenant Name, Unit No, or UTR..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="field w-auto" value={property} onChange={(e) => setProperty(e.target.value)}>
            <option value="all">All Properties ({properties.length} Buildings)</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <select className="field w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Status: All (Success, Pending, Failed)</option>
            <option value="Success">Success</option>
            <option value="Needs Verification">Needs Verification</option>
            <option value="Auto-Debit Failed">Failed</option>
            <option value="Refund Settled">Refunded</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Transaction ID &amp; Date</th>
              <th className="px-4 py-3 font-semibold">Tenant &amp; Property</th>
              <th className="px-4 py-3 font-semibold">Invoice &amp; Purpose</th>
              <th className="px-4 py-3 font-semibold">Channel / Gateway Ref</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const ChannelIcon = channelIcons[t.channelIcon];
              return (
                <tr key={t.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className={cn("font-mono text-xs font-semibold", t.isFailed ? "text-danger" : "text-accent")}>{t.id}</span>
                      <span className="text-[11px] text-ink-faint">{t.dateLabel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={t.avatarInitials} size="sm" />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-semibold text-ink">{t.tenantName}</span>
                        <span className="truncate text-[11px] text-ink-faint">
                          {t.propertyName} · {t.unitCode}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-medium text-ink">{t.purpose}</span>
                      <span className="font-mono text-[11px] text-ink-faint">{t.refNumber}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <ChannelIcon className={cn("h-4 w-4", t.isFailed ? "text-danger" : "text-accent")} strokeWidth={2} />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-ink">{t.channelLabel}</span>
                        <span className={cn("font-mono text-[11px]", t.isFailed ? "text-danger" : "text-ink-faint")}>{t.channelRef}</span>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right">
                    <span
                      className={cn(
                        "font-mono font-bold",
                        t.isFailed ? "text-ink-faint line-through" : t.isRefund ? "text-info" : "text-ok",
                      )}
                    >
                      {t.isRefund ? "-" : ""}
                      {formatINR(t.amount)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", statusClasses[t.status])}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {t.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-center">
                    {t.status === "Needs Verification" ? (
                      <button type="button" className="rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-white hover:opacity-90">
                        Verify UTR
                      </button>
                    ) : t.status === "Auto-Debit Failed" ? (
                      <button type="button" className="mx-auto flex items-center gap-1 rounded-md bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-danger hover:bg-rule">
                        <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                        Retry Debit
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button type="button" title={t.status === "In Clearing" ? "View Slip" : t.isRefund ? "Settlement Voucher" : "Download Receipt"} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">
                          {t.status === "In Clearing" ? <FileImage className="h-4 w-4" strokeWidth={2} /> : t.isRefund ? <FileText className="h-4 w-4" strokeWidth={2} /> : <Receipt className="h-4 w-4" strokeWidth={2} />}
                        </button>
                        <button type="button" title="More actions" className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">
                          <MoreVertical className="h-4 w-4" strokeWidth={2} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-faint">
                  No transactions match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2.5 bg-surface-sunken/40 p-4 sm:flex-row">
        <span className="text-xs text-ink-muted">
          Showing <strong className="text-ink">1 - {filtered.length}</strong> of <strong className="text-ink">{filtered.length}</strong> transactions
        </span>
        <div className="flex items-center gap-1">
          <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-ink-faint shadow-sm disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button type="button" className="h-8 w-8 rounded-lg bg-accent text-xs font-bold text-white shadow-sm">1</button>
          <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-ink-faint shadow-sm disabled:opacity-40">
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
