-- Insert admin profile into users table
-- IMPORTANT: Replace 'YOUR_ACTUAL_USER_ID_HERE' with the real UUID from Supabase Auth > Users
INSERT INTO users (id, email, full_name, role) 
VALUES ('YOUR_ACTUAL_USER_ID_HERE', 'admin@onetechconnect.org', 'Super Admin', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
