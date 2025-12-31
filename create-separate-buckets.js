#!/usr/bin/env node

/**
 * Create Separate Storage Buckets Script
 *
 * This script creates all the required separate storage buckets for the OTC application.
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

// List of buckets to create
const buckets = [
  'team-members',
  'hero-slides',
  'news-updates',
  'blogs',
  'resources',
  'products',
  'research-publications',
  'research-experts',
  'home-sections',
  'footer'
];

async function createBuckets() {
  console.log('🚀 Creating separate storage buckets...\n');

  for (const bucketName of buckets) {
    try {
      console.log(`📦 Creating bucket: ${bucketName}`);

      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make buckets public for web access
        allowedMimeTypes: ['image/*', 'application/pdf'], // Allow images and PDFs
        fileSizeLimit: 10485760 // 10MB limit
      });

      if (error) {
        if (error.message.includes('already exists')) {
          console.log(`✅ Bucket '${bucketName}' already exists`);
        } else {
          console.log(`❌ Failed to create bucket '${bucketName}':`, error.message);
        }
      } else {
        console.log(`✅ Successfully created bucket '${bucketName}'`);
      }
    } catch (error) {
      console.log(`❌ Error creating bucket '${bucketName}':`, error.message);
    }
  }

  console.log('\n🎉 Bucket creation process completed!');
  console.log('You can now upload images to your admin panels.');
}

createBuckets().catch(console.error);