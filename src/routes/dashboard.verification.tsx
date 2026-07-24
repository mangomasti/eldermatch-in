import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck, AlertTriangle, FileCheck2, Upload, Calendar } from "lucide-react";
import { MOCK_DASHBOARD } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/verification")({
  component: Verification,
});

function Verification() {
  const v = MOCK_DASHBOARD.verification;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Verification</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Verified listings receive 3× more enquiries. Keep your documents current.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-verified/15 text-verified">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <div className="font-serif text-xl">{v.status}</div>
              <div className="text-xs text-muted-foreground">
                Last verified {v.lastVerified} · valid until {v.expiresOn}
              </div>
            </div>
          </div>

          <ul className="mt-6 divide-y divide-border">
            {v.documents.map((doc) => (
              <li key={doc.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-sm">
                  <FileCheck2 className="h-4 w-4 text-primary" /> {doc.name}
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={doc.status} />
                  <button
                    onClick={() => toast.success(`${doc.name} — upload started (mock).`)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
                  >
                    <Upload className="h-3 w-3" /> Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Calendar className="h-4 w-4 text-primary" /> Next on-site re-verification
            </div>
            <div className="font-serif text-2xl">March 2027</div>
            <p className="mt-1 text-xs text-muted-foreground">
              We'll schedule a visit 30 days before expiry. Nothing you need to do now.
            </p>
          </div>

          <div className="rounded-3xl border border-highlight/30 bg-highlight/5 p-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-highlight">
              <AlertTriangle className="h-4 w-4" /> Action needed
            </div>
            <p className="text-sm text-foreground/85">
              Your insurance certificate expires in 21 days. Upload a renewed copy to keep your Verified badge.
            </p>
            <button
              onClick={() => toast.success("Upload dialog opened (mock).")}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              <Upload className="h-3 w-3" /> Upload renewed insurance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "Approved" | "Missing" | "Expiring" }) {
  const map = {
    Approved: "bg-verified/15 text-verified",
    Expiring: "bg-highlight/15 text-highlight",
    Missing: "bg-destructive/15 text-destructive",
  } as const;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}
