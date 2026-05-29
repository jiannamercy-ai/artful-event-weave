import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Linchry Events" },
      {
        name: "description",
        content: "Learn about Linchry Events — our approach, philosophy, and what sets us apart in event design and production.",
      },
    ],
  }),
  component: About,
});

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function About() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-[var(--espresso)]">
            We don't just set up events.
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">We build experiences.</em>
          </h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">About Linchry Events</h2>
          <div className="mt-8 space-y-6 text-[var(--champagne)]/90 leading-relaxed text-lg">
            <p>
              Linchry Events Services Ltd. is an event production and design company specializing in delivering structured,
              high-quality event solutions for both corporate and private clients.
            </p>
            <p>
              We combine creativity with precision to ensure every event is not only beautiful — but seamlessly executed.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-[var(--espresso)]">Our Approach</h2>
          <p className="mt-6 text-[var(--espresso)]/80 leading-relaxed text-lg">
            We believe every event should feel effortless to the client — even though it requires detailed planning behind the scenes.
          </p>
          
          <div className="mt-12 space-y-8">
            {[
                { title: "Understand Your Vision", desc: "We listen carefully to your goals, preferences, and unique story." },
                { title: "Design the Experience", desc: "We create a cohesive vision that reflects your brand and celebrates your moment." },
                { title: "Execute with Precision", desc: "We handle every detail so you can focus on enjoying the event." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                <h3 className="font-serif text-2xl text-[var(--espresso)]">{item.title}</h3>
                <p className="mt-3 text-[var(--taupe)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">What Sets Us Apart</h2>
          
          <ul className="mt-12 space-y-6">
            {[
              "We focus on complete event experiences, not isolated services",
              "We maintain high standards of organization and execution",
              "We are built for both design and logistics",
              "We prioritize professional delivery, not guesswork",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="h-3 w-3 rounded-full bg-[var(--amber-gold)] mt-2 flex-shrink-0" />
                <span className="text-[var(--champagne)]/90 leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-20 md:py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--espresso)]">
            Work with a team that understands
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">both design and execution.</em>
          </h2>
          <Link
            to="/"
            hash="contact"
            className="mt-10 inline-block gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}