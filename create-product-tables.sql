-- Product Category Tables for Admin Panel
-- Run this in Supabase SQL Editor to create the new product category tables

-- Strategic Litigation Cases table
CREATE TABLE IF NOT EXISTS strategic_litigation_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_number INTEGER NOT NULL,
  case_name TEXT NOT NULL,
  issues TEXT NOT NULL,
  country TEXT NOT NULL,
  year_filed TEXT NOT NULL,
  status TEXT NOT NULL,
  status_type TEXT DEFAULT 'pending' CHECK (status_type IN ('pending', 'active', 'success')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Innovation Hub Initiatives table
CREATE TABLE IF NOT EXISTS innovation_hub_initiatives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT, -- For storing icon identifier
  is_coming_soon BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Digital Justice Services table
CREATE TABLE IF NOT EXISTS digital_justice_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  features TEXT[], -- Array of features
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultancy Services table
CREATE TABLE IF NOT EXISTS consultancy_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  service_type TEXT, -- 'training', 'advisory', 'research', etc.
  features TEXT[],
  pricing_info TEXT,
  contact_info TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for product tables
ALTER TABLE strategic_litigation_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_hub_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_justice_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultancy_services ENABLE ROW LEVEL SECURITY;

-- Policies for product tables (admin only access)
CREATE POLICY "Allow authenticated users to manage strategic litigation cases" ON strategic_litigation_cases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage innovation hub initiatives" ON innovation_hub_initiatives FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage digital justice services" ON digital_justice_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage consultancy services" ON consultancy_services FOR ALL USING (auth.role() = 'authenticated');