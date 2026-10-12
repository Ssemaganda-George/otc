-- =========================================================================
-- OTC MEDIA MIGRATION
-- =========================================================================
-- Admin-managed content for the OTC Media Hub page (/media):
-- page-level content (hero, why we exist, connection, CTA), image gallery,
-- video content, what-we-do items, areas of focus, how-we-work steps and
-- explore bars.
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Idempotent: safe to re-run. Requires schema.sql (or run standalone).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Page-level content (single row: hero, why we exist, connection, CTA)
-- ---------------------------------------------------------------------------
create table if not exists media_page_content (
  id uuid primary key default gen_random_uuid(),
  hero_eyebrow text default 'OTC Media Hub',
  hero_title text,
  hero_intro text,
  hero_image text,
  why_we_exist text,
  connection_text text,
  cta_title text,
  cta_subtitle text,
  updated_at timestamptz not null default now()
);

-- Only one row (the page content)
create unique index if not exists media_page_content_single_row
  on media_page_content ((true));

-- ---------------------------------------------------------------------------
-- 2. Image gallery (Image Content section)
-- ---------------------------------------------------------------------------
create table if not exists media_gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Video content (Video Content section)
-- ---------------------------------------------------------------------------
create table if not exists media_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail_url text not null,
  category text,
  duration text,
  video_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4. What We Do items (icon + description)
