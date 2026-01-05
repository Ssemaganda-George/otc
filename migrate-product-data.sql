-- Migration script to populate product category tables with existing hardcoded data
-- Run this in Supabase SQL Editor after creating the tables

-- Insert Strategic Litigation Cases
INSERT INTO strategic_litigation_cases (case_number, case_name, issues, country, year_filed, status, status_type, display_order) VALUES
(1, 'Ssekamwa Frank & 3 Others v Google LLC', 'Privacy violation & non-compliance, access to justice, distress, cross border transfer & Data Sovereignty', 'Uganda', 'November 2024', 'Successful decision issued by the PDPO', 'success', 1),
(2, 'Google LLC v Ssekamwa Frank & 3 Others', 'Time jurisdiction & Extraterritorial application of Uganda''s data law', 'Uganda', 'August 2025', 'Appeal by Google LLC before the Minister for ICT&NG', 'pending', 2),
(3, 'OneTechConnect (OTC) & 3 Others v Google LLC', 'Privacy Ruling Enforcement, DPIAs and Administrative fines', 'Uganda', 'Pending', 'Hearing before the PDPO', 'active', 3);

-- Insert Innovation Hub Initiatives
INSERT INTO innovation_hub_initiatives (title, description, icon_name, is_coming_soon, display_order) VALUES
('Hackathons', 'Bringing together innovators to solve Africa''s most pressing challenges through collaborative tech events.', 'Users', true, 1),
('OTC Innovation Fund', 'Supporting groundbreaking tech solutions with funding and mentorship for African entrepreneurs.', 'Lightbulb', true, 2),
('Data', 'Providing data solutions and analytics for rights-based decision making and innovation.', 'Shield', true, 3),
('OTC Sandbox', 'A safe environment for testing and developing innovative tech solutions before full deployment.', 'Smartphone', true, 4);

-- Insert Digital Justice Services
INSERT INTO digital_justice_services (title, description, icon_name, features, display_order) VALUES
('Digital Rights Training', 'Building capacity on digital rights, privacy, and data protection across Africa', 'BookOpen', ARRAY['Digital rights education', 'Privacy training', 'Data protection workshops', 'Capacity building programs'], 1),
('Tech Governance Courses', 'Training on AI ethics, platform governance, and regulatory frameworks', 'Shield', ARRAY['AI ethics training', 'Platform governance', 'Regulatory frameworks', 'Policy development'], 2),
('Community Programs', 'Grassroots education on digital literacy and online safety', 'Users', ARRAY['Digital literacy education', 'Online safety training', 'Community workshops', 'Grassroots outreach'], 3),
('Legal Professionals Training', 'Specialized programs for lawyers, policymakers, and advocates', 'Scale', ARRAY['Legal training programs', 'Policy advocacy skills', 'Advocacy techniques', 'Professional development'], 4);

-- Insert Consultancy Services
INSERT INTO consultancy_services (title, description, icon_name, service_type, features, pricing_info, contact_info, display_order) VALUES
('Compliance & Legal Services', 'We help you navigate the legal and regulatory landscape with services that include audits, documentation, and reporting. We specialize in data protection and privacy, offering services as a Data Protection Officer and providing legal advice on regulatory compliance.', 'Shield', 'advisory', ARRAY['Legal audits and documentation', 'Data Protection Officer services', 'Privacy compliance', 'Regulatory compliance advice'], 'Contact for pricing', 'info@onetechconnect.org', 1),
('Corporate & Intellectual Property', 'We assist with all aspects of corporate formation and compliance, including company registration and secretarial services. We also help you protect your innovations by registering and safeguarding Intellectual Property (IP) rights for tech in health, agriculture, finance, and development.', 'Building', 'advisory', ARRAY['Company registration', 'Corporate secretarial services', 'IP rights registration', 'Innovation protection'], 'Contact for pricing', 'info@onetechconnect.org', 2),
('Mergers, Acquisitions & Insolvency', 'Our experts guide African startups in HealthTech, AgriTech, FinTech, and development through the complexities of mergers and acquisitions to help them scale and remain sustainable. We also have experienced practitioners who can facilitate a legal and safe business transformation or closure.', 'TrendingUp', 'advisory', ARRAY['M&A guidance for startups', 'Scaling strategies', 'Business transformation', 'Legal closure processes'], 'Contact for pricing', 'info@onetechconnect.org', 3),
('Organizational Strategy & Business Finance', 'We offer advice on the most appropriate business vehicles for new and existing entities, provide fiscal hosting, and manage project funds. Our team includes professional fundraising experts who can help you secure the grants and funding necessary to sustain your projects.', 'DollarSign', 'advisory', ARRAY['Business vehicle selection', 'Fiscal hosting', 'Project fund management', 'Grant and funding support'], 'Contact for pricing', 'info@onetechconnect.org', 4);