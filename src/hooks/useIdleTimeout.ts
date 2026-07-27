'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'

const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutos
const WARNING_TIME = 5 * 60 * 1000 // 5 minutos antes

const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

interface UseIdleTimeoutReturn {
  timeRemaining: number
  isWarning: boolean
  resetTimeout: () => void
}

export function useIdleTimeout(): UseIdleTimeoutReturn {
  const { logout, isAuthenticated } = useAuth()
  const [timeRemaining, setTimeRemaining] = useState(IDLE_TIMEOUT)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastActivityRef = useRef(Date.now())

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now()
    setTimeRemaining(IDLE_TIMEOUT)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    if (isAuthenticated) {
      timeoutRef.current = setTimeout(() => {
        logout()
        window.location.href = '/login?timeout=true'
      }, IDLE_TIMEOUT)
      
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - lastActivityRef.current
        const remaining = Math.max(0, IDLE_TIMEOUT - elapsed)
        setTimeRemaining(remaining)
      }, 1000)
    }
  }, [isAuthenticated, logout])

  useEffect(() => {
    if (!isAuthenticated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAuthenticated, resetTimeout])

  const isWarning = timeRemaining <= WARNING_TIME && timeRemaining > 0

  return { timeRemaining, isWarning, resetTimeout }
}