import { useRouterState } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { usePreferences } from "@/lib/prefs";
import { usePreferenceDrawer } from "./preference-drawer";

const HIDDEN_PATHS = new Set(["/", "/questionnaire", "/profile"]);

export function FloatingProfileCta() {
  const { prefs, hydrated } = usePreferences();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { openDrawer } = usePreferenceDrawer();

  if (!hydrated) return null;
  if (HIDDEN_PATHS.has(pathname)) return null;
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/register-facility")) return null;


  const hasProfile = prefs != null;
  const label = hasProfile ? "Update Your Preferences" : "Build Your Profile";
  const isFacilityRoute = pathname.startsWith("/facility/");
  const positionCls = isFacilityRoute
    ? "top-[30%] md:top-[28%]"
    : "top-1/2 -translate-y-1/2";

  return (
    <button
      onClick={openDrawer}
      aria-label={label}
      className={`group fixed right-3 md:right-5 z-40 ${positionCls} inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-3 pr-4 md:pr-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] ring-1 ring-primary/20 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-transform group-hover:rotate-[-4deg]">
        <ClipboardCheck className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </button>
  );
}
