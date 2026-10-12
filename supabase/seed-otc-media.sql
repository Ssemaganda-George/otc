-- =========================================================================
-- OTC MEDIA SEED DATA
-- =========================================================================
-- Populates the OTC Media admin tables with the current /media page content.
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Safe to re-run: clears existing rows first, then inserts fresh seed data.
-- Requires otc_media.sql (table creation) to have been run first.

-- Clear existing data (safe to re-run)
truncate table media_explore_bars, media_how_we_work, media_areas_of_focus,
  media_what_we_do, media_videos, media_gallery_images, media_page_content
restart identity cascade;

-- ---------------------------------------------------------------------------
-- 1. Page-level content (hero, why we exist, connection, CTA)
-- ---------------------------------------------------------------------------
insert into media_page_content (
  hero_eyebrow, hero_title, hero_intro, hero_image,
  why_we_exist, connection_text, cta_title, cta_subtitle
) values (
  'OTC Media Hub',
  'Creating. Telling. Entertaining. Inspiring.',
  'OTC Media is the creative and storytelling ecosystem of OTC. It develops talent and produces music, film, art, drama, digital content and stories that entertain, inform, connect audiences and amplify African creativity.',
  '/images/DFA-2.jpg',
  'Ideas, talent and innovation need strong stories and creative platforms to travel. OTC Media creates space for African voices, develops creative work and helps creators build audiences, protect value and pursue commercial opportunity.',
  'OTC Media amplifies research and innovation across the ecosystem, supports creators with Academy training, protects their work through the Legal & Business Protection Centre, connects promising creative ventures to the Fund and tells the stories of OTC products and impact.',
  'Ready to tell your story?',
  'Whether it''s music, film, art, drama or digital content — let''s create something that moves people.'
);

-- ---------------------------------------------------------------------------
-- 2. Image gallery
-- ---------------------------------------------------------------------------
insert into media_gallery_images (image_url, alt_text, display_order, is_active) values
  ('/images/DJP_5020.jpg', 'OTC Media creative production', 1, true),
  ('/images/DJP_5027.jpg', 'OTC Media live event coverage', 2, true),
  ('/images/DJP_5167.jpg', 'OTC Media studio session', 3, true),
  ('/images/DFA-25-Speakers-X-D01-09.jpg', 'OTC Media speakers on stage', 4, true),
  ('/images/DFA-25-highlight-sessions-01.jpg', 'OTC Media highlight session', 5, true),
  ('/images/publication1.jpg', 'OTC Media publication feature', 6, true);

-- ---------------------------------------------------------------------------
-- 3. Video content
-- ---------------------------------------------------------------------------
insert into media_videos (title, thumbnail_url, category, duration, video_url, display_order, is_active) values
  ('Data Justice Stories', '/images/Catherine.jpg', 'Documentary', '3:45', null, 1, true),
  ('Creator Spotlight', '/images/Frank.jpg', 'Interview', '5:12', null, 2, true),
  ('Campaign Behind the Scenes', '/images/Rita.jpg', 'Campaign', '2:30', null, 3, true),
  ('African Creative Voices', '/images/Blair.png', 'Series', '4:20', null, 4, true),
  ('Studio Sessions', '/images/Dorothy.jpg', 'Music', '6:05', null, 5, true),
  ('Film in Production', '/images/Sauda.jpg', 'Film', '8:14', null, 6, true);

-- ---------------------------------------------------------------------------
-- 4. What We Do
-- ---------------------------------------------------------------------------
insert into media_what_we_do (icon_name, description, display_order, is_active) values
  ('Music', 'Produce music, audio, podcasts, video and digital content through OTC Studios.', 1, true),
  ('Disc', 'Develop artists, music and creative partnerships through OTC Records.', 2, true),
  ('Film', 'Produce films, documentaries, series and short-form audiovisual work through OTC Films.', 3, true),
  ('Palette', 'Support theatre, drama, visual arts, performance and cultural expression.', 4, true),
  ('Globe', 'Create social, web and campaign content through OTC Digital.', 5, true),
  ('Network', 'Connect creators to business, legal, distribution and commercialisation support.', 6, true);

-- ---------------------------------------------------------------------------
-- 5. Areas of focus
-- ---------------------------------------------------------------------------
insert into media_areas_of_focus (label, display_order, is_active) values
  ('Music and audio production', 1, true),
  ('Film and documentary', 2, true),
  ('Podcasts and interviews', 3, true),
  ('Digital content and series', 4, true),
  ('Theatre, drama and visual arts', 5, true),
  ('Artist and creator development', 6, true),
  ('Creative partnerships and campaigns', 7, true),
  ('Distribution, audience growth and commercialization', 8, true);

-- ---------------------------------------------------------------------------
-- 6. How We Work
-- ---------------------------------------------------------------------------
insert into media_how_we_work (step, display_order, is_active) values
  ('CREATE', 1, true),
  ('PRODUCE', 2, true),
  ('CONNECT', 3, true),
  ('BUILD AUDIENCE', 4, true),
  ('COMMERCIALISE', 5, true),
  ('SCALE', 6, true);

-- ---------------------------------------------------------------------------
-- 7. Explore bars
-- ---------------------------------------------------------------------------
insert into media_explore_bars (name, href, image_url, description, display_order, is_active) values
  ('Campaign Development', '/media/campaign-development', '/images/DJP_5027.jpg', 'Creative campaigns that use art and digital media to drive awareness, engagement and real impact across Africa.', 1, true),
  ('Film & Art', '/media/film-and-art', '/images/DFA-25-Speakers-X-D01-09.jpg', 'Films, documentaries, theatre and visual art that tell African stories and amplify creative expression.', 2, true),
  ('Digital & Events', '/media/digital-and-events', '/images/DFA-25-highlight-sessions-01.jpg', 'Interactive digital experiences, virtual events and online campaigns that connect audiences across the continent.', 3, true);

-- Verify the data
select 'media_page_content' as table_name, count(*) as rows from media_page_content
union all select 'media_gallery_images', count(*) from media_gallery_images
union all select 'media_videos', count(*) from media_videos
union all select 'media_what_we_do', count(*) from media_what_we_do
union all select 'media_areas_of_focus', count(*) from media_areas_of_focus
union all select 'media_how_we_work', count(*) from media_how_we_work
union all select 'media_explore_bars', count(*) from media_explore_bars;
