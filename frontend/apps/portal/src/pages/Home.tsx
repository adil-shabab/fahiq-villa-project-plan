import { useState } from "react";
import { ActivityList } from "../components/home/ActivityList";
import { AnnouncementSheet } from "../components/home/AnnouncementSheet";
import { DueCard } from "../components/home/DueCard";
import { HelpBar } from "../components/home/HelpBar";
import { QuickActions } from "../components/home/QuickActions";
import { RaiseTicketSheet } from "../components/home/RaiseTicketSheet";
import { PaySheet } from "../components/payments/PaySheet";
import { Toast } from "../components/ui/Toast";
import { tenantProfile } from "../data/home";
import { formatINR, greeting } from "../lib/format";
import { usePortalState } from "../lib/store";
import { useToday } from "../lib/today";

type Sheet = { kind: "pay" } | { kind: "ticket" } | { kind: "announcement"; id: string } | null;

export function Home() {
  const { dues, announcements, activity } = usePortalState();
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState<string | null>(null);
  const today = useToday();

  const unread = announcements.find((a) => a.requireAck && !a.acknowledged);
  const latest = unread ?? announcements[0];
  const openAnnouncement = sheet?.kind === "announcement" ? announcements.find((a) => a.id === sheet.id) ?? null : null;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl leading-8 font-bold tracking-tight text-ink">
          {greeting()}, {tenantProfile.firstName}
        </h1>
        <p className="mt-0.5 text-sm text-ink-muted">
          {tenantProfile.propertyName} · <span className="whitespace-nowrap">{tenantProfile.unitCode}</span>
        </p>
      </header>

      <DueCard dues={dues} nextDueDate={tenantProfile.nextDueDate} today={today} onPay={() => setSheet({ kind: "pay" })} />

      <QuickActions
        unreadAnnouncements={!!unread}
        onRaiseTicket={() => setSheet({ kind: "ticket" })}
        onAnnouncements={() => latest && setSheet({ kind: "announcement", id: latest.id })}
      />

      <ActivityList items={activity} onOpenAnnouncement={(id) => setSheet({ kind: "announcement", id })} />

      <HelpBar manager={tenantProfile.manager} />

      {sheet?.kind === "pay" && (
        <PaySheet
          open
          dues={dues}
          onClose={() => setSheet(null)}
          onPaid={(amount) => {
            setSheet(null);
            setToast(`Payment of ${formatINR(amount)} received. Receipt sent on WhatsApp.`);
          }}
        />
      )}
      {sheet?.kind === "ticket" && <RaiseTicketSheet open onClose={() => setSheet(null)} />}
      <AnnouncementSheet announcement={openAnnouncement} onClose={() => setSheet(null)} />

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
