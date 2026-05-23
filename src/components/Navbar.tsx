import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/#about", label: "About" },
  { to: "/#services", label: "Services" },
  { to: "/#portfolio", label: "Portfolio" },
  { to: "/meet-the-team", label: "Team" },
  { to: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        scrolled
          ? "bg-[var(--cream)]/85 backdrop-blur-md border-b border-[var(--amber-soft)]"
          : isHome
            ? "bg-transparent"
            : "bg-[var(--cream)]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link to="/" className="group flex flex-col leading-none">
          <span
            className="font-serif text-[var(--amber-gold)] font-semibold uppercase"
            style={{ letterSpacing: "0.25em", fontSize: scrolled ? "18px" : "22px", transition: "font-size .5s" }}
          >
            Dencyah
          </span>
          <span
            className="font-serif font-light text-[var(--amber-gold)] mt-[2px]"
            style={{ letterSpacing: "0.4em", fontSize: "9px" }}
          >
            EVENTS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.slice(1, -1).map((l) => (
            <a
              key={l.to}
              href={l.to.startsWith("/#") ? l.to.slice(1) : l.to}
              className={`thread-link text-[12px] uppercase tracking-[0.2em] transition-colors ${
                scrolled || !isHome
                  ? "text-[var(--espresso)] hover:text-[var(--amber-gold)]"
                  : "text-[var(--cream)] hover:text-[var(--amber-gold)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="hidden md:inline-flex bg-[var(--amber-gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[var(--espresso)] gold-sweep hover:bg-[var(--amber-gold)]/90"
        >
          Begin Your Vision
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 -mr-2"
        >
          {open ? (
            <X className={`h-6 w-6 text-[var(--amber-gold)]`} />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled || !isHome ? "text-[var(--espresso)]" : "text-[var(--cream)]"}`} />
          )}
        </button>
      </div>

      {/* bottom golden thread */}
      <motion.div
        initial={false}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--amber-gold)]/60"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-[64px] bg-[var(--cream)] z-[70]"
          >
            <nav className="flex flex-col px-6 py-8">
              {links.map((l, i) => (
                <a
                  key={l.to}
                  href={l.to.startsWith("/#") ? l.to.slice(1) : l.to}
                  className="font-serif text-2xl text-[var(--espresso)] py-4"
                >
                  {l.label}
                  {i < links.length - 1 && <div className="mt-4 h-px w-full bg-[var(--amber-soft)]" />}
                </a>
              ))}
              <a
                href="/#contact"
                className="mt-6 bg-[var(--amber-gold)] text-center px-5 py-4 text-xs uppercase tracking-[0.22em] text-[var(--espresso)]"
              >
                Begin Your Vision
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
