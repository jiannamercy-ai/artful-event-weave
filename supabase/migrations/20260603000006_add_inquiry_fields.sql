-- Add new inquiry fields to support full form
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS guest_count INT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS venue TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS budget_range TEXT;

-- Add comment to document the new fields
COMMENT ON COLUMN public.inquiries.guest_count IS 'Number of expected guests for the event';
COMMENT ON COLUMN public.inquiries.venue IS 'Event venue or location';
COMMENT ON COLUMN public.inquiries.budget_range IS 'Budget range for the event';
