require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function createBucket() {
  try {
    console.log('Creating research-publications bucket...');
    
    const { data, error } = await supabase.storage.createBucket('research-publications', {
      public: true,
      allowedMimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket already exists');
      } else {
        console.log('❌ Error creating bucket:', error.message);
      }
    } else {
      console.log('✅ Bucket created successfully');
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

createBucket();
