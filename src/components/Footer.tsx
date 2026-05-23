import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--cream)] pt-20 pb-10 px-6">
      <div className="mx-auto max-w-[1100px] text-center">
        <Link to="/" className="inline-flex flex-col leading-none">
          <span className="font-serif text-[var(--amber-gold)] font-semibold uppercase text-2xl" style={{ letterSpacing: "0.25em" }}>
            Dencyah
          </span>
          <span className="font-serif font-light text-[var(--amber-gold)] mt-1 text-[10px]" style={{ letterSpacing: "0.4em" }}>
            EVENTS
          </span>
        </Link>

        <div className="mx-auto mt-6 h-px w-[60px] bg-[var(--amber-gold)]" />

        <p className="mt-6 font-light text-[var(--champagne)]/80">Curators of refined experiences.</p>

        <div className="mt-10 flex justify-center gap-4">
          {[
            { Icon: Instagram, href: "https://instagram.com/dencyahevents", label: "Instagram" },
            { Icon: Facebook, href: "#", label: "Facebook" },
            { Icon: MessageCircle, href: "https://wa.me/254726765010", label: "WhatsApp" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--amber-gold)] text-[var(--amber-gold)] transition-colors hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em]">
          <Link to="/privacy" className="text-[var(--cream)]/80 hover:text-[var(--amber-gold)]">
            Privacy Policy
          </Link>
          <span className="text-[var(--amber-gold)]">·</span>
          <Link to="/terms" className="text-[var(--cream)]/80 hover:text-[var(--amber-gold)]">
            Terms of Service
          </Link>
        </div>

        <p className="mt-10 text-xs text-[var(--taupe)]">
          © {new Date().getFullYear()} Dencyah Events. All rights reserved. · Handled. Delivered. Celebrated.
        </p>
      </div>
    </footer>
  );
}
