import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (type: 'LOGIN' | 'SIGNUP') => {
    try {
      const { error } = type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password })

      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin('LOGIN')}>Login</button>
      <button onClick={() => handleLogin('SIGNUP')}>Sign Up</button>
    </div>
  )
} 