import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Star, BadgeCheck, Reply } from "lucide-react";
import { MOCK_DASHBOARD, type ReviewItem } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/reviews")({
  component: Reviews,
});

function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_DASHBOARD.reviews);
  const [replying, setReplying] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews.filter((r) => r.rating === n).length,
  }));

  const submitReply = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ownerReply: draft } : r)));
    setReplying(null);
    setDraft("");
    toast.success("Reply posted publicly under the review.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Only families with a Verified Stay can post. Reviews are anonymous to protect resident privacy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="font-serif text-4xl">{avg}</div>
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(Number(avg)) ? "fill-highlight text-highlight" : "text-muted"}`} />
            ))}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Based on {reviews.length} reviews shown</div>
          <div className="mt-4 space-y-1.5">
            {dist.map((d) => (
              <div key={d.n} className="flex items-center gap-2 text-xs">
                <span className="w-4">{d.n}★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-highlight"
                    style={{ width: `${(d.count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-muted-foreground">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((r, i) => (
            <article key={r.id} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Verified family {String.fromCharCode(65 + i)}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {r.verifiedStay && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-2 py-0.5 text-xs font-medium text-verified">
                      <BadgeCheck className="h-3 w-3" /> Verified stay
                    </span>
                  )}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`h-3.5 w-3.5 ${k < r.rating ? "fill-highlight text-highlight" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{r.text}</p>

              {r.ownerReply ? (
                <div className="mt-4 rounded-2xl border border-border bg-warm/30 p-4">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    Response from the facility
                  </div>
                  <p className="text-sm text-foreground/85">{r.ownerReply}</p>
                </div>
              ) : replying === r.id ? (
                <div className="mt-4 space-y-2">
                  <textarea
                    rows={3}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Thanks for sharing — we appreciate…"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setReplying(null); setDraft(""); }}
                      className="rounded-full px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => submitReply(r.id)}
                      disabled={!draft.trim()}
                      className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                    >
                      Post reply
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setReplying(r.id); setDraft(""); }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Reply className="h-3 w-3" /> Reply publicly
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
