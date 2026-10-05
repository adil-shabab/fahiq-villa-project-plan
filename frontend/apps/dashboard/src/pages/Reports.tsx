import { ChevronRight, Grid2x2, SendHorizontal, Table2 } from "lucide-react";
import { useState } from "react";
import { ExportReportModal } from "../components/reports/ExportReportModal";
import { RentRollDetail } from "../components/reports/RentRollDetail";
import { ReportsHub } from "../components/reports/ReportsHub";
import { ScheduledDeliveriesTab } from "../components/reports/ScheduledDeliveriesTab";
import { ScheduleReportModal } from "../components/reports/ScheduleReportModal";
import { reportCatalog } from "../data/reports";
import { cn } from "../lib/utils";

type ViewTab = "hub" | "detail" | "automations";
type ModalKind = "none" | "export" | "schedule";

export function Reports() {
  const [tab, setTab] = useState<ViewTab>("hub");
  const [modal, setModal] = useState<ModalKind>("none");

  const tabs: { id: ViewTab; label: string; icon: typeof Grid2x2; badge?: string }[] = [
    { id: "hub", label: "Reports Hub", icon: Grid2x2, badge: String(reportCatalog.length) },
    { id: "detail", label: "Rent Roll Detail", icon: Table2, badge: "Live" },
    { id: "automations", label: "Scheduled Deliveries", icon: SendHorizontal },
  ];

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <span>Portfolio Operations</span>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span className="text-accent">Reports &amp; Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Reports &amp; Analytics</h1>
          <p className="mt-0.5 text-sm text-ink-faint">Automated accounting ledgers, vacancy forecasting, and operational health metrics</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-surface-sunken p-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all",
                  tab === t.id ? "bg-surface text-accent shadow-sm" : "text-ink-muted hover:text-ink",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{t.label}</span>
                {t.badge && (
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", tab === t.id ? "bg-accent-soft text-accent-ink" : "bg-surface text-ink-faint")}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "hub" && <ReportsHub onOpenRentRoll={() => setTab("detail")} />}
      {tab === "detail" && (
        <RentRollDetail onBack={() => setTab("hub")} onOpenExport={() => setModal("export")} onOpenSchedule={() => setModal("schedule")} />
      )}
      {tab === "automations" && <ScheduledDeliveriesTab onNewSchedule={() => setModal("schedule")} onManualExport={() => setModal("export")} />}

      {modal === "export" && <ExportReportModal onClose={() => setModal("none")} onDownload={() => {}} />}
      {modal === "schedule" && <ScheduleReportModal onClose={() => setModal("none")} onSave={() => {}} />}
    </div>
  );
}
