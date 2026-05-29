import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: "Weddings & Private Events — Linchry Events" },
      {
        name: "description",
        content: "Your wedding should feel effortless, beautiful, and completely you. Let Linchry Events design your perfect celebration.",
      },
    ],
  }),
  component: Weddings,
});

const WHAT_WE_PROVIDE = [
  "Ceremony setup",
  "Reception design",
  "Floral styling",
  "Table settings",
  "Full event transformation",
];

function Weddings() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h1 className="mt-8 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
            Your wedding should feel
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">effortless, beautiful, and completely you.</em>
          </h1>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] text-[var(--espresso)]">Our Approach</h2>
          <p className="mt-8 text-[var(--taupe)] leading-relaxed text-lg">
            We design weddings that are elegant, cohesive, and thoughtfully executed. Every moment is crafted to reflect your story and celebrate your love with precision and grace.
          </p>
        </div>
      </section>

      {/* What We Provide */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)]">What We Provide</h2>
          <div className="mt-12 space-y-6">
            {WHAT_WE_PROVIDE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 pb-6 border-b border-[var(--amber-gold)]/20"
              >
                <span className="h-3 w-3 rounded-full bg-[var(--amber-gold)] mt-1 flex-shrink-0" />
                <span className="text-[var(--champagne)]/90 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-20 md:py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--espresso)]">
            Let's design a wedding
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">you'll never forget.</em>
          </h2>
          <a
            href="/#contact"
            className="mt-10 inline-block gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Start Planning
          </a>
        </div>
      </section>
    </div>
  );
}}