import { useMemo, useState } from "react";
import { RecordNoticeModal } from "../components/tenancies/RecordNoticeModal";
import { RenewLeaseModal } from "../components/tenancies/RenewLeaseModal";
import { TenanciesFilterBar, type TenanciesFilterState } from "../components/tenancies/TenanciesFilterBar";
import { TenanciesTable } from "../components/tenancies/TenanciesTable";
import { tenancies as initialTenancies, type Tenancy } from "../data/tenancies";
import { formatINR } from "../lib/format";

type ModalState = { kind: "none" } | { kind: "renew"; tenancy: Tenancy } | { kind: "notice"; tenancy: Tenancy };

export function TenanciesList() {
  const [tenancies, setTenancies] = useState<Tenancy[]>(initialTenancies);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });
  const [filters, setFilters] = useState<TenanciesFilterState>({ search: "", status: "all", propertyId: "all", expiringOnly: false });

  const filtered = useMemo(() => {
    return tenancies.filter((t) => {
      if (filters.search && !`${t.tenantName} ${t.unitCode}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.propertyId !== "all" && t.propertyId !== filters.propertyId) return false;
      if (filters.expiringOnly) {
        const daysLeft = (new Date(t.endDate).getTime() - Date.now()) / 86400000;
        if (daysLeft > 30 || daysLeft < 0) return false;
      }
      return true;
    });
  }, [tenancies, filters]);

  const totalOutstanding = tenancies.reduce((sum, t) => sum + t.outstandingBalance, 0);
  const activeCount = tenancies.filter((t) => t.status === "Active" || t.status === "Notice").length;

  return (
    <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Tenancies</h1>
          <p className="mt-0.5 text-sm text-ink-faint">
            {activeCount} active leases &middot; <span className="font-medium text-danger">{formatINR(totalOutstanding)}</span> outstanding
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <TenanciesFilterBar filters={filters} onChange={setFilters} />
      </div>

      <TenanciesTable
        tenancies={filtered}
        onRenew={(t) => setModal({ kind: "renew", tenancy: t })}
        onRecordNotice={(t) => setModal({ kind: "notice", tenancy: t })}
      />

      {modal.kind === "renew" && (
        <RenewLeaseModal
          tenancy={modal.tenancy}
          onClose={() => setModal({ kind: "none" })}
          onConfirm={(newRent, newEndDate) =>
            setTenancies((prev) => prev.map((t) => (t.id === modal.tenancy.id ? { ...t, rent: newRent, endDate: newEndDate } : t)))
          }
        />
      )}

      {modal.kind === "notice" && (
        <RecordNoticeModal
          tenancy={modal.tenancy}
          onClose={() => setModal({ kind: "none" })}
          onConfirm={(noticeDate, vacateDate) =>
            setTenancies((prev) => prev.map((t) => (t.id === modal.tenancy.id ? { ...t, status: "Notice", noticeDate, vacateDate } : t)))
          }
        />
      )}
    </div>
  );
}
