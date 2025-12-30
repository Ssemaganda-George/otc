import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uokhrvetwffiyapivjjf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVva2hydmV0d2ZmaXlhcGl2ampmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDAzOTEsImV4cCI6MjA4MjU3NjM5MX0.QfolDhmIfXcmYWBz_NeqXej_1D-f5i_TvGOhOUhL3oA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createResearchExpertsTable() {
  try {
    // Create the research_experts table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
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
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE research_experts ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Allow authenticated users to manage research_experts" ON research_experts;
        CREATE POLICY "Allow authenticated users to manage research_experts" ON research_experts FOR ALL USING (auth.role() = 'authenticated');
      `
    })

    if (error) {
      console.error('Error creating table:', error)
    } else {
      console.log('Research experts table created successfully!')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

createResearchExpertsTable()