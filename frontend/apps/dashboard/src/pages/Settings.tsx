import { ChevronRight, RotateCcw, Save } from "lucide-react";
import { useState } from "react";
import { AddAmenityModal } from "../components/settings/AddAmenityModal";
import { AddChargeTypeModal } from "../components/settings/AddChargeTypeModal";
import { BillingPolicySection } from "../components/settings/BillingPolicySection";
import { BusinessProfileSection } from "../components/settings/BusinessProfileSection";
import { IntegrationsSection } from "../components/settings/IntegrationsSection";
import { ReminderCadenceSection } from "../components/settings/ReminderCadenceSection";
import { SettingsNavRail } from "../components/settings/SettingsNavRail";
import { WhatsAppConfigModal } from "../components/settings/WhatsAppConfigModal";

type ModalKind = "none" | "whatsapp" | "charge" | "amenity";

export function Settings() {
  const [activeId, setActiveId] = useState("business-profile");
  const [modal, setModal] = useState<ModalKind>("none");

  function navigate(id: string) {
    setActiveId(id);
    if (id === "charge-types") {
      setModal("charge");
      return;
    }
    if (id === "amenities") {
      setModal("amenity");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <span>System &amp; Organization</span>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span className="text-accent">Settings &amp; Configuration</span>
          </div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Settings &amp; System Configuration</h1>
            <span className="flex items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Live Environment (v2.4.1)
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-faint">Manage legal corporate entity, billing cycle policies, automated WhatsApp cadences, payment gateways, and hardware integrations.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 text-sm font-medium text-ink hover:bg-surface-sunken">
            <RotateCcw className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Discard Unsaved
          </button>
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-sm font-semibold text-white hover:bg-accent-ink">
            <Save className="h-4 w-4" strokeWidth={2} />
            Save All Changes
            <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">3 pending</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <SettingsNavRail activeId={activeId} onNavigate={navigate} />

        <div className="flex flex-col gap-5 lg:col-span-9">
          <BusinessProfileSection />
          <BillingPolicySection />
          <ReminderCadenceSection />
          <IntegrationsSection onConfigureWhatsApp={() => setModal("whatsapp")} />
        </div>
      </div>

      {modal === "whatsapp" && <WhatsAppConfigModal onClose={() => setModal("none")} onSave={() => {}} />}
      {modal === "charge" && <AddChargeTypeModal onClose={() => setModal("none")} onSave={() => {}} />}
      {modal === "amenity" && <AddAmenityModal onClose={() => setModal("none")} onSave={() => {}} />}
    </div>
  );
}
