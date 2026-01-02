// Script to clean up admin page data from analytics
// Run this in Supabase SQL Editor to remove existing admin page tracking data

-- Delete admin page views
DELETE FROM page_views
WHERE page_path LIKE '/admin%';

-- Update visitor session page counts (this is approximate)
-- Note: This will reset total_page_views for sessions that visited admin pages
UPDATE visitor_sessions
SET total_page_views = (
  SELECT COUNT(*)
  FROM page_views
  WHERE page_views.session_id = visitor_sessions.session_id
);