import { Plus, Receipt } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCreditNoteModal } from "../components/billing/AddCreditNoteModal";
import { BillingSubNav } from "../components/billing/BillingSubNav";
import { BillingSummaryCards } from "../components/billing/BillingSummaryCards";
import { GenerateInvoiceModal } from "../components/billing/GenerateInvoiceModal";
import { InvoicesFilterBar, type InvoicesFilterState } from "../components/billing/InvoicesFilterBar";
import { InvoicesTable } from "../components/billing/InvoicesTable";
import { SendInvoiceModal } from "../components/billing/SendInvoiceModal";
import { VoidInvoiceModal } from "../components/billing/VoidInvoiceModal";
import { invoices as initialInvoices, type BillingInvoice, type CreditNote } from "../data/billing";

type ModalState = { kind: "none" } | { kind: "generate" } | { kind: "send"; invoice: BillingInvoice } | { kind: "credit"; invoice: BillingInvoice } | { kind: "void"; invoice: BillingInvoice };

export function InvoicesList() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<BillingInvoice[]>(initialInvoices);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });
  const [filters, setFilters] = useState<InvoicesFilterState>({
    search: "",
    status: "all",
    period: "2026-09",
    propertyId: "all",
    overdueOnly: false,
    electricityPendingOnly: false,
  });

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (filters.search && !`${inv.number} ${inv.tenantName}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status !== "all" && inv.status !== filters.status) return false;
      if (inv.period !== filters.period) return false;
      if (filters.propertyId !== "all" && inv.propertyId !== filters.propertyId) return false;
      if (filters.overdueOnly && inv.status !== "Overdue") return false;
      if (filters.electricityPendingOnly && !inv.electricityPending) return false;
      return true;
    });
  }, [invoices, filters]);

  return (
    <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Invoices</h1>
          <p className="mt-0.5 text-sm text-ink-faint">{filtered.length} invoices this period</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal({ kind: "generate" })}
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Generate Ad-hoc Invoice
          </button>
          <button
            type="button"
            onClick={() => navigate("/billing/run")}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            <Receipt className="h-4 w-4" strokeWidth={2} />
            Run Billing
          </button>
        </div>
      </div>

      <BillingSubNav />
      <BillingSummaryCards />

      <div className="rounded-xl border border-rule bg-surface p-4">
        <InvoicesFilterBar filters={filters} onChange={setFilters} />
      </div>

      <InvoicesTable
        invoices={filtered}
        onSend={(inv) => setModal({ kind: "send", invoice: inv })}
        onAddCreditNote={(inv) => setModal({ kind: "credit", invoice: inv })}
        onVoid={(inv) => setModal({ kind: "void", invoice: inv })}
      />

      {modal.kind === "generate" && <GenerateInvoiceModal onClose={() => setModal({ kind: "none" })} onCreate={() => {}} />}

      {modal.kind === "send" && (
        <SendInvoiceModal
          invoice={modal.invoice}
          onClose={() => setModal({ kind: "none" })}
          onSend={() => setInvoices((prev) => prev.map((i) => (i.id === modal.invoice.id ? { ...i, sentChannels: ["WhatsApp"] } : i)))}
        />
      )}

      {modal.kind === "credit" && (
        <AddCreditNoteModal
          invoice={modal.invoice}
          onClose={() => setModal({ kind: "none" })}
          onAdd={(note: Omit<CreditNote, "id" | "number" | "date" | "issuedBy">) =>
            setInvoices((prev) =>
              prev.map((i) => (i.id === modal.invoice.id ? { ...i, total: i.total - note.amount, balance: Math.max(i.balance - note.amount, 0) } : i)),
            )
          }
        />
      )}

      {modal.kind === "void" && (
        <VoidInvoiceModal
          invoice={modal.invoice}
          onClose={() => setModal({ kind: "none" })}
          onConfirm={() => setInvoices((prev) => prev.map((i) => (i.id === modal.invoice.id ? { ...i, status: "Void" } : i)))}
        />
      )}
    </div>
  );
}
