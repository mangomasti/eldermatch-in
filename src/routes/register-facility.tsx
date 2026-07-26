import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Building2 } from "lucide-react";
import {
  STANDARDIZED_CARE_TYPES,
  FACILITY_TIERS,
  CONDITION_CARE_OPTIONS,
  DIETARY_PREFERENCES,
} from "@/lib/mock-data";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { writeFacilitySession } from "@/lib/facility-session";

export const Route = createFileRoute("/register-facility")({
  head: () => ({
    meta: [
      { title: "List your facility on ElderMatch" },
      {
        name: "description",
        content:
          "Get your verified care facility in front of families searching for the right home. Free to list — we verify every listing.",
      },
    ],
  }),
  component: RegisterFacility,
});

function RegisterFacility() {
  const navigate = useNavigate();
  const [tier, setTier] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [facilityName, setFacilityName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    writeFacilitySession({
      facilityId: "willowbrook-gardens",
      facilityName: facilityName || "Your facility",
      mode: "registration-pending",
    });
    toast.success("Submitted! Redirecting you to your facility dashboard…");
    setTimeout(() => navigate({ to: "/dashboard" }), 700);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-16">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-primary">For facilities</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">List your facility on ElderMatch</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Free to list. We verify every facility on-site before it goes live — families trust us because of it.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
          <Field label="Facility name">
            <input
              required
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className={inputCls}
              placeholder="Willowbrook Gardens"
            />
          </Field>

          <Field label="Facility tier" hint="Helps families instantly understand your positioning.">
            <div className="grid gap-2 sm:grid-cols-2">
              {FACILITY_TIERS.map((t) => (
                <label
                  key={t}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                    tier === t ? "border-primary bg-primary/5" : "border-input bg-background"
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    checked={tier === t}
                    onChange={() => setTier(t)}
                    className="h-4 w-4 accent-[color:var(--primary)]"
                  />
                  {t}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Full address">
            <input required className={inputCls} placeholder="Street, area, city, PIN" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary contact person">
              <input required className={inputCls} placeholder="Full name" />
            </Field>
            <Field label="Role">
              <input className={inputCls} placeholder="Owner / Administrator" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <input required type="tel" className={inputCls} placeholder="+91 ..." />
            </Field>
            <Field label="Email">
              <input required type="email" className={inputCls} placeholder="you@facility.com" />
            </Field>
          </div>

          <Field label="Care types offered" hint="Pick from our standardised list so families compare like-for-like.">
            <div className="grid gap-2 sm:grid-cols-2">
              {STANDARDIZED_CARE_TYPES.map((c) => {
                const active = types.includes(c.name);
                return (
                  <label
                    key={c.name}
                    className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                      active ? "border-primary bg-primary/5" : "border-input bg-background"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        setTypes(active ? types.filter((x) => x !== c.name) : [...types, c.name])
                      }
                      className="mt-0.5 h-4 w-4 accent-[color:var(--primary)]"
                    />
                    <span>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.definition}</div>
                    </span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field label="Specialised condition care" hint="Optional. Helps you appear for the right condition-based searches.">
            <div className="grid gap-2 sm:grid-cols-2">
              {CONDITION_CARE_OPTIONS.map((c) => {
                const active = conditions.includes(c);
                return (
                  <label
                    key={c}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                      active ? "border-primary bg-primary/5" : "border-input bg-background"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        setConditions(active ? conditions.filter((x) => x !== c) : [...conditions, c])
                      }
                      className="h-4 w-4 accent-[color:var(--primary)]"
                    />
                    {c}
                  </label>
                );
              })}
            </div>
          </Field>

          <div className="rounded-2xl border border-border bg-warm/20 p-4">
            <div className="mb-3 text-sm font-semibold">Cost breakdown (₹ / month)</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Private room — base">
                <input type="number" className={inputCls} placeholder="65000" />
              </Field>
              <Field label="Shared room — base">
                <input type="number" className={inputCls} placeholder="45000" />
              </Field>
              <Field label="Physio session — extra">
                <input className={inputCls} placeholder="₹500 / session" />
              </Field>
              <Field label="Attendant (1:1) — extra">
                <input className={inputCls} placeholder="₹15,000 / month" />
              </Field>
              <Field label="Special diet — extra">
                <input className={inputCls} placeholder="₹2,500 / month" />
              </Field>
              <Field label="Refundable deposit">
                <input className={inputCls} placeholder="₹50,000" />
              </Field>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Staff credentials">
              <input className={inputCls} placeholder="e.g. GNM & B.Sc. nurses, geriatrician on-call" />
            </Field>
            <Field label="Average staff experience">
              <input className={inputCls} placeholder="e.g. 8 years" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nearest hospital (partner)">
              <input className={inputCls} placeholder="e.g. Manipal Hospitals — 15 min" />
            </Field>
            <Field label="Distance to nearest airport">
              <input className={inputCls} placeholder="e.g. 38 km to KIA" />
            </Field>
          </div>

          <Field label="Community / dietary preference" hint="Select all that your kitchen can reliably serve.">
            <div className="grid gap-2 sm:grid-cols-2">
              {DIETARY_PREFERENCES.map((d) => {
                const active = dietary.includes(d);
                return (
                  <label
                    key={d}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                      active ? "border-primary bg-primary/5" : "border-input bg-background"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        setDietary(active ? dietary.filter((x) => x !== d) : [...dietary, d])
                      }
                      className="h-4 w-4 accent-[color:var(--primary)]"
                    />
                    {d}
                  </label>
                );
              })}
            </div>
          </Field>

          <Field label="Cuisine offered">
            <input className={inputCls} placeholder="e.g. South Indian, North Indian, Diabetic-friendly" />
          </Field>

          <Field label="Emergency response plan" hint="How you handle medical emergencies. Shown publicly.">
            <textarea rows={3} className={inputCls} placeholder="On-call doctor SLA, ambulance arrangement, partner hospital, family notification protocol…" />
          </Field>

          <Field label="Brief description">
            <textarea rows={4} className={inputCls} placeholder="Tell families about your home — size, ethos, what makes it special." />
          </Field>

          <UploadBox label="Upload photos" hint="Add 5–10 recent, unretouched photos. JPG/PNG up to 10MB each." />
          <UploadBox label="Upload licensing & accreditation documents" hint="PDF preferred. Include state registration and any NABH / ISO certificates." />

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              Submit & open my dashboard
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you agree to allow an ElderMatch verifier to visit on-site.
              You'll be taken to a preview of your facility dashboard right after.
            </p>
            <p className="mt-2 text-center text-xs">
              Already listed? <Link to="/dashboard" className="text-primary hover:underline">Go to dashboard</Link>
            </p>
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/85">{label}</span>
      {hint && <span className="-mt-1 mb-2 block text-xs text-muted-foreground">{hint}</span>}
      {children}
    </label>
  );
}

function UploadBox({ label, hint }: { label: string; hint: string }) {
  return (
    <div>
      <div className="mb-1.5 text-sm font-medium text-foreground/85">{label}</div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-input bg-warm/20 px-5 py-8 text-center transition-colors hover:border-primary/40 hover:bg-warm/40">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-primary">
          <Upload className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium">Click to upload or drag & drop</span>
        <span className="max-w-sm text-xs text-muted-foreground">{hint}</span>
        <input type="file" multiple className="hidden" />
      </label>
    </div>
  );
}
