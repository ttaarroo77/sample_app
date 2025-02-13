import { KanbanBoard } from "../components/KanbanBoard"

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">カンバンボード</h1>
      <KanbanBoard />
    </div>
  )
}

