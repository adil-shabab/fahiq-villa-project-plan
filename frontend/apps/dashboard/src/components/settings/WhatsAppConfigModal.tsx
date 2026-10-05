import { CheckCircle2, Copy, Eye, Settings2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

const providers = ["Gupshup Enterprise (Direct WABA Tier 3)", "AiSensy Official Meta Partner", "Twilio Conversations API", "Interakt Official Partner"];

export function WhatsAppConfigModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [provider, setProvider] = useState(providers[0]);
  const [revealToken, setRevealToken] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-accent" strokeWidth={2} />
            <h3 className="text-sm font-bold text-ink">Configure WhatsApp Business Cloud API</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">BSP Provider Gateway</span>
            <select className="field" value={provider} onChange={(e) => setProvider(e.target.value)}>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">API Secret Token Key</span>
            <div className="relative flex items-center">
              <input className="field pr-9 font-mono" type={revealToken ? "text" : "password"} defaultValue="•••••••••••••••••••••••• 38f2" />
              <button type="button" onClick={() => setRevealToken((v) => !v)} className="absolute right-2.5 text-ink-faint hover:text-ink">
                <Eye className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Sender Phone ID</span>
              <input className="field font-mono text-xs" defaultValue="109482019485721" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">WABA Account ID</span>
              <input className="field font-mono text-xs" defaultValue="849204918239014" />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Webhook Inbound Endpoint URL</span>
            <div className="flex items-center gap-1.5">
              <div className="flex h-9 flex-1 items-center overflow-hidden truncate rounded-lg bg-surface-sunken px-2.5 font-mono text-xs text-ink-muted">
                https://api.fahiq.com/v1/webhooks/whatsapp/inbound
              </div>
              <button type="button" className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-surface-sunken px-2.5 text-xs text-ink-muted hover:text-ink">
                <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                Copy
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-accent">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
              Latency: 142ms · Session Valid
            </span>
            <button type="button" className="text-xs font-semibold text-accent hover:underline">Test Ping</button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            Save &amp; Connect
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
