-- Complete SQL script to create all required tables for OTC Admin Panel
-- Run this in Supabase SQL Editor

-- Users table for storing user profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Policy for users to manage their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Policy for admins to manage all users
CREATE POLICY "Admins can manage all users" ON users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Pages table for storing page content
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  slug TEXT UNIQUE NOT NULL,
  hero_title TEXT,
  hero_description TEXT,
  programme_overview TEXT,
  goal TEXT,
  objectives JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  expertise TEXT[],
  education TEXT[],
  experience TEXT[],
  social JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research experts table
CREATE TABLE IF NOT EXISTS research_experts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  expertise TEXT[],
  education TEXT[],
  experience TEXT[],
  publications TEXT[],
  social JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products/Services table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs/News table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT,
  publish_date TIMESTAMP WITH TIME ZONE,
  read_time INTEGER,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  file_url TEXT,
  thumbnail TEXT,
  category TEXT,
  tags TEXT[],
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info table (single record)
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT DEFAULT 'Contact Us',
  subtitle TEXT DEFAULT 'Get in touch with our team',
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_media JSONB,
  office_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer table (single record)
CREATE TABLE IF NOT EXISTS footer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT DEFAULT 'OneTechConnect',
  organization_description TEXT,
  logo TEXT,
  social_media_links JSONB,
  quick_links JSONB,
  services_links JSONB,
  contact_info JSONB,
  newsletter_title TEXT DEFAULT 'Stay Updated',
  newsletter_description TEXT,
  copyright_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home sections table (About Us, Mission, Vision)
CREATE TABLE IF NOT EXISTS home_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image TEXT,
  link_url TEXT,
  link_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  section_type TEXT, -- 'hero', 'about', 'pillars', 'impact', 'testimonials', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Core values table
CREATE TABLE IF NOT EXISTS core_values (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News updates table
CREATE TABLE IF NOT EXISTS news_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  pdf_url TEXT,
  gallery_images TEXT[],
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research publications table
CREATE TABLE IF NOT EXISTS research_publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  authors TEXT[],
  publish_date DATE,
  category TEXT,
  abstract TEXT,
  thumbnail TEXT,
  download_url TEXT,
  view_url TEXT,
  citation_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- What We Do - Focus Areas table
CREATE TABLE IF NOT EXISTS what_we_do_focus_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- What We Do - Departments table
CREATE TABLE IF NOT EXISTS what_we_do_departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- What We Do - Programmes table
CREATE TABLE IF NOT EXISTS what_we_do_programmes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  objectives JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Our Impact Statistics table
CREATE TABLE IF NOT EXISTS our_impact_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE what_we_do_focus_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE what_we_do_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE what_we_do_programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_impact_stats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for CMS tables
DROP POLICY IF EXISTS "Allow authenticated users to manage pages" ON pages;
DROP POLICY IF EXISTS "Allow authenticated users to manage team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to manage programs" ON programs;
DROP POLICY IF EXISTS "Allow authenticated users to manage research_experts" ON research_experts;
DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to manage hero_slides" ON hero_slides;
DROP POLICY IF EXISTS "Allow authenticated users to manage blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated users to manage resources" ON resources;
DROP POLICY IF EXISTS "Allow authenticated users to manage contact_info" ON contact_info;
DROP POLICY IF EXISTS "Allow authenticated users to manage footer" ON footer;
DROP POLICY IF EXISTS "Allow authenticated users to manage home_sections" ON home_sections;
DROP POLICY IF EXISTS "Allow authenticated users to manage news_updates" ON news_updates;
DROP POLICY IF EXISTS "Allow authenticated users to manage research_publications" ON research_publications;
DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_focus_areas" ON what_we_do_focus_areas;
DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_departments" ON what_we_do_departments;
DROP POLICY IF EXISTS "Allow authenticated users to manage what_we_do_programmes" ON what_we_do_programmes;
DROP POLICY IF EXISTS "Allow authenticated users to manage our_impact_stats" ON our_impact_stats;

-- Create policies for CMS tables (allow authenticated users to manage all content)
CREATE POLICY "Allow authenticated users to manage pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage research_experts" ON research_experts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage hero_slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage resources" ON resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage footer" ON footer FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage home_sections" ON home_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public to read home_sections" ON home_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage core_values" ON core_values FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public to read core_values" ON core_values FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage news_updates" ON news_updates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage research_publications" ON research_publications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage what_we_do_focus_areas" ON what_we_do_focus_areas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage what_we_do_departments" ON what_we_do_departments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage what_we_do_programmes" ON what_we_do_programmes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage our_impact_stats" ON our_impact_stats FOR ALL USING (auth.role() = 'authenticated');

-- Visitor analytics tables
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,
  language TEXT,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  visit_count INTEGER DEFAULT 1,
  total_page_views INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES visitor_sessions(session_id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  time_on_page INTEGER, -- in seconds
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_last_visit ON visitor_sessions(last_visit);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);

-- Enable Row Level Security for analytics tables
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Analytics policies
CREATE POLICY "Allow public to insert visitor sessions" ON visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read visitor sessions" ON visitor_sessions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public to insert page views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read page views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');