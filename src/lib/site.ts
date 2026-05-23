// Helpers for consuming and shaping CMS data on the public site.
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type SiteSettings = {
  id: number;
  email: string;
  whatsapp: string;
  instagram: string;
  tagline: string;
  footer_text: string;
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
    staleTime: 60_000,
  });
}

export function useSection<T = Record<string, unknown>>(key: string) {
  return useQuery({
    queryKey: ["section", key],
    queryFn: async (): Promise<T | null> => {
      const { data, error } = await supabase.from("sections").select("content").eq("key", key).maybeSingle();
      if (error) throw error;
      return (data?.content ?? null) as T | null;
    },
    staleTime: 60_000,
  });
}

// Build clean external URLs from the raw stored values.
export function instagramUrl(handleOrUrl: string) {
  if (!handleOrUrl) return "#";
  if (/^https?:\/\//i.test(handleOrUrl)) return handleOrUrl;
  const h = handleOrUrl.replace(/^@/, "").trim();
  return `https://instagram.com/${h}`;
}

export function whatsappUrl(numberRaw: string, text?: string) {
  if (!numberRaw) return "#";
  const digits = numberRaw.replace(/\D/g, "");
  const t = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${t}`;
}

export function emailUrl(email: string, subject?: string) {
  if (!email) return "#";
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${s}`;
}
