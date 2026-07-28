import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutGrid,
  ClipboardCheck,
  Building2,
  Users,
  LineChart,
  Lock,
  IndianRupee,
  TrendingDown,
  StickyNote,
  Menu,
} from "lucide-react";
import {
  FOUNDER_PASSWORD,
  FOUNDER_OVERVIEW,
  FOUNDER_QUEUE,
  FOUNDER_FACILITIES,
  FOUNDER_USERS,
  FOUNDER_GROWTH,
  FOUNDER_PREFERENCE_TRENDS,
  FACILITY_TIERS,
  INDIAN_STATES,
  REVENUE_ASSUMPTIONS,
  FOUNDER_REVENUE_MONTHS,
  FOUNDER_CHURN,
  FOUNDER_ONBOARDED_TOTAL,
  FOUNDER_SEED_NOTES,
  facilities,
  type QueueItem,
  type PlatformFacilityRow,
  type FounderNote,
} from "@/lib/mock-data";

export const Route = createFileRoute("/founder-access")({
  head: () => ({
    meta: [
      { title: "Internal console — ElderMatch" },
      { name: "description", content: "Internal ElderMatch operations console." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FounderAccess,
});

type Tab =
  | "overview"
  | "queue"
  | "facilities"
  | "users"
  | "analytics"
  | "revenue"
  | "churn"
  | "notes";

const TABS: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "queue", label: "Verification Queue", icon: ClipboardCheck },
  { id: "facilities", label: "Facility Management", icon: Building2 },
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Platform Analytics", icon: LineChart },
  { id: "revenue", label: "Revenue Tracking", icon: IndianRupee },
  { id: "churn", label: "Facility Churn", icon: TrendingDown },
  { id: "notes", label: "Notes", icon: StickyNote },
];

function FounderAccess() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [navOpen, setNavOpen] = useState(false);

  // Live console state — every tab reads and writes the same rows.
  const [rows, setRows] = useState<PlatformFacilityRow[]>(FOUNDER_FACILITIES);
  const [queue, setQueue] = useState<QueueItem[]>(FOUNDER_QUEUE);
  const [notes, setNotes] = useState<FounderNote[]>(FOUNDER_SEED_NOTES);

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === FOUNDER_PASSWORD) setAuthed(true);
            else toast.error("Incorrect password.");
          }}
          className="w-full max-w-sm rounded-lg border border-slate-300 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 text-slate-700">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-semibold">ElderMatch internal console</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Authorised staff only.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="mt-4 w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded bg-slate-800 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Enter
          </button>
          <p className="mt-3 text-[11px] text-slate-400">
            Demo password: <code>{FOUNDER_PASSWORD}</code>
          </p>
        </form>
      </div>
    );
  }

  const nav = (
    <nav className="p-2">
      {TABS.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setNavOpen(false);
            }}
            className={`mb-0.5 flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm ${
              tab === t.id ? "bg-slate-800 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" /> {t.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-200 px-4 py-4">
          <div className="text-sm font-bold">ElderMatch Ops</div>
          <div className="text-[11px] text-slate-500">Internal console</div>
        </div>
        {nav}
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setNavOpen(false)} />
          <div className="relative h-full w-64 bg-white shadow-xl">
            <div className="border-b border-slate-200 px-4 py-4 text-sm font-bold">ElderMatch Ops</div>
            {nav}
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setNavOpen(true)}
            className="rounded border border-slate-300 p-1.5 text-slate-700"
            aria-label="Open console menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">{TABS.find((t) => t.id === tab)?.label}</span>
        </div>

        <div className="p-4 md:p-6">
          {tab === "overview" && <OverviewTab rows={rows} queue={queue} />}
          {tab === "queue" && <QueueTab items={queue} setItems={setQueue} setRows={setRows} />}
          {tab === "facilities" && <FacilitiesTab rows={rows} setRows={setRows} />}
          {tab === "users" && <UsersTab />}
          {tab === "analytics" && <AnalyticsTab rows={rows} />}
          {tab === "revenue" && <RevenueTab rows={rows} />}
          {tab === "churn" && <ChurnTab rows={rows} />}
          {tab === "notes" && <NotesTab notes={notes} setNotes={setNotes} />}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Overview ---------------- */

function OverviewTab({ rows, queue }: { rows: PlatformFacilityRow[]; queue: QueueItem[] }) {
  const o = FOUNDER_OVERVIEW;
  const totalFacilities = rows.length;
  const active = rows.filter((r) => r.active).length;
  const verified = rows.filter((r) => r.verified).length;
  const unclaimed = rows.filter((r) => !r.claimed).length;
  const pendingQueue = queue.filter((q) => !q.decision).length;
  const totalLeads = rows.reduce((n, r) => n + r.leads, 0);
  const totalShortlists = rows.reduce((n, r) => n + r.shortlists, 0);
  const totalViews = rows.reduce((n, r) => n + r.views, 0);

  const byTier = FACILITY_TIERS.map((t) => ({
    tier: t,
    count: rows.filter((r) => r.tier === t).length,
  })).filter((t) => t.count > 0);

  const byState = INDIAN_STATES.map((st) => ({
    state: st,
    count: rows.filter((r) => r.state === st).length,
  }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-5">
      <H1>Overview</H1>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total facilities" value={totalFacilities.toLocaleString()} />
        <Stat label="Active listings" value={active.toLocaleString()} />
        <Stat label="Verified" value={`${verified} / ${totalFacilities}`} />
        <Stat label="Pending in queue" value={pendingQueue.toLocaleString()} />
        <Stat label="Registered families" value={o.totalUsers.toLocaleString()} />
        <Stat label="Profile views (all time)" value={totalViews.toLocaleString()} />
        <Stat label="Leads generated" value={totalLeads.toLocaleString()} />
        <Stat label="Shortlists" value={totalShortlists.toLocaleString()} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Facilities by tier">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="py-2">Tier</th>
                <th className="py-2">Facilities</th>
                <th className="py-2">Share</th>
              </tr>
            </thead>
            <tbody>
              {byTier.map((t) => (
                <tr key={t.tier} className="border-b border-slate-100">
                  <td className="py-2">{t.tier}</td>
                  <td className="py-2 font-medium">{t.count}</td>
                  <td className="py-2 text-slate-500">
                    {Math.round((t.count / totalFacilities) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Coverage by state">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="py-2">State</th>
                <th className="py-2">Listings</th>
                <th className="py-2">Unclaimed</th>
              </tr>
            </thead>
            <tbody>
              {byState.map((r) => (
                <tr key={r.state} className="border-b border-slate-100">
                  <td className="py-2">{r.state}</td>
                  <td className="py-2 font-medium">{r.count}</td>
                  <td className="py-2 text-slate-500">
                    {rows.filter((x) => x.state === r.state && !x.claimed).length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <Panel title="Health">
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat label="Unclaimed listings" value={`${unclaimed}`} />
          <MiniStat
            label="Lead conversion (leads / views)"
            value={`${totalViews ? ((totalLeads / totalViews) * 100).toFixed(1) : "0"}%`}
          />
          <MiniStat label="Commission model" value={o.mockCommission} />
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Verification Queue ---------------- */

function QueueTab({
  items,
  setItems,
  setRows,
}: {
  items: QueueItem[];
  setItems: React.Dispatch<React.SetStateAction<QueueItem[]>>;
  setRows: React.Dispatch<React.SetStateAction<PlatformFacilityRow[]>>;
}) {
  const decide = (id: string, decision: QueueItem["decision"]) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, decision } : i)));
    if (item && (decision === "Approved" || decision === "Rejected")) {
      setRows((prev) =>
        prev.map((r) =>
          r.name === item.facility
            ? {
                ...r,
                verified: decision === "Approved",
                claimed: decision === "Approved" ? true : r.claimed,
                status: decision === "Approved" ? "Verified" : "Rejected",
              }
            : r,
        ),
      );
    }
    toast.success(`${item?.facility ?? id}: ${decision}`);
  };

  const section = (kind: QueueItem["kind"], title: string) => {
    const rows = items.filter((i) => i.kind === kind);
    return (
      <Panel title={`${title} (${rows.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">Facility</th>
              <th className="py-2">Tier</th>
              {kind === "claim" && <th className="py-2">Claimant</th>}
              <th className="py-2">Documents</th>
              <th className="py-2">Submitted</th>
              <th className="py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.id} className="border-b border-slate-100 align-middle">
                <td className="py-2 font-medium">{i.facility}</td>
                <td className="py-2 text-slate-600">{i.tier}</td>
                {kind === "claim" && <td className="py-2 text-slate-600">{i.claimant}</td>}
                <td className="py-2 text-slate-600">{i.documents}</td>
                <td className="py-2 text-slate-500">{i.submitted}</td>
                <td className="py-2 text-right">
                  {i.decision ? (
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">{i.decision}</span>
                  ) : (
                    <div className="flex justify-end gap-1">
                      <SmallBtn tone="green" onClick={() => decide(i.id, "Approved")}>Approve</SmallBtn>
                      <SmallBtn tone="red" onClick={() => decide(i.id, "Rejected")}>Reject</SmallBtn>
                      <SmallBtn onClick={() => decide(i.id, "Info requested")}>Request info</SmallBtn>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    );
  };

  return (
    <div className="space-y-5">
      <H1>Verification Queue</H1>
      {section("registration", "New Registrations")}
      {section("claim", "Ownership Claims")}
    </div>
  );
}

/* ---------------- Facility Management ---------------- */

function FacilitiesTab({
  rows,
  setRows,
}: {
  rows: PlatformFacilityRow[];
  setRows: React.Dispatch<React.SetStateAction<PlatformFacilityRow[]>>;
}) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("");
  const [stateF, setStateF] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = rows.filter(
    (r) =>
      (!q || `${r.name} ${r.neighborhood} ${r.city}`.toLowerCase().includes(q.toLowerCase())) &&
      (!tier || r.tier === tier) &&
      (!stateF || r.state === stateF),
  );
  const detail = rows.find((r) => r.id === selected);

  const update = (id: string, patch: Partial<PlatformFacilityRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div className="space-y-5">
      <H1>Facility Management</H1>

      <div className="flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search facilities…"
          className="w-64 rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All tiers</option>
          {FACILITY_TIERS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={stateF}
          onChange={(e) => setStateF(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All states</option>
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      <Panel title={`All facilities (${filtered.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">Name</th>
              <th className="py-2">City / state</th>
              <th className="py-2">Tier</th>
              <th className="py-2">Claim</th>
              <th className="py-2">Verification</th>
              <th className="py-2">Views</th>
              <th className="py-2">Leads</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="py-2 font-medium">
                  <button className="hover:underline" onClick={() => setSelected(r.id)}>{r.name}</button>
                </td>
                <td className="py-2 text-slate-600">{r.city}, {r.state}</td>
                <td className="py-2 text-slate-600">{r.tier}</td>
                <td className="py-2">{r.claimed ? "Claimed" : "Unclaimed"}</td>
                <td className="py-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      r.status === "Verified"
                        ? "bg-emerald-50 text-emerald-700"
                        : r.status === "Rejected"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {r.status}
                  </span>
                  {!r.active && <span className="ml-1 text-xs text-slate-400">(inactive)</span>}
                </td>
                <td className="py-2">{r.views}</td>
                <td className="py-2">{r.leads}</td>
                <td className="py-2 text-right">
                  <div className="flex justify-end gap-1">
                    <SmallBtn onClick={() => setSelected(r.id)}>Edit</SmallBtn>
                    <SmallBtn
                      onClick={() => {
                        update(r.id, { claimed: !r.claimed });
                        toast.success(`${r.name} marked ${r.claimed ? "Unclaimed" : "Claimed"}.`);
                      }}
                    >
                      {r.claimed ? "Mark unclaimed" : "Mark claimed"}
                    </SmallBtn>
                    <SmallBtn
                      tone={r.active ? "red" : "green"}
                      onClick={() => {
                        update(r.id, { active: !r.active });
                        toast.success(`${r.name} ${r.active ? "deactivated" : "reactivated"}.`);
                      }}
                    >
                      {r.active ? "Deactivate" : "Activate"}
                    </SmallBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {detail && (
        <Panel title={`Admin override — ${detail.name}`}>
          <div className="grid gap-3 md:grid-cols-2">
            <Labeled label="Facility name">
              <input
                value={detail.name}
                onChange={(e) => update(detail.id, { name: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </Labeled>
            <Labeled label="Neighbourhood">
              <input
                value={detail.neighborhood}
                onChange={(e) => update(detail.id, { neighborhood: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </Labeled>
            <Labeled label="Tier">
              <select
                value={detail.tier}
                onChange={(e) => update(detail.id, { tier: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              >
                {FACILITY_TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Labeled>
            <Labeled label="Verification">
              <select
                value={detail.verified ? "Verified" : "Pending"}
                onChange={(e) =>
                  update(detail.id, {
                    verified: e.target.value === "Verified",
                    status: e.target.value as PlatformFacilityRow["status"],
                  })
                }
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              >
                <option>Verified</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </Labeled>
          </div>
          <div className="mt-3 flex gap-2">
            <SmallBtn tone="green" onClick={() => toast.success("Changes saved (mock).")}>Save changes</SmallBtn>
            <SmallBtn onClick={() => setSelected(null)}>Close</SmallBtn>
          </div>
        </Panel>
      )}
    </div>
  );
}

/* ---------------- Users ---------------- */

function UsersTab() {
  const [q, setQ] = useState("");
  const rows = FOUNDER_USERS.filter(
    (u) => !q || `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-5">
      <H1>User Management</H1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name or email…"
        className="w-72 rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
      />
      <Panel title={`Registered families (${rows.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">User ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Signed up</th>
              <th className="py-2">Enquiries</th>
              <th className="py-2">Shortlists</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="border-b border-slate-100">
                <td className="py-2 text-slate-500">{u.id}</td>
                <td className="py-2 font-medium">{u.name}</td>
                <td className="py-2 text-slate-600">{u.email}</td>
                <td className="py-2 text-slate-600">{u.signupDate}</td>
                <td className="py-2">{u.enquiries}</td>
                <td className="py-2">{u.shortlists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ---------------- Analytics ---------------- */

function AnalyticsTab({ rows }: { rows: PlatformFacilityRow[] }) {
  const maxUsers = Math.max(...FOUNDER_GROWTH.map((g) => g.users));
  const maxFac = Math.max(...FOUNDER_GROWTH.map((g) => g.facilities));
  const maxEnq = Math.max(...FOUNDER_GROWTH.map((g) => g.enquiries));
  const leaderboard = [...rows].sort((a, b) => b.views - a.views).slice(0, 8);

  return (
    <div className="space-y-5">
      <H1>Platform Analytics</H1>

      <div className="grid gap-3 md:grid-cols-3">
        <BarPanel title="New facilities / month" rows={FOUNDER_GROWTH.map((g) => ({ label: g.month, v: g.facilities }))} max={maxFac} />
        <BarPanel title="New users / month" rows={FOUNDER_GROWTH.map((g) => ({ label: g.month, v: g.users }))} max={maxUsers} />
        <BarPanel title="Enquiries / month" rows={FOUNDER_GROWTH.map((g) => ({ label: g.month, v: g.enquiries }))} max={maxEnq} />
      </div>

      <Panel title="Top performing facilities">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">#</th>
              <th className="py-2">Facility</th>
              <th className="py-2">Views</th>
              <th className="py-2">Leads</th>
              <th className="py-2">Shortlists</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((r, idx) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="py-2 text-slate-500">{idx + 1}</td>
                <td className="py-2 font-medium">{r.name}</td>
                <td className="py-2">{r.views}</td>
                <td className="py-2">{r.leads}</td>
                <td className="py-2">{r.shortlists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Platform-wide customer preference trends (aggregate only)">
        <div className="grid gap-3 md:grid-cols-2">
          {FOUNDER_PREFERENCE_TRENDS.map((t) => (
            <div key={t.label} className="rounded border border-slate-200 p-3">
              <div className="text-xs text-slate-500">{t.label}</div>
              <div className="mt-0.5 text-base font-semibold">{t.value}</div>
              <div className="mt-2 h-1.5 rounded bg-slate-100">
                <div className="h-full rounded bg-slate-700" style={{ width: `${t.share}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{t.share}% of all users</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Revenue tracking (hypothetical) ---------------- */

function RevenueTab({ rows }: { rows: PlatformFacilityRow[] }) {
  const [commissionPct, setCommissionPct] = useState(REVENUE_ASSUMPTIONS.commissionPct);
  const [subscription, setSubscription] = useState(REVENUE_ASSUMPTIONS.monthlySubscription);
  const [avgFee, setAvgFee] = useState(45000);

  const activeListings = rows.filter((r) => r.active).length;
  const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  const months = FOUNDER_REVENUE_MONTHS.map((m) => {
    const commission = m.placements * avgFee * (commissionPct / 100);
    const subs = activeListings * subscription;
    return { ...m, commission, subs, total: commission + subs };
  });
  const latest = months[months.length - 1];
  const annualRunRate = latest.total * 12;

  return (
    <div className="space-y-5">
      <H1>Revenue Tracking</H1>
      <p className="-mt-2 text-xs text-slate-500">
        Hypothetical models only — no payments are processed on the platform today.
      </p>

      <Panel title="Assumptions">
        <div className="grid gap-3 sm:grid-cols-3">
          <Labeled label={`Commission on first month's fee (${commissionPct}%)`}>
            <input
              type="range"
              min={0}
              max={25}
              value={commissionPct}
              onChange={(e) => setCommissionPct(Number(e.target.value))}
              className="h-6 w-full"
            />
          </Labeled>
          <Labeled label="Listing subscription (₹ / active listing / month)">
            <input
              type="number"
              value={subscription}
              onChange={(e) => setSubscription(Number(e.target.value))}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </Labeled>
          <Labeled label="Average monthly facility fee (₹)">
            <input
              type="number"
              value={avgFee}
              onChange={(e) => setAvgFee(Number(e.target.value))}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </Labeled>
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active listings" value={activeListings.toLocaleString()} />
        <Stat label="Placements (last month)" value={`${latest.placements}`} />
        <Stat label="Modelled MRR" value={inr(latest.total)} />
        <Stat label="Annual run rate" value={inr(annualRunRate)} />
      </div>

      <Panel title="Modelled monthly revenue">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">Month</th>
              <th className="py-2">Placements</th>
              <th className="py-2">Commission</th>
              <th className="py-2">Subscriptions</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {months.map((m) => (
              <tr key={m.month} className="border-b border-slate-100">
                <td className="py-2">{m.month}</td>
                <td className="py-2">{m.placements}</td>
                <td className="py-2 text-slate-600">{inr(m.commission)}</td>
                <td className="py-2 text-slate-600">{inr(m.subs)}</td>
                <td className="py-2 font-medium">{inr(m.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <BarPanel
        title="Modelled total revenue trend"
        rows={months.map((m) => ({ label: m.month, v: Math.round(m.total / 1000) }))}
        max={Math.max(...months.map((m) => Math.round(m.total / 1000)))}
      />
      <p className="text-[11px] text-slate-500">Bars shown in ₹ thousands.</p>
    </div>
  );
}

/* ---------------- Churn ---------------- */

function ChurnTab({ rows }: { rows: PlatformFacilityRow[] }) {
  const inactive = rows.filter((r) => !r.active);
  const churned = FOUNDER_CHURN.length;
  const churnRate = ((churned / FOUNDER_ONBOARDED_TOTAL) * 100).toFixed(1);

  return (
    <div className="space-y-5">
      <H1>Facility Churn</H1>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Onboarded (all time)" value={`${FOUNDER_ONBOARDED_TOTAL}`} />
        <Stat label="Churned" value={`${churned}`} />
        <Stat label="Churn rate" value={`${churnRate}%`} />
        <Stat label="Currently inactive" value={`${inactive.length}`} />
      </div>

      <Panel title="Churned facilities">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">Facility</th>
              <th className="py-2">State</th>
              <th className="py-2">Tier</th>
              <th className="py-2">Onboarded</th>
              <th className="py-2">Last active</th>
              <th className="py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {FOUNDER_CHURN.map((c) => (
              <tr key={c.id} className="border-b border-slate-100">
                <td className="py-2 font-medium">{c.name}</td>
                <td className="py-2 text-slate-600">{c.state}</td>
                <td className="py-2 text-slate-600">{c.tier}</td>
                <td className="py-2 text-slate-500">{c.onboarded}</td>
                <td className="py-2 text-slate-500">{c.lastActive}</td>
                <td className="py-2">{c.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title={`Deactivated in console (${inactive.length})`}>
        {inactive.length === 0 ? (
          <p className="text-sm text-slate-500">All listings are currently active.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {inactive.map((r) => (
              <li key={r.id} className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="font-medium">{r.name}</span>
                <span className="text-slate-500">
                  {r.city}, {r.state} · {r.leads} leads
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

/* ---------------- Notes (internal scratchpad) ---------------- */

function NotesTab({
  notes,
  setNotes,
}: {
  notes: FounderNote[];
  setNotes: React.Dispatch<React.SetStateAction<FounderNote[]>>;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    setNotes((prev) => [
      {
        id: `N-${Date.now()}`,
        at: now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        text,
      },
      ...prev,
    ]);
    setDraft("");
    toast.success("Note added.");
  };

  return (
    <div className="space-y-5">
      <H1>Notes</H1>
      <p className="-mt-2 text-xs text-slate-500">
        Private scratchpad — never shown to facilities or families.
      </p>

      <Panel title="New note">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Follow-ups, ideas, calls to make…"
          className="w-full rounded border border-slate-300 p-3 text-sm outline-none focus:border-slate-500"
        />
        <div className="mt-2 flex gap-2">
          <SmallBtn tone="green" onClick={add}>Save note</SmallBtn>
          <SmallBtn onClick={() => setDraft("")}>Clear</SmallBtn>
        </div>
      </Panel>

      <Panel title={`Saved notes (${notes.length})`}>
        <ul className="space-y-2">
          {notes.map((n) => (
            <li key={n.id} className="rounded border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-slate-800">{n.text}</p>
                <SmallBtn
                  tone="red"
                  onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))}
                >
                  Delete
                </SmallBtn>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">{n.at}</div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ---------------- primitives ---------------- */

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl font-semibold text-slate-900">{children}</h1>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-700">{title}</h2>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-200 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-0.5 text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function SmallBtn({
  children,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "green" | "red";
}) {
  const cls =
    tone === "green"
      ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
      : tone === "red"
        ? "border-rose-300 text-rose-700 hover:bg-rose-50"
        : "border-slate-300 text-slate-700 hover:bg-slate-100";
  return (
    <button onClick={onClick} className={`rounded border px-2 py-1 text-xs font-medium ${cls}`}>
      {children}
    </button>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function BarPanel({
  title,
  rows,
  max,
}: {
  title: string;
  rows: { label: string; v: number }[];
  max: number;
}) {
  return (
    <Panel title={title}>
      <div className="flex h-32 items-end gap-2">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] text-slate-500">{r.v}</span>
            <div className="w-full rounded-t bg-slate-700" style={{ height: `${(r.v / max) * 90}px` }} />
            <span className="text-[10px] text-slate-500">{r.label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
