-- Full schema recreation for sak-otc-launchpad, reconstructed from application code
-- (original Supabase project was paused/lost, no migrations were committed to the repo).
-- Run this entire file once in your NEW Supabase project's SQL Editor (Dashboard > SQL Editor > New query).

create extension if not exists pgcrypto;

-- =========================================================================
-- CONTENT TABLES
-- =========================================================================

create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text,
  created_at timestamptz not null default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  bio text,
  image text,
  expertise text[] default '{}',
  education text[] default '{}',
  experience text[] default '{}',
  social jsonb default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists board_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  image text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists research_experts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  bio text,
  image text,
  expertise text[] default '{}',
  education text[] default '{}',
  experience text[] default '{}',
  publications text[] default '{}',
  social jsonb default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  long_description text,
  image_url text,
  objectives text,
  outcomes text,
  target_audience text,
  duration text,
  application_deadline text,
  start_date text,
  application_url text,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  featured_image text,
  author text,
  publish_date text,
  read_time int,
  category text,
  tags text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists repositories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  language text,
  stars int not null default 0,
  forks int not null default 0,
  last_updated text,
  github_url text,
  demo_url text,
  document_url text,
  tags text[] default '{}',
  thumbnail text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists repository_downloads (
  id uuid primary key default gen_random_uuid(),
  repository_id uuid references repositories(id) on delete cascade,
  downloaded_at timestamptz not null default now()
);

create table if not exists news_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  featured_image text,
  pdf_url text,
  gallery_images text[] default '{}',
  publish_date text,
  is_featured boolean not null default false,
  category text,
  tags text[] default '{}',
  display_order int not null default 0,
  download_count int not null default 0,
  like_count int not null default 0,
  reshare_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists research_publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  authors text[] default '{}',
  publish_date text,
  category text,
  abstract text,
  thumbnail text,
  download_url text,
  view_url text,
  citation_count int not null default 0,
  download_count int not null default 0,
  like_count int not null default 0,
  reshare_count int not null default 0,
  tags text[] default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  file_url text,
  thumbnail text,
  category text,
  tags text[] default '{}',
  download_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  description text,
  image text,
  cta_text text,
  cta_link text,
  display_order int not null default 0,
  is_active boolean not null default true,
  category text,
  video_background text,
  created_at timestamptz not null default now()
);

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

