import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { Login } from '@/pages/Login'
import { DashboardHome } from '@/pages/DashboardHome'
import { MatrizCurricular } from '@/pages/MatrizCurricular'
import { Escolas } from '@/pages/Escolas'
import { Usuarios } from '@/pages/Usuarios'
import { IdentidadeVisual } from '@/pages/IdentidadeVisual'
import { useIdleTimeout } from '@/hooks/useIdleTimeout'

export default function App() {
  useIdleTimeout()
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/matriz" element={<MatrizCurricular />} />
        
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/dashboard/escolas" element={<Escolas />} />
          <Route path="/dashboard/usuarios" element={<Usuarios />} />
          <Route path="/dashboard/identidade" element={<IdentidadeVisual />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}