import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useStore } from '../store/useStore'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, 'id'>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, login, logout, register } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('grade-escolar-user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        useStore.setState({ user: parsed, isAuthenticated: true })
      } catch {
        localStorage.removeItem('grade-escolar-user')
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (email: string, password: string) => {
    await login(email, password)
    const currentUser = useStore.getState().user
    if (currentUser) {
      localStorage.setItem('grade-escolar-user', JSON.stringify(currentUser))
    }
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('grade-escolar-user')
  }

  const handleRegister = async (userData: Omit<User, 'id'>) => {
    await register(userData)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login: handleLogin,
      logout: handleLogout,
      register: handleRegister,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}