import { PlusCircle, Pencil } from "lucide-react"
import { GoalCard } from "./GoalCard"
import type { GoalType, BoardType } from "@/types/goal"

interface ColumnProps {
  title: string
  type: "big" | "medium" | "small"
  boards: BoardType[]
  goals: GoalType[]
  onAddGoal: (type: "big" | "medium" | "small", boardId: number) => void
  onUpdateGoal: (id: number, updates: Partial<GoalType>) => void
  onDeleteGoal: (id: number) => void
  onAIBreakdown: (id: number) => void
}

export function Column({
  title,
  type,
  boards,
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onAIBreakdown,
}: ColumnProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
        <span>{title}</span>
      </h2>
      <div className="space-y-4">
        {boards.map((board) => (
          <div key={board.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold">{board.title}</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <Pencil size={16} />
              </button>
            </div>
            {goals
              .filter((goal) => goal.boardId === board.id)
              .map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={onUpdateGoal}
                  onDelete={onDeleteGoal}
                  onAIBreakdown={onAIBreakdown}
                />
              ))}
            <button
              onClick={() => onAddGoal(type, board.id)}
              className="w-full mt-2 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center"
            >
              <PlusCircle size={20} className="mr-2" />
              {type}目標を追加
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

