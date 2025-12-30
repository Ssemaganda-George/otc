import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uokhrvetwffiyapivjjf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVva2hydmV0d2ZmaXlhcGl2ampmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDAzOTEsImV4cCI6MjA4MjU3NjM5MX0.QfolDhmIfXcmYWBz_NeqXej_1D-f5i_TvGOhOUhL3oA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addPublicReadPolicy() {
  try {
    console.log('Adding public read policy for repositories table...');

    // First, let's test if we can read from repositories (this should fail without the policy)
    const { data: testData, error: testError } = await supabase
      .from('repositories')
      .select('id')
      .limit(1);

    console.log('Current access test:', testData ? 'Has access' : 'No access', testError?.message);

    // Note: We can't create policies with the anon key, this needs to be done in Supabase dashboard
    console.log('⚠️  Cannot create policies with anon key. Please run this SQL in Supabase dashboard:');
    console.log(`
CREATE POLICY "Allow public read access to repositories"
ON repositories FOR SELECT USING (true);
    `);

  } catch (error) {
    console.error('Error:', error);
  }
}

addPublicReadPolicy();