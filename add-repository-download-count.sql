-- Add download_count column to repositories table
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;