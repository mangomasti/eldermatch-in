import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Inbox,
  Star,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { SiteFooter } from "@/components/site-chrome";
import { getFacility, MOCK_DASHBOARD } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Facility dashboard — ElderMatch" },
      {
        name: "description",
        content:
          "Manage your ElderMatch listing: track leads, respond to reviews, keep verification current, and see how families are finding you.",
      },
      { property: "og:title", content: "Facility dashboard — ElderMatch" },
      {
        property: "og:description",
        content: "Manage leads, reviews, verification and profile analytics on ElderMatch.",
      },
    ],
  }),
  component: DashboardLayout,
});

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/profile", label: "Manage profile", icon: Building2 },
  { to: "/dashboard/verification", label: "Verification", icon: ShieldCheck },
  { to: "/dashboard/leads", label: "Leads", icon: Inbox },
  { to: "/dashboard/reviews", label: "Reviews", icon: Star },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];


function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const f = getFacility(MOCK_DASHBOARD.facilityId);

  return (
    <div className="min-h-screen bg-warm/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-lg font-medium">ElderMatch</Link>
            <span className="hidden rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary sm:inline-block">
              Facility portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            {f && (
              <Link
                to="/facility/$id"
                params={{ id: f.id }}
                className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent md:inline-flex"
              >
                <ExternalLink className="h-3.5 w-3.5" /> View public profile
              </Link>
            )}
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                WG
              </span>
              <div className="hidden text-xs md:block">
                <div className="font-semibold">{f?.name ?? "Facility"}</div>
                <div className="text-muted-foreground">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 md:grid-cols-[220px_1fr] md:px-8">
        <aside>
          <nav className="sticky top-6 space-y-1">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
