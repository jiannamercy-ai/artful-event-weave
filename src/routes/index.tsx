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
} from "lucide-react";

import { Intro } from "@/components/Intro";
import { GoldRule } from "@/components/GoldRule";

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
      { title: "Dencyah Events — Where Vision Meets Exquisite Execution" },
      {
        name: "description",
        content:
          "Luxury weddings, corporate galas and private celebrations curated by Dencyah Events. From intimate moments to grand productions — handled, delivered, celebrated.",
      },
      { property: "og:title", content: "Dencyah Events — Where Vision Meets Exquisite Execution" },
      {
        property: "og:description",
        content: "Luxury event design and production across the Western-Nyanza region.",
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
    const played = sessionStorage.getItem("dencyahIntroPlayed");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!played && !reduced) {
      setIntroDone(false);
    }
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("dencyahIntroPlayed", "true");
    setIntroDone(true);
  };

  return (
    <>
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Hero ready={introDone} />
      <CurtainDivider />
      <About />
      <Services />
      <Portfolio />
      <Team />
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
        animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="A luxury tented reception lit by golden candle light"
          className="h-full w-full object-cover animate-breathe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--espresso)]/40 via-[var(--espresso)]/55 to-[var(--espresso)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--espresso)]/70 via-transparent to-[var(--espresso)]/60" />
      </motion.div>

      {/* champagne particles */}
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
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="gold-rule"
        />
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
          animate={ready ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          className="font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.04] mt-6 max-w-4xl"
        >
          Where Vision Meets
          <br />
          <em className="italic font-light text-[var(--amber-gold)]">Exquisite</em> Execution
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 24 }}
          animate={ready ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-7 max-w-xl text-base md:text-lg text-[var(--champagne)]/90 font-light"
        >
          From intimate celebrations to grand galas, we craft moments that linger long after the last guest departs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#portfolio"
            className="gold-sweep border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:brightness-95"
          >
            Begin Your Vision
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 1.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 w-full max-w-3xl"
        >
          {[
            { n: 150, suffix: "+", l: "Events Curated" },
            { n: 50, suffix: "+", l: "Luxury Celebrations" },
            { n: 98, suffix: "%", l: "Client Satisfaction" },
            { n: 8, suffix: "+", l: "Years of Mastery" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col">
              <Counter to={s.n} suffix={s.suffix} active={ready} />
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--champagne)]/70 mt-1">{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-[var(--champagne)]/70"
        >
          {[
            { Icon: Newspaper, t: "Featured in Luxury Events Magazine" },
            { Icon: Award, t: "Member, Intl. Event Society" },
            { Icon: Shield, t: "Fully Insured & Licensed" },
            { Icon: Globe, t: "Available Worldwide" },
          ].map(({ Icon, t }, i) => (
            <span key={i} className="flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-[var(--amber-gold)]" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "", active }: { to: number; suffix?: string; active: boolean }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!active || !inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, active, inView]);
  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl text-[var(--amber-gold)]">
      {n}
      {suffix}
    </span>
  );
}

/* ─────────────────── Curtain divider ─────────────────── */

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

/* ───────────────────────── About ───────────────────────── */

