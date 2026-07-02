import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../ui/LoadingScreen'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingScreen minimal />
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />

  return children
}
