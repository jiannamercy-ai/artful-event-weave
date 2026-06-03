import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Sparkles,
  CalendarCheck,
  Target,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  Globe,
  Newspaper,
  Instagram,
  MessageCircle,
  Mail,
} from "lucide-react";

import { Intro } from "@/components/Intro";
import { GoldRule } from "@/components/GoldRule";
import {
  useServices,
  usePortfolio,
  useTeam,
  useTestimonials,
  useSiteSettings,
  instagramUrl,
  whatsappUrl,
  emailUrl,
} from "@/lib/site";
import { toast } from "sonner";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import e1 from "@/assets/event-1-clean.jpg";
import e2 from "@/assets/event-2-clean.jpg";
import e3 from "@/assets/event-3-clean.jpg";
import e4 from "@/assets/event-4-clean.jpg";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linchry Events — Design & Delivery of Exceptional Events" },
      {
        name: "description",
        content:
          "From luxury weddings to high-level corporate experiences, Linchry Events transforms spaces into unforgettable environments. Precision, elegance, seamless execution.",
      },
      { property: "og:title", content: "Linchry Events — Design & Delivery of Exceptional Events" },
      {
        property: "og:description",
        content: "We design and deliver exceptional events that feel effortless.",
      },
    ],
  }),
  component: Home,
});

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function Home() {
  const [introDone, setIntroDone] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const played = sessionStorage.getItem("linchryIntroPlayed");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!played && !reduced) {
      setIntroDone(false);
    }
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("linchryIntroPlayed", "true");
    setIntroDone(true);
  };

  return (
    <>
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Hero ready={introDone} />
      <BrandStrip />
      <CurtainDivider />
      <Services />
      <FeaturedWork />
      <About />
      <CorporateWeddingSplit />
      <Testimonials />
      <Contact />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-dvh w-full overflow-hidden bg-[var(--espresso)] text-[var(--cream)]"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="A luxury tented reception lit by golden candle light"
          decoding="async"
          className="h-full w-full object-cover animate-breathe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--espresso)]/40 via-[var(--espresso)]/55 to-[var(--espresso)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--espresso)]/70 via-transparent to-[var(--espresso)]/60" />
      </motion.div>

      {ready &&
        Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-[var(--amber-gold)]/70"
            style={
              {
                left: `${Math.random() * 100}%`,
                bottom: "-10px",
                "--drift-x": `${(Math.random() - 0.5) * 60}px`,
                animation: `drift-up ${8 + Math.random() * 8}s linear ${Math.random() * 6}s infinite`,
              } as React.CSSProperties
            }
          />
        ))}

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1300px] flex-col items-start justify-center px-6 md:px-14 pt-32 pb-28">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.05 }}
          className="gold-rule"
        />
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.04] mt-6 max-w-4xl"
        >
          We Design & Deliver
          <br />
          <em className="italic font-light text-[var(--amber-gold)]">Exceptional Events</em> That Feel Effortless
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 24 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-7 max-w-xl text-base md:text-lg text-[var(--champagne)]/90 font-light"
        >
          From luxury weddings to high-level corporate experiences, Linchry Events transforms spaces into unforgettable environments — with precision, elegance, and seamless execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#portfolio"
            className="gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Brand Positioning Strip ───────────────────────── */

function BrandStrip() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-20 px-6 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-[var(--espresso)]">
          Not just decor. Not just rentals.
          <br />
          <em className="italic font-light text-[var(--amber-gold)]">We create complete event experiences.</em>
        </h2>
      </div>
    </section>
  );
}

function CurtainDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const w = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  return (
    <div ref={ref} className="relative h-16 bg-[var(--cream)]">
      <motion.div
        style={{ width: w, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-[var(--amber-gold)]"
      />
    </div>
  );
}

/* ───────────────────────── Services ───────────────────────── */

const FALLBACK_SERVICES = [
  { 
    slug: "event-production", 
    name: "Event Production", 
    line: "We handle the technical and structural elements of your event.",
    image_url: null as string | null, 
    img: e1 
  },
  { 
    slug: "event-design-styling", 
    name: "Event Design & Styling", 
    line: "We create visually cohesive environments that reflect your theme and vision.",
    image_url: null, 
    img: e2 
  },
  { 
    slug: "tent-infrastructure", 
    name: "Tent & Infrastructure Solutions", 
    line: "High-quality tenting and spatial design solutions for any event.",
    image_url: null, 
    img: e3 
  },
  { 
    slug: "premium-rentals", 
    name: "Premium Event Rentals", 
    line: "Our inventory supports both aesthetics and function.",
    image_url: null, 
    img: e4 
  },
];

function Services() {
  const { data } = useServices();
  const fallbackImgs = [e1, e2, e3, e4];
  const items =
    data && data.length > 0
      ? data.map((s, i) => ({
          slug: s.slug,
          name: s.name,
          line: s.line ?? "",
          img: s.image_url || fallbackImgs[i % fallbackImgs.length],
        }))
      : FALLBACK_SERVICES.map((s) => ({ slug: s.slug, name: s.name, line: s.line, img: s.img }));

  return (
    <section id="services" className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">What We Do</h2>
          <p className="mt-4 text-[var(--taupe)] max-w-xl mx-auto">
            We provide end-to-end event solutions tailored to your vision, your guests, and your standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: Math.min(i, 3) * 0.1, ease: EASE }}
              className="group relative bg-white shadow-[0_8px_30px_-15px_rgba(60,42,36,0.25)] overflow-hidden"
              style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.1 + 0.1 }}
                style={{ transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber-gold)] z-10"
              />
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-lg text-[var(--espresso)]">{s.name}</h3>
                <p className="mt-2 text-sm text-[var(--taupe)]">{s.line}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-5 inline-block thread-link text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)]"
                >
                  Learn More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#explore-services"
            className="inline-block gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Featured Work ───────────────────────── */

const FALLBACK_PORTFOLIO = [
  { slug: "pearl-wedding", name: "The Pearl Wedding", img: e1 },
  { slug: "scarlet-banquet", name: "The Scarlet Banquet", img: e2 },
  { slug: "rose-pavilion", name: "The Rose Pavilion", img: e3 },
  { slug: "emerald-affair", name: "The Emerald Affair", img: e4 },
  { slug: "amber-evening", name: "The Amber Evening", img: heroImg },
  { slug: "executive-gala", name: "The Executive Gala", img: aboutImg },
];

