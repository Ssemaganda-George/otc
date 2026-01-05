-- Additional database tables for "What We Do" related components
-- Add these tables to align all hardcoded components with database-driven content

-- Our Approach Departments table
CREATE TABLE IF NOT EXISTS our_approach_departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  key_activities TEXT[] NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Our Services table (for ServicesComponent)
CREATE TABLE IF NOT EXISTS our_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  services TEXT[] NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Offerings table (for Services component)
CREATE TABLE IF NOT EXISTS services_offerings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL,
  benefits TEXT[] NOT NULL,
  color TEXT NOT NULL,
  border_color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Highlights table (for highlights in Services component)
CREATE TABLE IF NOT EXISTS service_highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Areas of Work table (for AreasOfWork component)
CREATE TABLE IF NOT EXISTS areas_of_work (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL,
  color TEXT NOT NULL,
  border_color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategic Pillars table (for StrategicPillars component)
CREATE TABLE IF NOT EXISTS strategic_pillars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  items TEXT[] NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for all new tables
ALTER TABLE our_approach_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas_of_work ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_pillars ENABLE ROW LEVEL SECURITY;

-- Policies for new tables (admin only access)
CREATE POLICY "Allow authenticated users to manage our_approach_departments" ON our_approach_departments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage our_services" ON our_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage services_offerings" ON services_offerings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage service_highlights" ON service_highlights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage areas_of_work" ON areas_of_work FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage strategic_pillars" ON strategic_pillars FOR ALL USING (auth.role() = 'authenticated');