import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";

export function QuickInquiry() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(true)}
            className="group fixed right-0 top-1/2 -translate-y-1/2 z-[85] flex items-center bg-[var(--amber-gold)] text-[var(--espresso)] pl-3 pr-3 py-3 rounded-l-full shadow-lg hover:pr-5"
            aria-label="Quick inquiry"
          >
            <Mail className="h-4 w-4" />
            <span className="ml-0 max-w-0 overflow-hidden text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 group-hover:ml-2 group-hover:max-w-[120px]">
              Quick Inquiry
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--espresso)]/70 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[var(--cream)] p-8 md:p-10"
              style={{ border: "1px solid var(--amber-gold)" }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-[var(--taupe)] hover:text-[var(--espresso)]"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="gold-rule" />
              <h3 className="font-serif text-2xl mt-3 text-[var(--espresso)]">A quick hello.</h3>
              <p className="mt-2 text-sm text-[var(--taupe)]">Leave us your details — we'll call within 2 hours.</p>

              {sent ? (
                <div className="mt-8">
                  <p className="font-serif text-xl text-[var(--espresso)]">We'll call within 2 hours. Truly.</p>
                  <div className="mt-4 h-px w-12 bg-[var(--amber-gold)]" />
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-6 space-y-5"
                >
                  <div className="thread-field border-b border-[var(--border)]">
                    <input required placeholder="Your name" className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" />
                  </div>
                  <div className="thread-field border-b border-[var(--border)]">
                    <input required placeholder="Phone or email" className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" />
                  </div>
                  <button className="w-full bg-[var(--amber-gold)] py-3 text-sm uppercase tracking-[0.22em] text-[var(--espresso)] gold-sweep">
                    I'm Ready to Talk
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
