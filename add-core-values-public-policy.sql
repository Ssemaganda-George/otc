-- Add public read policies for core_values and home_sections tables
-- Run this in Supabase SQL Editor

-- Add policy to allow public read access to active core values
CREATE POLICY "Allow public to read core_values" ON core_values FOR SELECT USING (is_active = true);

-- Add policy to allow public read access to active home sections
CREATE POLICY "Allow public to read home_sections" ON home_sections FOR SELECT USING (is_active = true);