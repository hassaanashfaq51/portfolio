import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'))
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    if (!token) { setLoading(false); return }
    try {
      const res = await api.get('/auth/me')
      setUser(res.data.data)
    } catch {
      localStorage.removeItem('portfolio_token')
      setToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchMe() }, [fetchMe])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: newUser } = res.data.data
    localStorage.setItem('portfolio_token', newToken)
    setToken(newToken)
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('portfolio_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
