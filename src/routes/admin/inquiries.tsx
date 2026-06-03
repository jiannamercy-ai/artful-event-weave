import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Check, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/admin/inquiries")({ component: InquiriesAdmin });

function InquiriesAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const markRead = async (id: string, read: boolean) => {
    await supabase.from("inquiries").update({ read }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-inquiries"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-inquiries"] });
  };

  return (
    <div>
      <h1 className="font-serif text-3xl">Inquiries</h1>
      <p className="text-sm text-neutral-500 mt-1">Messages submitted through the site.</p>

      <div className="mt-6 space-y-3">
        {(data ?? []).length === 0 && (
          <p className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">No inquiries yet.</p>
        )}
        {data?.map((i) => (
          <article key={i.id} className={`rounded-lg border bg-white p-5 ${i.read ? "border-neutral-200" : "border-[var(--amber-gold)]"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {i.name} {!i.read && <span className="ml-2 text-[10px] uppercase tracking-wider text-[var(--amber-gold)]">New</span>}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                  {i.email && <a href={`mailto:${i.email}`} className="inline-flex items-center gap-1 hover:text-neutral-900"><Mail className="h-3 w-3" />{i.email}</a>}
                  {i.phone && <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1 hover:text-neutral-900"><Phone className="h-3 w-3" />{i.phone}</a>}
                  {i.event_type && <span>{i.event_type}</span>}
                  {i.event_date && <span>{i.event_date}</span>}
                </div>
              </div>
              <p className="text-xs text-neutral-400">{new Date(i.created_at).toLocaleString()}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 rounded-md bg-neutral-50 p-3 text-xs md:grid-cols-4">
              {i.guest_count && <div><span className="font-semibold text-neutral-600">Guests:</span> {i.guest_count}</div>}
              {i.venue && <div><span className="font-semibold text-neutral-600">Venue:</span> {i.venue}</div>}
              {i.budget_range && <div><span className="font-semibold text-neutral-600">Budget:</span> {i.budget_range}</div>}
            </div>
            {i.message && <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">{i.message}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => markRead(i.id, !i.read)} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 border border-neutral-200 rounded">
                <Check className="h-3.5 w-3.5" /> Mark {i.read ? "unread" : "read"}
              </button>
              <button onClick={() => del(i.id)} className="inline-flex items-center gap-1 text-xs text-red-600 px-3 py-1.5"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
