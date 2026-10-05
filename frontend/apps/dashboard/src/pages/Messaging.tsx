import { BookMarked, Megaphone, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { AnnouncementsTab } from "../components/messaging/AnnouncementsTab";
import { BroadcastsTab } from "../components/messaging/BroadcastsTab";
import { ConversationList } from "../components/messaging/ConversationList";
import { ConversationThread } from "../components/messaging/ConversationThread";
import { CreateTicketModal } from "../components/messaging/CreateTicketModal";
import { SendTemplateModal } from "../components/messaging/SendTemplateModal";
import { TemplatesTab } from "../components/messaging/TemplatesTab";
import { conversations, threads, totalTemplatesCount } from "../data/messaging";
import { cn } from "../lib/utils";

type SegmentTab = "inbox" | "broadcasts" | "announcements" | "templates";
type ModalKind = "none" | "template" | "ticket";

export function Messaging() {
  const [tab, setTab] = useState<SegmentTab>("inbox");
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id ?? "");
  const [modal, setModal] = useState<ModalKind>("none");

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? conversations[0];
  const lastIncoming = [...(threads[activeConversationId] ?? [])].reverse().find((m) => m.kind === "incoming");

  const segments: { id: SegmentTab; label: string; icon: typeof MessageSquare; count: string }[] = [
    { id: "inbox", label: "WhatsApp Inbox", icon: MessageSquare, count: String(conversations.length) },
    { id: "broadcasts", label: "Broadcast Campaigns", icon: Send, count: "4 this mo" },
    { id: "announcements", label: "Announcements Board", icon: Megaphone, count: "2 Active" },
    { id: "templates", label: "Message Templates", icon: BookMarked, count: `${totalTemplatesCount} HSM` },
  ];

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Messaging &amp; Omnichannel Inbox</h1>
            <span className="flex items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-1 text-[11px] font-semibold text-accent shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-ok" />
              Meta Cloud API Live · 99.8% Uptime
            </span>
          </div>
          <p className="text-sm text-ink-faint">Real-time WhatsApp Business API session routing, HSM templates, bulk broadcast dispatches, and building notices.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setTab("broadcasts")} className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken">
            <Megaphone className="h-4 w-4 text-accent" strokeWidth={2} />
            New Broadcast
          </button>
          <button type="button" onClick={() => setTab("announcements")} className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken">
            <Megaphone className="h-4 w-4 text-gold" strokeWidth={2} />
            New Announcement
          </button>
          <button type="button" onClick={() => setTab("templates")} className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
            <BookMarked className="h-4 w-4" strokeWidth={2} />
            Templates Library ({totalTemplatesCount})
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-surface-sunken p-1 shadow-sm">
        {segments.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setTab(s.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                tab === s.id ? "bg-surface text-accent shadow-sm" : "text-ink-muted hover:bg-surface/60 hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              <span>{s.label}</span>
              <span className={cn("rounded-full px-1.5 py-0.5 text-[11px]", tab === s.id ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-faint")}>{s.count}</span>
            </button>
          );
        })}
      </div>

      {tab === "inbox" && activeConversation && (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <ConversationList activeId={activeConversationId} onSelect={setActiveConversationId} />
          <ConversationThread
            conversationId={activeConversation.id}
            onOpenTemplate={() => setModal("template")}
            onOpenTicket={() => setModal("ticket")}
          />
        </div>
      )}

      {tab === "broadcasts" && <BroadcastsTab onCreateCampaign={() => {}} />}
      {tab === "announcements" && <AnnouncementsTab onNewAnnouncement={() => {}} />}
      {tab === "templates" && <TemplatesTab onNewTemplate={() => {}} />}

      {modal === "template" && activeConversation && (
        <SendTemplateModal tenantName={activeConversation.name} onClose={() => setModal("none")} onSend={() => {}} />
      )}
      {modal === "ticket" && activeConversation && (
        <CreateTicketModal
          conversation={activeConversation}
          quotedMessage={lastIncoming?.body ?? ""}
          onClose={() => setModal("none")}
          onCreate={() => {}}
        />
      )}
    </div>
  );
}
