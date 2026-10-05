import { ArrowLeft, Globe2, MapPin, MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AmenitiesTab } from "../components/properties/tabs/AmenitiesTab";
import { DocumentsTab } from "../components/properties/tabs/DocumentsTab";
import { LocationTab } from "../components/properties/tabs/LocationTab";
import { MediaTab } from "../components/properties/tabs/MediaTab";
import { OverviewTab } from "../components/properties/tabs/OverviewTab";
import { UnitsTab } from "../components/properties/tabs/UnitsTab";
import { PropertyPhoto } from "../components/properties/PropertyPhoto";
import { DropdownMenu } from "../components/ui/DropdownMenu";
import { ProgressRing } from "../components/ui/ProgressRing";
import { getPropertyById } from "../data/properties";
import { cn } from "../lib/utils";

const tabs = ["Overview", "Units", "Amenities", "Media", "Location", "Documents"] as const;
type Tab = (typeof tabs)[number];

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : undefined;
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-ink-faint">Property not found.</p>
        <Link to="/properties" className="text-sm font-medium text-accent hover:text-accent-ink">
          &larr; Back to Properties
        </Link>
      </div>
    );
  }

  const occupancyPercent = (property.occupied / property.totalUnits) * 100;

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Link to="/properties" className="flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        All Properties
      </Link>

      {/* Cover banner */}
      <div className="relative h-56 overflow-hidden rounded-2xl border border-rule">
        <PropertyPhoto seed={property.photoSeed} className="h-full w-full" iconSize="lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-medium text-ink">{property.type}</span>
            <h1 className="mt-2 text-2xl font-bold text-white drop-shadow">{property.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/90 drop-shadow">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              {property.addressLine1}, {property.locality}, {property.city}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {property.isListed && (
              <span className="flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium text-ink">
                <Globe2 className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                Listed
              </span>
            )}
            <div className="rounded-full bg-surface/90 p-1 shadow">
              <ProgressRing percent={occupancyPercent} size={40} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
        >
          <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
          Edit
        </button>
        <DropdownMenu
          trigger={
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule">
              <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
            </span>
          }
          actions={[
            { label: property.isListed ? "Unlist from Website" : "Publish to Website", onSelect: () => {} },
            { label: "Archive Property", onSelect: () => {}, tone: "danger" },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Units" value={String(property.totalUnits)} />
        <StatCard label="Occupied" value={String(property.occupied)} tone="info" />
        <StatCard label="Available" value={String(property.available)} tone="ok" />
        <StatCard label="Under Notice" value={String(property.notice)} tone="warn" />
        <StatCard label="Maintenance" value={String(property.maintenance)} tone="warn" />
        <StatCard label="Occupancy" value={`${Math.round(occupancyPercent)}%`} />
      </div>

      {/* Tabs */}
      <div className="border-b border-rule">
        <nav className="-mb-px flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-medium",
                activeTab === tab ? "border-accent text-accent-ink" : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "Overview" && <OverviewTab property={property} />}
      {activeTab === "Units" && <UnitsTab property={property} />}
      {activeTab === "Amenities" && <AmenitiesTab property={property} />}
      {activeTab === "Media" && <MediaTab property={property} />}
      {activeTab === "Location" && <LocationTab property={property} />}
      {activeTab === "Documents" && <DocumentsTab />}
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "ok" | "info" | "warn" }) {
  const toneClass = tone === "ok" ? "text-ok" : tone === "info" ? "text-info" : tone === "warn" ? "text-warn" : "text-ink";
  return (
    <div className="rounded-xl border border-rule bg-surface p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={cn("mt-1 text-lg font-bold tabular-nums", toneClass)}>{value}</p>
    </div>
  );
}
