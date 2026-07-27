'use client'

import { NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useStore } from '@/store/useStore'
import {
  LayoutDashboard,
  Users,
  Building,
  Palette,
  BookOpen,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'user'] as const },
  { name: 'Matriz Curricular', href: '/dashboard/matriz', icon: BookOpen, roles: ['admin', 'user'] as const },
  { name: 'Escolas', href: '/dashboard/escolas', icon: Building, roles: ['admin'] as const },
  { name: 'Usuários', href: '/dashboard/usuarios', icon: Users, roles: ['admin'] as const },
  { name: 'Identidade Visual', href: '/dashboard/identidade', icon: Palette, roles: ['admin'] as const },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const { identity } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const filteredNavigation = navigation.filter((item) =>
    user ? item.roles.includes(user.role) : false
  )

  const logoUrl = identity?.logo
  const primaryColor = identity?.primaryColor || '#2563eb'

  return (
    <>
      <Button
        className="lg:hidden fixed top-4 left-4 z-50"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform duration-200 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Menu lateral"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4 lg:justify-center" style={{ borderColor: primaryColor }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo da escola"
                className="h-10 w-auto"
              />
            ) : (
              <h1 className="text-xl font-bold text-primary">Gestão de Grades</h1>
            )}
            <Button
              className="lg:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4" aria-label="Navegação principal">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="border-t p-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xs font-medium text-primary">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-2 w-full justify-start gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}