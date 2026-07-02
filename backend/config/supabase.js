import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

// Server-side client. Keep this key out of browser code.
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Publishable client for non-privileged server-side reads, if needed.
export const supabase = supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : supabaseAdmin

export default supabaseAdmin
