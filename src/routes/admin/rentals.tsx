import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/ImageUploader";
import { Field } from "./services";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/rentals")({
  component: RentalsAdmin,
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

type HireRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  event_date: string | null;
  items_interested: string | null;
  notes: string | null;
  read: boolean;
  created_at: string;
};

function RentalsAdmin() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"items" | "requests">("items");

  const { data: items = [] } = useQuery({
    queryKey: ["admin-rental-items"],
    queryFn: async () => {
      const { data } = await supabase
        .from("rental_items")
        .select("*")
        .order("sort_order");
      return (data ?? []) as RentalItem[];
    },
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["admin-hire-requests"],
    queryFn: async () => {
      const { data } = await supabase
        .from("hire_requests")
        .select("*")
        .order("created_at", { ascending: false });
      return (data ?? []) as HireRequest[];
    },
  });

  const categories = Array.from(new Set(items.map((i) => i.category))).sort();

  const addItem = async () => {
    const { error } = await supabase.from("rental_items").insert({
      category: "Catering Equipment",
      name: "New Item",
      price: "Contact for pricing",
      sort_order: items.length + 1,
    });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-rental-items"] });
    toast.success("Item added");
  };

  const markRead = async (id: string, read: boolean) => {
    await supabase.from("hire_requests").update({ read }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-hire-requests"] });
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this hire request?")) return;
    const { error } = await supabase.from("hire_requests").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-hire-requests"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl">Rentals</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage rental items and hire requests.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6 border-b border-neutral-200">
        <button
          onClick={() => setTab("items")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            tab === "items"
              ? "text-[var(--amber-gold)] border-b-2 border-[var(--amber-gold)]"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Rental Items ({items.length})
        </button>
        <button
          onClick={() => setTab("requests")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            tab === "requests"
              ? "text-[var(--amber-gold)] border-b-2 border-[var(--amber-gold)]"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Hire Requests ({requests.length})
        </button>
      </div>

      {/* ITEMS TAB */}
      {tab === "items" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 bg-[var(--amber-gold)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]"
            >
              <Plus className="h-3.5 w-3.5" /> Add item
            </button>
          </div>

          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="font-medium text-neutral-700 mb-3 pb-2 border-b border-neutral-200">
                  {cat}
                </h3>
                <div className="space-y-3">
                  {items
                    .filter((i) => i.category === cat)
                    .map((item) => (
                      <ItemRow
                        key={item.id}
                        item={item}
                        categories={categories}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REQUESTS TAB */}
      {tab === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 && (
            <p className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
              No hire requests yet.
            </p>
          )}
          {requests.map((req) => (
            <article
              key={req.id}
              className={`rounded-lg border bg-white p-5 ${
                req.read ? "border-neutral-200" : "border-[var(--amber-gold)]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {req.name}{" "}
                    {!req.read && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-[var(--amber-gold)]">
                        NEW
                      </span>
                    )}
                  </p>
                  <div className="mt-2 space-y-1 text-xs text-neutral-500">
                    <p>
                      📧{" "}
                      <a
                        href={`mailto:${req.email}`}
                        className="text-[var(--amber-gold)] hover:underline"
                      >
                        {req.email}
                      </a>
                    </p>
                    <p>
                      📱{" "}
                      <a
                        href={`tel:${req.phone}`}
                        className="text-[var(--amber-gold)] hover:underline"
                      >
                        {req.phone}
                      </a>
                    </p>
                    {req.event_date && <p>📅 {req.event_date}</p>}
                    <p className="text-neutral-400">
                      {new Date(req.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {req.items_interested && (
                <div className="mt-3 p-3 bg-[var(--amber-gold)]/5 rounded border border-[var(--amber-gold)]/20">
                  <p className="text-xs font-medium text-[var(--espresso)] mb-1">
                    Items Interested:
                  </p>
                  <p className="text-sm text-[var(--espresso)]">
                    {req.items_interested}
                  </p>
                </div>
              )}

              {req.notes && (
                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <p className="text-xs font-medium text-neutral-600 mb-1">
                    Notes:
                  </p>
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {req.notes}
                  </p>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => markRead(req.id, !req.read)}
                  className="text-xs px-3 py-1.5 border border-neutral-200 rounded hover:bg-neutral-50"
                >
                  Mark {req.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => deleteRequest(req.id)}
                  className="text-xs text-red-600 px-3 py-1.5 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemRow({ item, categories }: { item: RentalItem; categories: string[] }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(item);

  const save = async () => {
    const { error } = await supabase
      .from("rental_items")
      .update({
        category: form.category,
        name: form.name,
        description: form.description,
        price: form.price,
        image_url: form.image_url,
        sort_order: form.sort_order,
      })
      .eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-rental-items"] });
  };

  const del = async () => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    const { error } = await supabase
      .from("rental_items")
      .delete()
      .eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-rental-items"] });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 grid md:grid-cols-[auto_1fr] gap-5">
      <ImageUploader
        value={form.image_url}
        onChange={(url) => setForm({ ...form, image_url: url })}
        folder="rentals"
      />
      <div className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Field
            label="Category"
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field
            label="Price"
            value={form.price}
            onChange={(v) => setForm({ ...form, price: v })}
          />
          <Field
            label="Order"
            type="number"
            value={String(form.sort_order)}
            onChange={(v) => setForm({ ...form, sort_order: Number(v) })}
          />
        </div>
        <Field
          label="Description"
          textarea
          value={form.description ?? ""}
          onChange={(v) => setForm({ ...form, description: v })}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={del}
            className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
          <button
            onClick={save}
            className="bg-[var(--amber-gold)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--espresso)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
