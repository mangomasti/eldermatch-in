import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HeartHandshake, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome to Kinstead — trusted senior care, made simple" },
      {
        name: "description",
        content:
          "Kinstead helps families find verified assisted living homes, and helps facilities reach the families who need them.",
      },
    ],
  }),
  component: RoleSelect,
});

function RoleSelect() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-warm/30">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Logo />
        <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
          How we verify
        </Link>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-8 md:px-8">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-verified/30 bg-background px-3 py-1 text-xs font-medium text-verified">
          <ShieldCheck className="h-3.5 w-3.5" /> A senior care marketplace built on verification
        </span>
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Who are you today?
        </h1>
        <p className="mt-4 max-w-xl text-center text-base text-muted-foreground md:text-lg">
          Whether you're finding care for someone you love, or you run a home that provides it — we'll take you to the right place.
        </p>

        <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
          <RoleCard
            title="I'm looking for a care facility"
            subtitle="For families, caregivers, and seniors searching for a trusted home."
            icon={<HeartHandshake className="h-7 w-7" />}
            accent="primary"
            onClick={() => navigate({ to: "/questionnaire", search: { intro: "1" } })}
          />
          <RoleCard
            title="I run an old age home or facility"
            subtitle="Get your verified facility in front of the families who are actively searching."
            icon={<Building2 className="h-7 w-7" />}
            accent="warm"
            onClick={() => navigate({ to: "/register-facility" })}
          />
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Just browsing?{" "}
          <Link to="/home" className="font-medium text-primary underline-offset-4 hover:underline">
            Skip to the homepage
          </Link>
        </p>
      </main>
    </div>
  );
}

function RoleCard({
  title,
  subtitle,
  icon,
  onClick,
  accent,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  accent: "primary" | "warm";
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
    >
      <span
        className={`inline-grid h-14 w-14 place-items-center rounded-2xl ${
          accent === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-warm text-warm-foreground"
        }`}
      >
        {icon}
      </span>
      <div>
        <h2 className="font-serif text-2xl text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}
