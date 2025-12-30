import { createClient } from '@supabase/supabase-js';

// Replace with your actual service role key (keep secret!)
const supabaseUrl = 'https://uokhrvetwffiyapivjjf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVva2hydmV0d2ZmaXlhcGl2ampmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzAwMDM5MSwiZXhwIjoyMDgyNTc2MzkxfQ.jZkSyeXSZqu85l_Kf5FmBeknZW7d4dbXYsZo5Wv0u3U'; // Get from Supabase Dashboard > Settings > API

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    // Create user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@onetechconnect.org',
      password: 'Frank@!234',
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      console.error('Error creating user in auth:', authError);
      return;
    }

    console.log('Admin user created in auth:', authData.user.email);

    // Insert profile into users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: 'admin@onetechconnect.org',
        full_name: 'Super Admin',
        role: 'admin'
      });

    if (profileError) {
      console.error('Error inserting profile:', profileError);
    } else {
      console.log('Admin profile inserted successfully');
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createAdminUser();
