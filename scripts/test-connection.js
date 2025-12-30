import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables. Check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection by fetching auth user (should work even if no user is logged in)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('URL:', supabaseUrl);
    
    // Test database connection
    const { data: testData, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (dbError) {
      console.log('⚠️  Database tables may not exist yet:', dbError.message);
    } else {
      console.log('✅ Database connection successful!');
    }
    
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
  }
}

testConnection();
