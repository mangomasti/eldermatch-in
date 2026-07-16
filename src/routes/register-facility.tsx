import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, CheckCircle2, Building2 } from "lucide-react";
import { ALL_CARE_TYPES } from "@/lib/mock-data";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/register-facility")({
  head: () => ({
    meta: [
      { title: "List your facility on Kinstead" },
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
  const [types, setTypes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thanks! Our verification team will contact you within 3-5 business days.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8">
          <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-verified/15 text-verified">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-6 font-serif text-3xl md:text-4xl">Submission received</h1>
          <p className="mt-3 text-muted-foreground">
            Thanks for putting your facility forward. Our verification team will review your submission and contact you within <strong>3–5 business days</strong> to schedule an on-site visit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/home"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Back to homepage
            </Link>
            <Link to="/about" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">
              How verification works
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

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
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">List your facility on Kinstead</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Free to list. We verify every facility on-site before it goes live — families trust us because of it.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
          <Field label="Facility name">
            <input required className={inputCls} placeholder="Willowbrook Gardens" />
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

          <Field label="Care types offered">
            <div className="grid gap-2 sm:grid-cols-2">
              {ALL_CARE_TYPES.map((c) => {
                const active = types.includes(c);
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
                        setTypes(active ? types.filter((x) => x !== c) : [...types, c])
                      }
                      className="h-4 w-4 accent-[color:var(--primary)]"
                    />
                    {c}
                  </label>
                );
              })}
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Pricing — minimum (₹/month)">
              <input required type="number" className={inputCls} placeholder="35000" />
            </Field>
            <Field label="Pricing — maximum (₹/month)">
              <input required type="number" className={inputCls} placeholder="70000" />
            </Field>
          </div>

          <Field label="Brief description">
            <textarea rows={4} className={inputCls} placeholder="Tell families about your home — size, ethos, what makes it special." />
          </Field>

          <UploadBox label="Upload photos" hint="Add 5–10 recent, unretouched photos of your facility. JPG/PNG up to 10MB each." />
          <UploadBox label="Upload licensing & accreditation documents" hint="PDF preferred. Include state registration and any NABH / ISO certificates." />

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              Submit for verification
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you agree to allow a Kinstead verifier to visit on-site.
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/85">{label}</span>
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
