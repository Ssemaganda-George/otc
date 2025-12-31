-- Create core_values table
-- Run this in Supabase SQL Editor

-- Core values table
CREATE TABLE IF NOT EXISTS core_values (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
DROP POLICY IF EXISTS "Allow authenticated users to manage core_values" ON core_values;
CREATE POLICY "Allow authenticated users to manage core_values" ON core_values FOR ALL USING (auth.role() = 'authenticated');