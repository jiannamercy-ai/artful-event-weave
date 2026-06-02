-- Fix admin email in RLS policies and seed sample data
-- Admin email should be admin@linchry.local (not admin@dencyah.local)

-- Drop and recreate portfolio_categories admin policy with correct email
DROP POLICY IF EXISTS "admin write portfolio_categories" ON public.portfolio_categories;
CREATE POLICY "admin write portfolio_categories" ON public.portfolio_categories FOR ALL TO authenticated 
  USING ((auth.jwt()->>'email') = 'admin@linchry.local') 
  WITH CHECK ((auth.jwt()->>'email') = 'admin@linchry.local');

-- Add rental_items admin policy
DROP POLICY IF EXISTS "admin write rental_items" ON public.rental_items;
CREATE POLICY "admin write rental_items" ON public.rental_items FOR ALL TO authenticated 
  USING ((auth.jwt()->>'email') = 'admin@linchry.local') 
  WITH CHECK ((auth.jwt()->>'email') = 'admin@linchry.local');

-- Add hire_requests admin policies
DROP POLICY IF EXISTS "admin read hire_requests" ON public.hire_requests;
DROP POLICY IF EXISTS "admin update hire_requests" ON public.hire_requests;
DROP POLICY IF EXISTS "admin delete hire_requests" ON public.hire_requests;

CREATE POLICY "admin read hire_requests" ON public.hire_requests FOR SELECT TO authenticated 
  USING ((auth.jwt()->>'email') = 'admin@linchry.local');

CREATE POLICY "admin update hire_requests" ON public.hire_requests FOR UPDATE TO authenticated 
  USING ((auth.jwt()->>'email') = 'admin@linchry.local') 
  WITH CHECK ((auth.jwt()->>'email') = 'admin@linchry.local');

CREATE POLICY "admin delete hire_requests" ON public.hire_requests FOR DELETE TO authenticated 
  USING ((auth.jwt()->>'email') = 'admin@linchry.local');

-- Seed sample rental items with realistic event equipment
INSERT INTO public.rental_items (category, name, description, price, image_url, sort_order) VALUES
  ('Catering', 'Elegant Serving Stand', 'Stainless steel multi-tier serving stand with gold accents', '850', 'https://images.unsplash.com/photo-1568762543979-1c18fc2c3faf?w=500&h=400&fit=crop', 1),
  ('Catering', 'Premium Champagne Glasses Set', 'Crystal champagne flutes, set of 24', '1200', 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=500&h=400&fit=crop', 2),
  ('Catering', 'Deluxe Cutlery Set', 'Gold-plated cutlery for formal dining, set of 100', '2500', 'https://images.unsplash.com/photo-1578673457173-43a24c1e7b27?w=500&h=400&fit=crop', 3),
  ('Furniture', 'Round Event Table', 'Elegant round table seats 6-8 guests', '450', 'https://images.unsplash.com/photo-1631293278934-b2e6e0adf9e8?w=500&h=400&fit=crop', 4),
  ('Furniture', 'Chiavari Chairs', 'Classic gold chiavari chairs, set of 20', '800', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=400&fit=crop', 5),
  ('Furniture', 'Cocktail High Tables', 'Modern high-top tables for reception, set of 4', '600', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop', 6),
  ('Lighting', 'Professional LED Uplighting', 'Programmable uplighting system with 12 fixtures', '2000', 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=400&fit=crop', 7),
  ('Lighting', 'Elegant String Lights', 'Warm white string lights, 50 meters', '1100', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=400&fit=crop', 8),
  ('Lighting', 'Projection Mapping System', 'Full HD projection system with mapping capabilities', '3500', 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=400&fit=crop', 9),
  ('Decor', 'Flower Wall Backdrop', 'Pre-assembled flower wall 8ft x 8ft', '1500', 'https://images.unsplash.com/photo-1519167758481-92f9b1c7cb65?w=500&h=400&fit=crop', 10),
  ('Decor', 'Premium Linens Package', 'White damask linens for 20 tables', '600', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop', 11),
  ('Decor', 'Centerpiece Arrangements', 'Luxury floral centerpieces, set of 15', '2200', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=400&fit=crop', 12)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rental_items_category ON public.rental_items(category);
CREATE INDEX IF NOT EXISTS idx_rental_items_sort_order ON public.rental_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_hire_requests_created_at ON public.hire_requests(created_at DESC);
