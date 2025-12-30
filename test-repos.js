import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uokhrvetwffiyapivjjf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVva2hydmV0d2ZmaXlhcGl2ampmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDAzOTEsImV4cCI6MjA4MjU3NjM5MX0.QfolDhmIfXcmYWBz_NeqXej_1D-f5i_TvGOhOUhL3oA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testRepositories() {
  try {
    console.log('Testing repositories access...');

    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error fetching repositories:', error);
      return;
    }

    console.log('✅ Successfully fetched repositories!');
    console.log(`Found ${data?.length || 0} repositories`);

    if (data && data.length > 0) {
      console.log('Sample repository:', {
        id: data[0].id,
        title: data[0].title,
        is_active: data[0].is_active
      });
    }

  } catch (error) {
    console.error('❌ Failed to test repositories:', error);
  }
}

testRepositories();