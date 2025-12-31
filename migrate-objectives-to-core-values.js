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

async function migrateObjectivesToCoreValues() {
  try {
    console.log('Migrating objectives to core values...');

    // Check if there's an objectives section in home_sections
    const { data: objectivesSection, error: fetchError } = await supabase
      .from('home_sections')
      .select('id, title, content')
      .eq('section_type', 'objectives')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching objectives section:', fetchError);
      return;
    }

    if (objectivesSection && objectivesSection.content) {
      console.log('Found objectives section, migrating to core values...');

      // Parse the objectives content (assuming it's line-separated)
      const objectives = objectivesSection.content
        .split('\n')
        .filter(item => item.trim())
        .map((objective, index) => ({
          title: objective.replace(/^•\s*/, '').trim(),
          description: `Core value ${index + 1}: ${objective.replace(/^•\s*/, '').trim()}`,
          display_order: index + 1,
          is_active: true
        }));

      if (objectives.length > 0) {
        const { error: insertError } = await supabase
          .from('core_values')
          .insert(objectives);

        if (insertError) {
          console.error('Error inserting core values:', insertError);
          return;
        }

        console.log(`Successfully migrated ${objectives.length} objectives to core values`);

        // Optionally delete the old objectives section
        const { error: deleteError } = await supabase
          .from('home_sections')
          .delete()
          .eq('section_type', 'objectives');

        if (deleteError) {
          console.error('Error deleting old objectives section:', deleteError);
        } else {
          console.log('Deleted old objectives section');
        }
      }
    } else {
      console.log('No objectives section found to migrate');
    }

    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateObjectivesToCoreValues();
