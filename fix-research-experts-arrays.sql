-- Fix null array fields in research_experts table
-- Run this in Supabase SQL Editor after adding the display_order column

-- Update existing research experts to have empty arrays instead of null
UPDATE research_experts
SET
  expertise = COALESCE(expertise, ARRAY[]::TEXT[]),
  education = COALESCE(education, ARRAY[]::TEXT[]),
  experience = COALESCE(experience, ARRAY[]::TEXT[]),
  publications = COALESCE(publications, ARRAY[]::TEXT[])
WHERE
  expertise IS NULL OR
  education IS NULL OR
  experience IS NULL OR
  publications IS NULL;

-- Verify the data was updated
SELECT name, position, display_order, expertise, education, experience, publications
FROM research_experts
ORDER BY display_order;