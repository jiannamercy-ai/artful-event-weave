import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "./services";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

function SettingsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });

  const [form, setForm] = useState({ email: "", whatsapp: "", instagram: "", tagline: "", footer_text: "" });
  useEffect(() => {
    if (data) setForm({
      email: data.email ?? "", whatsapp: data.whatsapp ?? "", instagram: data.instagram ?? "",
      tagline: data.tagline ?? "", footer_text: data.footer_text ?? "",
    });
  }, [data]);

  const save = async () => {
    const { error } = await supabase.from("site_settings").update({ ...form, updated_at: new Date().toISOString() }).eq("id", 1);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-settings"] });
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  };

  const changePassword = async () => {
    const pw = prompt("Enter new admin password (min 6 chars):");
    if (!pw || pw.length < 6) return;
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return toast.error(error.message);
    toast.success("Password updated");
  };

  return (
    <div>
      <h1 className="font-serif text-3xl">Settings</h1>
      <p className="text-sm text-neutral-500 mt-1">Contact channels and global text. These power the Instagram, WhatsApp, and email icons across the site.</p>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 space-y-4">
        <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="WhatsApp number (with country code, e.g. +254712345678)" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
        <Field label="Instagram (handle or full URL)" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
        <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Field label="Footer line" value={form.footer_text} onChange={(v) => setForm({ ...form, footer_text: v })} />
        <div className="flex justify-end">
          <button onClick={save} className="bg-[var(--amber-gold)] px-5 py-2 text-xs uppercase tracking-[0.22em] text-[var(--espresso)]">Save</button>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="font-serif text-xl">Admin password</h2>
        <p className="text-sm text-neutral-500 mt-1">Default is <code>admin / 1234</code>. Change it for security.</p>
        <button onClick={changePassword} className="mt-3 border border-neutral-300 rounded px-4 py-2 text-xs uppercase tracking-[0.18em]">Change password</button>
      </div>
    </div>
  );
}
