import { Download, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { AgingTranchesBar } from "../components/collections/AgingTranchesBar";
import { AutopayMandatesCard } from "../components/collections/AutopayMandatesCard";
import { CollectionsFilterBar } from "../components/collections/CollectionsFilterBar";
import { CollectionsStatCards } from "../components/collections/CollectionsStatCards";
import { InitiateRefundModal } from "../components/collections/InitiateRefundModal";
import { LogPromiseModal } from "../components/collections/LogPromiseModal";
import { OverdueTenantsTable } from "../components/collections/OverdueTenantsTable";
import { PromiseToPayCard } from "../components/collections/PromiseToPayCard";
import { ReconciliationCard } from "../components/collections/ReconciliationCard";
import { RecordPaymentModal } from "../components/collections/RecordPaymentModal";
import { RefundsPayoutsCard } from "../components/collections/RefundsPayoutsCard";
import { agingBucket, overdueTenants, razorpayBalance, type OverdueTenant } from "../data/collections";

type ModalState = { kind: "record-payment" | "log-promise"; tenant: OverdueTenant } | { kind: "initiate-refund" } | null;

export function Collections() {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("all");
  const [riskLevel, setRiskLevel] = useState("all");
  const [agingFilter, setAgingFilter] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const filtered = useMemo(() => {
    return overdueTenants.filter((t) => {
      if (search && !`${t.tenantName} ${t.unitCode} ${t.phone}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (property !== "all" && t.propertyName !== property) return false;
      if (riskLevel === "high" && t.daysOverdue <= 15) return false;
      if (riskLevel === "legal" && !t.legalNotice) return false;
      if (agingFilter && agingBucket(t.daysOverdue) !== agingFilter) return false;
      return true;
    });
  }, [search, property, riskLevel, agingFilter]);

  function resetFilters() {
    setSearch("");
    setProperty("all");
    setRiskLevel("all");
    setAgingFilter(null);
  }

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Collections &amp; Cashflow Ops</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Oct 2026 Active Run
            </span>
          </div>
          <p className="text-sm text-ink-faint">Real-time ledger reconciliation, default aging matrices, and automated UPI Autopay pipelines.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken">
            <Download className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Download Defaulters List
          </button>
          <button
            type="button"
            onClick={() => overdueTenants[0] && setModal({ kind: "record-payment", tenant: overdueTenants[0] })}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            <PlusCircle className="h-4 w-4" strokeWidth={2} />
            Record Offline Payment
          </button>
        </div>
      </div>

      <CollectionsStatCards />

      <div className="flex flex-col gap-3 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <AgingTranchesBar activeKey={agingFilter} onSelect={setAgingFilter} />
        <CollectionsFilterBar
          search={search}
          onSearchChange={setSearch}
          property={property}
          onPropertyChange={setProperty}
          riskLevel={riskLevel}
          onRiskLevelChange={setRiskLevel}
          shownCount={filtered.length}
          totalCount={overdueTenants.length}
          onReset={resetFilters}
        />
      </div>

      <OverdueTenantsTable
        tenants={filtered}
        onRecordPayment={(t) => setModal({ kind: "record-payment", tenant: t })}
        onLogPromise={(t) => setModal({ kind: "log-promise", tenant: t })}
      />

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-ink">Ops Workflows &amp; Automation Pipelines</h2>
        <p className="text-sm text-ink-faint">
          Direct oversight across Promise to Pay, Razorpay real-time webhooks, UPI mandates, and security deposit clearing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <PromiseToPayCard onNewPromise={() => overdueTenants[0] && setModal({ kind: "log-promise", tenant: overdueTenants[0] })} />
        <ReconciliationCard />
      </div>

      <AutopayMandatesCard />

      <RefundsPayoutsCard onInitiateRefund={() => setModal({ kind: "initiate-refund" })} />

      <div className="flex flex-col items-center justify-between gap-2 border-t border-rule pt-4 text-xs text-ink-faint sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span>Fahiq Automated Collections Daemon active · Next batch cycle at 18:00 IST</span>
        </div>
        <div className="flex items-center gap-4">
          <span>NPCI Mandate Gateway: Online</span>
          <span>
            RazorpayX Balance: <strong className="font-mono text-ink">₹{razorpayBalance.toLocaleString("en-IN")}</strong>
          </span>
        </div>
      </div>

      {modal?.kind === "record-payment" && (
        <RecordPaymentModal tenant={modal.tenant} onClose={() => setModal(null)} onSubmit={() => {}} />
      )}
      {modal?.kind === "log-promise" && <LogPromiseModal tenant={modal.tenant} onClose={() => setModal(null)} onSubmit={() => {}} />}
      {modal?.kind === "initiate-refund" && <InitiateRefundModal onClose={() => setModal(null)} onSubmit={() => {}} />}
    </div>
  );
}
