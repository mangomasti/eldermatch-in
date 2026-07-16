import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, ShieldCheck, Camera, BadgeCheck, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FacilityCard } from "@/components/facility-card";
import { facilities, NEIGHBORHOODS } from "@/lib/mock-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Find the right care home for your loved one — Kinstead" },
      {
        name: "description",
        content:
          "Search verified assisted living, memory care and nursing homes near you. Real photos, verified reviews, licensed facilities.",
      },
      { property: "og:title", content: "Find the right care home for your loved one — Kinstead" },
      {
        property: "og:description",
        content: "Verified senior care homes with real photos and reviews from confirmed stays.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("");
  const featured = facilities.filter((f) => f.featured).slice(0, 4);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: loc ? { q: loc } : {} });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-warm/60 via-warm/20 to-background" />
        <div className="mx-auto max-w-7xl px-5 pt-14 pb-16 md:px-8 md:pt-24 md:pb-24">
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-verified/30 bg-background px-3 py-1 text-xs font-medium text-verified">
                <ShieldCheck className="h-3.5 w-3.5" /> Every home is licence-checked
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
                Find the right care home for your loved one.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Compare verified assisted living, memory care and nursing homes in your city — with real photos, honest reviews, and clear pricing.
              </p>

              <form
                onSubmit={submitSearch}
                className="mt-8 flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-[var(--shadow-card)] sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-2 px-4 py-2.5">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <input
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    placeholder="Neighbourhood or city — e.g. Indiranagar"
                    className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
                >
                  <Search className="h-4 w-4" /> Search homes
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Assisted living", "Memory care", "Independent living", "Under ₹50,000/mo"].map(
                  (chip) => (
                    <Link
                      key={chip}
                      to="/search"
                      className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-foreground"
                    >
                      {chip}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
                <img
                  src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=1000&q=80"
                  alt="A senior enjoying tea in a sunlit garden"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl bg-card p-4 shadow-[var(--shadow-lift)] sm:block">
                <div className="flex items-center gap-2 text-xs font-medium text-verified">
                  <BadgeCheck className="h-4 w-4" /> Verified this month
                </div>
                <p className="mt-1 text-sm text-foreground">
                  On-site audits, licence checks, and reviews only from confirmed stays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalised banner */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)] md:flex-row md:items-center md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-xl md:text-2xl">Not sure where to start?</h3>
              <p className="mt-1 text-sm text-primary-foreground/85">
                Answer 6 quick questions. We'll surface the homes that best fit your needs and budget.
              </p>
            </div>
          </div>
          <Link
            to="/questionnaire"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary hover:opacity-90"
          >
            Get personalised recommendations
          </Link>
        </div>
      </section>

      {/* Featured facilities */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-4 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Featured homes</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked, freshly verified.</p>
          </div>
          <Link to="/search" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            Browse all homes →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((f) => (
            <FacilityCard key={f.id} facility={f} />
          ))}
        </div>
      </section>

      {/* Popular neighborhoods */}
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-8">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Popular neighbourhoods</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n}
              to="/search"
              search={{ q: n }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80 hover:border-primary/40 hover:text-foreground"
            >
              {n}
            </Link>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-8">
        <div className="rounded-3xl bg-warm/40 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="font-serif text-3xl text-foreground md:text-4xl">
                Trust, built in.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choosing a care home is one of the hardest decisions a family makes. We remove the guesswork with a rigorous verification process.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
              >
                How verification works
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <TrustPill icon={<BadgeCheck />} title="Licensed & accredited" desc="Every listing's licence is verified with state authorities." />
              <TrustPill icon={<MessageCircle />} title="Verified reviews" desc="Only families with confirmed stays can leave reviews." />
              <TrustPill icon={<Camera />} title="Real photos & videos" desc="Our team visits on-site and captures unretouched imagery." />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function TrustPill({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-soft)]">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="mt-3 font-medium text-foreground">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
