"use client"

import { useState } from "react"

interface AddGoalFormProps {
  onAddGoal: (title: string) => void
}

export function AddGoalForm({ onAddGoal }: AddGoalFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddGoal(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しい目標を入力"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        目標を追加
      </button>
    </form>
  )
}

