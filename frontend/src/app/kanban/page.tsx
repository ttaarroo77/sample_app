'use client'

import { KanbanBoard } from "@/components/v0/KanbanBoard"
import { useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/v0/supabase/client"
import { setMockSession } from "@/lib/v0/mock/session"

export default function KanbanPage() {
  useEffect(() => {
    const supabase = createClientSupabaseClient()
    setMockSession(supabase)
  }, [])

  return (
    <div className="container mx-auto py-8">
      <KanbanBoard />
    </div>
  )
}

