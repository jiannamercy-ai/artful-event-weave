import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/ImageUploader";
import { Field } from "./services";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/team")({ component: TeamAdmin });

type Member = { id: string; name: string; role: string | null; bio: string | null; image_url: string | null; sort_order: number };

function TeamAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*").order("sort_order");
      return (data ?? []) as Member[];
    },
  });

  const add = async () => {
    const { error } = await supabase.from("team_members").insert({ name: "New Member", sort_order: (data?.length ?? 0) + 1 });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-team"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Team</h1>
          <p className="text-sm text-neutral-500 mt-1">The curators displayed on the team page.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">
          <Plus className="h-3.5 w-3.5" /> Add member
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {data?.map((s) => <Row key={s.id} item={s} />)}
      </div>
    </div>
  );
}

function Row({ item }: { item: Member }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(item);

  const save = async () => {
    const { error } = await supabase.from("team_members").update({
      name: form.name, role: form.role, bio: form.bio, image_url: form.image_url, sort_order: form.sort_order,
    }).eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-team"] });
  };

  const del = async () => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    const { error } = await supabase.from("team_members").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-team"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 grid md:grid-cols-[auto_1fr] gap-5">
      <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="team" />
      <div className="space-y-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Role" value={form.role ?? ""} onChange={(v) => setForm({ ...form, role: v })} />
          <Field label="Order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
        </div>
        <Field label="Bio" textarea value={form.bio ?? ""} onChange={(v) => setForm({ ...form, bio: v })} />
        <div className="flex justify-end gap-2">
          <button onClick={del} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          <button onClick={save} className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">Save</button>
        </div>
      </div>
    </div>
  );
}
