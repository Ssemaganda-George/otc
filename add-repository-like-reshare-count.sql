-- Add like_count and reshare_count columns to repositories table
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS reshare_count INTEGER DEFAULT 0;