import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  })
  return { accessToken, refreshToken }
}

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return sendError(res, 'Email and password are required', 400)
  }

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !user) {
    return sendError(res, 'Invalid credentials', 401)
  }

  if (!user.is_active) {
    return sendError(res, 'Account is deactivated', 401)
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)
  if (!isMatch) {
    return sendError(res, 'Invalid credentials', 401)
  }

  // Update last login
  await supabaseAdmin.from('users').update({ last_login: new Date().toISOString() }).eq('id', user.id)

  const { accessToken, refreshToken } = generateTokens(user.id)

  sendSuccess(res, {
    token: accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar },
  }, 'Login successful')
})

// POST /api/auth/refresh
export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) return sendError(res, 'Refresh token required', 400)

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const { data: user } = await supabaseAdmin.from('users').select('id, email, role, is_active').eq('id', decoded.id).single()

  if (!user || !user.is_active) return sendError(res, 'Invalid refresh token', 401)

  const tokens = generateTokens(user.id)
  sendSuccess(res, tokens, 'Token refreshed')
})

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, email, name, role, avatar, created_at, last_login')
    .eq('id', req.user.id)
    .single()
  sendSuccess(res, user)
})

// PUT /api/auth/password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const { data: user } = await supabaseAdmin.from('users').select('password_hash').eq('id', req.user.id).single()
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash)
  if (!isMatch) return sendError(res, 'Current password incorrect', 400)

  const hash = await bcrypt.hash(newPassword, 12)
  await supabaseAdmin.from('users').update({ password_hash: hash }).eq('id', req.user.id)

  sendSuccess(res, null, 'Password updated successfully')
})

// POST /api/auth/setup (one-time admin setup)
export const setup = asyncHandler(async (req, res) => {
  const { data: existing } = await supabaseAdmin.from('users').select('id').limit(1)
  if (existing && existing.length > 0) {
    return sendError(res, 'Admin already exists', 400)
  }

  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 12)

  const { data: user, error } = await supabaseAdmin.from('users').insert({
    name,
    email: email.toLowerCase(),
    password_hash: hash,
    role: 'admin',
    is_active: true,
  }).select().single()

  if (error) return sendError(res, error.message, 500)

  const { accessToken } = generateTokens(user.id)
  sendSuccess(res, { token: accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } }, 'Admin created', 201)
})
