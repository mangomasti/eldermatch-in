import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Eye, TrendingUp, Users, Info } from "lucide-react";
import { MOCK_INSIGHTS } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/insights")({
  component: Insights,
});

function Insights() {
  const i = MOCK_INSIGHTS;
  const maxShortlist = Math.max(...i.monthlyShortlists.map((m) => m.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Insights</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aggregate trends from families who viewed your profile. No individual user data is ever
          shown.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" /> Shortlists / favourites
          </div>
          <div className="mt-2 font-serif text-5xl">{i.shortlists30d}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-verified">
            <TrendingUp className="h-4 w-4" /> up {i.shortlistsChangePct}% from last month
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {i.shortlistsTotal} total shortlists since your listing went live.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Eye className="h-4 w-4 text-primary" /> Profile views (30 days)
          </div>
          <div className="mt-2 font-serif text-5xl">{i.profileViews30d.toLocaleString()}</div>
          <Link to="/dashboard" className="mt-2 inline-block text-sm text-primary hover:underline">
            See the full breakdown on Overview →
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="font-serif text-xl">Shortlists per month</h2>
        <div className="mt-5 flex items-end gap-4">
          {i.monthlyShortlists.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold">{m.count}</span>
              <div
                className="w-full rounded-t-lg bg-primary/80"
                style={{ height: `${(m.count / maxShortlist) * 120}px` }}
              />
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-xl">What customers usually prefer</h2>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            <Info className="h-3 w-3" /> Aggregate trends only
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {i.visitorTrends.map((t) => (
            <div key={t.label} className="rounded-2xl border border-border bg-background p-4">
              <div className="text-xs text-muted-foreground">{t.label}</div>
              <div className="mt-1 text-lg font-semibold">{t.value}</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <div className="h-full bg-primary" style={{ width: `${t.share}%` }} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t.share}% of profile visitors
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ShareCard title="Care type searched by your visitors" rows={i.careTypeMix} />
        <ShareCard title="Budget range among your visitors" rows={i.budgetMix} />
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="h-3.5 w-3.5" /> All figures are anonymised and aggregated across visitors
        to your profile. Individual family details are never shared.
      </p>
    </div>
  );
}

function ShareCard({ title, rows }: { title: string; rows: { label: string; pct: number }[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="font-serif text-lg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/85">{r.label}</span>
              <span className="font-semibold">{r.pct}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-primary/80" style={{ width: `${r.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
