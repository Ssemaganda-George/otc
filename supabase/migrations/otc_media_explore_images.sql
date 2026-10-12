-- =========================================================================
-- OTC MEDIA: EXPLORE BARS ENHANCEMENT
-- =========================================================================
-- Adds image_url and description columns to media_explore_bars so the
-- "Dive Deeper Into OTC Media" cards can show images and action buttons.
-- Run this in your Supabase SQL Editor. Idempotent: safe to re-run.

alter table media_explore_bars add column if not exists image_url text;
alter table media_explore_bars add column if not exists description text;

-- Populate the default explore bars with images and descriptions
update media_explore_bars
set image_url = '/images/DJP_5027.jpg',
    description = 'Creative campaigns that use art and digital media to drive awareness, engagement and real impact across Africa.'
where name = 'Campaign Development';

update media_explore_bars
set image_url = '/images/DFA-25-Speakers-X-D01-09.jpg',
    description = 'Films, documentaries, theatre and visual art that tell African stories and amplify creative expression.'
where name = 'Film & Art';

update media_explore_bars
set image_url = '/images/DFA-25-highlight-sessions-01.jpg',
    description = 'Interactive digital experiences, virtual events and online campaigns that connect audiences across the continent.'
where name = 'Digital & Events';
