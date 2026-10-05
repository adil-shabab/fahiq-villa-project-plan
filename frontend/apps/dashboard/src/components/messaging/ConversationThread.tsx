import { IndianRupee, Info, Mic, Paperclip, Send, SmilePlus, Wrench } from "lucide-react";
import { useState } from "react";
import { conversations, quickShortcuts, threads } from "../../data/messaging";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

export function ConversationThread({
  conversationId,
  onOpenTemplate,
  onOpenTicket,
}: {
  conversationId: string;
  onOpenTemplate: () => void;
  onOpenTicket: () => void;
}) {
  const [draft, setDraft] = useState("");
  const conversation = conversations.find((c) => c.id === conversationId)!;
  const messages = threads[conversationId] ?? [];

  return (
    <div className="flex h-[740px] flex-col overflow-hidden rounded-xl border border-rule bg-surface shadow-sm lg:col-span-8">
      <div className="flex flex-col gap-2.5 bg-surface-sunken/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar initials={conversation.avatarInitials} size="lg" />
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold text-ink">{conversation.name}</span>
              <span className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-[11px] text-ink-muted">{conversation.phone}</span>
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-accent">
                {conversation.unitLabel} ({conversation.propertyName})
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {conversation.sessionActive && (
            <div className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-ok shadow-sm">
              <span className="h-2 w-2 rounded-full bg-ok" />
              24h Session: <strong className="font-mono">{conversation.sessionRemainingLabel}</strong>
            </div>
          )}
          <button type="button" onClick={onOpenTicket} className="flex h-8 items-center gap-1 rounded-lg bg-surface-sunken px-2.5 text-sm font-semibold text-ink hover:bg-rule">
            <Wrench className="h-4 w-4 text-danger" strokeWidth={2} />
            + Ticket
          </button>
          <button type="button" onClick={onOpenTemplate} className="flex h-8 items-center gap-1 rounded-lg bg-gold-soft px-2.5 text-sm font-semibold text-gold hover:opacity-90">
            <IndianRupee className="h-4 w-4" strokeWidth={2} />
            Send Payment Link
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto bg-surface-sunken/30 p-4">
        <div className="mb-2 flex justify-center">
          <span className="rounded-full bg-surface px-3 py-1 text-xs text-ink-muted shadow-sm">Today</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex max-w-[85%] flex-col sm:max-w-[70%]", m.kind !== "incoming" && "items-end self-end")}>
              <div
                className={cn(
                  "flex flex-col gap-1.5 rounded-2xl p-3 shadow-sm",
                  m.kind === "incoming" && "rounded-tl-sm bg-surface text-ink",
                  m.kind === "outgoing" && "rounded-tr-sm bg-surface-sunken text-ink",
                  m.kind === "bot" && "rounded-tr-sm bg-accent-soft text-ink shadow-none",
                )}
              >
                {m.kind === "bot" && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
                    <Info className="h-3.5 w-3.5" strokeWidth={2} />
                    Automated Dispatch Notification
                  </div>
                )}
                <p className="text-sm leading-relaxed">{m.body}</p>
                {m.photoLabel && (
                  <div className="relative flex h-24 w-40 items-center justify-center rounded-lg bg-surface-sunken text-[11px] text-ink-faint shadow-inner">
                    {m.photoLabel}
                  </div>
                )}
                <div className="flex items-center justify-end gap-1">
                  <span className="font-mono text-[10px] text-ink-faint">{m.time}</span>
                  {m.read && <span className="text-[13px] text-info">✓✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!conversation.sessionActive && (
          <div className="mt-3 flex flex-col items-start justify-between gap-2 rounded-lg bg-surface p-2.5 text-xs text-ink-muted shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
              <span>24-hour WhatsApp session window has expired. Approved Meta HSM templates must be used to re-engage.</span>
            </div>
            <button type="button" onClick={onOpenTemplate} className="shrink-0 whitespace-nowrap font-semibold text-accent hover:underline">
              View HSM Flow
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-rule p-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-ink-faint">
          <span>Shortcuts:</span>
          {quickShortcuts.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => (s === "/payment-link" ? onOpenTemplate() : s === "/ticket" ? onOpenTicket() : setDraft((d) => `${d}${s} `))}
              className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-ink hover:bg-rule"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-0.5 pb-1">
            <button type="button" className="rounded-lg p-2 text-ink-faint hover:bg-surface-sunken hover:text-ink" title="Attach Image or Document">
              <Paperclip className="h-5 w-5" strokeWidth={2} />
            </button>
            <button type="button" className="rounded-lg p-2 text-ink-faint hover:bg-surface-sunken hover:text-ink" title="Emojis">
              <SmilePlus className="h-5 w-5" strokeWidth={2} />
            </button>
            <button type="button" className="rounded-lg p-2 text-ink-faint hover:bg-surface-sunken hover:text-ink" title="Send Voice Memo">
              <Mic className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 rounded-lg bg-surface-sunken p-2 shadow-inner">
            <textarea
              className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              placeholder={`Type a reply to ${conversation.name} (Enter to send, Shift+Enter for new line)...`}
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setDraft("")}
            className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-md hover:bg-accent-ink"
          >
            <Send className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
