import { AuthForm } from '@/components/auth/AuthForm'
import { createServerSupabaseClient } from '@/lib/v0/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = createServerSupabaseClient()
  
  // すでにログインしている場合はリダイレクト
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/kanban')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ログイン
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  )
} 