import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "./services";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesAdmin,
});

type Category = { id: string; name: string; slug: string; sort_order: number };

function CategoriesAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("portfolio_categories").select("*").order("sort_order");
      return (data ?? []) as Category[];
    },
  });

  const add = async () => {
    const slug = `new-category-${Date.now()}`.toLowerCase().replace(/\s+/g, "-");
    const { error } = await supabase.from("portfolio_categories").insert({ 
      name: "New Category", 
      slug: slug,
      sort_order: (data?.length ?? 0) + 1 
    });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-categories"] });
    toast.success("Category added");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl">Portfolio Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage portfolio categories.</p>
        </div>
        <button 
          onClick={add} 
          className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]"
        >
          <Plus className="h-3.5 w-3.5" /> Add category
        </button>
      </div>

      <div className="space-y-3">
        {data?.length === 0 && (
          <p className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
            No categories yet. Add one to get started.
          </p>
        )}
        {data?.map((cat) => (
          <CategoryRow key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(category);

  const save = async () => {
    const { error } = await supabase.from("portfolio_categories").update({
      name: form.name,
      slug: form.slug,
      sort_order: form.sort_order,
    }).eq("id", category.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-categories"] });
    qc.invalidateQueries({ queryKey: ["portfolio-categories"] });
  };

  const del = async () => {
    if (!confirm(`Delete "${category.name}" and all associated portfolio items?`)) return;
    
    // Delete all portfolio items with this category
    const { error: delError } = await supabase
      .from("portfolio_items")
      .update({ category_id: null })
      .eq("category_id", category.id);
    
    if (delError) return toast.error(delError.message);

    // Then delete the category
    const { error } = await supabase.from("portfolio_categories").delete().eq("id", category.id);
    if (error) return toast.error(error.message);
    toast.success("Category deleted");
    qc.invalidateQueries({ queryKey: ["admin-categories"] });
    qc.invalidateQueries({ queryKey: ["portfolio-categories"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-10 w-10 text-neutral-400 mt-1">
          <GripVertical className="h-5 w-5" />
        </div>
        <div className="flex-1 grid sm:grid-cols-3 gap-3">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v.toLowerCase().replace(/\s+/g, "-") })} />
          <Field label="Order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
        </div>
        <div className="flex gap-2">
          <button onClick={del} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
          <button onClick={save} className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