function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={aboutImg}
            alt="A grand banquet hall illuminated by warm chandelier light"
            loading="lazy"
            style={{ y }}
            className="absolute inset-0 h-[110%] w-full object-cover"
          />
          {/* silk cloth reveal */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: "-100%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0 bg-[var(--cream)]"
          />
        </div>

        <div>
          <GoldRule />
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] mt-5">
            Exquisite is not a word.
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">It's our standard.</em>
          </h2>
          <div className="mt-8 space-y-5 text-[var(--espresso)]/85 leading-relaxed">
            <p>
              At Dencyah Events, we don't plan parties. We compose experiences. Every detail — from the weight of the
              cutlery to the angle of the lighting — is considered, refined, and executed with quiet precision.
            </p>
            <p>
              We've learned that true luxury isn't loud. It's the pause between moments. The breath a guest takes when
              they first enter a room. The silence before applause. We design for that silence.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {[
              { Icon: Sparkles, t: "Curated Design" },
              { Icon: CalendarCheck, t: "Precision Planning" },
              { Icon: Target, t: "Seamless Execution" },
              { Icon: Heart, t: "Lasting Impressions" },
            ].map(({ Icon, t }, i) => (
              <li key={i} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-[var(--amber-gold)]" />
                <span className="text-[var(--espresso)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Services ───────────────────────── */

const SERVICES = [
  { slug: "luxury-weddings", name: "Luxury Weddings", line: "The day you remember in still frames.", img: e1 },
  { slug: "corporate-galas", name: "Corporate Galas & Launches", line: "Brand stories, told in a single evening.", img: aboutImg },
  { slug: "private-celebrations", name: "Private Celebrations", line: "Quiet milestones, exquisitely held.", img: e4 },
  { slug: "destination-events", name: "Destination Events", line: "Wherever you imagine — we arrive first.", img: heroImg },
  { slug: "floral-decor", name: "Floral & Décor Design", line: "Living architecture, in bloom.", img: e3 },
  { slug: "event-production", name: "Event Production & Management", line: "The orchestra you never see — only feel.", img: e2 },
];

function Services() {
  return (
    <section id="services" className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Our Suite of Services</h2>
          <p className="mt-4 text-[var(--taupe)] max-w-xl mx-auto">
            Every event type, treated with the same obsession for detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group relative bg-white shadow-[0_8px_30px_-15px_rgba(60,42,36,0.25)] overflow-hidden"
              style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
            >
              {/* card top thread */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.1 }}
                style={{ transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--amber-gold)] z-10"
              />
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-[var(--espresso)]">{s.name}</h3>
                <p className="mt-2 text-sm text-[var(--taupe)]">{s.line}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-5 inline-block thread-link text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)]"
                >
                  Discover More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Portfolio (dark) ─────────────────── */

const PORTFOLIO = [
  { slug: "pearl-wedding", name: "The Pearl Wedding", img: e1 },
  { slug: "scarlet-banquet", name: "The Scarlet Banquet", img: e2 },
  { slug: "rose-pavilion", name: "The Rose Pavilion", img: e3 },
  { slug: "emerald-affair", name: "The Emerald Affair", img: e4 },
  { slug: "amber-evening", name: "The Amber Evening", img: heroImg },
  { slug: "executive-gala", name: "The Executive Gala", img: aboutImg },
];

function Portfolio() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    stripRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };
  return (
    <section id="portfolio" className="relative bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 overflow-hidden">
      {/* particle dissolve top */}
      <div className="absolute -top-px left-0 right-0 h-24 bg-gradient-to-b from-[var(--cream)] to-transparent opacity-10 pointer-events-none" />
      <div className="px-6">
        <div className="mx-auto max-w-[1300px] text-center mb-14">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Curated Experiences</h2>
          <p className="mt-4 text-[var(--champagne)]/70">A glimpse into the rooms we've composed.</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center bg-[var(--amber-gold)] text-[var(--espresso)] rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center bg-[var(--amber-gold)] text-[var(--espresso)] rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={stripRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-16 pb-4"
        >
          {PORTFOLIO.map((p) => (
            <Link
              key={p.slug}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="group relative flex-shrink-0 snap-start w-[80vw] max-w-[400px] h-[460px] md:h-[520px] overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/30 to-transparent" />

              {/* amber border trace */}
              <span className="pointer-events-none absolute inset-2">
                <span className="absolute top-0 left-0 h-px w-0 bg-[var(--amber-gold)] transition-all duration-300 group-hover:w-full" />
                <span className="absolute top-0 right-0 w-px h-0 bg-[var(--amber-gold)] transition-all duration-300 delay-200 group-hover:h-full" />
                <span className="absolute bottom-0 right-0 h-px w-0 bg-[var(--amber-gold)] transition-all duration-300 delay-[400ms] group-hover:w-full" />
                <span className="absolute bottom-0 left-0 w-px h-0 bg-[var(--amber-gold)] transition-all duration-300 delay-[600ms] group-hover:h-full" />
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-[var(--cream)]">{p.name}</h3>
                <span className="mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] thread-link">
                  View Experience →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Team ───────────────────────── */

const TEAM = [
  { name: "Sarah", role: "The Vision Weaver", img: t1 },
  { name: "Michael", role: "The Calm Architect", img: t2 },
  { name: "Amara", role: "The Story Director", img: t3 },
  { name: "Daniel", role: "The Floral Composer", img: t4 },
];

function Team() {
  return (
    <section id="team" className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Meet The Curators</h2>
          <p className="mt-4 text-[var(--taupe)]">The quiet hands behind every detail.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: EASE }}
              className="text-center"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--espresso)]/5">
                <img
                  src={m.img}
                  alt={`${m.name}, ${m.role} at Dencyah Events`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.85)" }}
                />
              </div>
              <h3 className="mt-5 font-serif text-xl text-[var(--espresso)]">{m.name}</h3>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/meet-the-team" className="thread-link text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)]">
            Meet The Full Team →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Testimonials (dark) ─────────────────── */

const TESTIMONIALS = [
  {
    quote: "Every detail was poetry — we cried at the cutlery.",
    rest: "The team turned a year of planning into a single perfect evening. We are still being told it was the most beautiful wedding people had ever attended.",
    name: "Faith & Brian",
    role: "The Pearl Wedding",
  },
  {
    quote: "We launched a product. They launched a feeling.",
    rest: "Our entire executive team noticed the calm — Dencyah held every thread so we could simply be present.",
    name: "T. Wanjiru",
    role: "Director, Tier Capital",
  },
  {
    quote: "The room exhaled when the doors opened.",
    rest: "I had imagined the evening for months. They built exactly that, and somehow more.",
    name: "Mrs. Sande",
    role: "Traditional Wedding · Kakamega",
  },
];

function Testimonials() {
  return (
    <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)]">Words from our clients</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} index={i} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/testimonials" className="thread-link text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)]">
            Read All Stories →
          </Link>
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
      transition={{ duration: 0.8, delay: index * 0.15 }}
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
            transition={{ delay: 0.2 + s * 0.1 }}
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
  const [sent, setSent] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  return (
    <section id="contact" className="bg-[var(--cream)] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-[1100px] grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16">
        <div>
          <span className="gold-rule" />
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Let's create something
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">exquisite</em> together.
          </h2>
          <p className="mt-6 max-w-md text-[var(--espresso)]/80">
            Tell us about the experience you envision. We respond personally — usually within a few hours.
          </p>

          <ul className="mt-10 space-y-3 text-sm text-[var(--espresso)]">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <a href="mailto:hello@dencyahevents.com" className="thread-link">
                hello@dencyahevents.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <a href="tel:+254726765010" className="thread-link">
                0726 765010
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <span>By Appointment Only</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
              <span>Western — Nyanza Region</span>
            </li>
          </ul>
        </div>

        <div
          className="relative bg-white p-7 md:p-10 shadow-[0_15px_60px_-25px_rgba(60,42,36,0.35)] overflow-hidden"
          style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
        >
          {pulsing && (
            <motion.span
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-1/2 bottom-10 -translate-x-1/2 h-24 w-24 rounded-full bg-[var(--amber-gold)]/40 pointer-events-none"
            />
          )}

          {sent ? (
            <div className="py-10 text-center">
              <span className="gold-rule mx-auto block" />
              <h3 className="mt-5 font-serif text-2xl text-[var(--espresso)]">Your vision has been received.</h3>
              <p className="mt-3 text-sm text-[var(--taupe)]">
                We'll respond within 24 hours — usually sooner. We're already excited.
              </p>
              <div className="mt-6 mx-auto h-px w-12 bg-[var(--amber-gold)]" />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPulsing(true);
                setTimeout(() => {
                  setSent(true);
                  setPulsing(false);
                }, 600);
              }}
              className="space-y-5"
            >
              {[
                { name: "name", placeholder: "Your name", type: "text" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "phone", placeholder: "Phone", type: "tel" },
              ].map((f) => (
                <div key={f.name} className="thread-field border-b border-[var(--border)]">
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]"
                  />
                </div>
              ))}

              <div className="thread-field border-b border-[var(--border)]">
                <select required defaultValue="" className="w-full bg-transparent py-3 outline-none text-[var(--taupe)]">
                  <option value="" disabled>
                    Event Type
                  </option>
                  <option>Wedding</option>
                  <option>Corporate Gala</option>
                  <option>Private Celebration</option>
                  <option>Destination Event</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="thread-field border-b border-[var(--border)]">
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the experience you envision..."
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)] resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] py-4 text-xs uppercase tracking-[0.24em] mt-2"
              >
                Begin Your Vision
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
