const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

async function createTestUser() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    console.log('テストユーザー作成を開始...')
    const { data, error } = await supabase.auth.signUp({
      email: 'test4@example.com',
      password: 'password123',
      options: {
        data: {
          username: 'testUser'
        }
      }
    })

    if (error) {
      console.error('エラー詳細:', {
        message: error.message,
        status: error.status,
        name: error.name,
        details: error
      })
      return
    }

    console.log('テストユーザー作成成功:', data)
  } catch (error) {
    console.error('予期せぬエラー:', error)
  }
}

createTestUser()