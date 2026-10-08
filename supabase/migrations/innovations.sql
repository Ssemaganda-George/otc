-- =========================================================================
-- INNOVATIONS MIGRATION (Our Innovations - Innovation Hub page)
-- =========================================================================
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- Innovations table
create table if not exists innovations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  logo_url text,
  website_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Add website column if the table already exists
alter table innovations add column if not exists website_url text;

-- Insert sample innovations (Our Innovations on /innovation-hub)
insert into innovations (name, description, logo_url, website_url, display_order, is_active) values
  ('WazaziConnect', 'A digital platform connecting parents and caregivers with trusted health and development resources.', null, null, 1, true),
  ('HappyFarma', 'A technology solution supporting farmers with access to information, inputs and markets.', null, null, 2, true)
on conflict (id) do nothing;

-- Storage bucket for innovation logos (run only if the bucket does not exist yet)
insert into storage.buckets (id, name, public)
values ('innovations', 'innovations', true)
on conflict (id) do nothing;

-- Enable Row Level Security (RLS)
alter table innovations enable row level security;

-- Create policies
create policy "Allow public read access to innovations" on innovations
  for select using (true);

create policy "Allow authenticated users to manage innovations" on innovations
  for all using (auth.role() = 'authenticated');
