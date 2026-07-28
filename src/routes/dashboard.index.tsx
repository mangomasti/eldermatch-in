import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Eye,
  Inbox,
  Heart,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { MOCK_DASHBOARD, getFacility } from "@/lib/mock-data";
import { useFacilitySession } from "@/lib/facility-session";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const d = MOCK_DASHBOARD;
  const { session, locked } = useFacilitySession();
  const f = getFacility(session.facilityId) ?? getFacility(d.facilityId);
  const viewsChange = pct(d.metrics.profileViews30d, d.metrics.profileViewsPrev30d);
  const inqChange = pct(d.metrics.inquiries30d, d.metrics.inquiriesPrev30d);
  const newLeads = d.leads.filter((l) => l.status === "New").length;

  return (
    <div className="space-y-6">
      {locked && (
        <div className="flex items-start gap-3 rounded-2xl border border-highlight/30 bg-highlight/10 p-4">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
          <p className="text-sm text-foreground/85">
            <span className="font-semibold">Your claim is under review</span> — full dashboard
            access will unlock once verified.
          </p>
        </div>
      )}
      {session.mode === "registration-pending" && (
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-warm/30 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
          <p className="text-sm text-foreground/85">
            <span className="font-semibold">Pending verification</span> — your new listing is live
            in preview while our team completes the on-site check. Everything stays editable.
          </p>
        </div>
      )}

      <div>
        <h1 className="font-serif text-3xl">
          Good morning{f ? `, ${f.name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's how families are engaging with your listing over the last 30 days.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HeroMetric
          icon={<Eye className="h-5 w-5" />}
          label="Profile views"
          value={d.metrics.profileViews30d.toLocaleString()}
          change={viewsChange}
          caption="Visibility is the single biggest driver of enquiries."
        />
        <HeroMetric
          icon={<Inbox className="h-5 w-5" />}
          label="Leads generated"
          value={d.metrics.inquiries30d.toString()}
          change={inqChange}
          caption={`${newLeads} new lead${newLeads === 1 ? "" : "s"} waiting for a reply.`}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          icon={<Heart className="h-4 w-4" />}
          label="Shortlists"
          value={d.metrics.saves30d.toString()}
        />
        <MetricCard
          icon={<Star className="h-4 w-4" />}
          label="Rating"
          value={`${d.metrics.avgRating} · ${d.metrics.ratingCount}`}
        />
        <MetricCard
          icon={<Clock className="h-4 w-4" />}
          label="Response time"
          value={`${d.metrics.responseTimeHours}h`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">New leads</h2>
            <Link to="/dashboard/leads" className="text-sm text-primary hover:underline">
              View all →
            </Link>
          </div>
          {newLeads === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No new leads right now.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {d.leads
                .filter((l) => l.status === "New")
                .map((l) => (
                  <li key={l.id} className="flex items-start justify-between gap-4 py-3">
                    <div>
                      <div className="text-sm font-semibold">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.contact}</div>
                      <p className="mt-1 text-sm text-foreground/80">{l.question}</p>
                    </div>
                    <div className="shrink-0 text-right text-xs text-muted-foreground">
                      <Clock className="mr-1 inline h-3 w-3" />
                      {l.receivedAt}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-verified" /> Verification status
            </div>
            <div className="mt-3 text-2xl font-semibold text-verified">{d.verification.status}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Last verified {d.verification.lastVerified} · expires {d.verification.expiresOn}
            </p>
            {d.verification.documents.some((x) => x.status === "Expiring") && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-highlight/10 p-3 text-xs text-highlight">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5" />
                <span>
                  One document is expiring —{" "}
                  <Link to="/dashboard/verification" className="underline">
                    renew now
                  </Link>
                  .
                </span>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-semibold">Response time</div>
            <div className="mt-2 font-serif text-3xl">{d.metrics.responseTimeHours}h</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Market average: 9.6h — you're 2.3× faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMetric({
  icon,
  label,
  value,
  change,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: number | null;
  caption?: string;
}) {
  const up = typeof change === "number" && change >= 0;
  return (
    <div className="rounded-3xl border border-border bg-card p-7">
      <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span> {label}
      </div>
      <div className="mt-3 font-serif text-6xl leading-none">{value}</div>
      {typeof change === "number" && (
        <div
          className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${
            up ? "text-verified" : "text-highlight"
          }`}
        >
          {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {Math.abs(change)}% vs. previous 30 days
        </div>
      )}
      {caption && <p className="mt-2 text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}

function pct(now: number, prev: number) {
  if (!prev) return null;
  return Math.round(((now - prev) / prev) * 100);
}

function MetricCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: number | null;
}) {
  const up = typeof change === "number" && change >= 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span> {label}
      </div>
      <div className="mt-2 font-serif text-3xl">{value}</div>
      {typeof change === "number" && (
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
            up ? "text-verified" : "text-highlight"
          }`}
        >
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}% vs. previous 30 days
        </div>
      )}
    </div>
  );
}
