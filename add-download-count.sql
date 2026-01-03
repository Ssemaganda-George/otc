-- Add download_count column to research_publications table
ALTER TABLE research_publications ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;