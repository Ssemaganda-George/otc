-- Fix all RLS policies to use correct authentication check
-- The issue is that auth.role() = 'authenticated' is not the correct way to check for authenticated users in Supabase
-- The correct way is auth.uid() IS NOT NULL

-- Drop and recreate policies for all CMS tables
DROP POLICY IF EXISTS "Allow authenticated users to manage pages" ON pages;
CREATE POLICY "Allow authenticated users to manage pages" ON pages FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage team_members" ON team_members;
CREATE POLICY "Allow authenticated users to manage team_members" ON team_members FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage programs" ON programs;
CREATE POLICY "Allow authenticated users to manage programs" ON programs FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage research_experts" ON research_experts;
CREATE POLICY "Allow authenticated users to manage research_experts" ON research_experts FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON products;
CREATE POLICY "Allow authenticated users to manage products" ON products FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage hero_slides" ON hero_slides;
CREATE POLICY "Allow authenticated users to manage hero_slides" ON hero_slides FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage blogs" ON blogs;
CREATE POLICY "Allow authenticated users to manage blogs" ON blogs FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage resources" ON resources;
CREATE POLICY "Allow authenticated users to manage resources" ON resources FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage contact_info" ON contact_info;
CREATE POLICY "Allow authenticated users to manage contact_info" ON contact_info FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage footer" ON footer;
CREATE POLICY "Allow authenticated users to manage footer" ON footer FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage home_sections" ON home_sections;
CREATE POLICY "Allow authenticated users to manage home_sections" ON home_sections FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage core_values" ON core_values;
CREATE POLICY "Allow authenticated users to manage core_values" ON core_values FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage news_updates" ON news_updates;
CREATE POLICY "Allow authenticated users to manage news_updates" ON news_updates FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage research_publications" ON research_publications;
CREATE POLICY "Allow authenticated users to manage research_publications" ON research_publications FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_focus_areas" ON what_we_do_focus_areas;
CREATE POLICY "Allow authenticated users to manage what_we_do_focus_areas" ON what_we_do_focus_areas FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_departments" ON what_we_do_departments;
CREATE POLICY "Allow authenticated users to manage what_we_do_departments" ON what_we_do_departments FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_programmes" ON what_we_do_programmes;
CREATE POLICY "Allow authenticated users to manage what_we_do_programmes" ON what_we_do_programmes FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to manage our_impact_stats" ON our_impact_stats;
CREATE POLICY "Allow authenticated users to manage our_impact_stats" ON our_impact_stats FOR ALL USING (auth.uid() IS NOT NULL);

-- Ensure public read policies exist where needed
DROP POLICY IF EXISTS "Allow public to read home_sections" ON home_sections;
CREATE POLICY "Allow public to read home_sections" ON home_sections FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Allow public to read core_values" ON core_values;
CREATE POLICY "Allow public to read core_values" ON core_values FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Allow public to read research_publications" ON research_publications;
CREATE POLICY "Allow public to read research_publications" ON research_publications FOR SELECT USING (true);
