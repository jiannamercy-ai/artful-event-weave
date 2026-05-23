import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  label = "Image",
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10 MB");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!value) return;
    // Try to delete from storage if it's a Supabase media URL
    try {
      const marker = "/storage/v1/object/public/media/";
      const idx = value.indexOf(marker);
      if (idx !== -1) {
        const path = value.slice(idx + marker.length);
        await supabase.storage.from("media").remove([path]);
      }
    } catch {
      // ignore storage delete errors — still clear the field
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded border border-border bg-muted/40">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageIcon className="h-6 w-6" />
            </div>
          )}
          {value && (
            <button
              type="button"
              onClick={remove}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-xs hover:bg-muted disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" />
            {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
          <p className="text-[11px] text-muted-foreground">JPG / PNG / WEBP · ≤ 10 MB</p>
        </div>
      </div>
    </div>
  );
}
