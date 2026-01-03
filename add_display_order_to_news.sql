-- Add display_order column to news_updates table for ordering news items in the UI
-- Run this in Supabase SQL Editor

-- Add display_order column if it doesn't exist
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing records to have sequential display_order values based on created_at
-- This ensures existing news items have proper ordering
UPDATE news_updates
SET display_order = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num
  FROM news_updates
) sub
WHERE news_updates.id = sub.id;

-- Add engagement columns if they don't exist (for completeness)
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS reshare_count INTEGER DEFAULT 0;

-- Verify the changes
SELECT id, title, display_order, created_at FROM news_updates ORDER BY display_order ASC;