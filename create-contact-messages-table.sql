-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Contact messages policies
CREATE POLICY "Allow public to insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read contact messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update contact messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');