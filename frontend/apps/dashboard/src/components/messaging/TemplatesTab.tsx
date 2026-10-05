import { Braces } from "lucide-react";
import { useState } from "react";
import { messageTemplates, templateCategories, totalTemplatesCount } from "../../data/messaging";
import { cn } from "../../lib/utils";

const categoryCountMap: Record<(typeof templateCategories)[number], number> = {
  All: totalTemplatesCount,
  Billing: 8,
  Collections: 6,
  "Onboarding & KYC": 7,
  Facilities: 7,
};

export function TemplatesTab({ onNewTemplate }: { onNewTemplate: () => void }) {
  const [category, setCategory] = useState<(typeof templateCategories)[number]>("All");

  const filtered = messageTemplates.filter((t) => {
    if (category === "All") return true;
    if (category === "Onboarding & KYC") return t.category === "Onboarding";
    if (category === "Facilities") return t.category === "Maintenance";
    return t.category === category;
  });

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink">Message Templates (WhatsApp Cloud API)</h2>
          <p className="text-sm text-ink-faint">Pre-approved Meta HSM payload catalog and parameter schemes.</p>
        </div>
        <button type="button" onClick={onNewTemplate} className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm font-semibold text-ink shadow-sm hover:bg-surface-sunken">
          + New Template
        </button>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto text-xs">
        {templateCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1 font-semibold",
              category === c ? "bg-accent text-white" : "border border-rule bg-surface text-ink-muted hover:bg-surface-sunken",
            )}
          >
            {c} ({categoryCountMap[c]})
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Template Identifier</th>
              <th className="px-4 py-2.5 font-semibold">Category</th>
              <th className="px-4 py-2.5 font-semibold">Language</th>
              <th className="px-4 py-2.5 font-semibold">Meta Status</th>
              <th className="px-4 py-2.5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/40">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-semibold text-ink">{t.name}</span>
                    <span className="text-[11px] text-ink-faint">{t.description}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-muted">{t.category}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-faint">{t.languages}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                      t.status === "Approved" ? "bg-ok/10 text-ok" : "bg-gold-soft text-gold",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-xs font-semibold text-accent hover:underline">
                    {t.status === "Approved" ? "Preview / Edit" : "View Submission"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between bg-surface-sunken/60 p-3 text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <Braces className="h-4 w-4 text-accent" strokeWidth={2} />
            <span>
              Supported variables:{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-accent">{"{{tenant_name}}"}</code>{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-accent">{"{{unit_no}}"}</code>{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-accent">{"{{amount}}"}</code>{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-accent">{"{{pay_link}}"}</code>
            </span>
          </div>
          <span>Sync with Meta Graph API 19.0</span>
        </div>
      </div>
    </section>
  );
}
