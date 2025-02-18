import { createClient } from '@supabase/supabase-js'

export const createClientSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials are not provided')
  }

  return createClient(supabaseUrl, supabaseKey)
}