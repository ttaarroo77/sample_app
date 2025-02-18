'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClientSupabaseClient } from '@/lib/v0/supabase/client'
import { GoalCard } from './GoalCard'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { arrayMove } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { GoalForm } from './GoalForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { COLOR_PINS, COLORS } from '@/lib/v0/constants'
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/v0/localStorage'

type Goal = {
  id: number
  title: string
  description: string
  type: 'big' | 'medium' | 'small'
  status: 'todo' | 'doing' | 'done'
  color: string
}

export function KanbanBoard() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const supabase = createClientSupabaseClient()

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('認証が必要です')
        return
      }

      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setGoals(data || [])
    } catch (error) {
      console.error('目標の取得に失敗:', error)
      setError('目標の取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [supabase])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)  // ドラッグ終了時にactiveIdをクリア
    setDragOverStatus(null)  // ドラッグ終了時にドラッグオーバー状態をクリア
    
    if (!over) return

    const goalId = active.id
    const goal = goals.find(g => g.id === goalId)
    if (!goal) return

    const newStatus = over.id as 'todo' | 'doing' | 'done'
    if (goal.status === newStatus) return

    // 楽観的更新のために現在の状態を保存
    const previousGoals = [...goals]
    
    // 楽観的UI更新
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, status: newStatus } : g
    ))

    try {
      const { error } = await supabase
        .from('goals')
        .update({ status: newStatus })
        .eq('id', goalId)

      if (error) throw error
    } catch (error) {
      console.error('目標の更新に失敗:', error)
      setError('目標の更新に失敗しました')
      // エラー時に元の状態に戻す
      setGoals(previousGoals)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    if (over) {
      setDragOverStatus(over.id as string)
    }
  }

  // ドラッグ中のパフォーマンス最適化のためメモ化
  const todoGoals = useMemo(() => 
    goals.filter(goal => goal.status === 'todo'),
    [goals]
  )

  const doingGoals = useMemo(() => 
    goals.filter(goal => goal.status === 'doing'),
    [goals]
  )

  const doneGoals = useMemo(() => 
    goals.filter(goal => goal.status === 'done'),
    [goals]
  )

  // 削除処理
  const handleDelete = async () => {
    if (!selectedGoal) return

    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', selectedGoal.id)

      if (error) throw error

      // 成功したら一覧を更新
      fetchGoals()
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('目標の削除に失敗:', error)
      setError('目標の削除に失敗しました')
    }
  }

  // 編集モードを開始
  const handleEdit = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsEditMode(true)
    setIsFormOpen(true)
  }

  // フォームの成功時の処理
  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setIsEditMode(false)
    setSelectedGoal(null)
    fetchGoals()
  }

  // 共通のカードレンダリング関数
  const renderGoalCards = (goals: Goal[]) => {
    return goals.map(goal => (
      <GoalCard 
        key={goal.id} 
        {...goal} 
        onEdit={() => handleEdit(goal)}
        onDelete={() => {
          setSelectedGoal(goal)
          setIsDeleteDialogOpen(true)
        }}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">目標管理</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          新しい目標を作成
        </button>
      </div>

      <DndContext 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="grid grid-cols-3 gap-4">
          {/* TODO列 */}
          <div 
            className={cn(
              "bg-white p-4 rounded-lg shadow transition-colors",
              dragOverStatus === 'todo' && "bg-gray-50"
            )} 
            id="todo"
          >
            <h2 className="text-xl font-bold mb-4">TODO</h2>
            <SortableContext 
              items={todoGoals.map(g => g.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {renderGoalCards(todoGoals)}
              </div>
            </SortableContext>
          </div>

          {/* DOING列 */}
          <div 
            className={cn(
              "bg-white p-4 rounded-lg shadow transition-colors",
              dragOverStatus === 'doing' && "bg-gray-50"
            )} 
            id="doing"
          >
            <h2 className="text-xl font-bold mb-4">DOING</h2>
            <SortableContext 
              items={doingGoals.map(g => g.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {renderGoalCards(doingGoals)}
              </div>
            </SortableContext>
          </div>

          {/* DONE列 */}
          <div 
            className={cn(
              "bg-white p-4 rounded-lg shadow transition-colors",
              dragOverStatus === 'done' && "bg-gray-50"
            )} 
            id="done"
          >
            <h2 className="text-xl font-bold mb-4">DONE</h2>
            <SortableContext 
              items={doneGoals.map(g => g.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {renderGoalCards(doneGoals)}
              </div>
            </SortableContext>
          </div>
        </div>
        <DragOverlay dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
          {activeId ? (
            <GoalCard 
              {...goals.find(g => g.id === activeId)!} 
              className="opacity-80 shadow-xl"
              onEdit={() => {}} // ドラッグ中は編集を無効化
              onDelete={() => {}} // ドラッグ中は削除を無効化
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* 編集/作成フォームのダイアログ */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? '目標を編集' : '新しい目標を作成'}
            </DialogTitle>
          </DialogHeader>
          <GoalForm
            goal={selectedGoal}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setIsFormOpen(false)
              setIsEditMode(false)
              setSelectedGoal(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>目標を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。本当に削除しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 