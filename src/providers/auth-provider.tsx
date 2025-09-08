'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAuthStore } from '@/features/auth/store/auth'

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore()

  useEffect(() => {
    // Only check auth if we don't have a user (not persisted or first load)
    if (!authStore.user && !authStore.isAuthenticated) {
      authStore.checkAuth()
    }
  }, [authStore.user, authStore.isAuthenticated, authStore.checkAuth])

  return (
    <AuthContext.Provider value={authStore}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
