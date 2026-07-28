import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Building2, LogIn } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getOwnerListing } from "@/lib/mock-data";
import { writeFacilitySession } from "@/lib/facility-session";

export const Route = createFileRoute("/facility-login")({
  validateSearch: z.object({ facility: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Facility login — ElderMatch" },
      {
        name: "description",
        content:
          "Log in to your ElderMatch facility dashboard to manage leads, reviews and your listing.",
      },
      { property: "og:title", content: "Facility login — ElderMatch" },
      { property: "og:description", content: "Access your ElderMatch facility dashboard." },
    ],
  }),
  component: FacilityLogin,
});

function FacilityLogin() {
  const { facility } = Route.useSearch();
  const navigate = useNavigate();
  const listing = facility ? getOwnerListing(facility) : undefined;
  const [name, setName] = useState(listing?.name ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    writeFacilitySession({
      facilityId: listing?.id ?? "willowbrook-gardens",
      facilityName: listing?.name ?? (name || "Willowbrook Gardens"),
      mode: "full",
    });
    toast.success("Welcome back — opening your dashboard.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-md px-5 py-14 md:px-8 md:py-20">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">Facility login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {listing ? `Signing in to ${listing.name}.` : "Sign in to manage your listing."}
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Facility name or email</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Willowbrook Gardens"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <LogIn className="h-4 w-4" /> Log in
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => toast("Password reset is not available in this demo.")}
              className="underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Not listed yet?{" "}
          <Link to="/facility-access" className="text-primary hover:underline">
            Search for your facility
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
