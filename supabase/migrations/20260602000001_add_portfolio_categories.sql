-- Add portfolio_categories table
CREATE TABLE IF NOT EXISTS public.portfolio_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "public read portfolio_categories" ON public.portfolio_categories FOR SELECT USING (true);

-- Admin write policy
DO $$
DECLARE admin_email text := 'admin@dencyah.local';
BEGIN
  CREATE POLICY "admin write portfolio_categories" ON public.portfolio_categories FOR ALL TO authenticated USING ((auth.jwt()->>'email') = admin_email) WITH CHECK ((auth.jwt()->>'email') = admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed default categories
INSERT INTO public.portfolio_categories (name, slug, sort_order) VALUES
  ('Weddings', 'weddings', 1),
  ('Corporate Events', 'corporate-events', 2),
  ('Private Celebrations', 'private-celebrations', 3),
  ('Funerals', 'funerals', 4)
ON CONFLICT DO NOTHING;

-- Add category_id to portfolio_items (if not exists)
ALTER TABLE public.portfolio_items 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.portfolio_categories(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category_id ON public.portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_slug ON public.portfolio_categories(slug);
