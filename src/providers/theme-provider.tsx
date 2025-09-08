'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useUIStore } from '@/features/ui/store/ui'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ReturnType<typeof useUIStore> | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const uiStore = useUIStore()

  useEffect(() => {
    if (uiStore.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [uiStore.theme])

  return (
    <ThemeContext.Provider value={uiStore}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
