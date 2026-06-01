import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";
import { usePortfolio } from "@/lib/site";
import { Mail, MessageCircle, Instagram, ArrowLeft } from "lucide-react";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";

export const Route = createFileRoute("/portfolio/$category")({
  head: (opts) => ({
    meta: [
      { title: `${opts.params.category} Portfolio — Linchry Events` },
      { name: "description", content: `Browse our ${opts.params.category} portfolio.` },
    ],
  }),
  component: PortfolioCategory,
});

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function PortfolioCategory() {
  const { category } = useParams({ from: "/portfolio/$category" });
  const { data: portfolioData } = usePortfolio();
  const { data: settings } = useSiteSettings();

  const email = settings?.email || "hello@linchryevents.com";
  const whatsapp = settings?.whatsapp || "+254700000000";
  const instagram = settings?.instagram || "linchryevents";

  // Normalize category name for comparison (weddings -> Weddings, etc.)
  const normalizedCategory = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const filteredItems = (portfolioData || []).filter(
    (item) => item.chapter?.toLowerCase() === normalizedCategory.toLowerCase()
  );

  const MotionLink = motion(Link);

  return (
    <div className="pt-20 md:pt-24">
      {/* BREADCRUMB */}
      <section className="bg-[var(--cream)] py-6 px-6 border-b border-[var(--taupe)]/10">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[var(--taupe)] hover:text-[var(--espresso)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[var(--cream)] py-16 md:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldRule />
          <h1 className="mt-8 font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-[var(--espresso)]">
            {normalizedCategory}
          </h1>
          <p className="mt-6 text-[var(--taupe)] text-lg">
            A curated collection of our {normalizedCategory.toLowerCase()} events.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl bg-[var(--cream)] p-10 text-center text-[var(--espresso)]">
              <p className="text-lg font-medium">No portfolio items available yet.</p>
              <p className="text-sm text-[var(--taupe)] mt-2">
                Check back soon for {normalizedCategory.toLowerCase()} events.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
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
                      src={project.image_url || ""}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-serif text-xl text-[var(--cream)]">{project.name}</h3>
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--amber-gold)] mt-2">
                          {project.chapter}
                        </p>
                      </div>
                    </div>
                  </MotionLink>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
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
              Let our experience guide your vision. Contact us to discuss your {normalizedCategory.toLowerCase()} event.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-[var(--espresso)]">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a
                  href={emailUrl(email, `${normalizedCategory} Inquiry — Linchry Events`)}
                  className="thread-link break-all hover:text-[var(--amber-gold)]"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a
                  href={whatsappUrl(whatsapp, `Hello Linchry Events — I loved your ${normalizedCategory.toLowerCase()} portfolio.`)}
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
                {
                  Icon: MessageCircle,
                  href: whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to talk."),
                  label: "WhatsApp",
                },
                { Icon: Mail, href: emailUrl(email, `${normalizedCategory} Inquiry — Linchry Events`), label: "Email" },
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
