'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Lock, Loader2, Eye, EyeOff, Shield, User, Mail, Check } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const { login, isLoading: authLoading } = useAuth()
  const { identity } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shake, setShake] = useState(false)

  const credentials = [
    { email: 'admin@escola.com', password: '123456', role: 'Administrador', icon: Shield },
    { email: 'professor@escola.com', password: '123456', role: 'Professor', icon: User },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    setShake(false)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Email ou senha inválidos')
      setShake(true)
      setTimeout(() => setShake(false), 400)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCredentialClick = (cred: typeof credentials[0]) => {
    setEmail(cred.email)
    setPassword(cred.password)
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          {identity?.logo ? (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ backgroundImage: `url(${identity.logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg shadow-blue-500/25">
              <Mail className="h-8 w-8 text-white" />
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Grades</h1>
          <p className="text-gray-500 mt-1">Sistema de Gestão Escolar</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl shadow-blue-500/5 border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Entrar no sistema</CardTitle>
            <CardDescription className="text-gray-500">Use suas credenciais para acessar</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-shake" role="alert">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                </div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    disabled={isSubmitting || authLoading}
                    autoComplete="email"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-gray-400" />
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isSubmitting || authLoading}
                    autoComplete="current-password"
                    className="pl-10 pr-12"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium rounded-xl"
                disabled={isSubmitting || authLoading}
              >
                {isSubmitting || authLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <Separator className="my-4" />

            {/* Demo Credentials */}
            <div className="space-y-3">
              <p className="text-xs text-gray-500 text-center">Credenciais de demonstração:</p>
              <div className="grid grid-cols-2 gap-2">
                {credentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCredentialClick(cred)}
                    disabled={isSubmitting || authLoading}
                    className="p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-left group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 mb-1">
                      <cred.icon className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-colors" />
                      <span className="text-sm font-medium text-gray-700">{cred.role}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono relative">{cred.email}</div>
                    <Check className="absolute top-2 right-2 h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-6 flex justify-center">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Gestão de Grades v1.0 &copy; 2024
            </p>
          </CardFooter>
        </Card>

        {/* Keybind hint */}
        <div className="mt-6 text-center">
          <kbd className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-gray-100 border border-gray-200 text-xs text-gray-500 font-mono">
            <span>Tab</span> navega &nbsp;
            <span className="px-1.5 py-0.5 bg-gray-200 rounded">Enter</span> entra
          </kbd>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  )
}