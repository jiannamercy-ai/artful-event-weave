import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/services")({ component: ServicesAdmin });

type Service = { id: string; slug: string; name: string; line: string | null; body: string | null; image_url: string | null; sort_order: number };

function ServicesAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order");
      return (data ?? []) as Service[];
    },
  });

  const add = async () => {
    const slug = `new-service-${Date.now()}`;
    const { error } = await supabase.from("services").insert({ slug, name: "New Service", sort_order: (data?.length ?? 0) + 1 });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-services"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Services</h1>
          <p className="text-sm text-neutral-500 mt-1">Each card on the Services section.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">
          <Plus className="h-3.5 w-3.5" /> Add service
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {data?.map((s) => <ServiceRow key={s.id} item={s} />)}
      </div>
    </div>
  );
}

function ServiceRow({ item }: { item: Service }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(item);

  const save = async () => {
    const { error } = await supabase.from("services").update({
      slug: form.slug, name: form.name, line: form.line, body: form.body, image_url: form.image_url, sort_order: form.sort_order,
    }).eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-services"] });
  };

  const del = async () => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    const { error } = await supabase.from("services").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-services"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 grid md:grid-cols-[auto_1fr] gap-5">
      <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="services" />
      <div className="space-y-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
          <Field label="Order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
        </div>
        <Field label="Tagline" value={form.line ?? ""} onChange={(v) => setForm({ ...form, line: v })} />
        <Field label="Body" textarea value={form.body ?? ""} onChange={(v) => setForm({ ...form, body: v })} />
        <div className="flex justify-end gap-2">
          <button onClick={del} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          <button onClick={save} className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">Save</button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, type = "text", textarea = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded border border-neutral-200 px-3 py-2 text-sm" />
      )}
    </label>
  );
}
