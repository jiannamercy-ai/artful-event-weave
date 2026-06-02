-- Ensure rental_items and hire_requests tables exist with full RLS setup
-- Create or update rental_items table
CREATE TABLE IF NOT EXISTS public.rental_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create or update hire_requests table
CREATE TABLE IF NOT EXISTS public.hire_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  event_date DATE,
  items_interested TEXT,
  notes TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they conflict
DROP POLICY IF EXISTS "public read rental_items" ON public.rental_items;
DROP POLICY IF EXISTS "public insert hire_requests" ON public.hire_requests;
DROP POLICY IF EXISTS "admin write rental_items" ON public.rental_items;
DROP POLICY IF EXISTS "admin read hire_requests" ON public.hire_requests;
DROP POLICY IF EXISTS "admin update hire_requests" ON public.hire_requests;
DROP POLICY IF EXISTS "admin delete hire_requests" ON public.hire_requests;

-- Public read rental items
CREATE POLICY "public read rental_items" ON public.rental_items FOR SELECT TO public USING (true);

-- Public insert hire requests with validation
CREATE POLICY "public insert hire_requests" ON public.hire_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 120
    AND char_length(btrim(phone)) BETWEEN 1 AND 40
    AND char_length(btrim(email)) BETWEEN 1 AND 254
  );

-- Admin policies (applied in later migration with correct email)
-- These are temporary; the final policies will be set based on current admin email
