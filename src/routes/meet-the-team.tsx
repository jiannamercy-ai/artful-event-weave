import { createFileRoute } from "@tanstack/react-router";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";

const TEAM = [
  { name: "Sarah Adongo", role: "The Vision Weaver", bio: "Creative director. Believes the room should exhale before the guests do.", img: t1 },
  { name: "Michael Otieno", role: "The Calm Architect", bio: "Operations. Holds the timeline so no one else has to.", img: t2 },
  { name: "Amara Wekesa", role: "The Story Director", bio: "Design lead. Composes the visual rhythm of every event.", img: t3 },
  { name: "Daniel Sande", role: "The Floral Composer", bio: "Floral atelier lead. Twenty years of working with seasonal blooms.", img: t4 },
];

export const Route = createFileRoute("/meet-the-team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — Dencyah Events" },
      { name: "description", content: "The curators behind every Dencyah experience." },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <section className="bg-[var(--cream)] min-h-dvh pt-32 pb-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <span className="block mx-auto h-px w-12 bg-[var(--amber-gold)] mb-5" />
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)]">Meet The Curators</h1>
          <p className="mt-4 text-[var(--taupe)] max-w-xl mx-auto">A small team. A very specific way of working.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((m) => (
            <div key={m.name}>
              <div className="aspect-[4/5] overflow-hidden bg-[var(--espresso)]/5">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover" style={{ filter: "saturate(0.85)" }} />
              </div>
              <h2 className="mt-5 font-serif text-xl">{m.name}</h2>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--amber-gold)] mt-1">{m.role}</p>
              <p className="mt-3 text-sm text-[var(--taupe)] leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
