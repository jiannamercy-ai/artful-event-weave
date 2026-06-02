import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GoldRule } from "@/components/GoldRule";
import { usePortfolio, usePortfolioCategories } from "@/lib/site";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";

import e1 from "@/assets/event-1-clean.jpg";
import e2 from "@/assets/event-2-clean.jpg";
import e3 from "@/assets/event-3-clean.jpg";
import e4 from "@/assets/event-4-clean.jpg";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

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

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const FALLBACK_PORTFOLIO = [
  { slug: "pearl-wedding", name: "The Pearl Wedding", category: "Weddings", img: e1 },
  { slug: "scarlet-banquet", name: "The Scarlet Banquet", category: "Corporate", img: e2 },
  { slug: "rose-pavilion", name: "The Rose Pavilion", category: "Private", img: e3 },
  { slug: "emerald-affair", name: "The Emerald Affair", category: "Weddings", img: e4 },
  { slug: "amber-evening", name: "The Amber Evening", category: "Corporate", img: heroImg },
  { slug: "executive-gala", name: "The Executive Gala", category: "Private", img: aboutImg },
];

function Portfolio() {
  const { data } = usePortfolio();
  const { data: categories = [] } = usePortfolioCategories();
  const { data: s } = useSiteSettings();
  const email = s?.email || "hello@linchryevents.com";
  const whatsapp = s?.whatsapp || "+254700000000";
  const instagram = s?.instagram || "linchryevents";

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const MotionLink = motion(Link);
  const fallbackImgs = [e1, e2, e3, e4, heroImg, aboutImg];

  const items =
    data && data.length > 0
      ? data.map((p, i) => ({
          slug: p.slug,
          name: p.name,
          category: p.chapter || "Uncategorized",
          img: p.image_url || fallbackImgs[i % fallbackImgs.length],
        }))
      : FALLBACK_PORTFOLIO;

  // Set active category to first one if not set
  const effectiveCategory = activeCategory || categories[0]?.name || null;
  
  const categoryList = [{ name: "All", slug: "all" }, ...categories];

  const filteredItems =
    effectiveCategory === "All" || !effectiveCategory
      ? items
      : items.filter((item) => item.category === effectiveCategory);

  return (
    <div className="pt-20 md:pt-24">
      {/* INTRO */}
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

      {/* PORTFOLIO GRID WITH FILTERS */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          {/* FILTER TABS */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {categoryList.map((category) => (
              <motion.button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                initial={false}
                animate={{
                  backgroundColor: effectiveCategory === category.name
                    ? "var(--amber-gold)" 
                    : "transparent",
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition-colors ${
                  effectiveCategory === category.name
                    ? "border-[var(--amber-gold)] text-[var(--espresso)]"
                    : "border-[var(--cream)] text-[var(--cream)] hover:border-[var(--amber-gold)]"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* GALLERY GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={effectiveCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredItems.map((project, i) => (
                <MotionLink
                  key={project.slug}
                  to={`/portfolio/${project.slug}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
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
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--amber-gold)] mt-2">{project.category}</p>
                    </div>
                  </div>
                </MotionLink>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full rounded-3xl bg-[var(--cream)] p-10 text-center text-[var(--espresso)]">
              No portfolio items available for this category yet.
            </div>
          )}
        </div>
      </section>

      {/* CONTACT + CTA */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <GoldRule />
            <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-[var(--espresso)]">
              Ready to create your
              <br />
              <em className="italic font-light text-[var(--amber-gold)]">exceptional event?</em>
            </h2>
            <p className="mt-6 max-w-md text-[var(--espresso)]/80 leading-relaxed">
              Get inspired by our portfolio, then let's start planning your next unforgettable experience.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-[var(--espresso)]">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a href={emailUrl(email, "Portfolio Inquiry — Linchry Events")} className="thread-link break-all hover:text-[var(--amber-gold)]">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a 
                  href={whatsappUrl(whatsapp, "Hello Linchry Events — I loved your portfolio and would like to discuss my event.")}
                  target="_blank" 
                  rel="noreferrer"
                  className="thread-link hover:text-[var(--amber-gold)]"
                >
                  {whatsapp}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-4">
              {[
                { Icon: Instagram, href: instagramUrl(instagram), label: "Instagram" },
                { Icon: MessageCircle, href: whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to talk."), label: "WhatsApp" },
                { Icon: Mail, href: emailUrl(email, "Portfolio Inquiry — Linchry Events"), label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--amber-gold)] text-[var(--amber-gold)] transition-colors hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/contact"
              className="inline-block gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
            >
              Start Your Inquiry
            </Link>
            <p className="mt-6 text-[var(--taupe)] text-sm leading-relaxed">
              Interested in creating an event? Let's talk about your vision and how we can make it a reality.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
