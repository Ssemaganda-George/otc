-- =========================================================================
-- NEWSLETTER SUBSCRIBERS MIGRATION
-- =========================================================================
-- Stores newsletter emails so they can be managed and broadcast from the
-- admin panel (/admin/newsletter). Run in Supabase SQL Editor.

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  source text not null default 'website',
  is_active boolean not null default true,
  subscribed_at timestamptz not null default now()
);

-- Index for fast search/broadcast queries
create index if not exists newsletter_subscribers_email_idx
  on newsletter_subscribers (email);

-- Anyone can subscribe (public insert)
alter table newsletter_subscribers enable row level security;

drop policy if exists "Allow public to subscribe to newsletter" on newsletter_subscribers;
create policy "Allow public to subscribe to newsletter" on newsletter_subscribers
  for insert with check (is_active = true);

-- Only authenticated admins can read/manage the list
drop policy if exists "Allow authenticated users to manage newsletter subscribers" on newsletter_subscribers;
create policy "Allow authenticated users to manage newsletter subscribers" on newsletter_subscribers
  for all using (auth.role() = 'authenticated');
