import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";

export const Route = createFileRoute("/corporate")({{
  head: () => ({{
    meta: [
      {{ title: "Corporate Events — Linchry Events" }},
      {{
        name: "description",
        content: "Professional event execution for brands and organizations. Precision, reliability, and impact.",
      }},
    ],
  }}),
  component: Corporate,
}});

const EVENT_TYPES = [
  "Product launches",
  "Conferences",
  "Award ceremonies",
  "Corporate dinners",
  "Brand activations",
];

const WHY_CHOOSE = [
  "Structured execution",
  "Professional coordination",
  "Clean, high-end setups",
  "Ability to handle scale",
];

function Corporate() {{
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h1 className="mt-8 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
            Corporate Events
          </h1>
          <p className="mt-8 text-[var(--champagne)]/90 leading-relaxed text-lg">
            Professional event execution for brands that require precision, reliability, and impact.
          </p>
        </div>
      </section>

      {/* Events We Handle */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] text-[var(--espresso)]">Events We Handle</h2>
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {EVENT_TYPES.map((event, i) => (
              <motion.div
                key={{i}}
                initial={{{{ opacity: 0, y: 20 }}}}
                whileInView={{{{ opacity: 1, y: 0 }}}}
                viewport={{{{ once: true, margin: "-80px" }}}}
                transition={{{{ duration: 0.6, delay: i * 0.1 }}}}
                className="flex items-start gap-4"
              >
                <span className="h-3 w-3 rounded-full bg-[var(--amber-gold)] mt-1 flex-shrink-0" />
                <span className="text-[var(--taupe)] text-lg">{event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)]">Why Corporates Choose Us</h2>
          <ul className="mt-12 space-y-6">
            {WHY_CHOOSE.map((reason, i) => (
              <motion.li
                key={{i}}
                initial={{{{ opacity: 0, x: -20 }}}}
                whileInView={{{{ opacity: 1, x: 0 }}}}
                viewport={{{{ once: true, margin: "-80px" }}}}
                transition={{{{ duration: 0.6, delay: i * 0.1 }}}}
                className="flex items-start gap-4"
              >
                <span className="h-3 w-3 rounded-full bg-[var(--amber-gold)] mt-1 flex-shrink-0" />
                <span className="text-[var(--champagne)]/90 text-lg leading-relaxed">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-20 md:py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--espresso)]">
            Partner with a team that
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">delivers without compromise.</em>
          </h2>
          <a
            href="/#contact"
            className="mt-10 inline-block gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Work With Us
          </a>
        </div>
      </section>
    </div>
  );
}}