import { useEffect, useState } from "react";

const KEY = "eldermatch.facilitySession";

export type FacilityAccessMode = "full" | "claim-pending" | "registration-pending";

export type FacilitySession = {
  facilityId: string;
  facilityName: string;
  mode: FacilityAccessMode;
};

export const DEFAULT_SESSION: FacilitySession = {
  facilityId: "willowbrook-gardens",
  facilityName: "Willowbrook Gardens",
  mode: "full",
};

const EVENT = "eldermatch:facility-session";

function read(): FacilitySession {
  if (typeof window === "undefined") return DEFAULT_SESSION;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw
      ? { ...DEFAULT_SESSION, ...(JSON.parse(raw) as Partial<FacilitySession>) }
      : DEFAULT_SESSION;
  } catch {
    return DEFAULT_SESSION;
  }
}

export function writeFacilitySession(s: FacilitySession) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* ignore */
  }
}

export function useFacilitySession() {
  const [session, setSession] = useState<FacilitySession>(DEFAULT_SESSION);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => setSession(read());
    sync();
    setHydrated(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const set = (s: FacilitySession) => {
    setSession(s);
    writeFacilitySession(s);
  };

  const setMode = (mode: FacilityAccessMode) => set({ ...read(), mode });

  return { session, set, setMode, hydrated, locked: session.mode === "claim-pending" };
}
