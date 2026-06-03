-- Update business email address in site_settings
UPDATE public.site_settings 
SET email = 'linchryevents@gmail.com'
WHERE id = 1;

-- If the site_settings record doesn't exist, create it
INSERT INTO public.site_settings (id, email, whatsapp, instagram, tagline, footer_text)
VALUES (
  1,
  'linchryevents@gmail.com',
  '+254700000000',
  'linchryevents',
  'Design & Delivery of Exceptional Events',
  '© 2026 Linchry Events. All rights reserved.'
)
ON CONFLICT (id) DO UPDATE SET email = 'linchryevents@gmail.com';
