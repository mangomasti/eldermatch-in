import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { usePreferences } from "@/lib/prefs";
import { QuestionnaireForm } from "./questionnaire-form";

type Ctx = { open: boolean; openDrawer: () => void; closeDrawer: () => void };

const PreferenceDrawerContext = createContext<Ctx | null>(null);

export function usePreferenceDrawer() {
  const ctx = useContext(PreferenceDrawerContext);
  if (!ctx) throw new Error("usePreferenceDrawer must be used inside PreferenceDrawerProvider");
  return ctx;
}

export function PreferenceDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { prefs, hydrated } = usePreferences();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const hasProfile = hydrated && prefs != null;

  return (
    <PreferenceDrawerContext.Provider value={{ open, openDrawer, closeDrawer }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
            onClick={closeDrawer}
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
                onClick={closeDrawer}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 md:px-6">
              <QuestionnaireForm
                onComplete={() => {
                  closeDrawer();
                  // Stay on profile page if user opened the drawer from there
                  if (pathname !== "/profile") navigate({ to: "/search" });
                }}
                onBackFromFirst={closeDrawer}
              />
            </div>
          </aside>
        </div>
      )}
    </PreferenceDrawerContext.Provider>
  );
}
