'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/v0/supabase/client'

type Goal = {
  id: number
  title: string
  description: string
  type: 'big' | 'medium' | 'small'
  status: 'todo' | 'doing' | 'done'
  color: string
}

type GoalFormProps = {
  goal?: Goal | null  // 編集時に渡される目標データ
  onSuccess: () => void
  onCancel: () => void
}

export function GoalForm({ goal, onSuccess, onCancel }: GoalFormProps) {
  const [title, setTitle] = useState(goal?.title ?? '')
  const [description, setDescription] = useState(goal?.description ?? '')
  const [type, setType] = useState<'big' | 'medium' | 'small'>(goal?.type ?? 'medium')
  const [color, setColor] = useState(goal?.color ?? '#4CAF50')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClientSupabaseClient()

  // 編集時のデータ更新
  useEffect(() => {
    if (goal) {
      setTitle(goal.title)
      setDescription(goal.description)
      setType(goal.type)
      setColor(goal.color)
    }
  }, [goal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // 認証チェックを一時的にコメントアウト
      // const { data: { user } } = await supabase.auth.getUser()
      // if (!user) throw new Error('認証が必要です')

      if (goal) {
        // 編集モード
        const { error } = await supabase
          .from('goals')
          .update({
            title,
            description,
            type,
            color,
          })
          .eq('id', goal.id)

        if (error) throw error
      } else {
        // 新規作成モード
        const mockUser = {
          id: '00000000-0000-0000-0000-000000000000',
          email: 'test@example.com'
        }

        const { error } = await supabase
          .from('goals')
          .insert({
            user_id: mockUser.id,
            title,
            description,
            type,
            status: 'todo',
            color,
          })

        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('目標の保存に失敗:', error)
      setError('目標の保存に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          タイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          説明
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          タイプ
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'big' | 'medium' | 'small')}
          className="w-full p-2 border rounded"
        >
          <option value="big">Big</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          カラー
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          disabled={isSubmitting}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (goal ? '更新中...' : '作成中...') : (goal ? '更新' : '作成')}
        </button>
      </div>
    </form>
  )
} 