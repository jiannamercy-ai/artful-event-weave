import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sections")({
  component: SectionsAdmin,
});

const KEYS = ["hero", "about", "services_intro", "portfolio_intro", "team_intro", "testimonials_intro", "contact"];

function SectionsAdmin() {
  const qc = useQueryClient();
  const [active, setActive] = useState<string>(KEYS[0]);
  const [text, setText] = useState("");

  const { data } = useQuery({
    queryKey: ["admin-sections"],
    queryFn: async () => {
      const { data } = await supabase.from("sections").select("*");
      return data ?? [];
    },
  });

  const current = data?.find((s) => s.key === active);

  useEffect(() => {
    setText(JSON.stringify(current?.content ?? {}, null, 2));
  }, [active, current]);

  const save = async () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      toast.error("Invalid JSON");
      return;
    }
    const { error } = await supabase
      .from("sections")
      .upsert({ key: active, content: parsed as any, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin-sections"] });
    qc.invalidateQueries({ queryKey: ["section", active] });
  };

  return (
    <div>
      <h1 className="font-serif text-3xl">Page Copy</h1>
      <p className="text-sm text-neutral-500 mt-1">
        Edit text content for each homepage section. Field names match the keys used on the site.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`rounded px-3 py-1.5 text-xs uppercase tracking-[0.18em] ${
              k === active ? "bg-[var(--amber-gold)] text-[var(--espresso)]" : "bg-white border border-neutral-200 text-neutral-600"
            }`}
          >
            {k.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-5">
        <label className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          {active} content (JSON)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={22}
          spellCheck={false}
          className="mt-2 w-full rounded border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs"
        />
        <div className="mt-4 flex justify-end">
          <button onClick={save} className="bg-[var(--amber-gold)] px-5 py-2 text-xs uppercase tracking-[0.22em] text-[var(--espresso)]">
            Save section
          </button>
        </div>
      </div>
    </div>
  );
}
