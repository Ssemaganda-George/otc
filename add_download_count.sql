-- Add download_count column to research_publications table
ALTER TABLE research_publications 
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;

-- Update the existing publication to have 0 downloads initially
UPDATE research_publications 
SET download_count = 0 
WHERE download_count IS NULL;
