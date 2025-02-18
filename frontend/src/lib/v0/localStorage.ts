import { z } from "zod"

// データの型定義
const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  syncedAt: z.string().optional(),
})

export type Todo = z.infer<typeof TodoSchema>

export class LocalStorageManager {
  private readonly storageKey: string
  private readonly maxItems: number = 1000 // ストレージ制限

  constructor(key: string = "ai_todo_items") {
    this.storageKey = key
  }

  // データの取得
  getTodos(): Todo[] {
    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) return []
      
      const parsed = JSON.parse(data)
      return z.array(TodoSchema).parse(parsed)
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return []
    }
  }

  // データの保存
  saveTodo(todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Todo {
    const todos = this.getTodos()
    
    // 容量制限チェック
    if (todos.length >= this.maxItems) {
      todos.shift() // 最も古いアイテムを削除
    }

    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    todos.push(newTodo)
    this.saveTodos(todos)
    return newTodo
  }

  // データの更新
  updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const todos = this.getTodos()
    const index = todos.findIndex(todo => todo.id === id)
    
    if (index === -1) return null

    const updatedTodo = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    todos[index] = updatedTodo
    this.saveTodos(todos)
    return updatedTodo
  }

  // データの削除
  deleteTodo(id: string): boolean {
    const todos = this.getTodos()
    const filteredTodos = todos.filter(todo => todo.id !== id)
    
    if (filteredTodos.length === todos.length) return false
    
    this.saveTodos(filteredTodos)
    return true
  }

  private saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(todos))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      throw new Error("Failed to save todos")
    }
  }

  // ストレージの使用量チェック
  checkStorageUsage(): { used: number, total: number } {
    const data = localStorage.getItem(this.storageKey) || ""
    return {
      used: new Blob([data]).size,
      total: 5 * 1024 * 1024 // 5MB (一般的なローカルストレージの制限)
    }
  }

  // ストレージのクリーンアップ
  cleanup(keepLastN: number = 100): void {
    const todos = this.getTodos()
    if (todos.length <= keepLastN) return

    const sortedTodos = todos
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, keepLastN)

    this.saveTodos(sortedTodos)
  }

  // バッチ操作の追加
  async batchUpdate(operations: {
    create?: Omit<Todo, "id" | "createdAt" | "updatedAt">[]
    update?: { id: string; updates: Partial<Todo> }[]
    delete?: string[]
  }): Promise<{
    created: Todo[]
    updated: Todo[]
    deleted: string[]
    errors: Error[]
  }> {
    const result = {
      created: [] as Todo[],
      updated: [] as Todo[],
      deleted: [] as string[],
      errors: [] as Error[]
    }

    try {
      // 作成操作
      if (operations.create) {
        for (const todo of operations.create) {
          try {
            const newTodo = this.saveTodo(todo)
            result.created.push(newTodo)
          } catch (error) {
            result.errors.push(new Error(`Failed to create todo: ${error.message}`))
          }
        }
      }

      // 更新操作
      if (operations.update) {
        for (const { id, updates } of operations.update) {
          try {
            const updatedTodo = this.updateTodo(id, updates)
            if (updatedTodo) {
              result.updated.push(updatedTodo)
            }
          } catch (error) {
            result.errors.push(new Error(`Failed to update todo ${id}: ${error.message}`))
          }
        }
      }

      // 削除操作
      if (operations.delete) {
        for (const id of operations.delete) {
          try {
            if (this.deleteTodo(id)) {
              result.deleted.push(id)
            }
          } catch (error) {
            result.errors.push(new Error(`Failed to delete todo ${id}: ${error.message}`))
          }
        }
      }
    } catch (error) {
      result.errors.push(new Error(`Batch operation failed: ${error.message}`))
    }

    return result
  }

  // 検索機能の追加
  searchTodos(query: {
    title?: string
    completed?: boolean
    fromDate?: Date
    toDate?: Date
  }): Todo[] {
    const todos = this.getTodos()
    
    return todos.filter(todo => {
      let matches = true
      
      if (query.title) {
        matches = matches && todo.title.toLowerCase().includes(query.title.toLowerCase())
      }
      
      if (query.completed !== undefined) {
        matches = matches && todo.completed === query.completed
      }
      
      if (query.fromDate) {
        matches = matches && new Date(todo.createdAt) >= query.fromDate
      }
      
      if (query.toDate) {
        matches = matches && new Date(todo.createdAt) <= query.toDate
      }
      
      return matches
    })
  }

  // 統計情報の取得
  getStats(): {
    total: number
    completed: number
    storage: { used: number; total: number }
  } {
    const todos = this.getTodos()
    const completed = todos.filter(todo => todo.completed).length
    
    return {
      total: todos.length,
      completed,
      storage: this.checkStorageUsage()
    }
  }

  // エラー処理の強化
  private validateTodo(todo: Partial<Todo>): void {
    if (todo.title && todo.title.length > 100) {
      throw new Error("Title is too long (max 100 characters)")
    }
    
    if (todo.description && todo.description.length > 500) {
      throw new Error("Description is too long (max 500 characters)")
    }
  }
}

export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const loadFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
  return null
}