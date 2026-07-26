import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  usePreferences,
  DEFAULT_PREFS,
  type Preferences,
  CONDITION_OPTIONS,
  MOBILITY_OPTIONS,
  ENVIRONMENT_OPTIONS,
  TIMELINE_OPTIONS,
  ROOM_OPTIONS,
  PETS_OPTIONS,
} from "@/lib/prefs";
import { LANGUAGES, NEIGHBORHOODS, DIETARY_PREFERENCES } from "@/lib/mock-data";

const CARE_NEEDS = [
  "Mobility assistance",
  "Memory/dementia care",
  "Medication management",
  "Physical therapy",
  "General assisted living",
  "Independent living",
];

const PRIORITIES = [
  "Healthcare quality",
  "Social activities",
  "Price",
  "Location convenience",
  "Food quality",
];

const STEPS = [
  "Who is this for?",
  "Care needs",
  "Diagnosed condition",
  "Mobility level",
  "Preferred environment",
  "Timeline",
  "Room preference",
  "Pets",
  "Distant family",
  "Budget",
  "Location",
  "Priorities",
  "Language",
  "Community / dietary preference",
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

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span className="max-w-[55%] truncate text-right">{STEPS[step]}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        {step === 0 && (
          <StepShell title="Who is this search for?">
            <div className="grid gap-3">
              {(["Myself", "Parent or family member", "Someone else"] as const).map((opt) => (
                <OptionButton
                  key={opt}
                  active={form.searchFor === opt}
                  onClick={() => setForm({ ...form, searchFor: opt })}
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
              {CARE_NEEDS.map((n) => {
                const active = form.careNeeds.includes(n);
                return (
                  <OptionButton
                    key={n}
                    active={active}
                    onClick={() =>
                      setForm({
                        ...form,
                        careNeeds: active
                          ? form.careNeeds.filter((x) => x !== n)
                          : [...form.careNeeds, n],
                      })
                    }
                  >
                    {n}
                  </OptionButton>
                );
              })}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            title="Any diagnosed condition needing specialised care?"
            hint="Skip if you'd rather not say."
          >
            <SingleChoice
              options={CONDITION_OPTIONS as unknown as string[]}
              value={form.condition ?? ""}
              onChange={(v) => setForm({ ...form, condition: v })}
            />
          </StepShell>
        )}

        {step === 3 && (
          <StepShell title="What's their mobility level?">
            <SingleChoice
              options={MOBILITY_OPTIONS as unknown as string[]}
              value={form.mobility ?? ""}
              onChange={(v) => setForm({ ...form, mobility: v })}
            />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell title="What kind of environment would they thrive in?">
            <SingleChoice
              options={ENVIRONMENT_OPTIONS as unknown as string[]}
              value={form.environment ?? ""}
              onChange={(v) => setForm({ ...form, environment: v })}
            />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell title="How soon is placement needed?">
            <SingleChoice
              options={TIMELINE_OPTIONS as unknown as string[]}
              value={form.timeline ?? ""}
              onChange={(v) => setForm({ ...form, timeline: v })}
            />
          </StepShell>
        )}

        {step === 6 && (
          <StepShell title="Shared room okay, or private required?">
            <SingleChoice
              options={ROOM_OPTIONS as unknown as string[]}
              value={form.roomPreference ?? ""}
              onChange={(v) => setForm({ ...form, roomPreference: v })}
            />
          </StepShell>
        )}

        {step === 7 && (
          <StepShell
            title="Any pets, or is pet-friendliness important?"
            hint="Helpful for filtering out no-pet facilities."
          >
            <SingleChoice
              options={PETS_OPTIONS as unknown as string[]}
              value={form.pets ?? ""}
              onChange={(v) => setForm({ ...form, pets: v })}
            />
          </StepShell>
        )}

        {step === 8 && (
          <StepShell
            title="Does your family live far away or abroad?"
            hint="We use this to surface facilities with extra trust signals for you."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {(["Yes", "No"] as const).map((v) => (
                <OptionButton
                  key={v}
                  active={form.distantFamily === v}
                  onClick={() => setForm({ ...form, distantFamily: v })}
                >
                  {v}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}

        {step === 9 && (
          <StepShell title="What's your monthly budget?">
            <div className="rounded-2xl bg-warm/40 p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Up to</span>
                <span className="font-serif text-3xl">
                  ₹{form.budget.toLocaleString("en-IN")}
                  <span className="text-base text-muted-foreground"> /month</span>
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={150000}
                step={5000}
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                className="mt-4 w-full accent-[color:var(--primary)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>₹15,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>
          </StepShell>
        )}

        {step === 10 && (
          <StepShell title="Preferred area">
            <div className="grid gap-3 sm:grid-cols-2">
              {NEIGHBORHOODS.map((n) => (
                <OptionButton
                  key={n}
                  active={form.location === n}
                  onClick={() => setForm({ ...form, location: n })}
                >
                  {n}
                </OptionButton>
              ))}
              <OptionButton
                active={form.location === "Anywhere"}
                onClick={() => setForm({ ...form, location: "Anywhere" })}
              >
                Anywhere in the city
              </OptionButton>
            </div>
          </StepShell>
        )}

        {step === 11 && (
          <StepShell title="What matters most?" hint="Pick up to 3.">
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIORITIES.map((p) => {
                const active = form.priorities.includes(p);
                return (
                  <OptionButton
                    key={p}
                    active={active}
                    onClick={() => {
                      if (active) {
                        setForm({ ...form, priorities: form.priorities.filter((x) => x !== p) });
                      } else if (form.priorities.length < 3) {
                        setForm({ ...form, priorities: [...form.priorities, p] });
                      } else {
                        toast("You can pick up to 3 priorities.");
                      }
                    }}
                  >
                    {p}
                  </OptionButton>
                );
              })}
            </div>
          </StepShell>
        )}

        {step === 12 && (
          <StepShell title="Preferred language">
            <div className="grid gap-3 sm:grid-cols-2">
              {LANGUAGES.map((l) => (
                <OptionButton
                  key={l}
                  active={form.language === l}
                  onClick={() => setForm({ ...form, language: l })}
                >
                  {l}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}
        {step === 13 && (
          <StepShell
            title="Any community or dietary preference?"
            hint="Optional — we use it to highlight homes whose kitchen matches."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {DIETARY_PREFERENCES.map((d) => {
                const list = form.dietary ?? [];
                const active = list.includes(d);
                return (
                  <OptionButton
                    key={d}
                    active={active}
                    onClick={() =>
                      setForm({
                        ...form,
                        dietary: active ? list.filter((x) => x !== d) : [...list, d],
                      })
                    }
                  >
                    {d}
                  </OptionButton>
                );
              })}
            </div>
          </StepShell>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={next}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Skip this
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
          >
            {step === STEPS.length - 1 ? "See recommendations" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StepShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-foreground md:text-3xl">{title}</h2>
      {hint && <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SingleChoice({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <OptionButton key={opt} active={value === opt} onClick={() => onChange(value === opt ? "" : opt)}>
          {opt}
        </OptionButton>
      ))}
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
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:bg-accent/40"
      }`}
    >
      <span>{children}</span>
      {active && (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
