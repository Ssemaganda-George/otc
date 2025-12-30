-- Insert hardcoded data into Supabase tables
-- Run this AFTER creating the tables with the create-tables.sql script

-- Insert What We Do Focus Areas (delete existing first to avoid conflicts)
DELETE FROM what_we_do_focus_areas;
INSERT INTO what_we_do_focus_areas (title, description, icon, color) VALUES
('HealthTech & Sexual Reproductive Health and Rights', 'Advancing digital health solutions while safeguarding reproductive rights and dignity', 'Heart', 'text-red-600'),
('Agriculture, Tech & Innovation', 'Transforming agricultural practices through innovative technology solutions', 'Leaf', 'text-green-600'),
('FinTech & Governance', 'Promoting inclusive financial technologies and transparent governance systems', 'DollarSign', 'text-yellow-600'),
('Tech, Innovation, Digitalization & Development', 'Driving comprehensive digital transformation for sustainable development', 'Laptop', 'text-blue-600');

-- Insert What We Do Departments (delete existing first to avoid conflicts)
DELETE FROM what_we_do_departments;
INSERT INTO what_we_do_departments (title, description, icon) VALUES
('Research & Development', 'Generating evidence to inform policy, practice, and innovation', 'BookOpen'),
('Training & Skill Development', 'Equipping young people and communities with digital, technical, and rights-based skills', 'Users'),
('Advocacy & Partnerships', 'Building alliances to influence policy and amplify voices for justice and accountability', 'Megaphone'),
('Tech, Innovation & Digital Transformation (TID)', 'Creating and supporting solutions that harness technology for inclusive development', 'Lightbulb');

-- Insert What We Do Programmes (delete existing first to avoid conflicts)
DELETE FROM what_we_do_programmes;
INSERT INTO what_we_do_programmes (title, description, objectives) VALUES
('Tech & SRHR Governance (TSG)', 'Examining governance challenges at the intersection of technology and sexual reproductive health rights in Africa',
 '["Research & Development on technology''s impact on SRHR policies", "Advocacy & Movement Building for rights-based digital governance", "Training & Skillset Development for stakeholders", "Innovation supporting inclusive, ethical digital solutions"]'),
('AfricanIntelligenceNow (AiNow)', 'Exploring AI evolution in Africa, focusing on health, agriculture, finance and development while respecting fundamental rights',
 '["Examine opportunities and risks of AI for African societies", "Support research on AI built on African data and contexts", "Advocate for AI that serves and interacts with African citizens"]'),
('BigTech Africa (BiTA)', 'Examining the role and impact of big tech companies and governments across key sectors',
 '["Analyse how tech business models affect rights in Africa", "Strengthen regulatory responses to digital monopolies", "Build public awareness on tech practices and human rights"]'),
('EmpowerThem (EMT)', 'Focusing on technology''s intersection with vulnerable groups including children, youth, women and marginalized communities',
 '["Build digital literacy and rights awareness", "Strengthen access to safe and inclusive technologies", "Amplify voices of underrepresented groups"]');

-- Insert About Us, Mission, and Vision content
INSERT INTO home_sections (section_name, title, content, section_type, display_order, is_active) VALUES
('about_us', 'ABOUT US', 'OneTechConnect (OTC) is a youth-led African organization dedicated to advancing digital justice across the continent. We work at the intersection of technology, human rights, and social justice.', 'about_us', 1, true),
('mission', 'OUR MISSION', 'OneTechConnect advances digital transformation in health, finance, agriculture and development while ensuring respect for fundamental human rights and social justice across Africa. We combine research, advocacy, training and innovation to build a fair digital future that centers African values and rights.', 'mission', 2, true),
('vision', 'OUR VISION', 'To be the leading African organization driving digital transformation that respects fundamental human rights and promotes social justice across the continent.', 'vision', 3, true)
ON CONFLICT (section_name) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  section_type = EXCLUDED.section_type,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

-- Insert Our Impact Statistics (delete existing first to avoid conflicts)
DELETE FROM our_impact_stats;
INSERT INTO our_impact_stats (number, label) VALUES
('100+', 'African Countries Reached'),
('5+', 'Tech Sectors'),
('100+', 'Legal Frameworks'),
('1000+', 'People Trained');

-- Insert Core Pillars (R, A, T) (delete existing first to avoid conflicts)
DELETE FROM core_pillars;
INSERT INTO core_pillars (letter, title, description, display_order, is_active) VALUES
('R', 'Research', 'Data-driven studies and policy research that inform digital justice strategies across Africa.', 1, true),
('A', 'Advocacy', 'Legal and policy advocacy to protect digital rights and ensure accountability.', 2, true),
('T', 'Training', 'Capacity building for activists, practitioners and technologists across sectors.', 3, true);

