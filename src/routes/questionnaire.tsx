import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { SkipForward } from "lucide-react";
import { QuestionnaireForm } from "@/components/questionnaire-form";

const searchSchema = z.object({ intro: z.string().optional() });

export const Route = createFileRoute("/questionnaire")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Get personalised recommendations — ElderMatch" },
      {
        name: "description",
        content:
          "A short, friendly questionnaire helps us surface the homes that best match your care needs, budget, and preferences.",
      },
    ],
  }),
  component: Questionnaire,
});

function Questionnaire() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/questionnaire" });

  const skip = () => {
    toast("Skipped — you can set preferences anytime.");
    navigate({ to: "/home" });
  };

  return (
    <div className="min-h-screen bg-warm/30">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/" className="serif text-lg font-medium">
          ElderMatch
        </Link>
        <button
          onClick={skip}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="h-4 w-4" /> Skip for now
        </button>
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16 md:px-8">
        {search.intro === "1" && (
          <div className="mb-6 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="font-serif text-xl">A few quick questions</div>
            <p className="mt-1 text-sm text-muted-foreground">
              This takes about 60 seconds. Every question is optional — skip anytime.
            </p>
          </div>
        )}

        <QuestionnaireForm
          onComplete={() => navigate({ to: "/search" })}
          onBackFromFirst={() => navigate({ to: "/" })}
        />
      </main>
    </div>
  );
}
