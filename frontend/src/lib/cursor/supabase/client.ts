import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '@/types/supabase'

export const createClientSupabaseClient = () =>
  createClientComponentClient<Database>()

// クライアントサイドでの使用のためのヘルパー関数
export const getSupabaseClient = () => {
  const supabase = createClientSupabaseClient()
  return supabase
} 