-- Insert Sample News Updates
INSERT INTO news_updates (title, slug, excerpt, content, featured_image, category, publish_date, is_featured) VALUES
('OneTechConnect Launches New Digital Rights Advocacy Program', 'otc-launches-digital-rights-program', 'OneTechConnect announces a comprehensive program to advance digital rights across African nations through policy advocacy and community engagement.', 'OneTechConnect is excited to announce the launch of our new Digital Rights Advocacy Program, designed to strengthen digital rights protections across African nations. This initiative will focus on policy development, community education, and strategic partnerships to ensure technology serves the public interest.', '/assets/news/digital-rights.jpg', 'Advocacy', '2024-12-15', true),
('AI Ethics Framework for African Development Released', 'ai-ethics-framework-released', 'New framework provides guidelines for responsible AI development and deployment in African contexts, emphasizing human rights and social justice.', 'Our research team has released a comprehensive AI Ethics Framework specifically designed for African development contexts. The framework addresses unique challenges faced by African nations in adopting AI technologies while ensuring human rights protections and social justice considerations.', '/assets/news/ai-ethics.jpg', 'Research', '2024-12-10', true),
('Capacity Building Workshop Series Announced', 'capacity-building-workshops', 'OneTechConnect launches a series of workshops focused on digital literacy, tech policy, and advocacy skills for African civil society organizations.', 'We are launching a comprehensive capacity building workshop series aimed at strengthening the digital rights ecosystem across Africa. These workshops will equip civil society organizations with essential skills in digital policy advocacy, technology assessment, and human rights monitoring.', '/assets/news/workshops.jpg', 'Training', '2024-12-05', true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  publish_date = EXCLUDED.publish_date,
  is_featured = EXCLUDED.is_featured;

-- Insert Hero Slides (delete existing first to avoid conflicts)
DELETE FROM hero_slides;
INSERT INTO hero_slides (title, subtitle, description, image, cta_text, cta_link, display_order, is_active, category, video_background) VALUES
('Championing Africa''s', 'Digital Transformation', 'OneTechConnect leads Africa''s technological advancement through innovative solutions, strategic partnerships, and unwavering commitment to human rights and social justice.', '/assets/hero/digital-transformation.jpg', 'Explore Our Mission', '/about', 1, true, 'Innovation', NULL),
('Strategic Litigation', '& Digital Justice', 'Defending digital rights and promoting equitable access to technology through expert legal advocacy and comprehensive training programs for legal professionals.', '/assets/hero/strategic-litigation.jpg', 'Learn More', '/products/strategic-litigation', 2, true, 'Justice', NULL),
('Innovation Hub', 'Driving Excellence', 'Empowering Africa''s tech ecosystem through hackathons, innovation funding, cutting-edge data solutions, and our exclusive OTC Sandbox for transformative projects.', '/assets/hero/innovation-hub.jpg', 'Join Innovation Hub', '/products/innovations', 3, true, 'Technology', NULL);

-- Insert Sample Repositories (delete existing first to avoid conflicts)
DELETE FROM repositories;
INSERT INTO repositories (title, description, category, language, stars, forks, last_updated, github_url, demo_url, document_url, tags, thumbnail, is_active) VALUES
('OneTechConnect Digital Rights Framework', 'A comprehensive framework for assessing and protecting digital rights in African contexts, with tools for policy analysis and advocacy.', 'Assessment Tools', 'Python', 45, 12, '2024-12-20', 'https://github.com/otc-africa/digital-rights-framework', 'https://demo.otc-africa.org/digital-rights', '/documents/digital-rights-framework.pdf', ARRAY['digital-rights', 'policy', 'advocacy', 'africa'], '/assets/repos/digital-rights-framework.jpg', true),
('AI Ethics Assessment Toolkit', 'Open-source toolkit for evaluating AI systems against African ethical standards and human rights frameworks.', 'AI Ethics', 'JavaScript', 78, 23, '2024-12-18', 'https://github.com/otc-africa/ai-ethics-toolkit', 'https://demo.otc-africa.org/ai-ethics', '/documents/ai-ethics-toolkit.pdf', ARRAY['ai', 'ethics', 'assessment', 'human-rights'], '/assets/repos/ai-ethics-toolkit.jpg', true),
('Blockchain Compliance Checker', 'Automated tool for checking blockchain implementations against regulatory compliance requirements in African jurisdictions.', 'Compliance Tools', 'Go', 32, 8, '2024-12-15', 'https://github.com/otc-africa/blockchain-compliance', 'https://demo.otc-africa.org/blockchain-compliance', '/documents/blockchain-compliance.pdf', ARRAY['blockchain', 'compliance', 'regulation', 'finance'], '/assets/repos/blockchain-compliance.jpg', true),
('Digital Justice Case Database', 'Comprehensive database of digital justice cases from across Africa, with search and analysis tools for legal professionals.', 'Case Management', 'TypeScript', 67, 19, '2024-12-12', 'https://github.com/otc-africa/digital-justice-db', 'https://demo.otc-africa.org/digital-justice-db', '/documents/digital-justice-db.pdf', ARRAY['database', 'legal', 'cases', 'justice'], '/assets/repos/digital-justice-db.jpg', true),
('Open Data Portal Template', 'Template for creating open data portals with built-in privacy protection and data sovereignty features.', 'Data Portal', 'React', 54, 16, '2024-12-10', 'https://github.com/otc-africa/open-data-portal', 'https://demo.otc-africa.org/open-data-portal', '/documents/open-data-portal.pdf', ARRAY['open-data', 'portal', 'privacy', 'sovereignty'], '/assets/repos/open-data-portal.jpg', true);