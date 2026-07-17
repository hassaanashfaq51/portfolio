import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseServiceKey && supabaseUrl.includes('.supabase.co'));

let supabase = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    console.log('Backend initialized Supabase Client successfully.');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error.message);
  }
} else {
  console.log('Supabase env credentials not provided or empty. Running in JSON Database Fallback mode.');
}

export { supabase };
