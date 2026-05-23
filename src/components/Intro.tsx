import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "DENCYAH".split("");

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"line" | "name" | "events" | "lift" | "done">("line");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 200);
    const t2 = setTimeout(() => setPhase("events"), 200 + 600);
    const t3 = setTimeout(() => setPhase("lift"), 200 + 600 + 700);
    const t4 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 200 + 600 + 700 + 700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[150] bg-[var(--espresso)] overflow-hidden"
        >
          {/* Vertical thread */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "line" || phase === "name" ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: "center" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-[var(--amber-gold)]"
          />

          {/* Champagne particles after name */}
          {(phase === "events" || phase === "lift") &&
            Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 bottom-1/2 h-1 w-1 rounded-full bg-[var(--amber-gold)]"
                style={
                  {
                    "--drift-x": `${(Math.random() - 0.5) * 80}px`,
                    animation: `drift-up ${2 + Math.random() * 2}s linear ${Math.random() * 0.6}s forwards`,
                    transform: `translateX(${(Math.random() - 0.5) * 200}px)`,
                  } as React.CSSProperties
                }
              />
            ))}

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={
              phase === "lift"
                ? { y: "-42vh", x: "-42vw", scale: 0.28 }
                : { y: 0, x: 0, scale: 1 }
            }
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex">
              {LETTERS.map((l, i) => {
                const center = (LETTERS.length - 1) / 2;
                const offset = (i - center) * 60;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: offset, filter: "blur(8px)" }}
                    animate={
                      phase === "line"
                        ? { opacity: 0, x: offset, filter: "blur(8px)" }
                        : { opacity: 1, x: 0, filter: "blur(0px)" }
                    }
                    transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-serif font-semibold text-[var(--amber-gold)] text-[48px] md:text-[80px] leading-none"
                    style={{ letterSpacing: "0.05em", textShadow: "0 0 24px rgba(200,169,126,0.4)" }}
                  >
                    {l}
                  </motion.span>
                );
              })}
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "events" || phase === "lift" ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="mt-3 md:mt-4 font-serif font-light text-[var(--cream)] text-[14px] md:text-[20px]"
              style={{ letterSpacing: "0.4em" }}
            >
              EVENTS
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
