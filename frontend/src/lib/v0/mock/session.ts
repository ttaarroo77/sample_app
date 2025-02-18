export const mockSession = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  refresh_token: 'valid-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: {
    id: 'mock-user-id',
    email: 'test@example.com',
    role: 'authenticated'
  }
}

export const setMockSession = async (supabase: any) => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await supabase.auth.setSession(mockSession)
      console.log('Mock session set successfully')
    } catch (error) {
      console.error('Error setting mock session:', error)
    }
  }
}