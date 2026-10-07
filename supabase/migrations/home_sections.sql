-- =========================================================================
-- HOME SECTIONS MIGRATION
-- =========================================================================
-- Admin-managed homepage section images: Welcome To OTC, Our Approach, Our Partners.
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Idempotent: safe to re-run. Requires schema.sql (or run standalone).

create extension if not exists pgcrypto;

-- Home sections table (matches schema.sql definition)
create table if not exists home_sections (
  id uuid primary key default gen_random_uuid(),
  section_type text not null,
  title text,
  subtitle text,
  content text,
  image text,
  link_url text,
  link_text text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- One row per section_type (the app does a find() on section_type)
create unique index if not exists home_sections_section_type_key
  on home_sections (section_type);

-- Seed the three admin-managed homepage sections.
-- NOTE: about_us / mission / vision are seeded separately in seed-about.sql.
insert into home_sections (section_type, title, subtitle, content, image, display_order, is_active)
values
  ('welcome_to_otc', 'WELCOME TO OTC', null, null, '/images/DJP_5027.jpg', 1, true),
  ('our_approach', 'OUR APPROACH', null, null, '/images/DFA-2.jpg', 2, true),
  ('our_partners', 'OUR PARTNERS', null, null, null, 3, true)
on conflict (section_type) do nothing;

-- Row Level Security: public read, authenticated (admin) write
alter table home_sections enable row level security;

drop policy if exists "Allow public read access to home_sections" on home_sections;
create policy "Allow public read access to home_sections" on home_sections
  for select using (true);

drop policy if exists "Allow authenticated users to manage home_sections" on home_sections;
create policy "Allow authenticated users to manage home_sections" on home_sections
  for all using (auth.role() = 'authenticated');

-- Storage bucket for section image uploads (used by the ManageHomeSections admin page)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('home-sections', 'home-sections', true, 10485760, array['image/*'])
on conflict (id) do nothing;
