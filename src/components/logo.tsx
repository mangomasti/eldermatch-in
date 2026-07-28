import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <Link
      to="/home"
      className={`serif ${cls} font-medium tracking-tight text-foreground flex items-center gap-2`}
    >
      <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
        <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
      </span>
      <span>ElderMatch</span>
    </Link>
  );
}
