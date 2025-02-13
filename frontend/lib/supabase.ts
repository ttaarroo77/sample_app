import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables")
  throw new Error("Supabase environment variables are not set")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Supabase接続テスト
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    console.log("ユーザーがサインインしました")
  } else if (event === "SIGNED_OUT") {
    console.log("ユーザーがサインアウトしました")
  }
})

