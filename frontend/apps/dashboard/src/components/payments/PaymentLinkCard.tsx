import { Send, Smartphone } from "lucide-react";
import { useState } from "react";

export function PaymentLinkCard() {
  const [target, setTarget] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-bold text-ink">Instant Payment Link</span>
        </div>
        <span className="rounded-full bg-ok/10 px-2 py-0.5 text-[11px] font-semibold text-ok">SMS / WhatsApp</span>
      </div>

      <p className="text-xs text-ink-muted">
        Generate a dynamic Razorpay payment link with embedded room identifier and GST receipt for ad-hoc collections.
      </p>

      <div className="mt-1 flex gap-2">
        <input
          className="field flex-1"
          placeholder="Tenant phone or unit (e.g. 98401...)"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
            setSent(false);
          }}
        />
        <button
          type="button"
          onClick={() => target.trim() && setSent(true)}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
        >
          <Send className="h-4 w-4" strokeWidth={2} />
          Share
        </button>
      </div>
      <span className="text-xs text-ink-faint">{sent ? "Link shared — auto-reconciles once tenant confirms OTP checkout." : "Auto-reconciles once tenant confirms OTP checkout."}</span>
    </div>
  );
}
