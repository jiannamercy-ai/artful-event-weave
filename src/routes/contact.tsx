import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GoldRule } from "@/components/GoldRule";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Linchry Events" },
      {
        name: "description",
        content: "Get in touch with Linchry Events. Tell us about your event and we'll guide you through the process.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { data: s } = useSiteSettings();
  const email = s?.email || "hello@linchryevents.com";
  const whatsapp = s?.whatsapp || "+254700000000";
  const instagram = s?.instagram || "linchryevents";

  return (
    <div className="pt-20 md:pt-24">
      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-tight text-[var(--espresso)]">
            Tell us about your event
          </h1>
          <p className="mt-6 text-[var(--taupe)] text-lg">
            We'll guide you through the process and help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16">
          <div>
            <GoldRule />
            <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              Get In Touch
            </h2>
            <p className="mt-6 max-w-md text-[var(--champagne)]/90 leading-relaxed">
              We respond personally — usually within a few hours.
            </p>

            <ul className="mt-12 space-y-4 text-sm text-[var(--champagne)]">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a href={emailUrl(email, "Inquiry — Linchry Events")} className="thread-link break-all hover:text-[var(--amber-gold)]">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a 
                  href={whatsappUrl(whatsapp, "Hello Linchry Events — I'd like to talk about my event.")}
                  target="_blank" 
                  rel="noreferrer"
                  className="thread-link hover:text-[var(--amber-gold)]"
                >
                  {whatsapp}
                </a>
              </li>
            </ul>

            <div className="mt-12 flex gap-4">
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--amber-gold)] text-[var(--amber-gold)] transition-colors hover:bg-[var(--amber-gold)] hover:text-[var(--espresso)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div
            className="relative bg-[var(--cream)] text-[var(--espresso)] p-7 md:p-10 shadow-[0_15px_60px_-25px_rgba(60,42,36,0.35)]"
            style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
          >
            <h3 className="font-serif text-2xl mb-6">Quick Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const { data: s } = useSiteSettings();
  const whatsapp = s?.whatsapp || "+254700000000";
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const event_type = (formData.get("event_type") as string) || "";
    const event_date = (formData.get("event_date") as string) || "";
    const message = formData.get("message") as string;

    const whatsappMessage = `*Event Inquiry from Linchry Events Website*

*Name:* ${name}
${email ? `*Email:* ${email}\n` : ""}${phone ? `*Phone:* ${phone}\n` : ""}${event_type ? `*Event Type:* ${event_type}\n` : ""}${event_date ? `*Event Date:* ${event_date}\n` : ""}
*Message:*
${message}`;

    const url = whatsappUrl(whatsapp, whatsappMessage);
    window.location.href = url;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="border-b border-[var(--taupe)]/20">
        <input
          required
          type="text"
          name="name"
          autoComplete="name"
          maxLength={120}
          placeholder="Your name"
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]"
        />
      </div>
      <div className="border-b border-[var(--taupe)]/20">
        <input
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          placeholder="Email"
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]"
        />
      </div>
      <div className="border-b border-[var(--taupe)]/20">
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={40}
          placeholder="Phone"
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]"
        />
      </div>
      <div className="border-b border-[var(--taupe)]/20">
        <select
          name="event_type"
          autoComplete="off"
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)] text-[var(--espresso)]"
        >
          <option value="">Event Type (optional)</option>
          <option>Wedding</option>
          <option>Corporate Event</option>
          <option>Private Celebration</option>
          <option>Funeral</option>
          <option>Other</option>
        </select>
      </div>
      <div className="border-b border-[var(--taupe)]/20">
        <input
          type="date"
          name="event_date"
          autoComplete="off"
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]"
        />
      </div>
      <div className="border-b border-[var(--taupe)]/20">
        <textarea
          required
          name="message"
          autoComplete="off"
          rows={3}
          maxLength={4000}
          placeholder="Tell us about your event..."
          className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] py-4 text-xs uppercase tracking-[0.24em] mt-2 hover:brightness-95 disabled:opacity-50 transition-opacity"
      >
        {loading ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>
    </form>
  );
}