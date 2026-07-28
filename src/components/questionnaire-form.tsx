import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  usePreferences,
  DEFAULT_PREFS,
  type Preferences,
  SEARCH_FOR_OPTIONS,
  TIMELINE_OPTIONS,
  CARE_NEED_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/lib/prefs";
import {
  LANGUAGES,
  DIETARY_PREFERENCES,
  INDIAN_STATES,
  citiesInState,
  formatINR,
} from "@/lib/mock-data";

const STEPS = [
  "Who & when",
  "Care needed",
  "Budget & location",
  "What matters most",
  "Community & language",
];

export function QuestionnaireForm({
  onComplete,
  onBackFromFirst,
}: {
  onComplete: () => void;
  onBackFromFirst?: () => void;
}) {
  const { prefs, save } = usePreferences();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Preferences>(prefs ?? DEFAULT_PREFS);

  const done = () => {
    save(form);
    toast.success("Great — we've saved your preferences.", {
      description: "We'll highlight the best matches in your results.",
    });
    onComplete();
  };

  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : done());
  const back = () => (step > 0 ? setStep(step - 1) : onBackFromFirst?.());

  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="max-w-[55%] truncate text-right">{STEPS[step]}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 md:p-8">
        {step === 0 && (
          <StepShell title="Who are you searching for, and how soon is placement needed?">
            <FieldLabel>Searching for</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {SEARCH_FOR_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt}
                  active={form.searchFor === opt}
                  onClick={() => setForm({ ...form, searchFor: form.searchFor === opt ? "" : opt })}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>

            <FieldLabel className="mt-7">How soon</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt}
                  active={form.timeline === opt}
                  onClick={() => setForm({ ...form, timeline: form.timeline === opt ? "" : opt })}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell title="What kind of care is needed?" hint="Select any that apply.">
            <div className="grid gap-3 sm:grid-cols-2">
              {CARE_NEED_OPTIONS.map((n) => (
                <OptionButton
                  key={n}
                  active={form.careNeeds.includes(n)}
                  onClick={() => setForm({ ...form, careNeeds: toggle(form.careNeeds, n) })}
                >
                  {n}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell title="What's your budget and preferred location?">
            <FieldLabel>Monthly budget (up to)</FieldLabel>
            <div className="rounded-2xl border border-border p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Up to</span>
                <span className="font-serif text-2xl">{formatINR(form.budget)}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={150000}
                step={5000}
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                className="mt-3 h-6 w-full accent-[color:var(--primary)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹10,000</span>
                <span>₹1,50,000+</span>
              </div>
            </div>

            <FieldLabel className="mt-7">State</FieldLabel>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value, location: "" })}
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm"
            >
              <option value="">Any state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <FieldLabel className="mt-5">City / area</FieldLabel>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm"
            >
              <option value="">Anywhere</option>
              {citiesInState(form.state).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell title="What matters most to you?" hint="Pick the single biggest factor.">
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIORITY_OPTIONS.map((p) => (
                <OptionButton
                  key={p}
                  active={form.priority === p}
                  onClick={() => setForm({ ...form, priority: form.priority === p ? "" : p })}
                >
                  {p}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            title="Any community or language preference?"
            hint="Optional — we use it to highlight homes whose kitchen and staff match."
          >
            <FieldLabel>Community / dietary</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {DIETARY_PREFERENCES.map((d) => (
                <OptionButton
                  key={d}
                  active={(form.dietary ?? []).includes(d)}
                  onClick={() => setForm({ ...form, dietary: toggle(form.dietary ?? [], d) })}
                >
                  {d}
                </OptionButton>
              ))}
            </div>

            <FieldLabel className="mt-7">Preferred language</FieldLabel>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm"
            >
              <option value="">No preference</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </StepShell>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={back}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:px-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={next}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Skip
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 sm:px-6"
          >
            {step === STEPS.length - 1 ? "See matches" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-2.5 text-sm font-semibold text-foreground ${className}`}>{children}</div>
  );
}

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground md:text-3xl">{title}</h2>
      {hint && <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:bg-accent/40"
      }`}
    >
      <span className="min-w-0">{children}</span>
      {active && (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
