import { getSupabaseClient } from './supabase/client'
import { type Todo } from './localStorage'

export class SupabaseManager {
  private static supabase = getSupabaseClient()

  // オフライン状態の検出
  static async isOnline(): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from('todos')
        .select('*', { count: 'exact', head: true })

      return !error
    } catch {
      return false
    }
  }

  // バッチ操作の追加
  static async batchOperation(operations: {
    create?: Omit<Todo, "id">[]
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

    // トランザクション的な操作（ローカル環境でのテスト用）
    try {
      if (operations.create) {
        const { data, error } = await this.supabase
          .from('todos')
          .insert(operations.create)
          .select()

        if (error) throw error
        if (data) result.created = data
      }

      if (operations.update) {
        for (const { id, updates } of operations.update) {
          try {
            const { data, error } = await this.supabase
              .from('todos')
              .update(updates)
              .eq('id', id)
              .select()
              .single()

            if (error) throw error
            if (data) result.updated.push(data)
          } catch (error) {
            result.errors.push(new Error(`Failed to update todo ${id}: ${error.message}`))
          }
        }
      }

      if (operations.delete) {
        for (const id of operations.delete) {
          try {
            const { error } = await this.supabase
              .from('todos')
              .delete()
              .eq('id', id)

            if (error) throw error
            result.deleted.push(id)
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

  // 基本的なCRUD操作の追加
  static async createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const { data, error } = await this.supabase
      .from('todos')
      .insert([todo])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const { data, error } = await this.supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteTodo(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async getTodos(): Promise<Todo[]> {
    const { data, error } = await this.supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error
    return data || []
  }

  // その他のCRUD操作は必要に応じて実装
}