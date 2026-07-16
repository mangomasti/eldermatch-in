import { Link } from "@tanstack/react-router";
import { Star, ShieldCheck, MapPin, Heart } from "lucide-react";
import { formatINR, type Facility } from "@/lib/mock-data";
import { useShortlist } from "@/lib/prefs";

export function FacilityCard({
  facility,
  recommended,
}: {
  facility: Facility;
  recommended?: boolean;
}) {
  const { has, toggle } = useShortlist();
  const saved = has(facility.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
      <Link
        to="/facility/$id"
        params={{ id: facility.id }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={facility.images[0]}
          alt={facility.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {recommended && (
          <span className="absolute left-3 top-3 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground shadow-sm">
            Recommended for you
          </span>
        )}
        {facility.verified && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-verified shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified
          </span>
        )}
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(facility.id);
        }}
        aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
        className="absolute right-3 top-3 rounded-full p-2"
        style={{ display: "none" }}
      >
        <Heart className={saved ? "fill-highlight text-highlight" : "text-white"} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to="/facility/$id"
            params={{ id: facility.id }}
            className="font-serif text-lg font-medium leading-tight text-foreground hover:underline"
          >
            {facility.name}
          </Link>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-highlight text-highlight" />
            <span className="font-semibold">{facility.rating}</span>
            <span className="text-muted-foreground">({facility.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {facility.neighborhood}, {facility.city}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{facility.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {facility.careTypes.slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-border/60 pt-3">
          <div className="text-sm">
            <span className="font-semibold text-foreground">{formatINR(facility.priceMin)}</span>
            <span className="text-muted-foreground"> – {formatINR(facility.priceMax)}/mo</span>
          </div>
          <Link
            to="/facility/$id"
            params={{ id: facility.id }}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}
