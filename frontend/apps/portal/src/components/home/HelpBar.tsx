import { MessageCircle, Phone } from "lucide-react";

interface Props {
  manager: { name: string; phone: string; whatsapp: string };
}

const iconBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-surface text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none";

export function HelpBar({ manager }: Props) {
  return (
    <section aria-label="Need help?" className="flex items-center gap-3 rounded-2xl bg-surface-sunken px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">Need help?</p>
        <p className="truncate text-sm font-semibold text-ink">{manager.name} · Property Manager</p>
      </div>
      <a href={`tel:${manager.phone}`} className={iconBtn} aria-label={`Call ${manager.name}`}>
        <Phone className="h-5 w-5" />
      </a>
      <a href={`https://wa.me/${manager.whatsapp}`} target="_blank" rel="noreferrer" className={iconBtn} aria-label={`WhatsApp ${manager.name}`}>
        <MessageCircle className="h-5 w-5" />
      </a>
    </section>
  );
}
