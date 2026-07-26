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
  type QueueItem,
  type PlatformFacilityRow,
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

type Tab = "overview" | "queue" | "facilities" | "users" | "analytics";

const TABS: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "queue", label: "Verification Queue", icon: ClipboardCheck },
  { id: "facilities", label: "Facility Management", icon: Building2 },
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Platform Analytics", icon: LineChart },
];

function FounderAccess() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<Tab>("overview");

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

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-4">
          <div className="text-sm font-bold">ElderMatch Ops</div>
          <div className="text-[11px] text-slate-500">Internal console</div>
        </div>
        <nav className="p-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`mb-0.5 flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm ${
                  tab === t.id ? "bg-slate-800 text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-6">
        {tab === "overview" && <OverviewTab />}
        {tab === "queue" && <QueueTab />}
        {tab === "facilities" && <FacilitiesTab />}
        {tab === "users" && <UsersTab />}
        {tab === "analytics" && <AnalyticsTab />}
      </main>
    </div>
  );
}

/* ---------------- Overview ---------------- */

function OverviewTab() {
  const o = FOUNDER_OVERVIEW;
  return (
    <div className="space-y-5">
      <H1>Overview</H1>
      <div className="grid gap-3 md:grid-cols-4">
        <Stat label="Total facilities" value={o.totalFacilities.toLocaleString()} />
        <Stat label="Registered users / families" value={o.totalUsers.toLocaleString()} />
        <Stat label="Leads generated (all time)" value={o.totalLeads.toLocaleString()} />
        <Stat label="Shortlists (all time)" value={o.totalShortlists.toLocaleString()} />
      </div>

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
            {o.byTier.map((t) => (
              <tr key={t.tier} className="border-b border-slate-100">
                <td className="py-2">{t.tier}</td>
                <td className="py-2 font-medium">{t.count}</td>
                <td className="py-2 text-slate-500">
                  {Math.round((t.count / o.totalFacilities) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Revenue">
        <div className="text-2xl font-semibold">{o.revenueNote}</div>
        <p className="mt-1 text-xs text-slate-500">{o.mockCommission}</p>
      </Panel>
    </div>
  );
}

/* ---------------- Verification Queue ---------------- */

function QueueTab() {
  const [items, setItems] = useState<QueueItem[]>(FOUNDER_QUEUE);

  const decide = (id: string, decision: QueueItem["decision"]) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, decision } : i)));
    toast.success(`${id}: ${decision}`);
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

function FacilitiesTab() {
  const [rows, setRows] = useState<PlatformFacilityRow[]>(FOUNDER_FACILITIES);
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = rows.filter(
    (r) =>
      (!q || `${r.name} ${r.neighborhood}`.toLowerCase().includes(q.toLowerCase())) &&
      (!tier || r.tier === tier),
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
      </div>

      <Panel title={`All facilities (${filtered.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-2">Name</th>
              <th className="py-2">Area</th>
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
                <td className="py-2 text-slate-600">{r.neighborhood}</td>
                <td className="py-2 text-slate-600">{r.tier}</td>
                <td className="py-2">{r.claimed ? "Claimed" : "Unclaimed"}</td>
                <td className="py-2">{r.verified ? "Verified" : "Pending"}</td>
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
                onChange={(e) => update(detail.id, { verified: e.target.value === "Verified" })}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              >
                <option>Verified</option>
                <option>Pending</option>
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

function AnalyticsTab() {
  const maxUsers = Math.max(...FOUNDER_GROWTH.map((g) => g.users));
  const maxFac = Math.max(...FOUNDER_GROWTH.map((g) => g.facilities));
  const maxEnq = Math.max(...FOUNDER_GROWTH.map((g) => g.enquiries));
  const leaderboard = [...FOUNDER_FACILITIES].sort((a, b) => b.views - a.views).slice(0, 6);

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
