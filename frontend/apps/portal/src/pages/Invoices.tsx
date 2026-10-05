import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DownloadStatementSheet } from "../components/invoices/DownloadStatementSheet";
import { DuesTab } from "../components/invoices/DuesTab";
import { HistoryTab } from "../components/invoices/HistoryTab";
import { ReceiptSheet } from "../components/invoices/ReceiptSheet";
import { StatementTab } from "../components/invoices/StatementTab";
import { PaySheet } from "../components/payments/PaySheet";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { Toast } from "../components/ui/Toast";
import { tenantProfile } from "../data/home";
import type { Invoice } from "../data/invoices";
import { formatINR } from "../lib/format";
import { buildLedger } from "../lib/ledger";
import { usePortalState } from "../lib/store";
import { useToday } from "../lib/today";

type Tab = "dues" | "history" | "statement";
const tabs: { value: Tab; label: string }[] = [
  { value: "dues", label: "Dues" },
  { value: "history", label: "History" },
  { value: "statement", label: "Statement" },
];

type Sheet = { kind: "pay"; ids?: string[] } | { kind: "receipt"; invoice: Invoice } | { kind: "statement" } | null;

export function Invoices() {
  const { dues, history } = usePortalState();
  const today = useToday();
  const [params, setParams] = useSearchParams();
  const tab = (tabs.some((t) => t.value === params.get("tab")) ? params.get("tab") : "dues") as Tab;
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState<string | null>(null);
  const ledger = useMemo(() => buildLedger([...dues, ...history]), [dues, history]);
  const tenantLabel = `${tenantProfile.fullName} · ${tenantProfile.propertyName} ${tenantProfile.unitCode}`;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold tracking-tight text-ink">Invoices &amp; Payments</h1>

      <SegmentedControl label="Invoices view" options={tabs} value={tab} onChange={(t) => setParams(t === "dues" ? {} : { tab: t }, { replace: true })} />

      <div role="tabpanel" aria-label={tabs.find((t) => t.value === tab)!.label}>
        {tab === "dues" && <DuesTab dues={dues} today={today} onPay={(ids) => setSheet({ kind: "pay", ids })} />}
        {tab === "history" && <HistoryTab history={history} onReceipt={(invoice) => setSheet({ kind: "receipt", invoice })} />}
        {tab === "statement" && <StatementTab rows={ledger} onDownload={() => setSheet({ kind: "statement" })} />}
      </div>

      {sheet?.kind === "pay" && (
        <PaySheet
          open
          dues={dues}
          initialSelected={sheet.ids}
          onClose={() => setSheet(null)}
          onPaid={(amount) => {
            setSheet(null);
            setToast(`Payment of ${formatINR(amount)} received. Receipt sent on WhatsApp.`);
          }}
        />
      )}
      <ReceiptSheet invoice={sheet?.kind === "receipt" ? sheet.invoice : null} tenantLabel={tenantLabel} onClose={() => setSheet(null)} />
      {sheet?.kind === "statement" && (
        <DownloadStatementSheet open rows={ledger} today={today} tenantLabel={tenantLabel} onClose={() => setSheet(null)} />
      )}
      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
