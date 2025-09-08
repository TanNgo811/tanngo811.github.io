import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout, checkAuth } = useAuthStore()
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
        return { success: true, user }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      console.log('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: {
    email: string
    password: string
    first_name: string
    last_name: string
  }) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
        return { success: true, user }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout: signOut,
    checkAuth,
  }
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  return { isAuthenticated, isLoading }
}
