import { useEffect, useState } from "react";

const KEY_PREFS = "kinstead.prefs";
const KEY_SHORTLIST = "kinstead.shortlist";
const KEY_PROFILE = "eldermatch.profile";

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

export const RELATIONSHIPS = [
  "Myself",
  "My parent",
  "My spouse",
  "My grandparent",
  "Other family member",
  "Someone I care for professionally",
] as const;
export type Relationship = (typeof RELATIONSHIPS)[number] | "";

export const LIVING_SITUATIONS = [
  "Living alone",
  "Living with family",
  "Currently in a facility",
  "Currently hospitalized",
] as const;
export type LivingSituation = (typeof LIVING_SITUATIONS)[number] | "";

export const URGENCY_LEVELS = [
  "Just researching",
  "Planning within a few months",
  "Need placement urgently",
] as const;
export type Urgency = (typeof URGENCY_LEVELS)[number] | "";

export type Profile = {
  basic: {
    name: string;
    email: string;
    phone: string;
    relationship: Relationship;
  };
  recipient: {
    name: string;
    notReadyToShareName: boolean;
    age: string; // stored as string to allow empty input
    livingSituation: LivingSituation;
    urgency: Urgency;
  };
};

export const DEFAULT_PROFILE: Profile = {
  basic: { name: "", email: "", phone: "", relationship: "" },
  recipient: {
    name: "",
    notReadyToShareName: false,
    age: "",
    livingSituation: "",
    urgency: "",
  },
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

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(safeRead<Profile>(KEY_PROFILE, DEFAULT_PROFILE));
    setHydrated(true);
  }, []);

  const save = (partial: Partial<Profile>) => {
    setProfile((prev) => {
      const next: Profile = {
        basic: { ...prev.basic, ...(partial.basic ?? {}) },
        recipient: { ...prev.recipient, ...(partial.recipient ?? {}) },
      };
      try {
        window.localStorage.setItem(KEY_PROFILE, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return { profile, save, hydrated };
}