-- ---------------------------------------------------------------------------
create table if not exists media_what_we_do (
  id uuid primary key default gen_random_uuid(),
  icon_name text,
  description text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. Areas of focus (pill tags)
-- ---------------------------------------------------------------------------
create table if not exists media_areas_of_focus (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 6. How We Work steps
-- ---------------------------------------------------------------------------
create table if not exists media_how_we_work (
  id uuid primary key default gen_random_uuid(),
  step text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 7. Explore bars (links to media sub-pages)
-- ---------------------------------------------------------------------------
create table if not exists media_explore_bars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  href text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seed default content (matches the current /media page)
insert into media_page_content (hero_eyebrow, hero_title, hero_intro, hero_image, why_we_exist, connection_text, cta_title, cta_subtitle)
values (
  'OTC Media Hub',
  'Creating. Telling. Entertaining. Inspiring.',
  'OTC Media is the creative and storytelling ecosystem of OTC. It develops talent and produces music, film, art, drama, digital content and stories that entertain, inform, connect audiences and amplify African creativity.',
  '/images/DFA-2.jpg',
  'Ideas, talent and innovation need strong stories and creative platforms to travel. OTC Media creates space for African voices, develops creative work and helps creators build audiences, protect value and pursue commercial opportunity.',
  'OTC Media amplifies research and innovation across the ecosystem, supports creators with Academy training, protects their work through the Legal & Business Protection Centre, connects promising creative ventures to the Fund and tells the stories of OTC products and impact.',
  'Ready to tell your story?',
  'Whether it''s music, film, art, drama or digital content — let''s create something that moves people.'
)
on conflict do nothing;

insert into media_gallery_images (image_url, alt_text, display_order, is_active)
values
  ('/images/DJP_5020.jpg', 'OTC Media creative production', 1, true),
  ('/images/DJP_5027.jpg', 'OTC Media live event coverage', 2, true),
  ('/images/DJP_5167.jpg', 'OTC Media studio session', 3, true),
  ('/images/DFA-25-Speakers-X-D01-09.jpg', 'OTC Media speakers on stage', 4, true),
  ('/images/DFA-25-highlight-sessions-01.jpg', 'OTC Media highlight session', 5, true),
  ('/images/publication1.jpg', 'OTC Media publication feature', 6, true)
on conflict do nothing;

insert into media_videos (title, thumbnail_url, category, duration, video_url, display_order, is_active)
values
  ('Data Justice Stories', '/images/Catherine.jpg', 'Documentary', '3:45', null, 1, true),
  ('Creator Spotlight', '/images/Frank.jpg', 'Interview', '5:12', null, 2, true),
  ('Campaign Behind the Scenes', '/images/Rita.jpg', 'Campaign', '2:30', null, 3, true),
  ('African Creative Voices', '/images/Blair.png', 'Series', '4:20', null, 4, true),
  ('Studio Sessions', '/images/Dorothy.jpg', 'Music', '6:05', null, 5, true),
  ('Film in Production', '/images/Sauda.jpg', 'Film', '8:14', null, 6, true)
on conflict do nothing;

insert into media_what_we_do (icon_name, description, display_order, is_active)
values
  ('Music', 'Produce music, audio, podcasts, video and digital content through OTC Studios.', 1, true),
  ('Disc', 'Develop artists, music and creative partnerships through OTC Records.', 2, true),
  ('Film', 'Produce films, documentaries, series and short-form audiovisual work through OTC Films.', 3, true),
  ('Palette', 'Support theatre, drama, visual arts, performance and cultural expression.', 4, true),
  ('Globe', 'Create social, web and campaign content through OTC Digital.', 5, true),
  ('Network', 'Connect creators to business, legal, distribution and commercialisation support.', 6, true)
on conflict do nothing;

insert into media_areas_of_focus (label, display_order, is_active)
values
  ('Music and audio production', 1, true),
  ('Film and documentary', 2, true),
  ('Podcasts and interviews', 3, true),
  ('Digital content and series', 4, true),
  ('Theatre, drama and visual arts', 5, true),
  ('Artist and creator development', 6, true),
  ('Creative partnerships and campaigns', 7, true),
  ('Distribution, audience growth and commercialization', 8, true)
on conflict do nothing;

insert into media_how_we_work (step, display_order, is_active)
values
  ('CREATE', 1, true),
  ('PRODUCE', 2, true),
  ('CONNECT', 3, true),
  ('BUILD AUDIENCE', 4, true),
  ('COMMERCIALISE', 5, true),
  ('SCALE', 6, true)
on conflict do nothing;

insert into media_explore_bars (name, href, display_order, is_active)
values
  ('Campaign Development', '/media/campaign-development', 1, true),
  ('Film & Art', '/media/film-and-art', 2, true),
  ('Digital & Events', '/media/digital-and-events', 3, true)
on conflict do nothing;

-- Row Level Security: public read, authenticated (admin) write
alter table media_page_content enable row level security;
alter table media_gallery_images enable row level security;
alter table media_videos enable row level security;
alter table media_what_we_do enable row level security;
alter table media_areas_of_focus enable row level security;
alter table media_how_we_work enable row level security;
alter table media_explore_bars enable row level security;

drop policy if exists "Allow public read access to media_page_content" on media_page_content;
create policy "Allow public read access to media_page_content" on media_page_content
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_page_content" on media_page_content;
create policy "Allow authenticated users to manage media_page_content" on media_page_content
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_gallery_images" on media_gallery_images;
create policy "Allow public read access to media_gallery_images" on media_gallery_images
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_gallery_images" on media_gallery_images;
create policy "Allow authenticated users to manage media_gallery_images" on media_gallery_images
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_videos" on media_videos;
create policy "Allow public read access to media_videos" on media_videos
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_videos" on media_videos;
create policy "Allow authenticated users to manage media_videos" on media_videos
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_what_we_do" on media_what_we_do;
create policy "Allow public read access to media_what_we_do" on media_what_we_do
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_what_we_do" on media_what_we_do;
create policy "Allow authenticated users to manage media_what_we_do" on media_what_we_do
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_areas_of_focus" on media_areas_of_focus;
create policy "Allow public read access to media_areas_of_focus" on media_areas_of_focus
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_areas_of_focus" on media_areas_of_focus;
create policy "Allow authenticated users to manage media_areas_of_focus" on media_areas_of_focus
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_how_we_work" on media_how_we_work;
create policy "Allow public read access to media_how_we_work" on media_how_we_work
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_how_we_work" on media_how_we_work;
create policy "Allow authenticated users to manage media_how_we_work" on media_how_we_work
  for all using (auth.role() = 'authenticated');

drop policy if exists "Allow public read access to media_explore_bars" on media_explore_bars;
create policy "Allow public read access to media_explore_bars" on media_explore_bars
  for select using (true);
drop policy if exists "Allow authenticated users to manage media_explore_bars" on media_explore_bars;
create policy "Allow authenticated users to manage media_explore_bars" on media_explore_bars
  for all using (auth.role() = 'authenticated');

-- Storage bucket for media image / thumbnail uploads (used by the ManageOtcMedia admin page)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('otc-media', 'otc-media', true, 10485760, array['image/*'])
on conflict (id) do nothing;
