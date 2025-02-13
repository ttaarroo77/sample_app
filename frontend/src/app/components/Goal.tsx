"use client"

import { useState, useRef, useEffect } from "react"
import { X, Edit2, Sparkles, Circle, ChevronRight } from "lucide-react"

interface GoalProps {
  goal: {
    id: number
    title: string
    type: "big" | "medium" | "small" | "tiny"
    color: string
  }
  onUpdate: (id: number, updates: Partial<GoalProps["goal"]>) => void
  onDelete: (id: number) => void
  onAIBreakdown: (goal: GoalProps["goal"]) => void
  onSelect: () => void
  colors: string[]
}

export function Goal({ goal, onUpdate, onDelete, onAIBreakdown, onSelect, colors }: GoalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(goal.title)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const handleUpdate = () => {
    onUpdate(goal.id, { title: editedTitle })
    setIsEditing(false)
  }

  const handleColorChange = (color: string) => {
    onUpdate(goal.id, { color })
    setShowColorPicker(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`bg-${goal.color}-100 p-3 mb-2 rounded shadow relative`}>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleUpdate}
          className="w-full p-1 border rounded"
          autoFocus
        />
      ) : (
        <div className="flex justify-between items-center">
          <span className="flex-grow">{goal.title}</span>
          <div className="flex items-center">
            <button onClick={() => setShowColorPicker(!showColorPicker)} className="mr-2">
              <Circle size={16} fill={goal.color} stroke={goal.color} />
            </button>
            <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onAIBreakdown(goal)} className="text-green-500 mr-2">
              <Sparkles size={16} />
            </button>
            <button onClick={() => onDelete(goal.id)} className="text-red-500 mr-2">
              <X size={16} />
            </button>
            {goal.type !== "tiny" && (
              <button onClick={onSelect} className="text-gray-500">
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
      {showColorPicker && (
        <div ref={colorPickerRef} className="absolute right-0 mt-2 p-2 bg-white rounded shadow-lg z-10">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-6 h-6 rounded-full bg-${color}-500 m-1`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

