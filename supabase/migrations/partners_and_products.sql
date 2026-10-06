-- =========================================================================
-- PARTNERS & PRODUCTS MIGRATION
-- =========================================================================
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- Partners table
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  description text,
  image_url text,
  link_url text,
  link_text text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Insert sample partners
insert into partners (name, logo_url, website_url, display_order, is_active) values
  ('Ministry of Health', '/partners/ministry-of-health.png', 'https://health.go.ug', 1, true),
  ('Personal Data Protection Office', '/partners/personal-data-protection-office.png', null, 2, true),
  ('Ministry of Science & Innovation', '/partners/ministry-of-science-innovation.png', null, 3, true),
  ('ADIJUST', '/partners/adijust.png', null, 4, true)
on conflict (id) do nothing;

-- Insert sample products
insert into products (name, tagline, description, image_url, link_url, link_text, display_order, is_active) values
  ('OTC Innovation Hub', 'Developing, connecting and scaling African innovation.', 'A pan-African platform for developing, supporting and scaling innovative solutions to Africa''s challenges and opportunities.', null, '/innovation-hub', 'Explore Innovation Hub', 1, true),
  ('OTC Academy', 'Research, learning and capability development.', 'Research, learning and capability development for African innovators.', null, '/academy', 'Explore Academy', 2, true),
  ('Legal & Business Support Centre', 'Protecting innovations and structuring opportunity.', 'Protecting innovations and structuring opportunity through legal and business support.', null, '/legal-business-support', 'Explore Legal Support', 3, true),
  ('OTC Fund', 'Capital for African innovation and innovators.', 'Capital for African innovation and innovators.', null, '/fund', 'Explore Fund', 4, true),
  ('OTC Media Hub', 'Creating, telling and amplifying African stories.', 'Creating, telling and amplifying African stories through media.', null, '/media', 'Explore Media Hub', 5, true)
on conflict (id) do nothing;

-- Enable Row Level Security (RLS)
alter table partners enable row level security;
alter table products enable row level security;

-- Create policies for partners
create policy "Allow public read access to partners" on partners
  for select using (true);

create policy "Allow authenticated users to manage partners" on partners
  for all using (auth.role() = 'authenticated');

-- Create policies for products
create policy "Allow public read access to products" on products
  for select using (true);

create policy "Allow authenticated users to manage products" on products
  for all using (auth.role() = 'authenticated');
