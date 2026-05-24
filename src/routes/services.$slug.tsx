import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import e1 from "@/assets/event-1-clean.jpg";
import e2 from "@/assets/event-2-clean.jpg";
import e3 from "@/assets/event-3-clean.jpg";
import e4 from "@/assets/event-4-clean.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

const FALLBACK: Record<string, { name: string; tagline: string; body: string[]; img: string }> = {
  "luxury-weddings": { name: "Luxury Weddings", tagline: "The day you remember in still frames.", body: ["From the first dress fitting to the last sparkler send-off, we hold every thread so the two of you can simply be present.","Our weddings are remembered for their pace — never rushed, never thin."], img: e1 },
  "corporate-galas": { name: "Corporate Galas & Launches", tagline: "Brand stories, told in a single evening.", body: ["We produce galas, brand launches, and executive dinners that feel as considered as the strategy behind them."], img: about },
  "private-celebrations": { name: "Private Celebrations", tagline: "Quiet milestones, exquisitely held.", body: ["Birthdays, anniversaries, family gatherings designed with the same precision we bring to our largest galas."], img: e4 },
  "destination-events": { name: "Destination Events", tagline: "Wherever you imagine — we arrive first.", body: ["From lakeside ceremonies to coastal galas, our production team handles logistics and on-the-ground execution."], img: hero },
  "floral-decor": { name: "Floral & Décor Design", tagline: "Living architecture, in bloom.", body: ["Our floral studio composes installations, centerpieces, and full-room transformations from seasonal blooms."], img: e3 },
  "event-production": { name: "Event Production & Management", tagline: "The orchestra you never see — only feel.", body: ["End-to-end production: vendor coordination, run-of-show, technical direction, hospitality teams."], img: e2 },
};

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["service-item", slug],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
  });

  const fallback = FALLBACK[slug];
  if (isLoading && !fallback) return <div className="min-h-dvh bg-[var(--cream)]" />;
  if (!data && !fallback) throw notFound();

  const detail = data
    ? {
        name: data.name,
        tagline: data.line ?? "",
        bodyText: data.body ?? "",
        img: data.image_url || fallback?.img || hero,
      }
    : { name: fallback!.name, tagline: fallback!.tagline, bodyText: fallback!.body.join("\n\n"), img: fallback!.img };

  return (
    <article className="bg-[var(--cream)]">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[var(--espresso)]">
        <img src={detail.img} alt={detail.name} decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70" />
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
        <div className="space-y-6 text-lg leading-relaxed text-[var(--espresso)]/85 whitespace-pre-line">
          {detail.bodyText}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <a href="/#contact" className="bg-[var(--amber-gold)] text-[var(--espresso)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] gold-sweep">
            Begin Your Vision
          </a>
          <Link to="/" className="border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors">
            ← All Services
          </Link>
        </div>
      </section>
    </article>
  );
}
