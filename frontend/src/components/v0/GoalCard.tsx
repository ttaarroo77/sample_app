'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/v0/utils'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { COLOR_PINS } from '@/lib/v0/constants'

type GoalCardProps = {
  id: number
  title: string
  description: string
  type: 'big' | 'medium' | 'small'
  status: 'todo' | 'doing' | 'done'
  color: string
  className?: string
  onEdit?: () => void
  onDelete?: () => void
}

export function GoalCard({ 
  id, 
  title, 
  description, 
  type, 
  color,
  className,
  onEdit,
  onDelete,
  ...sortableProps
}: GoalCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: color,
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 rounded-lg shadow hover:shadow-md transition-all cursor-pointer relative",
        isDragging && "shadow-lg scale-105",
        className
      )}
      {...attributes}
      {...listeners}
    >
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              編集
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-600 focus:text-red-600"
            >
              <Trash className="h-4 w-4 mr-2" />
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-bold pr-8">{title}</h3>
      <p className="text-sm">{description}</p>
      <span className="text-xs bg-white/50 px-2 py-1 rounded mt-2 inline-block">
        {type}
      </span>
    </div>
  )
} 