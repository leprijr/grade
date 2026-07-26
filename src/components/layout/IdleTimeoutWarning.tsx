'use client'

import { useIdleTimeout } from '@/hooks/useIdleTimeout'
import { AlertCircle, Clock, X, Hourglass } from 'lucide-react'
import { cn } from '@/lib/utils'

export function IdleTimeoutWarning() {
  const { timeRemaining, isWarning, resetTimeout } = useIdleTimeout()

  if (timeRemaining <= 0) {
    return null
  }

  const minutes = Math.floor(timeRemaining / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)
  const totalTime = 30 * 60 * 1000 // 30 min
  const progress = (timeRemaining / totalTime) * 100

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className={cn(
        'flex items-center gap-3 w-80 bg-background border rounded-xl shadow-lg p-4 transition-all duration-300',
        isWarning 
          ? 'border-destructive/50 bg-destructive/5' 
          : 'border-primary/20 bg-primary/5'
      )}>
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          isWarning 
            ? 'bg-destructive/10' 
            : 'bg-primary/10'
        )}>
          {isWarning ? (
            <AlertCircle className="h-5 w-5 text-destructive" />
          ) : (
            <Hourglass className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium', isWarning ? 'text-destructive' : 'text-primary')}>
            {isWarning ? 'Sessão expirando em breve' : 'Tempo de sessão'}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isWarning 
              ? 'Inatividade detectada. Você será desconectado automaticamente.' 
              : 'Clique em renovar para reiniciar o contador.'}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-1000 ease-linear',
                  isWarning ? 'bg-destructive' : 'bg-primary'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={cn(
              'text-xs font-mono font-medium whitespace-nowrap',
              isWarning ? 'text-destructive' : 'text-primary'
            )}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <button
          onClick={resetTimeout}
          className="flex-shrink-0 p-1 rounded hover:bg-accent transition-colors"
          aria-label="Renovar sessão"
          title="Renovar sessão (30 min)"
        >
          <Clock className={cn(
            'h-4 w-4 transition-colors',
            isWarning 
              ? 'text-destructive hover:text-destructive' 
              : 'text-muted-foreground hover:text-primary'
          )} />
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
        @keyframes pulse-warning {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-warning {
          animation: pulse-warning 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}