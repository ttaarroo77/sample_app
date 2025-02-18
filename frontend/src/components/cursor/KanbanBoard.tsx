"use client"

import { useState } from "react"
import { Upload, Download, Eye, EyeOff, Settings } from "lucide-react"
import Link from "next/link"
import { Column } from "./Column"
import type { GoalType, BoardType, ColorType } from "@/types/goal"
import { ... } from '@/lib/cursor/supabase'
import { ... } from '@/lib/cursor/utils'

const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color as ColorType
}

export function KanbanBoard() {
  const [goals, setGoals] = useState<GoalType[]>([
    { id: 1, title: "プログラミングを修める", type: "big", boardId: 1, color: "gray" },
    { id: 2, title: "pythonを修める", type: "big", boardId: 1, color: "red" },
    { id: 3, title: "V0を修める", type: "big", boardId: 1, color: "yellow" },
    { id: 4, title: "AI駆動開発の本を読んでみる", type: "big", boardId: 1, color: "purple" },

    // 中目標の付箋（pythonを修める）
    { id: 5, title: "基礎文法", type: "medium", boardId: 2, color: "red" },
    { id: 6, title: "collaboratory", type: "medium", boardId: 2, color: "red" },

    // 中目標の付箋（V0を修める）
    { id: 7, title: "Trello風Todoを作る", type: "medium", boardId: 3, color: "yellow" },
    { id: 8, title: "テンプレートでアプリ開発", type: "medium", boardId: 3, color: "yellow" },
  ])

  const [boards, setBoards] = useState<BoardType[]>([
    // 大目標の看板
    { id: 1, title: "大目標", type: "big", color: "gray" },

    // 中目標の看板（大目標の付箋から自動生成）
    { id: 2, title: "pythonを修める", type: "medium", color: "red", parentGoalId: 2 },
    { id: 3, title: "V0を修める", type: "medium", color: "yellow", parentGoalId: 3 },
    { id: 4, title: "AI駆動開発の本を読んでみる", type: "medium", color: "purple", parentGoalId: 4 },

    // 小目標の看板（中目標の付箋から自動生成）
    { id: 5, title: "基礎文法", type: "small", color: "red", parentGoalId: 5 },
    { id: 6, title: "collaboratory", type: "small", color: "red", parentGoalId: 6 },
    { id: 7, title: "Trello風Todoを作る", type: "small", color: "yellow", parentGoalId: 7 },
  ])

  const [showPrompt, setShowPrompt] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [autoGenerate, setAutoGenerate] = useState(false)

  const addGoal = (type: "big" | "medium" | "small", boardId: number) => {
    const board = boards.find((b) => b.id === boardId)
    if (!board) return

    const newGoalId = Math.max(0, ...goals.map((g) => g.id)) + 1
    const newGoal: GoalType = {
      id: newGoalId,
      title: `新しい${type}目標`,
      type,
      boardId,
      color: type === "big" ? getRandomColor() : board.color, // 大目標の場合はランダムな色、それ以外は親の色を継承
      isNew: true,
    }

    setGoals([...goals, newGoal])

    // 付箋に対応する看板を自動生成
    if (type === "big" || type === "medium") {
      const newBoardType = type === "big" ? "medium" : "small"
      const newBoard: BoardType = {
        id: Math.max(0, ...boards.map((b) => b.id)) + 1,
        title: newGoal.title,
        type: newBoardType,
        color: newGoal.color,
        parentGoalId: newGoalId,
      }
      setBoards([...boards, newBoard])
    }
  }

  const updateGoal = (id: number, updates: Partial<GoalType>) => {
    // 付箋の更新
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          const updatedGoal = { ...goal, ...updates, isNew: false }
          return updatedGoal
        }
        return goal
      }),
    )

    // 対応する看板の更新（タイトルと色）
    if (updates.title || updates.color) {
      setBoards(
        boards.map((board) => {
          if (board.parentGoalId === id) {
            return {
              ...board,
              title: updates.title || board.title,
              color: (updates.color as ColorType) || board.color,
            }
          }
          return board
        }),
      )
    }
  }

  const deleteGoal = (id: number) => {
    // 付箋の削除
    setGoals(goals.filter((goal) => goal.id !== id))

    // 対応する看板と、その看板に属する付箋も削除
    const boardToDelete = boards.find((b) => b.parentGoalId === id)
    if (boardToDelete) {
      setBoards(boards.filter((b) => b.id !== boardToDelete.id))
      setGoals(goals.filter((g) => g.boardId !== boardToDelete.id))
    }
  }

  const handleAIBreakdown = (id: number) => {
    const parentGoal = goals.find((g) => g.id === id)
    if (!parentGoal) return

    // AIで生成された子目標を追加
    const childBoard = boards.find((b) => b.parentGoalId === id)
    if (childBoard) {
      addGoal(parentGoal.type === "big" ? "medium" : "small", childBoard.id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">マイページ</h1>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoGenerate}
                onChange={(e) => setAutoGenerate(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">目標の自動生成を有効にする</span>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Upload size={20} />
            </button>
            <button onClick={() => setShowPrompt(!showPrompt)} className="p-2 text-gray-600 hover:text-gray-800">
              {showPrompt ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <Link href="/settings" className="p-2 text-gray-600 hover:text-gray-800">
              <Settings size={20} />
            </Link>
          </div>
        </div>

        {showPrompt && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="プロンプトを入力してください"
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column
            title="大目標"
            type="big"
            boards={boards.filter((b) => b.type === "big")}
            goals={goals}
            onAddGoal={addGoal}
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
            onAIBreakdown={handleAIBreakdown}
          />
          <Column
            title="中目標"
            type="medium"
            boards={boards.filter((b) => b.type === "medium")}
            goals={goals}
            onAddGoal={addGoal}
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
            onAIBreakdown={handleAIBreakdown}
          />
          <Column
            title="小目標"
            type="small"
            boards={boards.filter((b) => b.type === "small")}
            goals={goals}
            onAddGoal={addGoal}
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
            onAIBreakdown={handleAIBreakdown}
          />
        </div>
      </div>
    </div>
  )
}

