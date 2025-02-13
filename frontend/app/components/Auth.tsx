"use client"

import { useState, type React } from "react"
import { supabase } from "@/lib/supabase"

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      alert(error.message)
    } else {
      alert("ログインリンクをメールで確認してください！")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  )
}

