import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";

const DETAILS: Record<string, { name: string; tagline: string; body: string[]; img: string }> = {
  "luxury-weddings": {
    name: "Luxury Weddings",
    tagline: "The day you remember in still frames.",
    body: [
      "From the first dress fitting to the last sparkler send-off, we hold every thread so the two of you can simply be present.",
      "Our weddings are remembered for their pace — never rushed, never thin. Each moment is given the breath it deserves.",
    ],
    img: "/src/assets/event-1-clean.jpg",
  },
  "corporate-galas": {
    name: "Corporate Galas & Launches",
    tagline: "Brand stories, told in a single evening.",
    body: [
      "We produce galas, brand launches, and executive dinners that feel as considered as the strategy behind them.",
      "From flow to lighting to the menu's last course — every choice carries the brand forward without ever shouting.",
    ],
    img: "/src/assets/about.jpg",
  },
  "private-celebrations": {
    name: "Private Celebrations",
    tagline: "Quiet milestones, exquisitely held.",
    body: [
      "Birthdays, anniversaries, family gatherings — the moments that mean the most often live behind closed doors.",
      "We design them with the same precision we bring to our largest galas. Only quieter. Only more personal.",
    ],
    img: "/src/assets/event-4-clean.jpg",
  },
  "destination-events": {
    name: "Destination Events",
    tagline: "Wherever you imagine — we arrive first.",
    body: [
      "From lakeside ceremonies to coastal galas, our production team handles logistics, vendor curation, and on-the-ground execution.",
      "You arrive to a finished world. Nothing for you to do except enjoy it.",
    ],
    img: "/src/assets/hero.jpg",
  },
  "floral-decor": {
    name: "Floral & Décor Design",
    tagline: "Living architecture, in bloom.",
    body: [
      "Our floral design studio composes installations, centerpieces, and full-room transformations sourced from seasonal blooms.",
      "Every arrangement is built for the room it lives in — never imported, never standard.",
    ],
    img: "/src/assets/event-3-clean.jpg",
  },
  "event-production": {
    name: "Event Production & Management",
    tagline: "The orchestra you never see — only feel.",
    body: [
      "End-to-end production: vendor coordination, run-of-show, technical direction, hospitality teams, post-event recovery.",
      "When the music swells and the doors open and the timing lands — that's us, working quietly in the background.",
    ],
    img: "/src/assets/event-2-clean.jpg",
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const detail = DETAILS[params.slug];
    if (!detail) throw notFound();
    return { detail };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.detail.name} — Dencyah Events` },
      { name: "description", content: loaderData?.detail.tagline },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { detail } = Route.useLoaderData();
  return (
    <article className="bg-[var(--cream)]">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[var(--espresso)]">
        <img src={detail.img} alt={detail.name} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-14 max-w-[1200px] mx-auto text-[var(--cream)]">
          <span className="h-px w-12 bg-[var(--amber-gold)]" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] mt-5"
          >
            {detail.name}
          </motion.h1>
          <p className="mt-3 text-[var(--champagne)]/85 max-w-lg">{detail.tagline}</p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 max-w-[760px] mx-auto">
        <div className="space-y-6 text-lg leading-relaxed text-[var(--espresso)]/85">
          {detail.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/" hash="contact" className="bg-[var(--amber-gold)] text-[var(--espresso)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] gold-sweep">
            Begin Your Vision
          </Link>
          <Link to="/" className="border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors">
            ← All Services
          </Link>
        </div>
      </section>
    </article>
  );
}
