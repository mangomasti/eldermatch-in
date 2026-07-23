import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, X } from "lucide-react";
import { usePreferences } from "@/lib/prefs";
import { QuestionnaireForm } from "./questionnaire-form";

export function FloatingProfileCta() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { prefs, hydrated } = usePreferences();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Lock body scroll while panel is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!hydrated) return null;
  // Hide on the dedicated questionnaire page and the role-select landing
  if (pathname === "/questionnaire" || pathname === "/") return null;

  const hasProfile = prefs != null;
  const label = hasProfile ? "Update Your Preferences" : "Build Your Profile";
  const isFacilityRoute = pathname.startsWith("/facility/");

  // Shift button up on facility routes (desktop) to avoid the sticky contact panel
  const positionCls = isFacilityRoute
    ? "top-[30%] md:top-[28%]"
    : "top-1/2 -translate-y-1/2";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={label}
        className={`group fixed right-3 md:right-5 z-40 ${positionCls} inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-3 pr-4 md:pr-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] ring-1 ring-primary/20 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-transform group-hover:rotate-[-4deg]">
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">{label}</span>
        <span className="sr-only sm:hidden">{label}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-label="Preference questionnaire"
            className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-warm/30 shadow-[var(--shadow-lift)] animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-background/95 px-5 py-4 backdrop-blur md:px-6">
              <div>
                <div className="font-serif text-xl">
                  {hasProfile ? "Update your preferences" : "Build your profile"}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Takes about 60 seconds. Every question is optional.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 md:px-6">
              <QuestionnaireForm
                onComplete={() => {
                  setOpen(false);
                  navigate({ to: "/search" });
                }}
                onBackFromFirst={() => setOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
