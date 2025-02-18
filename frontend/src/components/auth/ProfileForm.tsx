'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/v0/supabase/client'
import { useRouter } from 'next/navigation'

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('ユーザーが見つかりません')

        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setUsername(data.username || '')
          setAvatarUrl(data.avatar_url || '')
        }
      } catch (error) {
        console.error('プロフィール取得エラー:', error)
        setError('プロフィールの取得に失敗しました')
      }
    }

    loadProfile()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // 開発環境では認証をバイパス
      if (process.env.NODE_ENV === 'development') {
        onSuccess()
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('認証が必要です')

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          avatar_url: avatarUrl,
        })

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('プロフィールの更新に失敗:', error)
      setError('プロフィールの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          ユーザー名
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          minLength={3}
          required
        />
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
          アバターURL
        </label>
        <input
          id="avatar"
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'プロフィール更新中...' : 'プロフィールを更新'}
      </button>
    </form>
  )
} 