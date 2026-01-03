-- Add engagement columns to news_updates table
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE news_updates ADD COLUMN IF NOT EXISTS reshare_count INTEGER DEFAULT 0;