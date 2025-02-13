"use client"

import { useState, type React } from "react"

interface GoalBreakdownProps {
  goal: { id: number; title: string; subgoals: string[] }
  onBreakdown: (goalId: number, subgoals: string[]) => void
}

export function GoalBreakdown({ goal, onBreakdown }: GoalBreakdownProps) {
  const [mdContent, setMdContent] = useState("")
  const [prompt, setPrompt] = useState("")
  const [showPrompt, setShowPrompt] = useState(true)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMdContent(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleBreakdown = () => {
    // ここでAI APIを呼び出し、目標を分解します
    // 今回はダミーの実装として、入力されたmdContentまたはpromptを直接サブゴールとして使用します
    const newSubgoals = (mdContent || prompt).split("\n").filter((line) => line.trim() !== "")
    onBreakdown(goal.id, newSubgoals)
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="text-lg font-semibold mb-2">「{goal.title}」の細分化</h3>
      <div className="mb-4">
        <label className="block mb-2">
          MDファイルをアップロード:
          <input type="file" accept=".md" onChange={handleFileUpload} className="mt-1" />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          <input type="checkbox" checked={showPrompt} onChange={() => setShowPrompt(!showPrompt)} className="mr-2" />
          プロンプトを表示
        </label>
        {showPrompt && (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="プロンプトを入力してください"
            className="w-full p-2 border rounded"
            rows={4}
          />
        )}
      </div>
      <button onClick={handleBreakdown} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        目標を細分化
      </button>
    </div>
  )
}

