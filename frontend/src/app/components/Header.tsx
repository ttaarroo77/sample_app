"use client"

import Link from "next/link"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { LogoutButton } from "@/components/auth/LogoutButton"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI駆動 自己実現サポート</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <Link
              href="/mypage"
              className="text-white hover:text-gray-200"
              aria-label="マイページ"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}

