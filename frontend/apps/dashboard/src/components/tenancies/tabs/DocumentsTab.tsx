import { FileText, Upload } from "lucide-react";
import type { Tenancy } from "../../../data/tenancies";

export function DocumentsTab({ tenancy }: { tenancy: Tenancy }) {
  return (
    <div className="rounded-xl border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
        <h3 className="text-sm font-semibold text-ink">Agreement &amp; Documents</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-rule px-3 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={2} />
          Upload
        </button>
      </div>
      <ul>
        {tenancy.documents.map((doc) => (
          <li key={doc.name} className="flex items-center gap-3 border-b border-rule px-5 py-3 last:border-b-0 hover:bg-surface-sunken">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <FileText className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium text-ink">{doc.name}</span>
              <span className="block text-xs text-ink-faint">
                {doc.category} &middot; uploaded {new Date(doc.uploadedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
