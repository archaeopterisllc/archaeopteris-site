-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public contact form)
CREATE POLICY "Allow anonymous inserts" ON public.contacts
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read contacts (admin access)
CREATE POLICY "Service role can read contacts" ON public.contacts
  FOR SELECT
  USING (auth.role() = 'service_role');
