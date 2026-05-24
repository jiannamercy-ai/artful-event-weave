-- ============================================================
-- Dencyah Events — Full Database Bootstrap for External Supabase
-- ============================================================
-- Run this entire file in the SQL Editor of your new Supabase project.
-- It will create every table, RLS policy, storage bucket, and seed row
-- the platform needs. Safe to re-run (uses IF NOT EXISTS / ON CONFLICT).
-- ============================================================

-- 1. TABLES -----------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_settings (
  id            integer PRIMARY KEY DEFAULT 1,
  email         text NOT NULL DEFAULT 'hello@dencyahevents.com',
  whatsapp      text NOT NULL DEFAULT '+254726765010',
  instagram     text NOT NULL DEFAULT 'dencyahevents',
  tagline       text NOT NULL DEFAULT 'Curators of refined experiences.',
  footer_text   text NOT NULL DEFAULT 'Handled. Delivered. Celebrated.',
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS public.sections (
  key         text PRIMARY KEY,
  content     jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.services (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  name        text NOT NULL,
  line        text,
  body        text,
  image_url   text,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  name        text NOT NULL,
  chapter     text,
  story       text,
  image_url   text,
  gallery     jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  role        text,
  bio         text,
  image_url   text,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  role        text,
  quote       text NOT NULL,
  rating      integer NOT NULL DEFAULT 5,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text,
  phone       text,
  event_type  text,
  event_date  date,
  message     text NOT NULL,
  read        boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. RLS --------------------------------------------------------
ALTER TABLE public.site_settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries        ENABLE ROW LEVEL SECURITY;

-- Public read on content tables
DO $$ BEGIN
  CREATE POLICY "public read site_settings"   ON public.site_settings    FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "public read sections"        ON public.sections         FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "public read services"        ON public.services         FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "public read portfolio"       ON public.portfolio_items  FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "public read team"            ON public.team_members     FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "public read testimonials"    ON public.testimonials     FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Anyone can submit an inquiry (validated)
DO $$ BEGIN
  CREATE POLICY "public insert inquiries" ON public.inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (
    read = false
    AND char_length(btrim(name))    BETWEEN 1 AND 120
    AND char_length(btrim(message)) BETWEEN 1 AND 4000
    AND (email IS NULL OR char_length(email) <= 254)
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND (event_type IS NULL OR char_length(event_type) <= 80)
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admin (single user) writes everywhere. Change the email below to your admin email.
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write site_settings"   ON public.site_settings   FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write sections"        ON public.sections        FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write services"        ON public.services        FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write portfolio"       ON public.portfolio_items FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write team"            ON public.team_members    FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write testimonials"    ON public.testimonials    FOR ALL TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin read inquiries"        ON public.inquiries       FOR SELECT TO authenticated USING ((auth.jwt()->>'email') = %L)$f$, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin update inquiries"      ON public.inquiries       FOR UPDATE TO authenticated USING ((auth.jwt()->>'email') = %L) WITH CHECK ((auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin delete inquiries"      ON public.inquiries       FOR DELETE TO authenticated USING ((auth.jwt()->>'email') = %L)$f$, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. STORAGE BUCKET --------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read individual files (bucket is public)
DO $$
DECLARE admin_email text := 'admin@dencyahevents.local';
BEGIN
  EXECUTE format($f$CREATE POLICY "admin write media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'media' AND (auth.jwt()->>'email') = %L) WITH CHECK (bucket_id = 'media' AND (auth.jwt()->>'email') = %L)$f$, admin_email, admin_email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 4. SEED -------------------------------------------------------
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

INSERT INTO public.services (slug, name, line, sort_order) VALUES
  ('luxury-weddings',       'Luxury Weddings',                'The day you remember in still frames.',        1),
  ('corporate-galas',       'Corporate Galas & Launches',     'Brand stories, told in a single evening.',     2),
  ('private-celebrations',  'Private Celebrations',           'Quiet milestones, exquisitely held.',          3),
  ('destination-events',    'Destination Events',             'Wherever you imagine — we arrive first.',      4),
  ('floral-decor',          'Floral & Décor Design',          'Living architecture, in bloom.',               5),
  ('event-production',      'Event Production & Management',  'The orchestra you never see — only feel.',     6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.portfolio_items (slug, name, chapter, sort_order) VALUES
  ('pearl-wedding',   'The Pearl Wedding',   'A traditional celebration.', 1),
  ('scarlet-banquet', 'The Scarlet Banquet', 'A chief''s honor.',          2),
  ('rose-pavilion',   'The Rose Pavilion',   'A wedding in roses.',        3),
  ('emerald-affair',  'The Emerald Affair',  'A statement in quiet luxury.', 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.team_members (name, role, sort_order) VALUES
  ('Sarah Adongo',    'The Vision Weaver',   1),
  ('Michael Otieno',  'The Calm Architect',  2),
  ('Amara Wekesa',    'The Story Director',  3),
  ('Daniel Sande',    'The Floral Composer', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.testimonials (name, role, quote, sort_order) VALUES
  ('Faith & Brian', 'The Pearl Wedding',          'Every detail was poetry — we cried at the cutlery. The team turned a year of planning into a single perfect evening.', 1),
  ('T. Wanjiru',    'Director, Tier Capital',     'We launched a product. They launched a feeling. Our entire executive team noticed the calm.', 2),
  ('Mrs. Sande',    'Traditional Wedding · Kakamega', 'The room exhaled when the doors opened. They built exactly what I had imagined — and somehow more.', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONE.  Final step (manual, in Supabase Dashboard):
--   Authentication → Users → "Add user" → Email: admin@dencyahevents.local
--   Password: choose your own. Tick "Auto Confirm Email".
-- Then log into the site by clicking the hidden square in the
-- bottom-left corner 3× and entering those credentials.
-- ============================================================
