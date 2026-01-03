-- Fix RLS policies for research_publications table
-- Drop existing policy
DROP POLICY IF EXISTS "Allow authenticated users to manage research_publications" ON research_publications;

-- Create new policy that properly checks for authenticated users
CREATE POLICY "Allow authenticated users to manage research_publications" ON research_publications 
FOR ALL USING (auth.uid() IS NOT NULL);

-- Also ensure public can read research_publications (for the public page)
DROP POLICY IF EXISTS "Allow public to read research_publications" ON research_publications;
CREATE POLICY "Allow public to read research_publications" ON research_publications 
FOR SELECT USING (true);
