import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  Phone,
  X,
  BadgeCheck,
  Users,
  Stethoscope,
  Languages,
  Sparkles,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getFacility, formatINR } from "@/lib/mock-data";
import { useShortlist } from "@/lib/prefs";

export const Route = createFileRoute("/facility/$id")({
  loader: ({ params }: { params: { id: string } }) => {
    const facility = getFacility(params.id);
    if (!facility) throw notFound();
    return { facility };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Facility not found — Kinstead" }, { name: "robots", content: "noindex" }] };
    }
    const f = loaderData.facility;
    return {
      meta: [
        { title: `${f.name} — ${f.neighborhood}, ${f.city} · Kinstead` },
        { name: "description", content: f.description },
        { property: "og:title", content: `${f.name} — Kinstead` },
        { property: "og:description", content: f.description },
        { property: "og:image", content: f.images[0] },
        { name: "twitter:image", content: f.images[0] },
      ],
    };
  },
  component: FacilityProfile,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Facility not found</h1>
        <p className="mt-2 text-muted-foreground">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/search"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Browse all homes
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function FacilityProfile() {
  const { facility: f } = Route.useLoaderData();
  const { has, toggle } = useShortlist();
  const saved = has(f.id);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/home" className="hover:text-foreground">Home</Link>
          <span className="px-2">/</span>
          <Link to="/search" className="hover:text-foreground">Homes</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{f.name}</span>
        </nav>

        {/* Gallery */}
        <div className="mt-5 grid gap-2 overflow-hidden rounded-3xl md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2">
          <div className="relative aspect-[4/3] md:col-start-1 md:row-span-2 md:aspect-auto">
            <img src={f.images[0]} alt={f.name} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-verified shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified recent photos
            </span>
          </div>
          {f.images.slice(1, 4).map((src, i) => (
            <div key={i} className="relative hidden aspect-[4/3] md:block md:aspect-auto">
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-3xl md:text-4xl">{f.name}</h1>
                  {f.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-3 py-1 text-xs font-semibold text-verified">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified · Last verified {f.lastVerified}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {f.address}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-highlight text-highlight" />
                    <span className="font-semibold text-foreground">{f.rating}</span> ({f.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  toggle(f.id);
                  toast(saved ? "Removed from shortlist" : "Saved to your shortlist");
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${
                  saved
                    ? "border-highlight/40 bg-highlight/10 text-highlight"
                    : "border-border bg-card text-foreground/80 hover:border-primary/40"
                }`}
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-highlight" : ""}`} />
                {saved ? "Shortlisted" : "Save to shortlist"}
              </button>
            </div>

            <p className="mt-6 text-base leading-relaxed text-foreground/85">{f.longDescription}</p>

            <Section title="Pricing">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl">{formatINR(f.priceMin)}</span>
                  <span className="text-muted-foreground">to {formatINR(f.priceMax)} / month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Base cost includes room, boarding, housekeeping and standard care. Physiotherapy sessions, specialist medications, and one-to-one attendants are billed separately.
                </p>
              </div>
            </Section>

            <Section title="Amenities">
              <div className="flex flex-wrap gap-2">
                {f.amenities.map((a) => (
                  <span key={a} className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                    {a}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Medical capabilities">
              <div className="grid gap-3 sm:grid-cols-2">
                {f.medicalCapabilities.map((m) => (
                  <div key={m} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3.5">
                    <Stethoscope className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm">{m}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-warm/40 p-4">
                <Users className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="font-medium">Staff-to-resident ratio: </span>
                  {f.staffRatio}
                </div>
              </div>
            </Section>

            <Section title="Licensing & accreditation">
              <ul className="space-y-2">
                {f.licensing.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="A typical week">
              <div className="overflow-x-auto">
                <div className="grid min-w-[600px] grid-cols-5 gap-3">
                  {f.schedule.map((d) => (
                    <div key={d.day} className="rounded-2xl border border-border bg-card p-4">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        {d.day}
                      </div>
                      <ul className="space-y-1.5 text-sm text-foreground/85">
                        {d.activities.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Life at the home">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-primary" /> Residents enjoy
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.residentInterests.map((i) => (
                      <span key={i} className="rounded-full bg-warm px-3 py-1 text-sm text-warm-foreground">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Languages className="h-4 w-4 text-primary" /> Languages spoken
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.languages.map((l) => (
                      <span key={l} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title={`Reviews · ${f.rating} average from ${f.reviewCount} stays`}>
              <div className="space-y-4">
                {f.reviews.map((r, i) => (
                  <article key={i} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                          {r.author.charAt(0)}
                        </span>
                        <div>
                          <div className="text-sm font-semibold">{r.author}</div>
                          <div className="text-xs text-muted-foreground">{r.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.verifiedStay && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-2 py-0.5 text-xs font-medium text-verified">
                            <BadgeCheck className="h-3 w-3" /> Verified stay
                          </span>
                        )}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star
                              key={k}
                              className={`h-3.5 w-3.5 ${
                                k < r.rating ? "fill-highlight text-highlight" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">{r.text}</p>
                  </article>
                ))}
              </div>
            </Section>
          </div>

          {/* Sticky contact panel */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl">{formatINR(f.priceMin)}</span>
                <span className="text-sm text-muted-foreground">– {formatINR(f.priceMax)}/mo</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-highlight text-highlight" />
                <span className="font-medium">{f.rating}</span>
                <span className="text-muted-foreground">({f.reviewCount} reviews)</span>
              </div>
              <button
                onClick={() => setContactOpen(true)}
                className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
              >
                Contact this facility
              </button>
              <button
                onClick={() => {
                  toggle(f.id);
                  toast(saved ? "Removed from shortlist" : "Saved to your shortlist");
                }}
                className="mt-2 w-full rounded-full border border-border py-3 text-sm font-medium hover:bg-accent"
              >
                {saved ? "Shortlisted ✓" : "Save to shortlist"}
              </button>
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-warm/40 p-3 text-xs text-warm-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                <span>
                  Kinstead never charges families to enquire or tour a facility.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sticky bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <button
          onClick={() => setContactOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" /> Contact this facility
        </button>
      </div>

      {contactOpen && <ContactModal facilityName={f.name} onClose={() => setContactOpen(false)} />}

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ContactModal({ facilityName, onClose }: { facilityName: string; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success(`Thanks! ${facilityName} will contact you shortly.`);
      onClose();
    }, 400);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-background p-6 shadow-[var(--shadow-lift)] sm:rounded-3xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-2xl">Enquire about {facilityName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll pass your details directly to the facility.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <Field label="Your name">
            <input required className={inputCls} placeholder="Full name" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <input required type="tel" className={inputCls} placeholder="+91 ..." />
            </Field>
            <Field label="Email">
              <input required type="email" className={inputCls} placeholder="you@example.com" />
            </Field>
          </div>
          <Field label="Message">
            <textarea
              rows={3}
              className={inputCls}
              placeholder="Tell them about the person needing care and when you'd like to visit."
            />
          </Field>
          <Field label="Preferred contact method">
            <div className="mt-1 grid grid-cols-3 gap-2">
              {["Call", "WhatsApp", "Email"].map((m) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-input bg-background py-2 text-sm hover:border-primary/40"
                >
                  <input type="radio" name="contact" defaultChecked={m === "Call"} className="accent-[color:var(--primary)]" />
                  {m}
                </label>
              ))}
            </div>
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send enquiry"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Kinstead never shares your details with anyone else.
          </p>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}
