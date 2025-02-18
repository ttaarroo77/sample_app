'use client'

import { useState } from 'react'
import { createClientSupabaseClient } from '@/lib/v0/supabase/client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      {isLoading ? 'ログアウト中...' : 'ログアウト'}
    </button>
  )
} 