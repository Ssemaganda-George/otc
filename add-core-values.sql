-- Script to add core values to the database
-- Run this in Supabase SQL Editor

-- Insert core values data
INSERT INTO core_values (title, description, display_order, is_active) VALUES
(
  'Innovation',
  'Driving creative, future-oriented solutions that harness technology to improve lives and transform societies.',
  1,
  true
),
(
  'Afrocentrism',
  'Advancing an African-led tech agenda, rooted in local knowledge, institutions, and leadership to shape Africa''s digital present and future.',
  2,
  true
),
(
  'Human Rights & Social Justice',
  'Ensuring that digital transformation upholds rights, dignity, and equity, and reduces inequalities for all Africans.',
  3,
  true
),
(
  'Excellence',
  'Committing to the highest standards of professionalism, integrity, and impact in all our work.',
  4,
  true
),
(
  'Connectivity',
  'Building technologies and systems that seamlessly connect people, communities, and innovations across Africa.',
  5,
  true
);

-- Verify the data was inserted
SELECT title, description, display_order, is_active FROM core_values ORDER BY display_order;