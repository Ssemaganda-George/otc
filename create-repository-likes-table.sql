-- Create repository_likes table
CREATE TABLE IF NOT EXISTS repository_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_repository_likes_repository_id ON repository_likes(repository_id);
CREATE INDEX IF NOT EXISTS idx_repository_likes_created_at ON repository_likes(created_at);

-- Enable Row Level Security
ALTER TABLE repository_likes ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous likes (for public repositories)
CREATE POLICY "Allow anonymous likes on repositories" ON repository_likes FOR INSERT WITH CHECK (true);

-- Policy to allow reading likes
CREATE POLICY "Allow reading repository likes" ON repository_likes FOR SELECT USING (true);