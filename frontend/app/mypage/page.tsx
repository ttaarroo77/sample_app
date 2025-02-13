"use client"

import { useState } from "react"
import { User } from "lucide-react"
import Link from "next/link"

export default function MyPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [avatarImage, setAvatarImage] = useState("/default-avatar.png")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここでバリデーションと保存のロジックを実装
    console.log("Settings saved:", { userName, password, avatarImage })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">マイページ設定</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {avatarImage ? (
                      <img src={avatarImage || "/placeholder.svg"} alt="Avatar" className="w-16 h-16 rounded-full" />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <label className="block">
                    <span className="text-gray-700">アバター画像</span>
                    <span className="ml-2 text-sm text-gray-500">（クリックして変更）</span>
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span className="text-gray-700">ユーザー名</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="ユーザー名"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span className="text-gray-700">パスワード</span>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="パスワード"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  type="submit"
                >
                  設定を保存
                </button>
                <Link
                  href="/"
                  className="bg-gray-300 flex justify-center items-center w-full text-gray-700 px-4 py-3 rounded-md focus:outline-none"
                >
                  戻る
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

