import { useAuthStore } from '@/features/auth/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout, checkAuth } = useAuthStore()

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
        return { success: true }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'An error occurred during login' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName
        }),
      })

      if (response.ok) {
        const { user } = await response.json()
        setUser(user)
        return { success: true }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'An error occurred during signup' }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    checkAuth,
  }
}
