import { FileSignature, Megaphone, ReceiptText, Wrench, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  unreadAnnouncements: boolean;
  onRaiseTicket: () => void;
  onAnnouncements: () => void;
}

const tileClass =
  "flex h-full w-full flex-col items-center gap-2 rounded-2xl border border-rule bg-surface px-1 py-3.5 text-center transition hover:border-accent/40 hover:bg-accent-soft/40 focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none";

function TileBody({ icon: Icon, label, dot }: { icon: LucideIcon; label: string; dot?: boolean }): ReactNode {
  return (
    <>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" strokeWidth={2.2} />
        {dot && <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-danger" />}
      </span>
      <span className="text-xs leading-tight font-semibold break-words text-ink">{label}</span>
    </>
  );
}

export function QuickActions({ unreadAnnouncements, onRaiseTicket, onAnnouncements }: Props) {
  return (
    <section aria-label="Quick actions">
      <ul className="grid grid-cols-4 gap-2.5">{/* "Announcements" is shortened to "Notices" on the tile so it fits 4-across on small phones; the aria-label keeps the full name. */}
        <li>
          <Link to="/invoices" className={tileClass}>
            <TileBody icon={ReceiptText} label="Invoices" />
          </Link>
        </li>
        <li>
          <button type="button" onClick={onRaiseTicket} className={tileClass}>
            <TileBody icon={Wrench} label="Raise Ticket" />
          </button>
        </li>
        <li>
          <Link to="/documents" className={tileClass}>
            <TileBody icon={FileSignature} label="Agreement" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onAnnouncements}
            className={tileClass}
            aria-label={unreadAnnouncements ? "Announcements, 1 unread" : "Announcements"}
          >
            <TileBody icon={Megaphone} label="Notices" dot={unreadAnnouncements} />
          </button>
        </li>
      </ul>
    </section>
  );
}
