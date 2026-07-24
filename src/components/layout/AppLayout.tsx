'use client'

import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { identity } = useStore()
  const primaryColor = identity?.primaryColor || '#2563eb'

  return (
    <div className="min-h-screen bg-background" style={{ '--primary': primaryColor }}>
      <Sidebar />
      <div className={cn('lg:pl-64 flex flex-col min-h-screen transition-all duration-200')}>
        <main className="flex-1 p-6 lg:p-8">
          {children || <Outlet />}
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground lg:pl-64" style={{ borderColor: primaryColor }}>
          GradeEscolar - Sistema de Gestão Escolar
        </footer>
      </div>
    </div>
  )
}