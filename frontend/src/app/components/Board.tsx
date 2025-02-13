"use client"

import type React from "react"
import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"

interface BoardProps {
  title: string
  onTitleChange: (newTitle: string) => void
  onDelete: () => void
  children: React.ReactNode
}

export function Board({ title, onTitleChange, onDelete, children }: BoardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleTitleUpdate = () => {
    onTitleChange(editedTitle)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleUpdate()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditedTitle(title)
    }
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow mb-4 relative">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={handleKeyDown}
            className="text-lg font-semibold p-1 border rounded flex-grow mr-2"
            autoFocus
          />
        ) : (
          <h3 className="text-lg font-semibold flex-grow">{title}</h3>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-2">{children}</div>

      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-95 rounded-lg flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="mb-4 text-center">この看板を削除してもよろしいですか？</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                削除
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

