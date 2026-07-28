import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Users,
  Heart,
  ClipboardList,
  Star,
  MapPin,
  Sparkles,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  useProfile,
  usePreferences,
  useShortlist,
  RELATIONSHIPS,
  LIVING_SITUATIONS,
} from "@/lib/prefs";

import { facilities, formatINR } from "@/lib/mock-data";
import { usePreferenceDrawer } from "@/components/preference-drawer";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile — ElderMatch" },
      {
        name: "description",
        content:
          "Manage your ElderMatch profile: your details, the person you're searching for, care preferences, and shortlisted homes.",
      },
      { property: "og:title", content: "My profile — ElderMatch" },
      {
        property: "og:description",
        content:
          "Your ElderMatch profile: basic info, care recipient, preferences and shortlisted homes.",
      },
    ],
  }),
  component: ProfilePage,
});

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function ProfilePage() {
  const { profile, save, hydrated } = useProfile();
  const { prefs } = usePreferences();
  const { ids, toggle } = useShortlist();
  const { openDrawer } = usePreferenceDrawer();

  const saved = facilities.filter((f) => ids.includes(f.id));

  const notify = () => toast("Saved", { duration: 1200 });

  if (!hydrated) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
          <div className="h-40 animate-pulse rounded-3xl bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary/10 text-xl font-semibold text-primary ring-1 ring-border">
            {profile.basic.name ? (
              profile.basic.name
                .trim()
                .split(/\s+/)
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            ) : (
              <User className="h-6 w-6" />
            )}
          </span>
          <div className="min-w-0">
            <h1 className="font-serif text-3xl md:text-4xl">
              {profile.basic.name || "Your profile"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.basic.relationship
                ? `Searching as ${profile.basic.relationship.toLowerCase()}`
                : "Add your details so we can personalise your matches."}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* A) Basic Info */}
          <Card icon={<User className="h-4 w-4" />} title="Basic info">
            <div className="grid gap-4">
              <Field label="Full name">
                <input
                  className={inputCls}
                  defaultValue={profile.basic.name}
                  placeholder="Priya Nair"
                  onBlur={(e) => {
                    if (e.target.value !== profile.basic.name) {
                      save({ basic: { ...profile.basic, name: e.target.value } });
                      notify();
                    }
                  }}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email">
                  <input
                    type="email"
                    className={inputCls}
                    defaultValue={profile.basic.email}
                    placeholder="you@example.com"
                    onBlur={(e) => {
                      if (e.target.value !== profile.basic.email) {
                        save({ basic: { ...profile.basic, email: e.target.value } });
                        notify();
                      }
                    }}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    className={inputCls}
                    defaultValue={profile.basic.phone}
                    placeholder="+91 98xxx xxxxx"
                    onBlur={(e) => {
                      if (e.target.value !== profile.basic.phone) {
                        save({ basic: { ...profile.basic, phone: e.target.value } });
                        notify();
                      }
                    }}
                  />
                </Field>
              </div>
              <Field label="Relationship to person needing care">
                <select
                  className={inputCls}
                  value={profile.basic.relationship}
                  onChange={(e) => {
                    save({
                      basic: {
                        ...profile.basic,
                        relationship: e.target.value as typeof profile.basic.relationship,
                      },
                    });
                    notify();
                  }}
                >
                  <option value="">Select…</option>
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Card>

          {/* B) Care Recipient */}
          <Card icon={<Users className="h-4 w-4" />} title="Care recipient details">
            <div className="grid gap-4">
              <RecipientNameField />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Age">
                  <input
                    type="number"
                    min={40}
                    max={110}
                    className={inputCls}
                    defaultValue={profile.recipient.age}
                    placeholder="72"
                    onBlur={(e) => {
                      if (e.target.value !== profile.recipient.age) {
                        save({ recipient: { ...profile.recipient, age: e.target.value } });
                        notify();
                      }
                    }}
                  />
                </Field>
                <Field label="Current living situation">
                  <select
                    className={inputCls}
                    value={profile.recipient.livingSituation}
                    onChange={(e) => {
                      save({
                        recipient: {
                          ...profile.recipient,
                          livingSituation: e.target
                            .value as typeof profile.recipient.livingSituation,
                        },
                      });
                      notify();
                    }}
                  >
                    <option value="">Select…</option>
                    {LIVING_SITUATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              {prefs?.timeline === "Immediately / urgent" && (
                <div className="flex items-start gap-2 rounded-xl border border-highlight/30 bg-highlight/10 p-3 text-xs text-highlight">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>We'll prioritise homes with immediate availability in your matches.</span>
                </div>
              )}
            </div>
          </Card>

          {/* C) Care Preferences */}
          <Card
            icon={<ClipboardList className="h-4 w-4" />}
            title="Care preferences"
            action={
              prefs ? (
                <button
                  onClick={openDrawer}
                  className="rounded-full border border-primary/30 px-3.5 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Update
                </button>
              ) : null
            }
          >
            {!prefs ? (
              <div className="flex flex-col items-start gap-3 rounded-2xl bg-warm/40 p-5">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" /> No preferences saved yet
                </div>
                <p className="text-sm text-muted-foreground">
                  Answer 6 quick questions so we can rank homes by what actually matters to you.
                </p>
                <button
                  onClick={openDrawer}
                  className="mt-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Build my preferences
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                <PrefRow label="Searching for">
                  {prefs.searchFor ? (
                    <span className="text-sm">{prefs.searchFor}</span>
                  ) : (
                    <Muted>Not set</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Timeline">
                  {prefs.timeline ? (
                    <span className="text-sm">{prefs.timeline}</span>
                  ) : (
                    <Muted>Not set</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Care needs">
                  {prefs.careNeeds.length ? (
                    <ChipRow items={prefs.careNeeds} />
                  ) : (
                    <Muted>Any</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Budget">
                  <span className="text-sm">
                    Up to <span className="font-semibold">{formatINR(prefs.budget)}</span>/mo
                  </span>
                </PrefRow>
                <PrefRow label="Preferred location">
                  {prefs.location || prefs.state ? (
                    <span className="text-sm">
                      {[prefs.location, prefs.state].filter(Boolean).join(", ")}
                    </span>
                  ) : (
                    <Muted>Anywhere in India</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Matters most">
                  {prefs.priority ? (
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {prefs.priority}
                    </span>
                  ) : (
                    <Muted>Not set</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Community / dietary">
                  {prefs.dietary?.length ? (
                    <ChipRow items={prefs.dietary} />
                  ) : (
                    <Muted>No preference</Muted>
                  )}
                </PrefRow>
                <PrefRow label="Language">
                  {prefs.language ? (
                    <span className="text-sm">{prefs.language}</span>
                  ) : (
                    <Muted>No preference</Muted>
                  )}
                </PrefRow>
              </div>
            )}
          </Card>

          {/* D) Shortlisted */}
          <Card
            icon={<Heart className="h-4 w-4" />}
            title={`Shortlisted homes${saved.length ? ` · ${saved.length}` : ""}`}
          >
            {saved.length === 0 ? (
              <div className="rounded-2xl bg-warm/40 p-5 text-sm text-muted-foreground">
                No saved homes yet — browse and tap the heart on any listing to shortlist.
                <div className="mt-3">
                  <Link
                    to="/search"
                    className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Browse homes
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {saved.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Link
                      to="/facility/$id"
                      params={{ id: f.id }}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted"
                    >
                      <img src={f.images[0]} alt={f.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/facility/$id"
                        params={{ id: f.id }}
                        className="block truncate text-sm font-medium text-foreground hover:underline"
                      >
                        {f.name}
                      </Link>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {f.neighborhood}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-highlight text-highlight" /> {f.rating}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-foreground/80">
                        {formatINR(f.priceMin)} – {formatINR(f.priceMax)}/mo
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        toggle(f.id);
                        toast("Removed from shortlist");
                      }}
                      aria-label={`Remove ${f.name} from shortlist`}
                      className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Card({
  icon,
  title,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)] md:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
          <h2 className="font-serif text-lg">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function PrefRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-start gap-3 border-t border-border/60 pt-3 first:border-t-0 first:pt-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
        >
          {i}
        </span>
      ))}
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-muted-foreground">{children}</span>;
}

function RecipientNameField() {
  const { profile, save } = useProfile();
  const [name, setName] = useState(profile.recipient.name);
  const notReady = profile.recipient.notReadyToShareName;

  return (
    <div>
      <Field label="Care recipient's name (optional)">
        <input
          className={`${inputCls} ${notReady ? "opacity-50" : ""}`}
          value={notReady ? "" : name}
          disabled={notReady}
          placeholder="e.g. Kamala Menon"
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => {
            if (e.target.value !== profile.recipient.name) {
              save({ recipient: { ...profile.recipient, name: e.target.value } });
              toast("Saved", { duration: 1200 });
            }
          }}
        />
      </Field>
      <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={notReady}
          onChange={(e) => {
            save({
              recipient: {
                ...profile.recipient,
                notReadyToShareName: e.target.checked,
                name: e.target.checked ? "" : profile.recipient.name,
              },
            });
            if (e.target.checked) setName("");
          }}
          className="accent-[color:var(--primary)]"
        />
        Not ready to share yet
      </label>
    </div>
  );
}
