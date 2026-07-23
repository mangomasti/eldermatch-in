import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/search">Browse homes</NavLink>
          <NavLink to="/questionnaire">Get recommendations</NavLink>
          <NavLink to="/about">How we verify</NavLink>
          <Link
            to="/register-facility"
            className="ml-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            List your facility
          </Link>
        </nav>
        <button
          className="rounded-full border border-border p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            <NavLink to="/search" onClick={() => setOpen(false)}>Browse homes</NavLink>
            <NavLink to="/questionnaire" onClick={() => setOpen(false)}>Get recommendations</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>How we verify</NavLink>
            <Link
              to="/register-facility"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-primary/30 px-4 py-2.5 text-center text-sm font-medium text-primary"
            >
              List your facility
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      activeProps={{ className: "bg-accent text-foreground" }}
    >
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-warm/40 mt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            ElderMatch helps families find trusted senior care in their city — verified facilities, real photos, and reviews only from confirmed stays.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">For families</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/search" className="hover:text-foreground">Browse homes</Link></li>
            <li><Link to="/questionnaire" className="hover:text-foreground">Personalised recommendations</Link></li>
            <li><Link to="/about" className="hover:text-foreground">How verification works</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">For facilities</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/register-facility" className="hover:text-foreground">List your facility</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Our standards</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 ElderMatch. Made with care.
      </div>
    </footer>
  );
}
