import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import e1 from "@/assets/event-1-clean.jpg";
import e2 from "@/assets/event-2-clean.jpg";
import e3 from "@/assets/event-3-clean.jpg";
import e4 from "@/assets/event-4-clean.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

const FALLBACK: Record<string, { name: string; chapter: string; story: string; img: string }> = {
  "pearl-wedding": { name: "The Pearl Wedding", chapter: "A traditional celebration.", story: "A two-day celebration honoring family lineage, set under leopard-print drapes and an amber-lit altar.", img: e1 },
  "scarlet-banquet": { name: "The Scarlet Banquet", chapter: "A chief's honor.", story: "Tongaren, in honor of Rtd. Senior Chief Richard Sichangi. Crimson chairs, white linen, gold detail.", img: e2 },
  "rose-pavilion": { name: "The Rose Pavilion", chapter: "A wedding in roses.", story: "Tall crystal centerpieces overflowing with red roses — a single shade carried through every detail.", img: e3 },
  "emerald-affair": { name: "The Emerald Affair", chapter: "A statement in quiet luxury.", story: "Emerald velvet and brushed gold, set on rolling green lawns in Kakamega County.", img: e4 },
  "amber-evening": { name: "The Amber Evening", chapter: "A reception under canvas.", story: "Golden-hour reception under draped tents, candlelit tablescapes, an entirely amber world.", img: hero },
  "executive-gala": { name: "The Executive Gala", chapter: "A boardroom, transformed.", story: "A grand banquet hall hung with bronze chandeliers — corporate celebration with the cadence of a state dinner.", img: about },
};

export const Route = createFileRoute("/portfolio/$slug")({
  component: PortfolioDetail,
});

function PortfolioDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-item", slug],
    queryFn: async () => {
      const { data } = await supabase.from("portfolio_items").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
  });

  const fallback = FALLBACK[slug];
  if (isLoading && !fallback) return <div className="min-h-dvh bg-[var(--espresso)]" />;
  if (!data && !fallback) throw notFound();

  const item = data
    ? {
        name: data.name,
        chapter: data.chapter ?? "",
        story: data.story ?? "",
        img: data.image_url || fallback?.img || hero,
      }
    : fallback!;

  return (
    <article className="bg-[var(--espresso)] text-[var(--cream)] min-h-dvh">
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <img src={item.img} alt={item.name} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/30 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-14 max-w-[1200px] mx-auto">
          <span className="h-px w-12 bg-[var(--amber-gold)]" />
          {item.chapter && <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[var(--amber-gold)]">{item.chapter}</p>}
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] mt-3">{item.name}</h1>
        </div>
      </section>
      <section className="px-6 py-20 max-w-[760px] mx-auto">
        <p className="text-lg leading-relaxed text-[var(--champagne)]/85 whitespace-pre-line">{item.story}</p>
        <div className="mt-12">
          <Link to="/" className="border border-[var(--amber-gold)] text-[var(--amber-gold)] px-7 py-3.5 text-xs uppercase tracking-[0.24em] inline-block hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)] transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </article>
  );
}
