import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Linchry Events" },
      {
        name: "description",
        content: "Explore our comprehensive event services: production, design, tent solutions, and premium rentals.",
      },
    ],
  }),
  component: Services,
});

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const SERVICES = [
  {
    title: "Event Production",
    description: "We handle the technical and structural elements of your event.",
    includes: [
      "Stage setup",
      "Lighting and ambiance",
      "Backdrops and installations",
      "Technical coordination",
    ],
  },
  {
    title: "Event Design & Styling",
    description: "We create visually cohesive environments that reflect your theme and vision.",
    includes: [
      "Concept development",
      "Floral styling",
      "Table and space design",
      "Decorative installations",
    ],
  },
  {
    title: "Tent & Infrastructure Solutions",
    description: "We provide high-quality tenting and spatial design solutions.",
    includes: [
      "Miluxe tents",
      "Pagoda tents",
      "Draping and interior finishes",
      "Layout planning",
      "Custom structures",
    ],
  },
  {
    title: "Premium Event Rentals",
    description: "Our inventory supports both aesthetics and function.",
    includes: [
      "Chairs (Chiavari, Luxe styles)",
      "Tables and linen",
      "Decor accessories",
      "Lounge setups",
    ],
  },
];

const PROCESS = [
  "Inquiry & Consultation",
  "Concept Development",
  "Proposal & Refinement",
  "Execution & Setup",
  "Event Delivery",
];

function Services() {
  const { data: s } = useSiteSettings();
  const email = s?.email || "hello@linchryevents.com";
  const whatsapp = s?.whatsapp || "+254700000000";
  const instagram = s?.instagram || "linchryevents";

  return (
    <div className="pt-20 md:pt-24">
      {/* INTRO */}
      <section className="bg-[var(--cream)] py-16 md:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-[var(--espresso)]">
            Our Services
          </h1>
          <p className="mt-6 text-[var(--taupe)] text-lg leading-relaxed">
            Our services are designed to provide a complete, stress-free event experience — from concept to execution.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS - TEXT ONLY, NO IMAGES */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-12">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-[var(--espresso-deep)] p-10 md:p-12"
                style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 35%, transparent)" }}
              >
                <h2 className="font-serif text-3xl md:text-4xl">{service.title}</h2>
                <p className="mt-4 text-[var(--champagne)]/90 leading-relaxed text-lg max-w-2xl">
                  {service.description}
                </p>
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] mb-4">Includes:</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[var(--champagne)]/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <GoldRule />
            <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] text-[var(--espresso)]">Our Process</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            {PROCESS.map((step, i) => (
              <div key={i} className="flex-1 text-center md:relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="mb-4"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--amber-gold)] text-[var(--espresso)] font-serif text-lg font-semibold">
                    {i + 1}
                  </div>
                </motion.div>
                <h3 className="font-serif text-xl text-[var(--espresso)]">{step}</h3>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc((100%-48px)/2)] h-px bg-[var(--amber-gold)]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + CTA */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <GoldRule />
            <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              Let's plan your event
              <br />
              <em className="italic font-light text-[var(--amber-gold)]">the right way.</em>
            </h2>
            <p className="mt-6 max-w-md text-[var(--champagne)]/90 leading-relaxed">
              Tell us which services interest you and we'll create a custom proposal for your vision.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-[var(--champagne)]">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a href={emailUrl(email, "Service Inquiry — Linchry Events")} className="thread-link break-all hover:text-[var(--amber-gold)]">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a 
                  href={whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to know more about your services.")}
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
                { Icon: Mail, href: emailUrl(email, "Service Inquiry — Linchry Events"), label: "Email" },
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
              Request a Proposal
            </Link>
            <p className="mt-6 text-[var(--champagne)]/90 text-sm leading-relaxed">
              Our team will review your requirements and get back to you with a customized proposal within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
