-- ============================================================
-- Rental Items & Hire Requests — New Tables for Artful Events
-- ============================================================
-- Run this in your Supabase SQL Editor to add rental management.
-- ============================================================

-- 1. RENTAL ITEMS TABLE --
CREATE TABLE IF NOT EXISTS public.rental_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  description text,
  price text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. HIRE REQUESTS TABLE --
CREATE TABLE IF NOT EXISTS public.hire_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event_date date,
  items_interested text,
  notes text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. ENABLE RLS --
ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_requests ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES --

-- Public can read rental items
DO $$ BEGIN
  CREATE POLICY "public read rental_items" ON public.rental_items FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Public can insert hire requests with validation
DO $$ BEGIN
  CREATE POLICY "public insert hire_requests" ON public.hire_requests FOR INSERT TO anon, authenticated
    WITH CHECK (
      char_length(btrim(name)) BETWEEN 1 AND 120
      AND char_length(btrim(phone)) BETWEEN 1 AND 40
      AND char_length(btrim(email)) BETWEEN 1 AND 254
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admin can read and manage rental items
DO $$
DECLARE admin_email text := 'admin@linchry.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write rental_items" ON public.rental_items FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admin can read hire requests
DO $$
DECLARE admin_email text := 'admin@linchry.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin read hire_requests" ON public.hire_requests FOR SELECT TO authenticated USING ((auth.jwt()->>'email') = %L)$f$, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admin can manage hire requests (update/delete)
DO $$
DECLARE admin_email text := 'admin@linchry.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin update hire_requests" ON public.hire_requests FOR UPDATE TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$
DECLARE admin_email text := 'admin@linchry.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin delete hire_requests" ON public.hire_requests FOR DELETE TO authenticated USING ((auth.jwt()->>'email') = %L)$f$, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 5. SEED DEFAULT RENTAL ITEMS --
INSERT INTO public.rental_items (category, name, description, price, sort_order) VALUES
  ('Catering Equipment', 'Porcelain Dinner Plates (Set of 100)', 'Premium white porcelain, perfect for formal events', 'KES 3,500', 1),
  ('Catering Equipment', 'Chafing Dishes (Stainless Steel)', 'Electric heated serving dishes, holds up to 8 hours', 'KES 2,500', 2),
  ('Catering Equipment', 'Stainless Steel Cutlery (Service for 100)', 'Complete cutlery set, polished and elegant', 'KES 4,000', 3),
  ('Event Items', 'Marquee Tent (20x30ft)', 'Premium white tent, elegant and weather-resistant', 'KES 8,500', 4),
  ('Event Items', 'Chiavari Chairs (Set of 50)', 'Classic gold and white chairs, comfortable seating', 'KES 5,000', 5),
  ('Event Items', 'Banquet Tables (Set of 10)', 'Sturdy 6ft tables with white linens included', 'KES 3,000', 6),
  ('Lighting', 'LED Uplighters (Set of 12)', 'RGB color-changing, programmable lighting', 'KES 2,000', 7),
  ('Lighting', 'String Lights (50ft)', 'Warm white decorative lights, perfect for ambiance', 'KES 1,500', 8)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONE. The rental system is now ready to use.
-- ============================================================