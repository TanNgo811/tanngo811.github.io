import { create } from 'zustand'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  loading: boolean
  searchOpen: boolean
}

interface UIActions {
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setLoading: (loading: boolean) => void
  setSearchOpen: (open: boolean) => void
  toggleSearch: () => void
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  theme: 'light',
  sidebarOpen: false,
  loading: false,
  searchOpen: false,

  setTheme: (theme) => {
    set({ theme })
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },

  toggleTheme: () => {
    const { theme, setTheme } = get()
    setTheme(theme === 'light' ? 'dark' : 'light')
  },

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  
  toggleSidebar: () => {
    const { sidebarOpen } = get()
    set({ sidebarOpen: !sidebarOpen })
  },

  setLoading: (loading) => set({ loading }),

  setSearchOpen: (searchOpen) => set({ searchOpen }),

  toggleSearch: () => {
    const { searchOpen } = get()
    set({ searchOpen: !searchOpen })
  },
}))
