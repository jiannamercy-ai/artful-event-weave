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

export type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  line: string | null;
  body: string | null;
  image_url: string | null;
  sort_order: number;
};

export type PortfolioRow = {
  id: string;
  slug: string;
  name: string;
  chapter: string | null;
  story: string | null;
  image_url: string | null;
  category_id?: string | null;
  sort_order: number;
};

export type PortfolioCategoryRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type TeamRow = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
};

export type TestimonialRow = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  sort_order: number;
};

const STALE = 30_000;

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
    staleTime: STALE,
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
    staleTime: STALE,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services-public"],
    queryFn: async (): Promise<ServiceRow[]> => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as ServiceRow[];
    },
    staleTime: STALE,
  });
}

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio-public"],
    queryFn: async (): Promise<PortfolioRow[]> => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as PortfolioRow[];
    },
    staleTime: STALE,
  });
}

export function usePortfolioCategories() {
  return useQuery({
    queryKey: ["portfolio-categories"],
    queryFn: async (): Promise<PortfolioCategoryRow[]> => {
      const { data, error } = await supabase.from("portfolio_categories").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as PortfolioCategoryRow[];
    },
    staleTime: STALE,
  });
}

export function useTeam() {
  return useQuery({
    queryKey: ["team-public"],
    queryFn: async (): Promise<TeamRow[]> => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as TeamRow[];
    },
    staleTime: STALE,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials-public"],
    queryFn: async (): Promise<TestimonialRow[]> => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as TestimonialRow[];
    },
    staleTime: STALE,
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
