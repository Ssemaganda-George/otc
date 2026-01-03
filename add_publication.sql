-- Add public read policy for research_publications
CREATE POLICY "Allow public to read research_publications" ON research_publications FOR SELECT USING (true);

-- Insert the hardcoded publication
INSERT INTO research_publications (
  title,
  slug,
  authors,
  publish_date,
  category,
  abstract,
  thumbnail,
  download_url,
  view_url,
  citation_count,
  tags
) VALUES (
  'Balancing Innovation, Investor Interests and Data Privacy in Africa''s Digital Health Start-Up Ecosystem: Lessons from the Rocket Health Case',
  'balancing-innovation-investor-interests-data-privacy-africa-digital-health-startup-ecosystem-lessons-rocket-health-case',
  ARRAY[]::TEXT[],
  '2025-11-29',
  'POLICY BRIEF',
  '',
  '/images/publication1.jpg',
  '/documents/Policy Brief - OneTechConnect.pdf',
  '/documents/Policy Brief - OneTechConnect.pdf',
  0,
  ARRAY[]::TEXT[]
);
