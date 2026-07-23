import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Sparkles, SlidersHorizontal, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FacilityCard } from "@/components/facility-card";
import {
  facilities,
  ALL_CARE_TYPES,
  ALL_AMENITIES,
  NEIGHBORHOODS,
  formatINR,
} from "@/lib/mock-data";
import { usePreferences } from "@/lib/prefs";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse verified senior care homes — ElderMatch" },
      {
        name: "description",
        content:
          "Filter by care type, budget, amenities and neighbourhood. Every home on ElderMatch is licence-checked and reviewed on-site.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { prefs } = usePreferences();
  const [neighborhood, setNeighborhood] = useState<string>(q ?? "");
  const [budget, setBudget] = useState<number>(150000);
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    return facilities.filter((f) => {
      if (neighborhood && !`${f.neighborhood} ${f.city}`.toLowerCase().includes(neighborhood.toLowerCase()))
        return false;
      if (f.priceMin > budget) return false;
      if (careTypes.length && !careTypes.some((c) => f.careTypes.includes(c))) return false;
      if (amenities.length && !amenities.every((a) => f.amenities.includes(a))) return false;
      if (f.rating < minRating) return false;
      if (verifiedOnly && !f.verified) return false;
      return true;
    });
  }, [neighborhood, budget, careTypes, amenities, minRating, verifiedOnly]);

  const recommendedIds = useMemo(() => {
    if (!prefs) return new Set<string>();
    // Simple mock: match on location + care needs + budget
    const scored = facilities
      .map((f) => {
        let score = 0;
        if (prefs.location && (f.neighborhood === prefs.location || prefs.location === "Anywhere"))
          score += 3;
        if (prefs.careNeeds.some((n) => f.careTypes.includes(n))) score += 2;
        if (f.priceMin <= prefs.budget) score += 1;
        if (prefs.language && f.languages.includes(prefs.language)) score += 1;
        return { id: f.id, score };
      })
      .sort((a, b) => b.score - a.score);
    return new Set(scored.slice(0, 2).map((s) => s.id));
  }, [prefs]);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const filtersPanel = (
    <div className="space-y-6">
      <FilterBlock title="Location">
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All neighbourhoods</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock title="Budget (per month)">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted-foreground">Up to</span>
          <span className="font-semibold">{formatINR(budget)}</span>
        </div>
        <input
          type="range"
          min={15000}
          max={150000}
          step={5000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-2 w-full accent-[color:var(--primary)]"
        />
      </FilterBlock>

      <FilterBlock title="Care type">
        <div className="space-y-2">
          {ALL_CARE_TYPES.map((c) => (
            <CheckRow
              key={c}
              label={c}
              checked={careTypes.includes(c)}
              onChange={() => setCareTypes(toggle(careTypes, c))}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Amenities">
        <div className="space-y-2">
          {ALL_AMENITIES.map((a) => (
            <CheckRow
              key={a}
              label={a}
              checked={amenities.includes(a)}
              onChange={() => setAmenities(toggle(amenities, a))}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Minimum rating">
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                minRating === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/80"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Verification">
        <label className="flex cursor-pointer items-center justify-between">
          <span className="text-sm">Verified only</span>
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--primary)]"
          />
        </label>
      </FilterBlock>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">Care homes {neighborhood ? `in ${neighborhood}` : "near you"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {results.length} home{results.length === 1 ? "" : "s"} match your search
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/questionnaire"
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 sm:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              {prefs ? "Update preferences" : "Get personalised recommendations"}
            </Link>
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
              <div className="mb-4 font-semibold">Filters</div>
              {filtersPanel}
            </div>
          </aside>

          <main>
            {results.length === 0 ? (
              <div className="rounded-2xl bg-card p-10 text-center shadow-[var(--shadow-soft)]">
                <div className="font-serif text-xl">No matches yet</div>
                <p className="mt-2 text-sm text-muted-foreground">Try loosening your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((f) => (
                  <FacilityCard
                    key={f.id}
                    facility={f}
                    recommended={recommendedIds.has(f.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="font-semibold">Filters</div>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filtersPanel}</div>
            <div className="border-t border-border p-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                Show {results.length} homes
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-foreground">{title}</div>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[color:var(--primary)]"
      />
      <span className="text-sm text-foreground/85">{label}</span>
    </label>
  );
}
