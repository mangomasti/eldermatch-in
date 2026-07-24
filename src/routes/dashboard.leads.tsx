import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Inbox, MessageCircle } from "lucide-react";
import { MOCK_DASHBOARD, type Lead } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/leads")({
  component: Leads,
});

const STATUSES: Lead["status"][] = ["New", "Contacted", "Tour scheduled", "Enrolled", "Not a fit"];

function Leads() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_DASHBOARD.leads);
  const [filter, setFilter] = useState<Lead["status"] | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = filter === "All" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Lead marked as "${status}".`);
  };

  const updateNotes = (id: string, notes: string) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Families who enquired through your ElderMatch listing.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              filter === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-accent"
            }`}
          >
            {s} {s !== "All" && `(${leads.filter((l) => l.status === s).length})`}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center">
          <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No leads in this bucket.</p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-3xl border border-border bg-card">
          {visible.map((l) => (
            <div key={l.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{l.name}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {l.id}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{l.contact}</div>
                  <p className="mt-2 text-sm text-foreground/85">{l.question}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-muted-foreground">
                    <Clock className="mr-1 inline h-3 w-3" />
                    {l.receivedAt}
                  </div>
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value as Lead["status"])}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setOpenId(openId === l.id ? null : l.id)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <MessageCircle className="h-3 w-3" /> {openId === l.id ? "Hide notes" : "Notes"}
              </button>
              {openId === l.id && (
                <textarea
                  rows={2}
                  value={l.notes}
                  onChange={(e) => updateNotes(l.id, e.target.value)}
                  onBlur={() => toast("Notes saved.", { duration: 1000 })}
                  placeholder="Follow-up notes only you can see…"
                  className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
