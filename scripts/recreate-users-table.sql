-- Drop the existing users table (be careful - this will delete all data)
DROP TABLE IF EXISTS users CASCADE;

-- Recreate the users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all users" ON users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Insert the admin user (IMPORTANT: Replace 'YOUR_ACTUAL_USER_ID_HERE' with the real UUID from Supabase Auth > Users)
INSERT INTO users (id, email, full_name, role) 
VALUES ('YOUR_ACTUAL_USER_ID_HERE', 'admin@onetechconnect.org', 'Super Admin', 'admin');
