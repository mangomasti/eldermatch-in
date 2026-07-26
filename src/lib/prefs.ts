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
  // Expanded fields (all optional / skippable)
  condition?: string;
  mobility?: string;
  environment?: string;
  timeline?: string;
  roomPreference?: string;
  pets?: string;
  distantFamily?: "Yes" | "No" | "";
  dietary?: string[];
};

export const DEFAULT_PREFS: Preferences = {
  searchFor: "",
  careNeeds: [],
  budget: 80000,
  location: "",
  priorities: [],
  language: "",
  condition: "",
  mobility: "",
  environment: "",
  timeline: "",
  roomPreference: "",
  pets: "",
  distantFamily: "",
  dietary: [],
};

export const CONDITION_OPTIONS = [
  "Dementia/Alzheimer's",
  "Parkinson's",
  "Diabetes management",
  "Post-stroke recovery",
  "None of these",
  "Prefer not to say",
] as const;

export const MOBILITY_OPTIONS = [
  "Fully independent",
  "Uses a cane or walker",
  "Wheelchair-bound",
  "Bedridden",
] as const;

export const ENVIRONMENT_OPTIONS = [
  "Quiet & calm",
  "Social & active",
  "Small intimate setting",
  "Large community with lots of amenities",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately / urgent",
  "Within 1 month",
  "1–3 months",
  "Just researching for the future",
] as const;

export const ROOM_OPTIONS = [
  "Private required",
  "Open to shared",
  "No preference",
] as const;

export const PETS_OPTIONS = [
  "Yes, has a pet",
  "Important even without a pet",
  "Not important",
] as const;

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
    age: string;
    livingSituation: LivingSituation;
  };
};

export const DEFAULT_PROFILE: Profile = {
  basic: { name: "", email: "", phone: "", relationship: "" },
  recipient: {
    name: "",
    notReadyToShareName: false,
    age: "",
    livingSituation: "",
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
    const loaded = safeRead<Partial<Profile>>(KEY_PROFILE, DEFAULT_PROFILE);
    setProfile({
      basic: { ...DEFAULT_PROFILE.basic, ...(loaded.basic ?? {}) },
      recipient: { ...DEFAULT_PROFILE.recipient, ...(loaded.recipient ?? {}) },
    });
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
