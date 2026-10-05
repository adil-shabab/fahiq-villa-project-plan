import { History, PlusSquare } from "lucide-react";
import { docTemplates } from "../../data/documents";

export function TemplatesGrid({ onNewTemplate }: { onNewTemplate: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Standard Legal &amp; Operational Templates</h2>
          <p className="text-sm text-ink-faint">Master templates dynamically populate unit numbers, tenant names, security deposits, and lock-in covenants.</p>
        </div>
        <button type="button" onClick={onNewTemplate} className="flex items-center gap-1.5 self-start rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink sm:self-auto">
          <PlusSquare className="h-4 w-4" strokeWidth={2} />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {docTemplates.map((t, i) => (
          <div key={t.id} className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-rule bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
            {i === 0 && <div className="absolute inset-x-0 top-0 h-1 bg-accent" />}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-[11px] font-bold text-accent">{t.version}</span>
                <span className="text-xs text-ink-faint">{t.editedLabel}</span>
              </div>
              <h3 className="text-base font-bold text-ink">{t.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{t.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-rule pt-3">
                <span className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-[11px] text-ink-muted">{t.tokenCount} dynamic tokens</span>
                {t.sampleTokens.map((tok) => (
                  <span key={tok} className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-[11px] text-ink-muted">{tok}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-rule pt-3">
              <button type="button" className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
                <History className="h-4 w-4" strokeWidth={2} />
                History
              </button>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg bg-surface-sunken px-3 py-1.5 text-sm font-semibold text-ink hover:bg-rule">
                  Edit Template
                </button>
                {i === 0 && (
                  <button type="button" className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent-ink">
                    Generate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
