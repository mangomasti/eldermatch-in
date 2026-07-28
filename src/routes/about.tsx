import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ClipboardCheck, Camera, MessageCircle, RefreshCw, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How verification works — ElderMatch" },
      {
        name: "description",
        content:
          "How ElderMatch verifies every senior care home: licence checks, on-site audits, confirmed-stay reviews, and quarterly re-verification.",
      },
      { property: "og:title", content: "How verification works — ElderMatch" },
      {
        property: "og:description",
        content:
          "Licence checks, on-site audits, and reviews only from confirmed stays. Here's exactly how it works.",
      },
    ],
  }),
  component: About,
});

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Licence & accreditation check",
    body: "Before a facility goes live, our compliance team cross-checks its state nursing-home registration and any additional accreditations (NABH, ISO, JCI) directly with the issuing bodies. If anything is expired or unverifiable, the listing does not go live.",
  },
  {
    icon: Users,
    title: "On-site audit",
    body: "A trained ElderMatch auditor visits every facility unannounced. We inspect rooms, kitchens, medication protocols, staff-to-resident ratios, and emergency preparedness. We speak to residents and staff without management present.",
  },
  {
    icon: Camera,
    title: "Real photo & video capture",
    body: "Photos on ElderMatch are captured by our team during the on-site visit. No filters, no staging. Facilities can add their own images, but every image is manually reviewed for authenticity before it's published.",
  },
  {
    icon: MessageCircle,
    title: "Verified-stay reviews",
    body: "Only families with a confirmed stay — booked or enquired through ElderMatch — can leave a review. Every review is moderated for authenticity. Facilities cannot remove reviews they don't like.",
  },
  {
    icon: RefreshCw,
    title: "Quarterly re-verification",
    body: "Every listed facility is re-verified on a rolling 90-day cycle. Any change in ownership, staffing ratios, or licence status must be reported and updated on the listing.",
  },
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-verified/30 bg-verified/10 px-3 py-1 text-xs font-medium text-verified">
          <ShieldCheck className="h-3.5 w-3.5" /> Trust & verification
        </span>
        <h1 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
          Verification is the point.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          ElderMatch exists because choosing a care home shouldn't feel like a gamble. Every home on
          this platform has been visited, audited, and continuously re-checked by our team. Here's
          exactly what that means.
        </p>

        <div className="mt-14 space-y-5">
          {STEPS.map((s, i) => (
            <article
              key={s.title}
              className="flex flex-col gap-5 rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)] md:flex-row md:items-start md:p-8"
            >
              <div className="flex items-center gap-4 md:w-56 md:shrink-0 md:flex-col md:items-start">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <div>
                <h2 className="font-serif text-2xl">{s.title}</h2>
                <p className="mt-2 text-foreground/85">{s.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-warm/40 p-8 md:p-10">
          <h3 className="font-serif text-2xl md:text-3xl">What we don't do</h3>
          <ul className="mt-5 space-y-3 text-foreground/85">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
              <span>We don't take payment from families to enquire, tour, or move in. Ever.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
              <span>
                We don't let facilities pay for higher rankings or to bury negative reviews.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
              <span>We don't publish anonymous reviews. Every reviewer's stay is confirmed.</span>
            </li>
          </ul>
        </div>

        <div className="mt-14 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
          <h3 className="font-serif text-3xl">Have a concern about a listing?</h3>
          <p className="mt-3 max-w-xl text-primary-foreground/85">
            If a family or resident reports a serious concern, we investigate within 48 hours and
            suspend the listing until it's resolved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary hover:opacity-90"
            >
              Browse verified homes
            </Link>
            <Link
              to="/register-facility"
              className="rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              List your facility
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
