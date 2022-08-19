import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing API keys for Supabase')
}
else
{
  // throw new Error(supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
