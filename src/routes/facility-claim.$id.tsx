import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Upload, MapPin, CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getOwnerListing } from "@/lib/mock-data";
import { writeFacilitySession } from "@/lib/facility-session";

export const Route = createFileRoute("/facility-claim/$id")({
  head: () => ({
    meta: [
      { title: "Verify ownership — ElderMatch" },
      {
        name: "description",
        content:
          "Verify that you own or manage this care facility to claim its ElderMatch listing and unlock the facility dashboard.",
      },
      { property: "og:title", content: "Verify ownership — ElderMatch" },
      { property: "og:description", content: "Claim your care facility listing on ElderMatch." },
    ],
  }),
  component: ClaimListing,
});

const ROLES = ["Owner", "Manager", "Administrator"];

function ClaimListing() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const listing = getOwnerListing(id);
  const [role, setRole] = useState("Owner");
  const [file, setFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    writeFacilitySession({
      facilityId: listing?.id ?? id,
      facilityName: listing?.name ?? "Your facility",
      mode: "claim-pending",
    });
    toast.success("Claim request received.");
  };

  if (!listing) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-serif text-3xl">Listing not found</h1>
          <Link to="/facility-access" className="mt-4 inline-block text-primary hover:underline">
            Back to facility search
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
        {submitted ? (
          <div className="rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-verified/15 text-verified">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-serif text-3xl">Thanks — we've received your claim request.</h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Our team will verify your ownership within 2–3 business days before you get full access.
            </p>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to my dashboard
            </button>
          </div>
        ) : (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Verify ownership
            </span>
            <h1 className="mt-4 font-serif text-3xl md:text-4xl">Claim {listing.name}</h1>
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {listing.neighborhood}, {listing.city} · {listing.careType}
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Your name</span>
                <input required className={inputCls} placeholder="Full name" />
              </label>

              <div>
                <span className="mb-1.5 block text-sm font-medium">Your role at the facility</span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {ROLES.map((r) => (
                    <label
                      key={r}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                        role === r ? "border-primary bg-primary/5" : "border-input bg-background"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        checked={role === r}
                        onChange={() => setRole(r)}
                        className="h-4 w-4 accent-[color:var(--primary)]"
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Phone</span>
                  <input required type="tel" className={inputCls} placeholder="+91 ..." />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Email</span>
                  <input required type="email" className={inputCls} placeholder="you@facility.com" />
                </label>
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium">Upload proof of ownership</span>
                <button
                  type="button"
                  onClick={() => setFile("ownership-proof.pdf")}
                  className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-input bg-background px-4 py-8 text-sm text-muted-foreground hover:border-primary/50"
                >
                  <Upload className="h-5 w-5" />
                  {file ? (
                    <span className="font-medium text-foreground">{file} — attached</span>
                  ) : (
                    <>
                      <span className="font-medium text-foreground">Click to upload</span>
                      <span className="text-xs">Registration certificate, trust deed, GST or utility bill (PDF/JPG)</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Submit claim request
              </button>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary";
