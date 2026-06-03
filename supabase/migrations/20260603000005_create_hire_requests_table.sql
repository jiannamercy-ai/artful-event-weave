-- Create hire_requests table for rental inquiries
CREATE TABLE IF NOT EXISTS hire_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  event_date DATE,
  items_interested TEXT,
  notes TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE hire_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts on hire_requests"
  ON hire_requests
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all hire_requests
CREATE POLICY "Allow authenticated users to read hire_requests"
  ON hire_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update hire_requests
CREATE POLICY "Allow authenticated users to update hire_requests"
  ON hire_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete hire_requests
CREATE POLICY "Allow authenticated users to delete hire_requests"
  ON hire_requests
  FOR DELETE
  USING (auth.role() = 'authenticated');
