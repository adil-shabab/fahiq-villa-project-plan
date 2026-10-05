import { MessageCircle } from "lucide-react";
import { SUPPORT_WHATSAPP } from "../../lib/auth";

export function WhatsAppHelp() {
  const href = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent("Hi, I need help logging in to the Fahiq tenant portal.")}`;
  return (
    <p className="text-center text-sm leading-relaxed text-ink-muted">
      Having trouble?
      <br />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
      >
        <MessageCircle className="mr-1 mb-0.5 inline-block h-4 w-4 align-middle" strokeWidth={2.25} />
        Message your property manager on WhatsApp
      </a>
    </p>
  );
}
