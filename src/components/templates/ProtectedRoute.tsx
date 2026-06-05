import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({
  children,
  redirectTo = '/admin/login',
}: {
  children: ReactNode
  redirectTo?: string
}) {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen bg-base-100" />
  if (!user) return <Navigate to={redirectTo} replace />
  return <>{children}</>
}
