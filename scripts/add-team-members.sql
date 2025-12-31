-- Script to automatically add team members to the database
-- Run this in Supabase SQL Editor

-- Insert team members data
INSERT INTO team_members (name, position, bio, image, expertise, education, experience, social, display_order) VALUES
(
  'Frank Ssekamwa',
  'Executive Director',
  'Frank Ssekamwa is the Executive Director of OneTechConnect (OTC), bringing extensive experience in technology law, digital rights advocacy, and strategic litigation. He leads OTC''s mission to champion Africa''s technological transformation while upholding human rights and social justice.',
  '/images/Frank.jpg',
  ARRAY[
    'Technology Law',
    'Digital Rights Advocacy',
    'Strategic Litigation',
    'Policy Development',
    'Human Rights Law'
  ],
  ARRAY[
    'Law Degree from Makerere University',
    'Postgraduate studies in Technology Law',
    'International Human Rights Law certification'
  ],
  ARRAY[
    'Executive Director, OneTechConnect',
    'Legal Counsel for Digital Rights Organizations',
    'Strategic Litigation Expert',
    'Policy Advisor for Technology Regulation'
  ],
  '{"linkedin": "", "email": "frank@onetechconnect.org", "twitter": ""}',
  1
),
(
  'Blair Nsubuga',
  'Director of Operations',
  'Blair Nsubuga oversees operational excellence at OneTechConnect, ensuring efficient delivery of programs and initiatives. With a background in operations management and project coordination, Blair drives the successful implementation of OTC''s strategic objectives.',
  '/images/Blair.png',
  ARRAY[
    'Operations Management',
    'Project Coordination',
    'Program Implementation',
    'Strategic Planning',
    'Team Leadership'
  ],
  ARRAY[
    'Business Administration Degree',
    'Project Management Certification',
    'Operations Management Studies'
  ],
  ARRAY[
    'Director of Operations, OneTechConnect',
    'Operations Manager for Tech Organizations',
    'Project Coordinator for Digital Initiatives',
    'Program Manager for Innovation Projects'
  ],
  '{"linkedin": "", "email": "blair@onetechconnect.org", "twitter": ""}',
  2
),
(
  'Nakitende Sauda',
  'Head of Research and Development (R&D)',
  'Nakitende Sauda leads research and development initiatives at OneTechConnect, focusing on innovative solutions for digital transformation in Africa. Her expertise spans technology research, innovation management, and development of cutting-edge digital solutions.',
  '/images/Sauda.jpg',
  ARRAY[
    'Technology Research',
    'Innovation Management',
    'Digital Solutions Development',
    'Research Methodology',
    'Technology Strategy'
  ],
  ARRAY[
    'Computer Science Degree',
    'Research Methodology Certification',
    'Innovation Management Studies'
  ],
  ARRAY[
    'Head of R&D, OneTechConnect',
    'Research Lead for Technology Projects',
    'Innovation Manager for Digital Solutions',
    'Technology Research Coordinator'
  ],
  '{"linkedin": "", "email": "sauda@onetechconnect.org", "twitter": ""}',
  3
),
(
  'Abomugisha Dorothy',
  'Head Finance',
  'Abomugisha Dorothy manages financial operations and sustainability initiatives at OneTechConnect. With expertise in financial management and organizational development, she ensures the financial health and long-term viability of OTC''s programs and initiatives.',
  '/images/Dorothy.jpg',
  ARRAY[
    'Financial Management',
    'Budget Planning',
    'Financial Reporting',
    'Grant Management',
    'Organizational Sustainability'
  ],
  ARRAY[
    'Finance and Accounting Degree',
    'Financial Management Certification',
    'Business Administration Studies'
  ],
  ARRAY[
    'Head Finance, OneTechConnect',
    'Financial Manager for NGOs',
    'Budget Coordinator for Development Projects',
    'Financial Planning Specialist'
  ],
  '{"linkedin": "", "email": "dorothy@onetechconnect.org", "twitter": ""}',
  4
),
(
  'Ssemaganda George (Shon)',
  'Technical Expert',
  'Ssemaganda George, also known as Shon, is a technical expert at OneTechConnect specializing in software development, system architecture, and technical implementation. He brings deep technical knowledge to support OTC''s technology initiatives and digital transformation projects.',
  '',
  ARRAY[
    'Software Development',
    'System Architecture',
    'Technical Implementation',
    'Digital Solutions',
    'Technology Infrastructure'
  ],
  ARRAY[
    'Computer Science Degree',
    'Software Engineering Certification',
    'System Architecture Studies'
  ],
  ARRAY[
    'Technical Expert, OneTechConnect',
    'Software Developer for Tech Companies',
    'System Architect for Digital Projects',
    'Technical Consultant for Innovation Initiatives'
  ],
  '{"linkedin": "", "email": "george@onetechconnect.org", "twitter": ""}',
  5
);

-- Verify the data was inserted
SELECT name, position, display_order, image FROM team_members ORDER BY display_order;