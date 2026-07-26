'use client'

import { useEffect } from 'react'
import { useIdleTimeout } from '@/hooks/useIdleTimeout'
import { AlertCircle, Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function IdleTimeoutWarning() {
  const { timeRemaining, isWarning } = useIdleTimeout()

  if (!isWarning || timeRemaining <= 0) {
    return null
  }

  const minutes = Math.floor(timeRemaining / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className="flex items-center gap-3 w-80 bg-background border border-destructive/50 rounded-xl shadow-lg p-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            Sessão expirando em breve
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inatividade detectada. Você será desconectado automaticamente.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-destructive transition-all duration-1000 ease-linear"
                style={{ width: `${(timeRemaining / (5 * 60 * 1000)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono font-medium text-destructive whitespace-nowrap">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex-shrink-0 p-1 rounded hover:bg-accent transition-colors"
          aria-label="Renovar sessão"
        >
          <Clock className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}