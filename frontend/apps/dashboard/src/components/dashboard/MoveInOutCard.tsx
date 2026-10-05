import { LogIn, LogOut } from "lucide-react";
import { movingInToday, movingOutToday, type MoveEvent } from "../../data/dashboard";
import { Avatar } from "../ui/Avatar";

function MoveList({ events, emptyLabel }: { events: MoveEvent[]; emptyLabel: string }) {
  if (events.length === 0) {
    return <p className="px-5 py-4 text-sm text-ink-faint">{emptyLabel}</p>;
  }
  return (
    <ul className="flex flex-col gap-3 px-5 py-4">
      {events.map((event) => (
        <li key={event.id} className="flex items-center gap-2.5">
          <Avatar initials={event.avatarInitials} size="sm" />
          <div>
            <p className="text-sm font-medium leading-tight text-ink">{event.tenantName}</p>
            <p className="text-xs leading-tight text-ink-faint">{event.unitCode}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MoveInOutCard() {
  return (
    <div className="grid grid-cols-2 divide-x divide-rule">
      <div>
        <div className="flex items-center gap-2 px-5 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
          <LogIn className="h-3.5 w-3.5 text-ok" strokeWidth={2.5} />
          Moving in today
        </div>
        <MoveList events={movingInToday} emptyLabel="No move-ins today" />
      </div>
      <div>
        <div className="flex items-center gap-2 px-5 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
          <LogOut className="h-3.5 w-3.5 text-warn" strokeWidth={2.5} />
          Moving out today
        </div>
        <MoveList events={movingOutToday} emptyLabel="No move-outs today" />
      </div>
    </div>
  );
}
