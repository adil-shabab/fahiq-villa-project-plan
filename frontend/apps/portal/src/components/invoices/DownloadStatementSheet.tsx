import { CircleCheck, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { downloadText, shareText } from "../../lib/download";
import { formatINR } from "../../lib/format";
import type { LedgerRow } from "../../lib/ledger";
import { cn } from "../../lib/utils";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

type Preset = "this_month" | "last_3" | "this_year" | "custom";

const presets: { id: Preset; label: string }[] = [
  { id: "this_month", label: "This Month" },
  { id: "last_3", label: "Last 3 Months" },
  { id: "this_year", label: "This Year" },
  { id: "custom", label: "Custom" },
];

function iso(d: Date) {
  return d.toLocaleDateString("en-CA");
}

function rangeFor(preset: Exclude<Preset, "custom">, today: string): [string, string] {
  const t = new Date(`${today}T00:00:00`);
  if (preset === "this_month") return [iso(new Date(t.getFullYear(), t.getMonth(), 1)), today];
  if (preset === "last_3") return [iso(new Date(t.getFullYear(), t.getMonth() - 2, 1)), today];
  return [`${t.getFullYear()}-01-01`, today];
}

interface Props {
  open: boolean;
  onClose: () => void;
  rows: LedgerRow[];
  today: string;
  tenantLabel: string;
}

export function DownloadStatementSheet({ open, onClose, rows, today, tenantLabel }: Props) {
  const [preset, setPreset] = useState<Preset>("last_3");
  const [[from, to], setRange] = useState<[string, string]>(() => rangeFor("last_3", today));
  const [generating, setGenerating] = useState(false);
  const [file, setFile] = useState<{ name: string; content: string; count: number } | null>(null);

  const valid = from !== "" && to !== "" && from <= to;

  function pick(p: Preset) {
    setPreset(p);
    if (p !== "custom") setRange(rangeFor(p, today));
  }

  async function generate() {
    setGenerating(true);
    // Mock of GET /me/ledger/statement.pdf?from=&to= — builds a CSV locally until the backend renders the PDF.
    await new Promise((r) => setTimeout(r, 900));
    const inRange = rows.filter((r) => r.date >= from && r.date <= to).reverse();
    const csv = [
      `Statement of account,${tenantLabel}`,
      `Period,${from} to ${to}`,
      "",
      "Date,Description,Charge,Payment,Balance",
      ...inRange.map((r) => [r.date, `"${r.description}"`, r.amount > 0 ? r.amount : "", r.amount < 0 ? -r.amount : "", r.balance].join(",")),
    ].join("\n");
    setFile({ name: `statement_${from}_${to}.csv`, content: csv, count: inRange.length });
    setGenerating(false);
  }

  if (file) {
    return (
      <BottomSheet open={open} onClose={onClose} title="Statement ready">
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ok/12 text-ok">
            <CircleCheck className="h-8 w-8" />
          </span>
          <p className="mt-4 text-lg font-bold text-ink">Your statement is ready</p>
          <p className="mt-1 text-sm text-ink-muted">
            {file.count} entries · {from} to {to}
          </p>
          {import.meta.env.DEV && <p className="mt-2 text-xs text-ink-faint">Dev mode: exported as CSV until the backend generates the PDF.</p>}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => shareText("Statement of account", file.content)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-rule text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
              aria-label="Share statement"
            >
              <Share2 className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => downloadText(file.name, file.content, "text/csv")}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent transition hover:bg-accent-ink focus-visible:ring-4 focus-visible:ring-accent/25 focus-visible:outline-none"
              aria-label="Download statement"
            >
              <Download className="h-6 w-6" />
            </button>
          </div>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      open={open}
      onClose={generating ? () => {} : onClose}
      title="Download Statement"
      footer={
        <PrimaryButton type="button" onClick={generate} loading={generating} disabled={!valid}>
          {generating ? "Generating…" : "Generate PDF"}
        </PrimaryButton>
      }
    >
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Date range">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={preset === p.id}
            onClick={() => pick(p.id)}
            className={cn(
              "h-10 rounded-full border-2 px-4 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
              preset === p.id ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {(
          [
            ["From", from, (v: string) => setRange([v, to])],
            ["To", to, (v: string) => setRange([from, v])],
          ] as const
        ).map(([label, value, update]) => (
          <label key={label} className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
            <input
              type="date"
              value={value}
              max={today}
              onChange={(e) => {
                setPreset("custom");
                update(e.target.value);
              }}
              className="h-12 w-full rounded-xl border-2 border-rule bg-surface-sunken px-3 text-base text-ink focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none"
            />
          </label>
        ))}
      </div>
      {!valid && <p className="mt-2 text-sm text-danger">"From" must be on or before "To".</p>}
      <p className="mt-4 text-sm text-ink-faint">
        Includes every charge and payment in the range with a running balance — useful as rent proof for HRA. Current balance{" "}
        {formatINR(rows[0]?.balance ?? 0)}.
      </p>
    </BottomSheet>
  );
}
