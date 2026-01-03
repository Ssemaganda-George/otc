-- Add like_count and reshare_count columns to research_publications table
ALTER TABLE research_publications ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE research_publications ADD COLUMN IF NOT EXISTS reshare_count INTEGER DEFAULT 0;