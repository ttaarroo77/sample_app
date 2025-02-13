'use client'

import { useState } from "react"
import Image from "next/image"
import { User } from "@/components/icons"
import { Button } from "@/components/ui/button" 

export default function MyPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">マイページ設定</h1>
      
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src="/default-avatar.png"
              alt="アバター"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <button className="text-blue-500 hover:underline">
            （クリックして変更）
          </button>
        </div>
      </div>

      {/* フォーム部分 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ユーザー名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="ユーザー名"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="パスワード"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            設定を保存
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            戻る
          </button>
        </div>
      </div>
    </div>
  )
} 