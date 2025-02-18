'use client'

import { ProfileForm } from '@/components/auth/ProfileForm'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          プロフィール設定
        </h1>
        <ProfileForm />
      </div>
    </div>
  )
} 