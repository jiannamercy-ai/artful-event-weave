
DROP POLICY IF EXISTS "public insert inquiries" ON public.inquiries;
CREATE POLICY "public insert inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  read = false
  AND char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(btrim(message)) BETWEEN 1 AND 4000
  AND (email IS NULL OR char_length(email) <= 254)
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (event_type IS NULL OR char_length(event_type) <= 80)
);
