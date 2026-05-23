import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/ImageUploader";
import { Field } from "./services";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/portfolio")({ component: PortfolioAdmin });

type Item = { id: string; slug: string; name: string; chapter: string | null; story: string | null; image_url: string | null; sort_order: number };

function PortfolioAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data } = await supabase.from("portfolio_items").select("*").order("sort_order");
      return (data ?? []) as Item[];
    },
  });

  const add = async () => {
    const slug = `new-event-${Date.now()}`;
    const { error } = await supabase.from("portfolio_items").insert({ slug, name: "New Event", sort_order: (data?.length ?? 0) + 1 });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-portfolio"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Portfolio</h1>
          <p className="text-sm text-neutral-500 mt-1">Past events shown on the homepage and detail pages.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">
          <Plus className="h-3.5 w-3.5" /> Add event
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {data?.map((s) => <Row key={s.id} item={s} />)}
      </div>
    </div>
  );
}

function Row({ item }: { item: Item }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(item);

  const save = async () => {
    const { error } = await supabase.from("portfolio_items").update({
      slug: form.slug, name: form.name, chapter: form.chapter, story: form.story, image_url: form.image_url, sort_order: form.sort_order,
    }).eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-portfolio"] });
  };

  const del = async () => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-portfolio"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 grid md:grid-cols-[auto_1fr] gap-5">
      <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="portfolio" />
      <div className="space-y-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
          <Field label="Order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
        </div>
        <Field label="Chapter" value={form.chapter ?? ""} onChange={(v) => setForm({ ...form, chapter: v })} />
        <Field label="Story" textarea value={form.story ?? ""} onChange={(v) => setForm({ ...form, story: v })} />
        <div className="flex justify-end gap-2">
          <button onClick={del} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          <button onClick={save} className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">Save</button>
        </div>
      </div>
    </div>
  );
}
