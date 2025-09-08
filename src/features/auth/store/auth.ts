import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          isLoading: false 
        })
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        })
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true })
          
          const response = await fetch('/api/auth/session')
          
          if (response.ok) {
            const { user } = await response.json()
            set({ 
              user, 
              isAuthenticated: !!user,
              isLoading: false 
            })
          } else {
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false 
            })
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
