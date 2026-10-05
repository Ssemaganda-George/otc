-- Seed content matching the OTC rebrand outline. Run once in the SQL Editor after schema.sql
-- (re-running will insert duplicate rows since these tables have no unique constraint on name/title).

-- Home sections: About/Mission/Vision copy shown on the homepage + Vision & Mission page
insert into home_sections (section_type, title, content, display_order, is_active)
values
  ('about_us', 'ABOUT US', 'OTC is a youth-led African innovation organisation harnessing talent, technology, creativity and knowledge to build solutions in Health, SRHR and Sustainable Development.', 1, true),
  ('mission', 'OUR MISSION', 'To harness African talent, knowledge, technology and creativity to develop, protect, finance and scale innovative solutions in Health, SRHR and Sustainable Development.', 2, true),
  ('vision', 'OUR VISION', 'An Africa where young people, ideas and technology drive locally owned solutions that transform communities and shape the future.', 3, true)
on conflict do nothing;

-- Our Impact stats shown on the homepage
insert into our_impact_stats (number, label)
values
  ('2', 'Solutions Developed'),
  ('8', 'Organisations Supported'),
  ('2', 'Campaigns Supported'),
  ('1000+', 'Individuals Reached')
on conflict do nothing;

-- Our Values (9 values)
insert into core_values (title, description, display_order, is_active)
values
  ('African Agency & Ownership', 'African people should have the agency, capacity and opportunity to shape, create and own solutions.', 1, true),
  ('Innovation', 'We embrace creativity, experimentation and better ways of solving real problems.', 2, true),
  ('Integrity', 'We work with honesty, accountability, transparency and professionalism.', 3, true),
  ('Collaboration', 'We connect people, institutions, expertise, ideas and resources.', 4, true),
  ('Excellence', 'We pursue high standards in our products, relationships and delivery.', 5, true),
  ('Sustainability', 'We design for lasting economic, social and environmental value.', 6, true),
  ('Protection & Fairness', 'We protect rights, intellectual property, interests and value while promoting fair relationships.', 7, true),
  ('People & Talent', 'We invest in human potential, knowledge, creativity and leadership.', 8, true),
  ('Impact', 'We focus on meaningful change that can be demonstrated and sustained.', 9, true)
on conflict do nothing;

-- Our Team (replaces previous roster)
insert into team_members (name, position, bio, image, display_order)
values
  ('Ssekamwa Frank', 'Founder & Chief Vision Officer', 'Founder and Chief Vision Officer of OneTechConnect, leading OTC''s mission to turn African ideas into scalable solutions.', '/images/Frank.jpg', 1),
  ('Kalivayo Blair', 'Co-Founder & Chief Operations Officer', 'Co-Founder and Chief Operations Officer overseeing operational excellence across OTC''s five products.', '/images/Blair.png', 2),
  ('Achola Tracy', 'Director of Programmes', 'Director of Programmes, driving the delivery of OTC''s innovation, academy, fund, legal and media initiatives.', null, 3),
  ('Matama Cathy', 'Co-Founder & Director', 'Co-Founder and Director supporting OTC''s strategic growth and partnerships.', '/images/Catherine.jpg', 4)
on conflict do nothing;

-- Board Members (governance leadership, distinct from the operational team above)
insert into board_members (name, role, image, display_order)
values
  ('Ankunda Patience', 'Chairperson, Board of Trustees', null, 1),
  ('Ssekamwa Frank', 'Executive Member', '/images/Frank.jpg', 2),
  ('Kalivayo Blair', 'Executive Member', '/images/Blair.png', 3),
  ('Aisha Masimbi', 'Non-Executive Member', null, 4),
  ('Dr. Stephen Roberts', 'Non-Executive Member', null, 5)
on conflict do nothing;

