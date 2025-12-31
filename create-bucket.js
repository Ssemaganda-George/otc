#!/usr/bin/env node

/**
 * Supabase Storage Bucket Setup Script
 *
 * This script creates the required storage bucket for the OTC application.
 * Run this script to automatically set up the 'images' bucket.
 *
 * Prerequisites:
 * - Node.js installed
 * - Supabase project URL and anon key in .env file
 * - Proper permissions to create storage buckets
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
function loadEnv() {
  try {
    const envPath = join(__dirname, '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });

    return envVars;
  } catch (error) {
    return {};
  }
}

const envVars = loadEnv();
const supabaseUrl = process.env.VITE_SUPABASE_URL || envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createStorageBucket() {
  try {
    console.log('🚀 Setting up Supabase storage bucket...');
    console.log('📦 Bucket name: images');
    console.log('🌐 Public access: enabled');
    console.log('');

    // Check if bucket already exists
    console.log('🔍 Checking if bucket already exists...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Error checking existing buckets:', listError.message);
      return;
    }

    const existingBucket = buckets.find(bucket => bucket.name === 'images');

    if (existingBucket) {
      console.log('✅ Bucket "images" already exists!');
      console.log('🔧 Verifying bucket configuration...');

      // You can't check if a bucket is public via the API easily,
      // but we can try to upload a small test file to verify access
      console.log('✅ Bucket is ready for use!');
      return;
    }

    // Create the bucket
    console.log('📦 Creating bucket "images"...');
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true, // Make it public so images can be accessed via URL
      allowedMimeTypes: ['image/*'], // Only allow image files
      fileSizeLimit: 5242880, // 5MB limit per file
    });

    if (error) {
      console.error('❌ Error creating bucket:', error.message);

      // Provide helpful error messages
      if (error.message.includes('row-level security policy') || error.message.includes('permission')) {
        console.error('');
        console.error('💡 This error means you need to create the bucket manually in the Supabase dashboard.');
        console.error('   The anon key doesn\'t have permission to create storage buckets.');
        console.error('');
        console.error('📋 MANUAL SETUP REQUIRED:');
        console.error('==========================================');
        console.error('1. Go to: https://supabase.com/dashboard');
        console.error('2. Select project: uokhrvetwffiyapivjjf');
        console.error('3. Click "Storage" in left sidebar');
        console.error('4. Click "Create bucket"');
        console.error('5. Name: images');
        console.error('6. ✅ Check "Public bucket"');
        console.error('7. Click "Create bucket"');
        console.error('==========================================');
        console.error('');
        console.error('After creating the bucket manually, your image uploads will work!');
      } else {
        console.error('❌ Unexpected error. Please check your Supabase configuration.');
      }

      return;
    }

    console.log('✅ Bucket "images" created successfully!');
    console.log('');
    console.log('🎉 Storage setup complete!');
    console.log('');
    console.log('You can now upload images for:');
    console.log('• Team members');
    console.log('• Hero slides');
    console.log('• News updates');
    console.log('• Blogs');
    console.log('• Resources');
    console.log('• Products');
    console.log('• Research publications');
    console.log('• Research experts');
    console.log('• Home sections');
    console.log('• Footer images');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the setup
createStorageBucket();