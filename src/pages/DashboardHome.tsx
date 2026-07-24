'use client'

import { useAuth } from '@/context/AuthContext'
import { useStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Building, Users, Palette, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DashboardHome() {
  const { user } = useAuth()
  const { schools, components, users } = useStore()

  const stats = [
    { name: 'Escolas', value: schools.length, icon: Building, color: 'text-blue-500', href: '/dashboard/escolas', roles: ['admin'] },
    { name: 'Usuários', value: users.length, icon: Users, color: 'text-green-500', href: '/dashboard/usuarios', roles: ['admin'] },
    { name: 'Componentes Curriculares', value: components.length, icon: BookOpen, color: 'text-purple-500', href: '/dashboard/matriz', roles: ['admin', 'user'] },
    { name: 'Escola Atual', value: 1, icon: GraduationCap, color: 'text-orange-500', href: '/dashboard/identidade', roles: ['admin'] },
  ]

  const filteredStats = stats.filter(s => s.roles.includes(user?.role || ''))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo, {user?.name}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredStats.map((stat) => (
          <Card key={stat.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={cn('h-4 w-4', stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/dashboard/matriz" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Gerenciar Matriz Curricular</span>
              </div>
            </a>
            {user?.role === 'admin' && (
              <>
                <a href="/dashboard/escolas" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Gerenciar Escolas</span>
                  </div>
                </a>
                <a href="/dashboard/usuarios" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Gerenciar Usuários</span>
                  </div>
                </a>
                <a href="/dashboard/identidade" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <span>Configurar Identidade Visual</span>
                  </div>
                </a>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas da Matriz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['anos-iniciais', 'anos-finais', 'eja'].map((stage) => {
              const stageComponents = components.filter(c => c.stage === stage)
              const totalWorkload = stageComponents.reduce((sum, c) => sum + c.workload, 0)
              return (
                <div key={stage} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize">{stage.replace('-', ' ')}</span>
                    <span className="text-muted-foreground">{stageComponents.length} componentes</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mt-1">{totalWorkload}h</div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}