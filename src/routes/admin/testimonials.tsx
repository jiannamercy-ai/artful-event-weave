import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "./services";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/testimonials")({ component: TestimonialsAdmin });

type T = { id: string; quote: string; name: string; role: string | null; rating: number; sort_order: number };

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("sort_order");
      return (data ?? []) as T[];
    },
  });

  const add = async () => {
    const { error } = await supabase.from("testimonials").insert({ quote: "New quote", name: "Client name", sort_order: (data?.length ?? 0) + 1 });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Testimonials</h1>
          <p className="text-sm text-neutral-500 mt-1">Client quotes shown across the site.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">
          <Plus className="h-3.5 w-3.5" /> Add testimonial
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {data?.map((s) => <Row key={s.id} item={s} />)}
      </div>
    </div>
  );
}

function Row({ item }: { item: T }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(item);

  const save = async () => {
    const { error } = await supabase.from("testimonials").update({
      quote: form.quote, name: form.name, role: form.role, rating: form.rating, sort_order: form.sort_order,
    }).eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
  };

  const del = async () => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 space-y-3">
      <Field label="Quote" textarea value={form.quote} onChange={(v) => setForm({ ...form, quote: v })} />
      <div className="grid sm:grid-cols-4 gap-3">
        <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Role / Context" value={form.role ?? ""} onChange={(v) => setForm({ ...form, role: v })} />
        <Field label="Rating (1-5)" type="number" value={String(form.rating)} onChange={(v) => setForm({ ...form, rating: Number(v) })} />
        <Field label="Order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={del} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
        <button onClick={save} className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">Save</button>
      </div>
    </div>
  );
}
