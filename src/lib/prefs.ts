import { useEffect, useState } from "react";

const KEY_PREFS = "kinstead.prefs";
const KEY_SHORTLIST = "kinstead.shortlist";

export type Preferences = {
  searchFor: "Myself" | "Parent or family member" | "Someone else" | "";
  careNeeds: string[];
  budget: number; // monthly max
  location: string;
  priorities: string[];
  language: string;
};

export const DEFAULT_PREFS: Preferences = {
  searchFor: "",
  careNeeds: [],
  budget: 80000,
  location: "",
  priorities: [],
  language: "",
};

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrefs(safeRead<Preferences | null>(KEY_PREFS, null));
    setHydrated(true);
  }, []);

  const save = (p: Preferences) => {
    setPrefs(p);
    try {
      window.localStorage.setItem(KEY_PREFS, JSON.stringify(p));
    } catch {}
  };

  const clear = () => {
    setPrefs(null);
    try {
      window.localStorage.removeItem(KEY_PREFS);
    } catch {}
  };

  return { prefs, save, clear, hydrated };
}

export function useShortlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(safeRead<string[]>(KEY_SHORTLIST, []));
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(KEY_SHORTLIST, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const has = (id: string) => ids.includes(id);

  return { ids, toggle, has, hydrated };
}
