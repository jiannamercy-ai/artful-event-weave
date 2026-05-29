import { createFileRoute } from "@tanstack/react-router";
import { GoldRule } from "@/components/GoldRule";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";

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
            <form className="space-y-5">
              <div className="border-b border-[var(--taupe)]/20">
                <input 
                  required 
                  type="text" 
                  name="name" 
                  maxLength={120}
                  placeholder="Your name"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" 
                />
              </div>
              <div className="border-b border-[var(--taupe)]/20">
                <input 
                  type="email" 
                  name="email" 
                  maxLength={254}
                  placeholder="Email"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" 
                />
              </div>
              <div className="border-b border-[var(--taupe)]/20">
                <input 
                  type="tel" 
                  name="phone" 
                  maxLength={40}
                  placeholder="Phone"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)]" 
                />
              </div>
              <div className="border-b border-[var(--taupe)]/20">
                <textarea 
                  required 
                  name="message" 
                  rows={3}
                  maxLength={4000}
                  placeholder="Tell us about your event..."
                  className="w-full bg-transparent py-3 outline-none placeholder:text-[var(--taupe)] resize-none" 
                />
              </div>
              <button
                type="submit"
                className="w-full gold-sweep bg-[var(--amber-gold)] text-[var(--espresso)] py-4 text-xs uppercase tracking-[0.24em] mt-2 hover:brightness-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}}