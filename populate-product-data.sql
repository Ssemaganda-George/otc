-- Complete SQL script to populate all product category tables with hardcoded data
-- Run this in Supabase SQL Editor after creating the tables with create-product-tables.sql

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM strategic_litigation_cases;
-- DELETE FROM innovation_hub_initiatives;
-- DELETE FROM digital_justice_services;
-- DELETE FROM consultancy_services;

-- Insert Strategic Litigation Cases
INSERT INTO strategic_litigation_cases (case_number, case_name, issues, country, year_filed, status, status_type, display_order) VALUES
(1, 'Ssekamwa Frank & 3 Others v Google LLC', 'Privacy violation & non-compliance, access to justice, distress, cross border transfer & Data Sovereignty', 'Uganda', 'November 2024', 'Successful decision issued by the PDPO', 'success', 1),
(2, 'Google LLC v Ssekamwa Frank & 3 Others', 'Time jurisdiction & Extraterritorial application of Uganda''s data law', 'Uganda', 'August 2025', 'Appeal by Google LLC before the Minister for ICT&NG', 'pending', 2),
(3, 'OneTechConnect (OTC) & 3 Others v Google LLC', 'Privacy Ruling Enforcement, DPIAs and Administrative fines', 'Uganda', 'Pending', 'Hearing before the PDPO', 'active', 3);

-- Insert Innovation Hub Initiatives
INSERT INTO innovation_hub_initiatives (title, description, icon_name, is_coming_soon, display_order) VALUES
('Hackathons', 'Bringing together innovators to solve Africa''s most pressing challenges through collaborative tech events.', 'Users', true, 1),
('OTC Innovation Fund', 'Supporting groundbreaking tech solutions with funding and mentorship for African entrepreneurs.', 'Lightbulb', true, 2),
('Data Solutions', 'Providing data solutions and analytics for rights-based decision making and innovation.', 'Shield', true, 3),
('OTC Sandbox', 'A safe environment for testing and developing innovative tech solutions before full deployment.', 'Smartphone', true, 4),
('WazaziConnect', 'Our flagship initiative providing an affordable pathway for Africans to become parents through connecting intending parents with surrogate mothers, donors and service providers.', 'Heart', false, 5),
('OTC Records', 'Discover innovation fused with African culture. Promoting and preserving African talent through music, art, and design.', 'Music', false, 6);

-- Insert Digital Justice Services
INSERT INTO digital_justice_services (title, description, icon_name, features, display_order) VALUES
('Digital Rights Training', 'Building capacity on digital rights, privacy, and data protection across Africa through comprehensive education programs.', 'BookOpen', ARRAY['Digital rights education', 'Privacy training workshops', 'Data protection compliance', 'Capacity building programs', 'Policy advocacy training'], 1),
('Tech Governance Courses', 'Training on AI ethics, platform governance, and regulatory frameworks for technology policy and governance.', 'Shield', ARRAY['AI ethics and governance', 'Platform regulation training', 'Technology policy development', 'Regulatory compliance frameworks', 'Digital governance strategies'], 2),
('Community Programs', 'Grassroots education on digital literacy and online safety for communities across Africa.', 'Users', ARRAY['Digital literacy education', 'Online safety training', 'Community workshops', 'Grassroots outreach programs', 'Digital inclusion initiatives'], 3),
('Legal Professionals Training', 'Specialized programs for lawyers, policymakers, and advocates in digital rights and technology law.', 'Scale', ARRAY['Legal training programs', 'Policy advocacy skills', 'Digital rights litigation', 'Technology law expertise', 'Professional development'], 4);

-- Insert Consultancy Services
INSERT INTO consultancy_services (title, description, icon_name, service_type, features, pricing_info, contact_info, display_order) VALUES
('Research & Development', 'We provide comprehensive research and analysis to inform your strategy, including feasibility studies, impact assessments, legislative and post-legislative scrutiny, and expert legal and policy analysis. Our team is skilled in both qualitative and quantitative research from data collection and analysis to synthesis.', 'BookOpen', 'research', ARRAY['Feasibility studies', 'Impact assessments', 'Legislative scrutiny', 'Expert legal and policy analysis', 'Data collection and analysis', 'Research methodology training'], 'Contact for pricing', 'info@onetechconnect.org', 1),
('Training & Capacity Building', 'We empower your team through specialized training. Our programs cover research methodology, academic writing, and publishing, in addition to tailored short courses and masterclasses on contemporary issues in our key sectors.', 'Users', 'training', ARRAY['Research methodology training', 'Academic writing and publishing', 'Tailored short courses', 'Masterclasses on contemporary issues', 'Capacity building programs', 'Professional development'], 'Contact for pricing', 'info@onetechconnect.org', 2),
('Compliance & Legal Services', 'We help you navigate the legal and regulatory landscape with services that include audits, documentation, and reporting. We specialize in data protection and privacy, offering services as a Data Protection Officer and providing legal advice on regulatory compliance.', 'Shield', 'advisory', ARRAY['Legal audits and documentation', 'Data Protection Officer services', 'Privacy compliance', 'Regulatory compliance advice', 'Risk assessments', 'Compliance reporting'], 'Contact for pricing', 'info@onetechconnect.org', 3),
('Corporate & Intellectual Property', 'We assist with all aspects of corporate formation and compliance, including company registration and secretarial services. We also help you protect your innovations by registering and safeguarding Intellectual Property (IP) rights for tech in health, agriculture, finance, and development.', 'Building', 'advisory', ARRAY['Company registration', 'Corporate secretarial services', 'IP rights registration', 'Innovation protection', 'Trademark registration', 'Patent filing assistance'], 'Contact for pricing', 'info@onetechconnect.org', 4),
('Mergers, Acquisitions & Insolvency', 'Our experts guide African startups in HealthTech, AgriTech, FinTech, and development through the complexities of mergers and acquisitions to help them scale and remain sustainable. We also have experienced practitioners who can facilitate a legal and safe business transformation or closure.', 'TrendingUp', 'advisory', ARRAY['M&A guidance for startups', 'Scaling strategies', 'Business transformation', 'Legal closure processes', 'Due diligence support', 'Transaction structuring'], 'Contact for pricing', 'info@onetechconnect.org', 5),
('Organizational Strategy & Business Finance', 'We offer advice on the most appropriate business vehicles for new and existing entities, provide fiscal hosting, and manage project funds. Our team includes professional fundraising experts who can help you secure the grants and funding necessary to sustain your projects.', 'DollarSign', 'advisory', ARRAY['Business vehicle selection', 'Fiscal hosting', 'Project fund management', 'Grant and funding support', 'Financial planning', 'Investment strategy'], 'Contact for pricing', 'info@onetechconnect.org', 6);