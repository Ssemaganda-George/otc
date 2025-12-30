-- Add public read policies for website content
-- Run this AFTER the main schema to allow anonymous access to public content

-- Allow public read access to home sections
CREATE POLICY "Allow public read access to home_sections" ON home_sections FOR SELECT USING (true);

-- Allow public read access to impact statistics
CREATE POLICY "Allow public read access to our_impact_stats" ON our_impact_stats FOR SELECT USING (true);

-- Allow public read access to core pillars
CREATE POLICY "Allow public read access to core_pillars" ON core_pillars FOR SELECT USING (true);

-- Allow public read access to news updates
CREATE POLICY "Allow public read access to news_updates" ON news_updates FOR SELECT USING (true);

-- Allow public read access to what we do sections
CREATE POLICY "Allow public read access to what_we_do_focus_areas" ON what_we_do_focus_areas FOR SELECT USING (true);
CREATE POLICY "Allow public read access to what_we_do_departments" ON what_we_do_departments FOR SELECT USING (true);
CREATE POLICY "Allow public read access to what_we_do_programmes" ON what_we_do_programmes FOR SELECT USING (true);