function FeaturedWork() {
  const { data } = usePortfolio();
  const fallbackImgs = [e1, e2, e3, e4, heroImg, aboutImg];
  const items =
    data && data.length > 0
      ? data.map((p, i) => ({
          slug: p.slug,
          name: p.name,
          img: p.image_url || fallbackImgs[i % fallbackImgs.length],
        }))
      : FALLBACK_PORTFOLIO;

  const stripRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="portfolio" className="relative bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Selected Experiences</h2>
          <p className="mt-4 text-[var(--taupe)]">A glimpse into the environments we've designed and executed.</p>
        </div>

        <div className="relative">
          <div
            ref={stripRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((p) => (
              <Link
                key={p.slug}
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className="group relative overflow-hidden aspect-[4/5]"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/30 to-transparent" />
                <span className="pointer-events-none absolute inset-2">
                  <span className="absolute top-0 left-0 h-px w-0 bg-[var(--amber-gold)] transition-all duration-300 group-hover:w-full" />
                  <span className="absolute top-0 right-0 w-px h-0 bg-[var(--amber-gold)] transition-all duration-300 delay-200 group-hover:h-full" />
                  <span className="absolute bottom-0 right-0 h-px w-0 bg-[var(--amber-gold)] transition-all duration-300 delay-[400ms] group-hover:w-full" />
                  <span className="absolute bottom-0 left-0 w-px h-0 bg-[var(--amber-gold)] transition-all duration-300 delay-[600ms] group-hover:h-full" />
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-[var(--cream)]">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-block gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-8 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
          >
            View Full Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── About / Why Linchry ───────────────────────── */

function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
          <motion.img
            src={aboutImg}
            alt="A grand banquet hall illuminated by warm chandelier light"
            loading="lazy"
            decoding="async"
            style={{ y }}
            className="absolute inset-0 h-[110%] w-full object-cover"
          />
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: "-100%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0 bg-[var(--espresso)]"
          />
        </div>

        <div className="order-1 md:order-2">
          <GoldRule />
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] mt-5">
            Why Clients Choose
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">Linchry</em>
          </h2>
          <ul className="mt-8 space-y-5 text-[var(--champagne)]/90 leading-relaxed">
            {[
              "Structured planning and execution",
              "Attention to detail at every level",
              "Reliable, professional team",
              "Ability to deliver both intimate and large-scale events",
              "Clean, elegant design approach",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-[var(--amber-gold)] mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Corporate + Wedding Split ───────────────────────── */

function CorporateWeddingSplit() {
  return (
    <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid md:grid-cols-2 gap-12 md:gap-10">
          {/* Corporate Events */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-12 shadow-[0_8px_30px_-15px_rgba(60,42,36,0.25)]"
            style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
          >
            <h3 className="font-serif text-3xl text-[var(--espresso)]">Corporate Events</h3>
            <p className="mt-4 text-[var(--taupe)] leading-relaxed">
              Precision-driven execution for brands, organizations, and institutions.
            </p>
            <Link
              to="/corporate"
              className="mt-8 inline-block gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
            >
              Explore Corporate Events
            </Link>
          </motion.article>

          {/* Weddings */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white p-10 md:p-12 shadow-[0_8px_30px_-15px_rgba(60,42,36,0.25)]"
            style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
          >
            <h3 className="font-serif text-3xl text-[var(--espresso)]">Weddings & Private Events</h3>
            <p className="mt-4 text-[var(--taupe)] leading-relaxed">
              Beautifully designed celebrations tailored to your story.
            </p>
            <Link
              to="/weddings"
              className="mt-8 inline-block gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
            >
              Explore Weddings
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

const FALLBACK_TESTIMONIALS = [
  {
    quote: "Mileyn didn't just decorate — they transformed the entire experience.",
    rest: "",
    name: "Client Name",
    role: "Event Type",
  },
  {
    quote: "Professional, organized, and executed flawlessly.",
    rest: "",
    name: "Another Client",
    role: "Event Type",
  },
];

function splitQuote(q: string) {
  const parts = q.split(/(?<=[.!?])\s+/);
  const first = parts[0] || q;
  const rest = parts.slice(1).join(" ");
  return { first, rest };
}

function Testimonials() {
  const { data } = useTestimonials();
  const items =
    data && data.length > 0
      ? data.slice(0, 3).map((t) => {
          const { first, rest } = splitQuote(t.quote);
          return { quote: first, rest, name: t.name, role: t.role ?? "" };
        })
      : FALLBACK_TESTIMONIALS;

  return (
    <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Testimonials</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  rest,
  name,
  role,
  index,
}: {
  quote: string;
  rest: string;
  name: string;
  role: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [typed, setTyped] = useState("");
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(quote.slice(0, i));
      if (i >= quote.length) {
        clearInterval(id);
        setTimeout(() => setShowRest(true), 200);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, quote]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: Math.min(index, 2) * 0.12 }}
      className="bg-[var(--espresso-deep)] p-8 md:p-10"
      style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 35%, transparent)" }}
    >
      <p className="font-serif text-xl md:text-[22px] leading-snug text-[var(--cream)] min-h-[3em]">
        "{typed}
        <span className={`${inView && typed.length < quote.length ? "opacity-100" : "opacity-0"} text-[var(--amber-gold)]`}>
          |
        </span>
        "
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={showRest ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="mt-4 text-sm text-[var(--champagne)]/80 leading-relaxed"
      >
        {rest}
      </motion.p>

      <div className="mt-6 flex gap-1">
        {[0, 1, 2, 3, 4].map((s) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={showRest ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.05 + s * 0.1 }}
          >
            <Star className="h-3.5 w-3.5 fill-[var(--amber-gold)] text-[var(--amber-gold)]" />
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={showRest ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6"
      >
        <p className="font-serif text-lg text-[var(--cream)]">{name}</p>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] mt-1">{role}</p>
      </motion.div>
    </motion.article>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

function Contact() {
  const { data: s } = useSiteSettings();
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim() || "";
    const phone = String(fd.get("phone") || "").trim() || "";
    const event_type = String(fd.get("event_type") || "").trim() || "";
    const message = String(fd.get("message") || "").trim();

    if (!name || !message) {
      toast.error("Please fill in your name and a short message.");
      return;
    }
    setBusy(true);

    const whatsapp_num = s?.whatsapp || "+254700000000";
    const whatsappMessage = `*Event Proposal Request from Linchry Events Website*

*Name:* ${name}
${email ? `*Email:* ${email}\n` : ""}${phone ? `*Phone:* ${phone}\n` : ""}${event_type ? `*Event Type:* ${event_type}\n` : ""}
*Message:*
${message}`;

    const url = whatsappUrl(whatsapp_num, whatsappMessage);
    window.location.href = url;
  };

  const email = s?.email || "hello@linchryevents.com";
  const whatsapp = s?.whatsapp || "+254700000000";
  const instagram = s?.instagram || "linchryevents";

  return (
    <section id="contact" className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1100px] grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16">
        <div>
          <span className="gold-rule" />
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Let's Create Something
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">Exceptional</em>
          </h2>
          <p className="mt-6 max-w-md text-[var(--espresso)]/80">
            Tell us about your event and we'll guide you through the process.
          </p>

          <ul className="mt-10 space-y-3 text-sm text-[var(--espresso)]">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <a href={emailUrl(email, "Inquiry — Linchry Events")} className="thread-link break-all">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <a href={whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to talk.")} target="_blank" rel="noreferrer" className="thread-link">
                {whatsapp}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex gap-3">
            {[
              { Icon: Instagram, href: instagramUrl(instagram), label: "Instagram" },
              { Icon: MessageCircle, href: whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to talk."), label: "WhatsApp" },
              { Icon: Mail, href: emailUrl(email, "Inquiry — Linchry Events"), label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--amber-gold)] text-[var(--amber-gold)] transition-colors hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div
          className="relative bg-white p-7 md:p-10 shadow-[0_15px_60px_-25px_rgba(60,42,36,0.35)] overflow-hidden"
          style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
        >
          {!sent ? (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="thread-field border-b border-[var(--border)]">
                <input required type="text" name="name" maxLength={120} placeholder="Your name"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" />
              </div>
              <div className="thread-field border-b border-[var(--border)]">
                <input type="email" name="email" maxLength={254} placeholder="Email"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" />
              </div>
              <div className="thread-field border-b border-[var(--border)]">
                <input type="tel" name="phone" maxLength={40} placeholder="Phone"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" />
              </div>

              <div className="thread-field border-b border-[var(--border)]">
                <select name="event_type" defaultValue="" className="w-full bg-transparent py-3 outline-none text-[var(--taupe)]">
                  <option value="" disabled>Event Type</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Private Celebration</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="thread-field border-b border-[var(--border)]">
                <textarea required name="message" rows={3} maxLength={4000}
                  placeholder="Tell us about your event..."
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)] resize-none" />
              </div>

              <motion.button
                type="submit"
                disabled={busy}
                whileTap={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] py-4 text-xs uppercase tracking-[0.24em] mt-2 disabled:opacity-60"
              >
                {busy ? "Opening WhatsApp…" : "Send via WhatsApp"}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
