import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Routes
import authRoutes from './routes/auth.routes.js'
import heroRoutes from './routes/hero.routes.js'
import aboutRoutes from './routes/about.routes.js'
import projectRoutes from './routes/project.routes.js'
import serviceRoutes from './routes/service.routes.js'
import skillRoutes from './routes/skill.routes.js'
import educationRoutes from './routes/education.routes.js'
import experienceRoutes from './routes/experience.routes.js'
import testimonialRoutes from './routes/testimonial.routes.js'
import contactRoutes from './routes/contact.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import socialRoutes from './routes/social.routes.js'
import settingsRoutes from './routes/settings.routes.js'
import seoRoutes from './routes/seo.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import statsRoutes from './routes/stats.routes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}))

// CORS
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'https://vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
})

app.use('/api', limiter)
app.use('/api/auth', authLimiter)

// Body Parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/hero', heroRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/seo', seoRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/stats', statsRoutes)

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running on port ${PORT}`)
  console.log(`📦 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 URL: http://localhost:${PORT}/api\n`)
})

export default app
