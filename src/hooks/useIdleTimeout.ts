import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'

const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutos

const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

export function useIdleTimeout() {
  const { logout, isAuthenticated } = useAuth()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (isAuthenticated) {
      timeoutRef.current = setTimeout(() => {
        logout()
        window.location.href = '/login?timeout=true'
      }, IDLE_TIMEOUT)
    }
  }, [isAuthenticated, logout])

  useEffect(() => {
    if (!isAuthenticated) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    resetTimeout()

    const handleActivity = () => resetTimeout()

    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isAuthenticated, resetTimeout])

  return { resetTimeout }
}