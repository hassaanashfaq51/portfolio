import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../config/supabase.js'

export const protect = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, role, is_active')
      .eq('id', decoded.id)
      .single()

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    if (!user.is_active) {
      return res.status(401).json({ success: false, message: 'Account deactivated' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' })
    }
    next(error)
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' })
  }
  next()
}

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('id, email, role')
        .eq('id', decoded.id)
        .single()
      req.user = user
    }
  } catch (e) {
    // silently fail for optional auth
  }
  next()
}
