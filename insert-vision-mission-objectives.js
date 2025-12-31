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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function insertVisionMissionObjectives() {
  try {
    console.log('Inserting Vision, Mission & Objectives content...');

    // Insert Vision, Mission & Objectives data
    const sections = [
      {
        section_type: 'vision',
        title: 'Our Vision',
        content: 'To be the leading African organization driving digital transformation that respects fundamental human rights and promotes social justice across the continent.',
        display_order: 1,
        is_active: true
      },
      {
        section_type: 'mission',
        title: 'Our Mission',
        content: `OneTechConnect (OTC) advances digital transformation in health, sexual reproductive health, finance, agriculture, and development while ensuring respect for fundamental human rights and social justice across Africa.

We work to bridge the digital divide, promote ethical technology use, and advocate for policies that protect digital rights and ensure equitable access to technology for all Africans.`,
        display_order: 2,
        is_active: true
      },
      {
        section_type: 'objectives',
        title: 'Our Objectives',
        content: `Promote digital literacy and capacity building across African communities
Advocate for policies that protect digital rights and privacy
Develop innovative solutions for healthcare, finance, and agricultural challenges
Foster partnerships between technology providers, governments, and civil society
Ensure ethical and inclusive digital transformation processes`,
        display_order: 3,
        is_active: true
      }
    ];

    // Check if sections already exist
    const { data: existingSections, error: fetchError } = await supabase
      .from('home_sections')
      .select('id, section_type')
      .in('section_type', ['vision', 'mission', 'objectives']);

    if (fetchError) {
      console.error('Error fetching existing sections:', fetchError);
      return;
    }

    const existingTypes = new Set(existingSections?.map(s => s.section_type) || []);

    // Insert or update sections
    for (const section of sections) {
      if (existingTypes.has(section.section_type)) {
        // Update existing section
        const { error: updateError } = await supabase
          .from('home_sections')
          .update({
            title: section.title,
            content: section.content,
            display_order: section.display_order,
            is_active: section.is_active
          })
          .eq('section_type', section.section_type);

        if (updateError) {
          console.error(`Error updating ${section.section_type}:`, updateError);
        } else {
          console.log(`Updated ${section.section_type} section`);
        }
      } else {
        // Insert new section
        const { error: insertError } = await supabase
          .from('home_sections')
          .insert([section]);

        if (insertError) {
          console.error(`Error inserting ${section.section_type}:`, insertError);
        } else {
          console.log(`Inserted ${section.section_type} section`);
        }
      }
    }

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

insertVisionMissionObjectives();