-- Create repository_reshares table
CREATE TABLE IF NOT EXISTS repository_reshares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_repository_reshares_repository_id ON repository_reshares(repository_id);
CREATE INDEX IF NOT EXISTS idx_repository_reshares_created_at ON repository_reshares(created_at);

-- Enable Row Level Security
ALTER TABLE repository_reshares ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous reshares (for public repositories)
CREATE POLICY "Allow anonymous reshares on repositories" ON repository_reshares FOR INSERT WITH CHECK (true);

-- Policy to allow reading reshares
CREATE POLICY "Allow reading repository reshares" ON repository_reshares FOR SELECT USING (true);