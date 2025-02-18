import { SignUpForm } from '@/components/auth/SignUpForm'
import { createServerSupabaseClient } from '@/lib/v0/supabase/server'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
  const supabase = createServerSupabaseClient()
  
  // すでにログインしている場合はリダイレクト
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/todos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウント登録
          </h2>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
} 