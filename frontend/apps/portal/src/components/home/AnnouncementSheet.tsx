import { Building2, CalendarDays, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { Announcement } from "../../data/home";
import { acknowledgeAnnouncement } from "../../lib/store";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

const published = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

interface Props {
  announcement: Announcement | null;
  onClose: () => void;
}

export function AnnouncementSheet({ announcement, onClose }: Props) {
  const [acking, setAcking] = useState(false);
  if (!announcement) return null;
  const a = announcement;

  return (
    <BottomSheet
      open
      onClose={onClose}
      title="Announcement"
      footer={
        a.requireAck ? (
          a.acknowledged ? (
            <p role="status" className="flex h-13 items-center justify-center gap-2 text-base font-semibold text-ok">
              <CheckCircle2 className="h-5 w-5" />
              Acknowledged — thanks!
            </p>
          ) : (
            <PrimaryButton
              type="button"
              loading={acking}
              onClick={async () => {
                setAcking(true);
                try {
                  await acknowledgeAnnouncement(a.id);
                } finally {
                  setAcking(false);
                }
              }}
            >
              Got it
            </PrimaryButton>
          )
        ) : undefined
      }
    >
      <h3 className="text-xl leading-7 font-bold tracking-tight text-ink">{a.title}</h3>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-faint">
        <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" />{a.propertyName}</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{published.format(new Date(a.publishedAt))}</span>
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">{a.body}</p>
    </BottomSheet>
  );
}
