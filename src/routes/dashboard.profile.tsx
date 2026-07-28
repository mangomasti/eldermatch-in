import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, Save, ExternalLink } from "lucide-react";
import {
  MOCK_DASHBOARD,
  getFacility,
  getEnrichment,
  STANDARDIZED_CARE_TYPES,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/profile")({
  component: ManageProfile,
});

function ManageProfile() {
  const f = getFacility(MOCK_DASHBOARD.facilityId);
  const e = f ? getEnrichment(f.id) : undefined;
  const [saving, setSaving] = useState(false);

  if (!f) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Changes saved. Families will see them within a few minutes.");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl">Manage profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything shown on your public listing.
          </p>
        </div>
        <Link
          to="/facility/$id"
          params={{ id: f.id }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium hover:bg-accent"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Preview public profile
        </Link>
      </div>

      <form
        onSubmit={save}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8"
      >
        <Card title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Facility name">
              <input defaultValue={f.name} className={inputCls} />
            </Field>
            <Field label="Tier">
              <input defaultValue={e?.tier ?? ""} className={inputCls} />
            </Field>
            <Field label="Neighbourhood">
              <input defaultValue={f.neighborhood} className={inputCls} />
            </Field>
            <Field label="City">
              <input defaultValue={f.city} className={inputCls} />
            </Field>
            <Field label="Full address" wide>
              <input defaultValue={f.address} className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card title="Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {f.images.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
            <button
              type="button"
              className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-input bg-warm/20 text-xs text-muted-foreground hover:border-primary/40"
            >
              <Camera className="h-4 w-4" /> Add photo
            </button>
          </div>
        </Card>

        <Card title="Description">
          <textarea rows={5} defaultValue={f.longDescription} className={inputCls} />
        </Card>

        <Card title="Care types offered">
          <div className="grid gap-2 sm:grid-cols-2">
            {STANDARDIZED_CARE_TYPES.map((c) => (
              <label
                key={c.name}
                className="flex items-start gap-2 rounded-xl border border-input px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  defaultChecked={f.careTypes.some((t) =>
                    t.toLowerCase().includes(c.name.split(" ")[0].toLowerCase()),
                  )}
                  className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
                />
                <span>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.definition}</div>
                </span>
              </label>
            ))}
          </div>
        </Card>

        <Card title="Pricing">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Private room (₹/mo)">
              <input
                type="number"
                defaultValue={e?.itemizedCosts.private ?? f.priceMin}
                className={inputCls}
              />
            </Field>
            <Field label="Shared room (₹/mo)">
              <input
                type="number"
                defaultValue={e?.itemizedCosts.shared ?? ""}
                className={inputCls}
              />
            </Field>
            <Field label="Refundable deposit">
              <input defaultValue={e?.itemizedCosts.deposit ?? ""} className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card title="Operations">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Staff ratio">
              <input defaultValue={e?.staff.ratio ?? f.staffRatio} className={inputCls} />
            </Field>
            <Field label="Hospital tie-up">
              <input defaultValue={e?.hospitalTieUp ?? ""} className={inputCls} />
            </Field>
            <Field label="Distance to hospital">
              <input defaultValue={e?.distanceToHospital ?? ""} className={inputCls} />
            </Field>
            <Field label="Distance to airport">
              <input defaultValue={e?.distanceToAirport ?? ""} className={inputCls} />
            </Field>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}

function Field({
  label,
  wide,
  children,
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium text-foreground/85">{label}</span>
      {children}
    </label>
  );
}
