import { ArrowLeft, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EditTermsModal } from "../components/tenancies/EditTermsModal";
import { RecordNoticeModal } from "../components/tenancies/RecordNoticeModal";
import { RenewLeaseModal } from "../components/tenancies/RenewLeaseModal";
import { CommLogTab } from "../components/tenancies/tabs/CommLogTab";
import { DepositTab } from "../components/tenancies/tabs/DepositTab";
import { DocumentsTab } from "../components/tenancies/tabs/DocumentsTab";
import { InspectionsTab } from "../components/tenancies/tabs/InspectionsTab";
import { InvoicesTab } from "../components/tenancies/tabs/InvoicesTab";
import { LedgerTab } from "../components/tenancies/tabs/LedgerTab";
import { OverviewTab } from "../components/tenancies/tabs/OverviewTab";
import { PaymentsTab } from "../components/tenancies/tabs/PaymentsTab";
import { RecurringChargesTab } from "../components/tenancies/tabs/RecurringChargesTab";
import { TicketsTab } from "../components/tenancies/tabs/TicketsTab";
import { TransferTenantModal } from "../components/tenancies/TransferTenantModal";
import { getTenancyById, type Tenancy } from "../data/tenancies";
import { formatINR } from "../lib/format";
import { DropdownMenu } from "../components/ui/DropdownMenu";
import { Badge } from "../components/ui/Badge";

const tabs = ["Overview", "Ledger", "Invoices", "Payments", "Deposit", "Recurring Charges", "Agreement & Documents", "Inspections", "Tickets", "Communication Log"] as const;
type Tab = (typeof tabs)[number];

const statusTone = { Active: "info", Notice: "warn", "Ending Soon": "warn", Ended: "neutral" } as const;

type ModalKind = "none" | "edit-terms" | "renew" | "notice" | "transfer";

export function TenancyDetail() {
  const { id } = useParams<{ id: string }>();
  const initial = id ? getTenancyById(id) : undefined;
  const [tenancy, setTenancy] = useState<Tenancy | undefined>(initial);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [modal, setModal] = useState<ModalKind>("none");

  if (!tenancy) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-ink-faint">Tenancy not found.</p>
        <Link to="/tenancies" className="text-sm font-medium text-accent hover:text-accent-ink">
          &larr; Back to Tenancies
        </Link>
      </div>
    );
  }

  function patch(p: Partial<Tenancy>) {
    setTenancy((prev) => (prev ? { ...prev, ...p } : prev));
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Link to="/tenancies" className="flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        All Tenancies
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">{tenancy.tenantName}</h1>
            <Badge tone={statusTone[tenancy.status]}>{tenancy.status}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">
            {tenancy.unitCode} &middot; {tenancy.propertyName} &middot; <span className="font-medium text-ink">{formatINR(tenancy.rent)}/mo</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink">
            Record Payment
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <MessageCircle className="h-4 w-4 text-ok" strokeWidth={2} />
            Send Reminder
          </button>
          <DropdownMenu
            trigger={
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule">
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
              </span>
            }
            actions={[
              { label: "Edit Terms", onSelect: () => setModal("edit-terms") },
              { label: "Renew", onSelect: () => setModal("renew") },
              { label: "Record Notice", onSelect: () => setModal("notice") },
              { label: "Transfer Unit", onSelect: () => setModal("transfer") },
            ]}
          />
        </div>
      </div>

      <div className="border-b border-rule">
        <nav className="-mb-px flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-medium ${
                activeTab === tab ? "border-accent text-accent-ink" : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "Overview" && <OverviewTab tenancy={tenancy} />}
      {activeTab === "Ledger" && <LedgerTab tenancy={tenancy} />}
      {activeTab === "Invoices" && <InvoicesTab tenancy={tenancy} />}
      {activeTab === "Payments" && <PaymentsTab tenancy={tenancy} />}
      {activeTab === "Deposit" && <DepositTab tenancy={tenancy} />}
      {activeTab === "Recurring Charges" && (
        <RecurringChargesTab tenancy={tenancy} onAdd={(charge) => patch({ recurringCharges: [...tenancy.recurringCharges, charge] })} />
      )}
      {activeTab === "Agreement & Documents" && <DocumentsTab tenancy={tenancy} />}
      {activeTab === "Inspections" && <InspectionsTab tenancy={tenancy} />}
      {activeTab === "Tickets" && <TicketsTab tenancy={tenancy} />}
      {activeTab === "Communication Log" && <CommLogTab tenancy={tenancy} />}

      {modal === "edit-terms" && <EditTermsModal tenancy={tenancy} onClose={() => setModal("none")} onSave={patch} />}
      {modal === "renew" && (
        <RenewLeaseModal tenancy={tenancy} onClose={() => setModal("none")} onConfirm={(rent, endDate) => patch({ rent, endDate })} />
      )}
      {modal === "notice" && (
        <RecordNoticeModal
          tenancy={tenancy}
          onClose={() => setModal("none")}
          onConfirm={(noticeDate, vacateDate) => patch({ status: "Notice", noticeDate, vacateDate })}
        />
      )}
      {modal === "transfer" && (
        <TransferTenantModal tenancy={tenancy} onClose={() => setModal("none")} onConfirm={(newUnitCode) => patch({ unitCode: newUnitCode })} />
      )}
    </div>
  );
}
