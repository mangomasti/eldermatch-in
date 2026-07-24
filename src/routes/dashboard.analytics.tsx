import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, PieChart } from "lucide-react";
import { MOCK_DASHBOARD } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
});

function Analytics() {
  const d = MOCK_DASHBOARD;
  const maxViews = Math.max(...d.weeklyViews.map((w) => w.views));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Understand who's finding your listing and how you compare to similar homes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={<TrendingUp className="h-4 w-4" />} title="Weekly profile views">
          <div className="mt-4 flex items-end gap-3 pb-2">
            {d.weeklyViews.map((w) => (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-primary/80"
                  style={{ height: `${(w.views / maxViews) * 160}px` }}
                  title={`${w.views} views`}
                />
                <div className="text-xs text-muted-foreground">{w.week}</div>
                <div className="text-xs font-semibold">{w.views}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card icon={<Users className="h-4 w-4" />} title="Where inquiries come from">
          <ul className="mt-4 space-y-3">
            {d.demographics.map((r) => (
              <li key={r.area}>
                <div className="flex items-center justify-between text-sm">
                  <span>{r.area}</span>
                  <span className="font-medium">{r.percent}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-border">
                  <div className="h-full bg-primary" style={{ width: `${r.percent}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card icon={<PieChart className="h-4 w-4" />} title="How you compare to similar homes">
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4">Metric</th>
                <th className="py-2 pr-4">Your listing</th>
                <th className="py-2">Market average</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {d.competitorComparison.map((c) => (
                <tr key={c.metric}>
                  <td className="py-2.5 pr-4 text-muted-foreground">{c.metric}</td>
                  <td className="py-2.5 pr-4 font-semibold text-primary">{c.you}</td>
                  <td className="py-2.5">{c.marketAvg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-primary">{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}
