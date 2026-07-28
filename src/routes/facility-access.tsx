import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Building2, MapPin, BadgeCheck, HelpCircle, PlusCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { OWNER_LISTINGS } from "@/lib/mock-data";

export const Route = createFileRoute("/facility-access")({
  head: () => ({
    meta: [
      { title: "Is your facility already on ElderMatch?" },
      {
        name: "description",
        content:
          "Search for your care home to claim an existing listing, log in to your dashboard, or create a brand-new listing on ElderMatch.",
      },
      { property: "og:title", content: "Is your facility already on ElderMatch?" },
      {
        property: "og:description",
        content: "Claim, log in, or create your care facility listing on ElderMatch.",
      },
    ],
  }),
  component: FacilityAccess,
});

function FacilityAccess() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [searched, setSearched] = useState(false);

  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return OWNER_LISTINGS.filter(
      (l) =>
        l.name.toLowerCase().includes(term) ||
        l.neighborhood.toLowerCase().includes(term) ||
        l.city.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Building2 className="h-3.5 w-3.5" /> For facility owners &amp; admins
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">
          Is your facility already on ElderMatch?
        </h1>
        <p className="mt-3 text-muted-foreground">
          Many homes are already listed from our on-ground research. Search first — you may just
          need to claim yours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="mt-8 flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-[var(--shadow-card)] sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-4 py-2.5">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSearched(true);
              }}
              placeholder="Search for your facility name to check"
              className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Check
          </button>
        </form>

        <div className="mt-3">
          <Link
            to="/facility-login"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            I already know my login — Skip to Login
          </Link>
        </div>

        {searched && q.trim() && (
          <div className="mt-10">
            <h2 className="font-serif text-2xl">
              {matches.length > 0
                ? `${matches.length} possible match${matches.length === 1 ? "" : "es"}`
                : "No matches found"}
            </h2>

            {matches.length > 0 ? (
              <div className="mt-4 space-y-3">
                {matches.map((l) => (
                  <div
                    key={l.id}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{l.name}</span>
                        <StatusBadge status={l.status} />
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {l.neighborhood}, {l.city}
                        </span>
                        <span>{l.careType}</span>
                        <span>{l.tier}</span>
                      </div>
                    </div>
                    {l.status === "Already Registered" ? (
                      <button
                        onClick={() =>
                          navigate({ to: "/facility-login", search: { facility: l.id } })
                        }
                        className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                      >
                        This is my facility — Log in
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate({ to: "/facility-claim/$id", params: { id: l.id } })
                        }
                        className="shrink-0 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
                      >
                        Claim this listing
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't find a listing under that name. You can create a new one below.
              </p>
            )}

            <Link
              to="/register-facility"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <HelpCircle className="h-4 w-4" /> None of these — Create a new listing instead
            </Link>
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-border bg-warm/25 p-6">
          <div className="flex items-start gap-3">
            <PlusCircle className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="font-serif text-xl">My facility isn't listed</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Create a new listing from scratch. Free, and verified by our team before it goes
                live.
              </p>
              <Link
                to="/register-facility"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Create a new listing
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatusBadge({ status }: { status: "Unclaimed" | "Already Registered" }) {
  const registered = status === "Already Registered";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        registered ? "bg-verified/15 text-verified" : "bg-highlight/15 text-highlight"
      }`}
    >
      {registered && <BadgeCheck className="h-3 w-3" />}
      {status}
    </span>
  );
}
