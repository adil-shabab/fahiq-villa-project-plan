import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ActivityList } from "../components/home/ActivityList";
import { AnnouncementSheet } from "../components/home/AnnouncementSheet";
import { DueCard } from "../components/home/DueCard";
import { HelpBar } from "../components/home/HelpBar";
import { PaySheet } from "../components/home/PaySheet";
import { QuickActions } from "../components/home/QuickActions";
import { RaiseTicketSheet } from "../components/home/RaiseTicketSheet";
import { tenantProfile } from "../data/home";
import { formatINR, greeting } from "../lib/format";
import { usePortalState } from "../lib/store";

type Sheet = { kind: "pay" } | { kind: "ticket" } | { kind: "announcement"; id: string } | null;

export function Home() {
  const { dues, announcements, activity } = usePortalState();
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [today] = useState(() => new Date().toLocaleDateString("en-CA")); // yyyy-mm-dd, local time

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

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
          {tenantProfile.propertyName} · {tenantProfile.unitCode}
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

      {toast && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-[448px] items-start gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-surface shadow-lg"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
          {toast}
        </div>
      )}
    </div>
  );
}
