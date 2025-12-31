import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertResearchExperts() {
  try {
    console.log('Updating research experts data with array fields...');

    // Update existing research experts to add empty arrays for the array fields
    const { error: updateError } = await supabase
      .from('research_experts')
      .update({
        expertise: [],
        education: [],
        experience: [],
        publications: []
      })
      .is('expertise', null); // Only update records where expertise is null

    if (updateError) {
      console.error('Error updating research experts:', updateError);
      return;
    }

    console.log('Research experts data updated successfully!');
    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

insertResearchExperts();