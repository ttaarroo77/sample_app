import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProfileForm } from '@/components/auth/ProfileForm'
import { createClientSupabaseClient } from '@/lib/supabase/client'

// Supabaseクライアントのモック
jest.mock('@/lib/supabase/client', () => ({
  createClientSupabaseClient: jest.fn()
}))

// useRouterのモック
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn()
  })
}))

describe('ProfileForm', () => {
  const mockSupabase = {
    auth: {
      getUser: jest.fn()
    },
    from: jest.fn()
  }

  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks()
    ;(createClientSupabaseClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('初期プロフィールデータを読み込む', async () => {
    // ユーザーデータのモック
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null
    })

    // プロフィールデータのモック
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { username: 'testUser', avatar_url: 'test-url' },
            error: null
          })
        })
      })
    })

    render(<ProfileForm />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('testUser')).toBeInTheDocument()
      expect(screen.getByDisplayValue('test-url')).toBeInTheDocument()
    })
  })

  it('プロフィール更新が成功する', async () => {
    // ユーザーデータのモック
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null
    })

    // 更新処理のモック
    mockSupabase.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null })
      })
    })

    render(<ProfileForm />)

    // フォームの入力
    fireEvent.change(screen.getByLabelText('ユーザー名'), {
      target: { value: 'newUsername' }
    })

    // 送信
    fireEvent.click(screen.getByText('プロフィールを更新'))

    await waitFor(() => {
      expect(screen.getByText('プロフィールを更新しました')).toBeInTheDocument()
    })
  })

  it('ユーザー名が3文字未満の場合にエラーを表示', async () => {
    render(<ProfileForm />)

    // 短いユーザー名を入力
    fireEvent.change(screen.getByLabelText('ユーザー名'), {
      target: { value: 'ab' }
    })

    // 送信
    fireEvent.click(screen.getByText('プロフィールを更新'))

    expect(screen.getByText('ユーザー名は3文字以上で入力してください')).toBeInTheDocument()
  })
}) 