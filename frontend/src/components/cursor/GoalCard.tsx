"use client"

import { useState } from "react"
import { Pencil, Trash2, Sparkles } from "lucide-react"
import { ColorPicker } from "./ColorPicker"
import { COLORS } from "@/lib/cursor/constants"
import type { GoalType, ColorType } from "@/cursor/types/goal"
import { cn } from '@/lib/cursor/utils'

interface GoalCardProps {
  goal: GoalType
  onUpdate: (id: number, updates: Partial<GoalType>) => void
  onDelete: (id: number) => void
  onAIBreakdown: (id: number) => void
}

export function GoalCard({ goal, onUpdate, onDelete, onAIBreakdown }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(goal.isNew)
  const [editedTitle, setEditedTitle] = useState(goal.title)

  const handleUpdate = () => {
    onUpdate(goal.id, { title: editedTitle })
    setIsEditing(false)
  }

  const handleColorChange = (newColor: ColorType) => {
    onUpdate(goal.id, { color: newColor })
  }

  const colorClass = goal.color ? COLORS[goal.color] : COLORS.gray;

  return (
    <div
      className={`group relative flex items-center ${colorClass} rounded-lg border border-gray-200 overflow-hidden mb-2`}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <ColorPicker color={goal.color} onChange={handleColorChange} />
      </div>
      <div className="flex-1 pl-8 pr-3 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            className="w-full p-1 rounded border border-gray-300"
            autoFocus
          />
        ) : (
          <div className="flex justify-between items-center">
            <span className="flex-grow">{goal.title}</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
                <Pencil size={16} />
              </button>
              <button onClick={() => onAIBreakdown(goal.id)} className="text-gray-500 hover:text-gray-700">
                <Sparkles size={16} />
              </button>
              <button onClick={() => onDelete(goal.id)} className="text-gray-500 hover:text-gray-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

