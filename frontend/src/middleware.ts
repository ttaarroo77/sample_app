import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockSession } from '@/lib/v0/mock/session'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // 開発環境ではモックセッションを使用
  if (process.env.NODE_ENV === 'development') {
    try {
      await supabase.auth.setSession(mockSession)
    } catch (error) {
      console.error('Error setting mock session:', error)
    }
  }

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}