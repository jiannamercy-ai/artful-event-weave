import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Linchry Events" }, { name: "description", content: "How Linchry Events handles your information." }] }),
  component: () => <Legal title="Privacy Policy" />,
});

export function Legal({ title }: { title: string }) {
  return (
    <section className="bg-[var(--cream)] min-h-dvh pt-32 pb-24 px-6">
      <div className="mx-auto max-w-[760px]">
        <span className="h-px w-12 bg-[var(--amber-gold)] block" />
        <h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3rem)]">{title}</h1>
        <div className="mt-10 space-y-5 text-[var(--espresso)]/85 leading-relaxed">
          <p>We collect only the information you provide directly through our inquiry forms — your name, contact details, and event description. We use this information solely to respond to you and to plan your event if you choose to work with us.</p>
          <p>We do not sell, share, or rent your personal information. Photographs from past events are only published with explicit client permission.</p>
          <p>For any questions about your data, write to <a className="text-[var(--amber-gold)] thread-link" href="mailto:hello@linchryevents.com">hello@linchryevents.com</a>.</p>
        </div>
      </div>
    </section>
  );
}
