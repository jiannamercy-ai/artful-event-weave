import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ConciergeIndicator() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-12 right-0 w-72 bg-[var(--cream)] p-5 shadow-2xl"
            style={{ border: "1px solid var(--amber-gold)" }}
          >
            <p className="font-serif text-lg text-[var(--espresso)]">We're here.</p>
            <p className="mt-2 text-sm text-[var(--taupe)]">Tell us about your dream event.</p>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] thread-link"
            >
              Start the conversation →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full bg-[var(--espresso)]/90 backdrop-blur px-3 py-2 text-xs text-[var(--cream)] shadow-lg"
        style={{ border: "1px solid var(--amber-gold)" }}
        aria-label="Concierge availability"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[var(--amber-gold)] animate-heartbeat" />
          <span className="relative h-2 w-2 rounded-full bg-[var(--amber-gold)]" />
        </span>
        <span className="hidden sm:inline tracking-wide">Our Curators Are Available</span>
      </button>
    </div>
  );
}