create table if not exists core_pillars (
  id uuid primary key default gen_random_uuid(),
  letter text,
  title text not null,
  description text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists our_impact_stats (
  id uuid primary key default gen_random_uuid(),
  number text,
  label text,
  created_at timestamptz not null default now()
);

create table if not exists what_we_do_focus_areas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists what_we_do_departments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists what_we_do_programmes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  objectives text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists strategic_litigation_cases (
  id uuid primary key default gen_random_uuid(),
  case_number int,
  case_name text not null,
  issues text,
  country text,
  year_filed text,
  status text,
  status_type text default 'pending',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists innovation_hub_initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  is_coming_soon boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists digital_justice_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  features text[] default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists consultancy_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  service_type text default 'training',
  features text[] default '{}',
  pricing_info text,
  contact_info text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists services_offerings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  features text[] default '{}',
  benefits text[] default '{}',
  color text,
  border_color text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists service_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_info (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  description text,
  address text,
  phone text,
  email text,
  website text,
  social_media jsonb default '{}',
  office_hours text,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  organization text,
  subject text,
  message text,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

create table if not exists footer (
  id uuid primary key default gen_random_uuid(),
  organization_name text,
  organization_description text,
  logo text,
  social_media_links jsonb default '{}',
  quick_links text[] default '{}',
  services_links text[] default '{}',
  contact_info jsonb default '{}',
  newsletter_title text,
  newsletter_description text,
  copyright_text text,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- ANALYTICS TABLES
-- =========================================================================

create table if not exists visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  user_agent text,
  referrer text,
  device_type text,
  browser text,
  os text,
  screen_resolution text,
  language text,
  country text,
  city text,
  first_visit timestamptz not null default now(),
  last_visit timestamptz not null default now(),
  visit_count int not null default 1,
  total_page_views int not null default 1
);

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  page_path text,
  page_title text,
  referrer text,
  viewed_at timestamptz not null default now()
);

-- =========================================================================
-- ROW LEVEL SECURITY
-- =========================================================================
-- Pattern: anyone (anon + authenticated) can read content tables;
-- only authenticated (logged-in admin) users can write.
-- Analytics + contact tables allow public inserts but restrict reads to admins.

do $$
declare
  t text;
  public_read_tables text[] := array[
    'pages','team_members','board_members','research_experts','programs','blogs','repositories',
    'news_updates','research_publications','resources','hero_slides','home_sections',
    'core_pillars','core_values','our_impact_stats','what_we_do_focus_areas',
    'what_we_do_departments','what_we_do_programmes','strategic_litigation_cases',
    'innovation_hub_initiatives','digital_justice_services','consultancy_services',
    'services_offerings','service_highlights','contact_info','footer'
  ];
begin
  foreach t in array public_read_tables loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('drop policy if exists "authenticated write" on %I', t);
    execute format('create policy "authenticated write" on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t);
  end loop;
end $$;

-- repository_downloads: anyone can log a download, only admins can read counts
alter table repository_downloads enable row level security;
drop policy if exists "public insert" on repository_downloads;
create policy "public insert" on repository_downloads for insert with check (true);
drop policy if exists "authenticated read" on repository_downloads;
create policy "authenticated read" on repository_downloads for select using (auth.role() = 'authenticated');

-- contact_messages: anyone can submit, only admins can read/update
alter table contact_messages enable row level security;
drop policy if exists "public insert" on contact_messages;
create policy "public insert" on contact_messages for insert with check (true);
drop policy if exists "authenticated manage" on contact_messages;
create policy "authenticated manage" on contact_messages for select using (auth.role() = 'authenticated');
drop policy if exists "authenticated update" on contact_messages;
create policy "authenticated update" on contact_messages for update using (auth.role() = 'authenticated');

-- visitor_sessions / page_views: anonymous analytics tracking, admin-only reads
alter table visitor_sessions enable row level security;
drop policy if exists "public insert" on visitor_sessions;
create policy "public insert" on visitor_sessions for insert with check (true);
drop policy if exists "public update" on visitor_sessions;
create policy "public update" on visitor_sessions for update using (true);
drop policy if exists "authenticated read" on visitor_sessions;
create policy "authenticated read" on visitor_sessions for select using (auth.role() = 'authenticated');

alter table page_views enable row level security;
drop policy if exists "public insert" on page_views;
create policy "public insert" on page_views for insert with check (true);
drop policy if exists "authenticated read" on page_views;
create policy "authenticated read" on page_views for select using (auth.role() = 'authenticated');

-- =========================================================================
-- STORAGE BUCKETS
-- =========================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('team-members', 'team-members', true, 10485760, array['image/*']),
  ('hero-slides', 'hero-slides', true, 10485760, array['image/*']),
  ('news-updates', 'news-updates', true, 10485760, array['image/*']),
  ('blogs', 'blogs', true, 10485760, array['image/*']),
  ('resources', 'resources', true, 10485760, array['image/*','application/pdf']),
  ('products', 'products', true, 10485760, array['image/*']),
  ('partners', 'partners', true, 10485760, array['image/*']),
  ('research-publications', 'research-publications', true, 10485760, array['image/*','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('research-experts', 'research-experts', true, 10485760, array['image/*']),
  ('home-sections', 'home-sections', true, 10485760, array['image/*']),
  ('footer', 'footer', true, 10485760, array['image/*']),
  ('documents', 'documents', true, 10485760, null),
  ('images', 'images', true, 5242880, array['image/*'])
on conflict (id) do nothing;

drop policy if exists "public read storage" on storage.objects;
create policy "public read storage" on storage.objects for select using (true);
drop policy if exists "authenticated upload storage" on storage.objects;
create policy "authenticated upload storage" on storage.objects for insert with check (auth.role() = 'authenticated');
drop policy if exists "authenticated update storage" on storage.objects;
create policy "authenticated update storage" on storage.objects for update using (auth.role() = 'authenticated');
drop policy if exists "authenticated delete storage" on storage.objects;
create policy "authenticated delete storage" on storage.objects for delete using (auth.role() = 'authenticated');
