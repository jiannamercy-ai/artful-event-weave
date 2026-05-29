import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

const STORIES = [
  { quote: "Every detail was poetry — we cried at the cutlery.", name: "Faith & Brian", role: "The Pearl Wedding" },
  { quote: "We launched a product. They launched a feeling.", name: "T. Wanjiru", role: "Director, Tier Capital" },
  { quote: "The room exhaled when the doors opened.", name: "Mrs. Sande", role: "Traditional Wedding · Kakamega" },
  { quote: "A team that listens, then quietly out-performs.", name: "Hon. R. Sichangi", role: "Tongaren Honor Banquet" },
  { quote: "The most beautiful evening any of our guests had attended.", name: "The Achienos", role: "Anniversary Dinner" },
  { quote: "They made our brand feel timeless.", name: "Lumen Co.", role: "Product Launch" },
];

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Stories from our clients — Linchry Events" },
      { name: "description", content: "What our couples and corporate clients say about working with Linchry Events." },
    ],
  }),
  component: All,
});

function All() {
  return (
    <section className="bg-[var(--espresso)] text-[var(--cream)] min-h-dvh pt-32 pb-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)]">Words from our clients</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((s, i) => (
            <article
              key={i}
              className="bg-[var(--espresso-deep)] p-8"
              style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 35%, transparent)" }}
            >
              <p className="font-serif text-xl leading-snug">"{s.quote}"</p>
              <div className="mt-5 flex gap-1">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-[var(--amber-gold)] text-[var(--amber-gold)]" />
                ))}
              </div>
              <p className="mt-5 font-serif text-lg">{s.name}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] mt-1">{s.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
