-- Add display_order column to existing team_members table
-- Run this first before inserting team member data

ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'team_members' AND column_name = 'display_order';