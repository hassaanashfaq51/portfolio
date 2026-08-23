import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars. Check backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function run() {
  try {
    const projectsPath = path.join(__dirname, 'projects.json');
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

    console.log(`Loaded ${projects.length} projects from projects.json`);

    // Clear all existing projects to prevent duplicates or stale records
    console.log('Clearing existing projects in Supabase...');
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .neq('id', 'non-existent-dummy-id');

    if (deleteError) {
      console.error('Error clearing projects:', deleteError.message);
      process.exit(1);
    }
    console.log('Cleared table successfully.');

    // Insert updated projects
    console.log('Inserting projects into Supabase...');
    const { data, error: insertError } = await supabase
      .from('projects')
      .insert(projects)
      .select();

    if (insertError) {
      console.error('Error inserting projects:', insertError.message);
      process.exit(1);
    }

    console.log('Successfully seeded projects! Count:', data.length);
    data.forEach(p => {
      console.log(` - [${p.id}] ${p.title} (live_url: ${p.live_url}, github_url: ${p.github_url}, created_at: ${p.created_at})`);
    });
  } catch (err) {
    console.error('Seeding caught exception:', err.message);
    process.exit(1);
  }
}

run();
