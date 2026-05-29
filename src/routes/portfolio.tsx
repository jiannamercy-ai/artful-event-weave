import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoldRule } from "@/components/GoldRule";
import { usePortfolio } from "@/lib/site";

import e1 from "@/assets/event-1-clean.jpg";
import e2 from "@/assets/event-2-clean.jpg";
import e3 from "@/assets/event-3-clean.jpg";
import e4 from "@/assets/event-4-clean.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Linchry Events" },
      {
        name: "description",
        content: "Browse our portfolio of beautifully executed events. Each project reflects our commitment to detail, design, and execution.",
      },
    ],
  }),
  component: Portfolio,
});

const FALLBACK_PORTFOLIO = [
  { slug: "pearl-wedding", name: "The Pearl Wedding", category: "wedding", img: e1 },
  { slug: "scarlet-banquet", name: "The Scarlet Banquet", category: "corporate", img: e2 },
  { slug: "rose-pavilion", name: "The Rose Pavilion", category: "private", img: e3 },
  { slug: "emerald-affair", name: "The Emerald Affair", category: "wedding", img: e4 },
];

function Portfolio() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("All");
  const MotionLink = motion(Link);
  const fallbackImgs = [e1, e2, e3, e4];
  const items =
    data && data.length > 0
      ? data.map((p, i) => ({
          slug: p.slug,
          name: p.name,
          category: p.category || "Uncategorized",
          img: p.image_url || fallbackImgs[i % fallbackImgs.length],
        }))
      : FALLBACK_PORTFOLIO;

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category ?? "Uncategorized"))),
  ];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-20 md:pt-24">
      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldRule />
          <h1 className="mt-8 font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-[var(--espresso)]">
            Our Work
          </h1>
          <p className="mt-6 text-[var(--taupe)] text-lg">
            Each project reflects our commitment to detail, design, and execution.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition-colors ${
                  activeCategory === category
                    ? "border-[var(--amber-gold)] bg-[var(--amber-gold)] text-[var(--espresso)]"
                    : "border-[var(--cream)] bg-[var(--cream)] text-[var(--espresso)]/80 hover:border-[var(--amber-gold)] hover:text-[var(--espresso)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((project, i) => (
              <MotionLink
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: Math.min(i, 7) * 0.08 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
              >
                <img
                  src={project.img}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-xl text-[var(--cream)]">{project.name}</h3>
                  </div>
                </div>
              </MotionLink>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full rounded-3xl bg-[var(--cream)] p-10 text-center text-[var(--espresso)]">
                No portfolio items available for this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-20 md:py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--espresso)]">
            Ready to create your
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">exceptional event?</em>
          </h2>
          <a
            href="/contact"
            className="mt-10 inline-block gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}