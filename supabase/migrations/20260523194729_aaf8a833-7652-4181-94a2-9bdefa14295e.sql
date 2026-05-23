
-- Site settings (singleton)
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  email TEXT NOT NULL DEFAULT 'hello@dencyahevents.com',
  whatsapp TEXT NOT NULL DEFAULT '+254726765010',
  instagram TEXT NOT NULL DEFAULT 'dencyahevents',
  tagline TEXT NOT NULL DEFAULT 'Curators of refined experiences.',
  footer_text TEXT NOT NULL DEFAULT 'Handled. Delivered. Celebrated.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);

-- Generic keyed sections (hero, about, process, cta, ...)
CREATE TABLE public.sections (
  key TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  line TEXT,
  body TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  chapter TEXT,
  story TEXT,
  image_url TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  rating INT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables
CREATE POLICY "public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "public read sections" ON public.sections FOR SELECT USING (true);
CREATE POLICY "public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "public read portfolio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "public read team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "auth write site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth write sections" ON public.sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth write services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth write portfolio" ON public.portfolio_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth write team" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth write testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inquiries: public insert, authenticated read/manage
CREATE POLICY "public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "auth read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (true);

-- Seed singleton
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Seed section content
INSERT INTO public.sections (key, content) VALUES
  ('hero', '{"eyebrow":"","title_a":"Where Vision Meets","title_em":"Exquisite","title_b":"Execution","subtitle":"From intimate celebrations to grand galas, we craft moments that linger long after the last guest departs.","cta_primary":"Explore Our Work","cta_secondary":"Begin Your Vision","stats":[{"n":150,"suffix":"+","l":"Events Curated"},{"n":50,"suffix":"+","l":"Luxury Celebrations"},{"n":98,"suffix":"%","l":"Client Satisfaction"},{"n":8,"suffix":"+","l":"Years of Mastery"}]}'::jsonb),
  ('about', '{"heading_a":"Exquisite is not a word.","heading_em":"It''s our standard.","p1":"At Dencyah Events, we don''t plan parties. We compose experiences. Every detail — from the weight of the cutlery to the angle of the lighting — is considered, refined, and executed with quiet precision.","p2":"We''ve learned that true luxury isn''t loud. It''s the pause between moments. The breath a guest takes when they first enter a room. The silence before applause. We design for that silence."}'::jsonb),
  ('services_intro', '{"heading":"Our Suite of Services","subtitle":"Every event type, treated with the same obsession for detail."}'::jsonb),
  ('portfolio_intro', '{"heading":"Curated Experiences","subtitle":"A glimpse into the rooms we''ve composed."}'::jsonb),
  ('team_intro', '{"heading":"Meet The Curators","subtitle":"A small team. A very specific way of working."}'::jsonb),
  ('testimonials_intro', '{"heading":"Words from our clients","subtitle":""}'::jsonb),
  ('contact', '{"heading":"Begin Your Vision","subtitle":"Tell us about your celebration. We''ll respond within one business day."}'::jsonb);

-- Seed services
INSERT INTO public.services (slug, name, line, body, sort_order) VALUES
  ('luxury-weddings', 'Luxury Weddings', 'The day you remember in still frames.', 'Bespoke weddings designed end to end — from venue styling to floral, lighting and guest experience.', 1),
  ('corporate-galas', 'Corporate Galas & Launches', 'Brand stories, told in a single evening.', 'Award nights, product launches and executive dinners delivered with the cadence of a state event.', 2),
  ('private-celebrations', 'Private Celebrations', 'Quiet milestones, exquisitely held.', 'Anniversaries, birthdays, and intimate dinners curated for those who notice every detail.', 3),
  ('destination-events', 'Destination Events', 'Wherever you imagine — we arrive first.', 'On-location production across East Africa and beyond. Logistics, design, and hospitality handled.', 4),
  ('floral-decor', 'Floral & Décor Design', 'Living architecture, in bloom.', 'Sculptural floral installations, tablescapes, and full-room transformations.', 5),
  ('event-production', 'Event Production & Management', 'The orchestra you never see — only feel.', 'Stage, sound, lighting, and timeline orchestration — engineered to feel effortless.', 6);

-- Seed portfolio
INSERT INTO public.portfolio_items (slug, name, chapter, story, sort_order) VALUES
  ('pearl-wedding', 'The Pearl Wedding', 'A traditional celebration.', 'A two-day celebration honoring family lineage, set under leopard-print drapes and an amber-lit altar.', 1),
  ('scarlet-banquet', 'The Scarlet Banquet', 'A chief''s honor.', 'Tongaren, in honor of Rtd. Senior Chief Richard Sichangi. Crimson chairs, white linen, gold detail.', 2),
  ('rose-pavilion', 'The Rose Pavilion', 'A wedding in roses.', 'Tall crystal centerpieces overflowing with red roses — a single shade carried through every detail.', 3),
  ('emerald-affair', 'The Emerald Affair', 'A statement in quiet luxury.', 'Emerald velvet and brushed gold, set on rolling green lawns in Kakamega County.', 4),
  ('amber-evening', 'The Amber Evening', 'A reception under canvas.', 'Golden-hour reception under draped tents, candlelit tablescapes, an entirely amber world.', 5),
  ('executive-gala', 'The Executive Gala', 'A boardroom, transformed.', 'A grand banquet hall hung with bronze chandeliers — corporate celebration with the cadence of a state dinner.', 6);

-- Seed team
INSERT INTO public.team_members (name, role, bio, sort_order) VALUES
  ('Sarah Adongo', 'The Vision Weaver', 'Creative director. Believes the room should exhale before the guests do.', 1),
  ('Michael Otieno', 'The Calm Architect', 'Operations. Holds the timeline so no one else has to.', 2),
  ('Amara Wekesa', 'The Story Director', 'Design lead. Composes the visual rhythm of every event.', 3),
  ('Daniel Sande', 'The Floral Composer', 'Floral atelier lead. Twenty years of working with seasonal blooms.', 4);

-- Seed testimonials
INSERT INTO public.testimonials (quote, name, role, rating, sort_order) VALUES
  ('Every detail was poetry — we cried at the cutlery.', 'Faith & Brian', 'The Pearl Wedding', 5, 1),
  ('We launched a product. They launched a feeling.', 'T. Wanjiru', 'Director, Tier Capital', 5, 2),
  ('The room exhaled when the doors opened.', 'Mrs. Sande', 'Traditional Wedding · Kakamega', 5, 3),
  ('A team that listens, then quietly out-performs.', 'Hon. R. Sichangi', 'Tongaren Honor Banquet', 5, 4),
  ('The most beautiful evening any of our guests had attended.', 'The Achienos', 'Anniversary Dinner', 5, 5),
  ('They made our brand feel timeless.', 'Lumen Co.', 'Product Launch', 5, 6);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "auth upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "auth update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
CREATE POLICY "auth delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');
