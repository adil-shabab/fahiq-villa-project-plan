import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillingSubNav } from "../components/billing/BillingSubNav";
import { properties } from "../data/properties";
import { tenancies } from "../data/tenancies";
import { formatINR } from "../lib/format";

interface PreviewRow {
  tenancyId: string;
  tenantName: string;
  unitCode: string;
  rent: number;
  electricity: number;
  water: number;
  other: number;
  total: number;
  warning: boolean;
}

type Step = "setup" | "preview" | "results";

export function BillingRun() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("setup");
  const [period, setPeriod] = useState("2026-10");
  const [scope, setScope] = useState("all");
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [issuedCount, setIssuedCount] = useState(0);

  function runPreview() {
    const preview: PreviewRow[] = tenancies.map((t, i) => {
      const warning = i % 6 === 0;
      const electricity = warning ? 0 : 1200 + ((i * 53) % 600);
      const water = 300;
      const other = i % 3 !== 0 ? 500 : 0;
      return {
        tenancyId: t.id,
        tenantName: t.tenantName,
        unitCode: t.unitCode,
        rent: t.rent,
        electricity,
        water,
        other,
        total: t.rent + electricity + water + other,
        warning,
      };
    });
    setRows(preview);
    setStep("preview");
  }

  function confirmRun() {
    const included = rows.filter((r) => !excluded.has(r.tenancyId));
    setIssuedCount(included.length);
    setStep("results");
  }

  const totalAmount = rows.filter((r) => !excluded.has(r.tenancyId)).reduce((sum, r) => sum + r.total, 0);
  const warningCount = rows.filter((r) => r.warning).length;

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Billing Run</h1>
        <p className="mt-0.5 text-sm text-ink-faint">Generate and issue invoices for a billing period</p>
      </div>

      <BillingSubNav />

      {step === "setup" && (
        <div className="max-w-lg rounded-xl border border-rule bg-surface p-5">
          <h2 className="mb-4 text-sm font-semibold text-ink">Setup</h2>
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Billing Period</span>
              <input type="month" className="field" value={period} onChange={(e) => setPeriod(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Scope</span>
              <select className="field" value={scope} onChange={(e) => setScope(e.target.value)}>
                <option value="all">All Properties</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={runPreview} className="mt-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-ink">
              Run Preview
            </button>
          </div>
        </div>
      )}

      {step === "preview" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-rule bg-surface px-5 py-3.5 text-sm">
            <span>
              <span className="font-semibold text-ink">{rows.length}</span> <span className="text-ink-faint">tenancies</span>
            </span>
            <span>
              <span className="font-semibold text-ink">{formatINR(totalAmount)}</span> <span className="text-ink-faint">total</span>
            </span>
            {warningCount > 0 && (
              <span className="flex items-center gap-1 font-medium text-warn">
                <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2} />
                {warningCount} warnings
              </span>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
                  <th className="w-10 px-5 py-2.5" />
                  <th className="px-3 py-2.5 font-semibold">Tenant</th>
                  <th className="px-3 py-2.5 font-semibold">Unit</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Rent</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Electricity</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Water</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Other</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.tenancyId} className={row.warning ? "bg-warn/5" : ""}>
                    <td className="px-5 py-2.5">
                      <input
                        type="checkbox"
                        checked={!excluded.has(row.tenancyId)}
                        onChange={() =>
                          setExcluded((prev) => {
                            const next = new Set(prev);
                            if (next.has(row.tenancyId)) next.delete(row.tenancyId);
                            else next.add(row.tenancyId);
                            return next;
                          })
                        }
                        className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-ink">
                      <div className="flex items-center gap-1.5">
                        {row.tenantName}
                        {row.warning && <TriangleAlert className="h-3.5 w-3.5 text-warn" strokeWidth={2} />}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">{row.unitCode}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink">{formatINR(row.rent)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink">
                      {row.warning ? <span className="text-warn">Missing reading</span> : formatINR(row.electricity)}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink">{formatINR(row.water)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink">{row.other > 0 ? formatINR(row.other) : "—"}</td>
                    <td className="px-3 py-2.5 text-right font-medium tabular-nums text-ink">{formatINR(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setStep("setup")} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
              Cancel
            </button>
            <button type="button" onClick={confirmRun} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-ink">
              Confirm &amp; Issue Invoices
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="max-w-lg rounded-xl border border-rule bg-surface p-6 text-center">
          <div className="mx-auto mb-3 h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full w-full rounded-full bg-accent" />
          </div>
          <p className="text-sm text-ink">
            <span className="font-semibold text-ok">{issuedCount} invoices issued successfully</span>
            {excluded.size > 0 && <span className="text-ink-faint">, {excluded.size} skipped (excluded)</span>}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button type="button" onClick={() => navigate("/billing")} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-ink">
              View Issued Invoices
            </button>
            <button type="button" onClick={() => setStep("setup")} className="rounded-lg border border-rule px-4 py-2 text-sm font-medium text-ink hover:border-rule-strong">
              Run Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
