
-- Lock admin-only write policies to the single admin account (defense in depth)
DO $$
DECLARE adm text := 'admin@dencyah.local';
BEGIN
  -- inquiries
  EXECUTE 'DROP POLICY IF EXISTS "auth delete inquiries" ON public.inquiries';
  EXECUTE 'DROP POLICY IF EXISTS "auth read inquiries" ON public.inquiries';
  EXECUTE 'DROP POLICY IF EXISTS "auth update inquiries" ON public.inquiries';
  EXECUTE format($f$CREATE POLICY "admin read inquiries" ON public.inquiries FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = %L)$f$, adm);
  EXECUTE format($f$CREATE POLICY "admin update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);
  EXECUTE format($f$CREATE POLICY "admin delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = %L)$f$, adm);

  -- portfolio_items
  EXECUTE 'DROP POLICY IF EXISTS "auth write portfolio" ON public.portfolio_items';
  EXECUTE format($f$CREATE POLICY "admin write portfolio" ON public.portfolio_items FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- sections
  EXECUTE 'DROP POLICY IF EXISTS "auth write sections" ON public.sections';
  EXECUTE format($f$CREATE POLICY "admin write sections" ON public.sections FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- services
  EXECUTE 'DROP POLICY IF EXISTS "auth write services" ON public.services';
  EXECUTE format($f$CREATE POLICY "admin write services" ON public.services FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- site_settings
  EXECUTE 'DROP POLICY IF EXISTS "auth write site_settings" ON public.site_settings';
  EXECUTE format($f$CREATE POLICY "admin write site_settings" ON public.site_settings FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- team_members
  EXECUTE 'DROP POLICY IF EXISTS "auth write team" ON public.team_members';
  EXECUTE format($f$CREATE POLICY "admin write team" ON public.team_members FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- testimonials
  EXECUTE 'DROP POLICY IF EXISTS "auth write testimonials" ON public.testimonials';
  EXECUTE format($f$CREATE POLICY "admin write testimonials" ON public.testimonials FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = %L) WITH CHECK ((auth.jwt() ->> 'email') = %L)$f$, adm, adm);

  -- storage.objects: remove broad SELECT that enables bucket listing.
  -- Public bucket URLs still work for direct object reads; this just blocks LIST.
  EXECUTE 'DROP POLICY IF EXISTS "public read media" ON storage.objects';
  EXECUTE format($f$CREATE POLICY "admin manage media objects" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'media' AND (auth.jwt() ->> 'email') = %L)$f$, adm);

  -- Restrict uploads/updates/deletes to admin too
  EXECUTE 'DROP POLICY IF EXISTS "auth upload media" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "auth update media" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "auth delete media" ON storage.objects';
  EXECUTE format($f$CREATE POLICY "admin upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND (auth.jwt() ->> 'email') = %L)$f$, adm);
  EXECUTE format($f$CREATE POLICY "admin update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND (auth.jwt() ->> 'email') = %L) WITH CHECK (bucket_id = 'media' AND (auth.jwt() ->> 'email') = %L)$f$, adm, adm);
  EXECUTE format($f$CREATE POLICY "admin delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND (auth.jwt() ->> 'email') = %L)$f$, adm);
END$$;
