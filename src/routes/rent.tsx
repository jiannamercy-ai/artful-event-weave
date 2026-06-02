import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendHireRequestEmail } from "@/lib/email.server";
import { GoldRule } from "@/components/GoldRule";
import { useSiteSettings, emailUrl, whatsappUrl, instagramUrl } from "@/lib/site";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent Items — Linchry Events" },
      {
        name: "description",
        content: "Rent premium event items including catering equipment, event furniture, and professional lighting.",
      },
    ],
  }),
  component: RentPage,
});

type RentalItem = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  sort_order: number;
};

function RentPage() {
  const { data: s } = useSiteSettings();
  const email = s?.email || "hello@linchryevents.com";
  const whatsapp = s?.whatsapp || "+254700000000";
  const instagram = s?.instagram || "linchryevents";

  const { data: items = [] } = useQuery({
    queryKey: ["rental-items-public"],
    queryFn: async () => {
      const { data } = await supabase.from("rental_items").select("*").order("sort_order");
      return (data ?? []) as RentalItem[];
    },
  });

  const categories = Array.from(new Set(items.map((i) => i.category))).sort();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || "");

  const filteredItems =
    selectedCategory === "" ? items : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="pt-20 md:pt-24">
      {/* HERO */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <GoldRule />
          <h1 className="mt-8 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
            Premium Event
            <br />
            <em className="italic font-light text-[var(--amber-gold)]">Equipment Rentals</em>
          </h1>
          <p className="mt-6 max-w-md text-[var(--champagne)]/90 leading-relaxed">
            Everything you need for a flawlessly executed event. From catering to lighting, we supply the finest.
          </p>
        </div>
      </section>

      {/* ITEMS GRID */}
      <section className="bg-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-[var(--espresso)] mb-8">Available Items</h2>

            {/* CATEGORY FILTER */}
            {categories.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-5 py-2 text-sm uppercase tracking-[0.18em] transition-all ${
                      selectedCategory === cat
                        ? "bg-[var(--amber-gold)] text-[var(--espresso)]"
                        : "border border-neutral-300 text-neutral-700 hover:border-[var(--amber-gold)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ITEMS GRID */}
          {filteredItems.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
              <p className="text-neutral-500">No rental items available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {item.image_url ? (
                    <div className="h-48 w-full bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-neutral-100 flex items-center justify-center">
                      <p className="text-neutral-400 text-sm">No image</p>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-medium text-[var(--espresso)]">{item.name}</h3>
                    <p className="text-xs text-[var(--amber-gold)] uppercase tracking-[0.15em] mt-1">
                      {item.category}
                    </p>
                    {item.description && (
                      <p className="text-sm text-neutral-600 mt-3">{item.description}</p>
                    )}
                    <p className="mt-4 font-serif text-lg text-[var(--espresso)]">{item.price}</p>
                    <button
                      onClick={() => {
                        const form = document.getElementById("hire-form") as HTMLFormElement;
                        if (form) {
                          const itemsField = form.querySelector("textarea[name='items_interested']") as HTMLTextAreaElement;
                          if (itemsField) {
                            const current = itemsField.value.trim();
                            itemsField.value = current ? `${current}, ${item.name}` : item.name;
                            form.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                      className="mt-4 w-full bg-[var(--amber-gold)] text-[var(--espresso)] px-4 py-2 rounded text-sm uppercase tracking-[0.18em] hover:bg-[var(--amber-gold)]/90 transition-colors"
                    >
                      Hire This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HIRE REQUEST FORM */}
      <section className="bg-[var(--espresso)] text-[var(--cream)] py-24 md:py-32 px-6">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16">
          <div>
            <GoldRule />
            <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              Ready to Hire?
            </h2>
            <p className="mt-6 max-w-md text-[var(--champagne)]/90 leading-relaxed">
              Submit a hire request and we'll confirm availability and provide a detailed quote.
            </p>

            <ul className="mt-12 space-y-4 text-sm text-[var(--champagne)]">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a href={emailUrl(email, "Rental Inquiry")} className="thread-link break-all hover:text-[var(--amber-gold)]">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-gold)]" />
                <a 
                  href={whatsappUrl(whatsapp, "Hello — I'd like to hire some items")}
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
                { Icon: MessageCircle, href: whatsappUrl(whatsapp, "Hello Linchry Events"), label: "WhatsApp" },
                { Icon: Mail, href: emailUrl(email, "Rental Inquiry"), label: "Email" },
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

          <HireRequestForm />
        </div>
      </section>
    </div>
  );
}

function HireRequestForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await sendHireRequestEmail({
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        event_date: (formData.get("event_date") as string) || undefined,
        items_interested: (formData.get("items_interested") as string) || undefined,
        notes: (formData.get("notes") as string) || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-[var(--cream)] text-[var(--espresso)] p-7 md:p-10 shadow-[0_15px_60px_-25px_rgba(60,42,36,0.35)]"
      style={{ border: "1px solid color-mix(in oklab, var(--amber-gold) 40%, transparent)" }}
    >
      <h3 className="font-serif text-2xl mb-6">Hire Request</h3>

      {submitted && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 text-sm font-medium">
            ✓ Request received! We'll be in touch within 24 hours.
          </p>
        </div>
      )}

      <form id="hire-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="border-b border-[var(--taupe)]/20">
          <input
            required
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none"
          />
        </div>

        <div className="border-b border-[var(--taupe)]/20">
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none"
          />
        </div>

        <div className="border-b border-[var(--taupe)]/20">
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none"
          />
        </div>

        <div className="border-b border-[var(--taupe)]/20">
          <input
            type="date"
            name="event_date"
            placeholder="Event date"
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none"
          />
        </div>

        <div className="border-b border-[var(--taupe)]/20">
          <textarea
            name="items_interested"
            placeholder="Items you're interested in..."
            rows={3}
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none resize-none"
          />
        </div>

        <div className="border-b border-[var(--taupe)]/20">
          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            rows={3}
            className="w-full bg-transparent py-3 text-[var(--espresso)] placeholder-[var(--taupe)]/60 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--amber-gold)] text-[var(--espresso)] py-3 rounded text-sm uppercase tracking-[0.22em] font-medium hover:bg-[var(--amber-gold)]/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
