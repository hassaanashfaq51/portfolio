import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

// GET /api/settings
export const getSettings = asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('settings').select('*').limit(1).single()
  if (error) return sendSuccess(res, {}) // Return empty if not set
  sendSuccess(res, data)
})

// PUT /api/settings
export const updateSettings = asyncHandler(async (req, res) => {
  const body = { ...req.body, updated_at: new Date().toISOString() }
  if (req.file?.path) body.logo = req.file.path

  const { data: existing } = await supabaseAdmin.from('settings').select('id').limit(1).single()
  let result

  if (existing) {
    const { data, error } = await supabaseAdmin.from('settings').update(body).eq('id', existing.id).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  } else {
    const { data, error } = await supabaseAdmin.from('settings').insert(body).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  }
  sendSuccess(res, result, 'Settings updated')
})

// GET /api/seo
export const getSeo = asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('seo').select('*').limit(1).single()
  if (error) return sendSuccess(res, {})
  sendSuccess(res, data)
})

// PUT /api/seo
export const updateSeo = asyncHandler(async (req, res) => {
  const body = { ...req.body, updated_at: new Date().toISOString() }
  if (req.file?.path) body.og_image = req.file.path

  const { data: existing } = await supabaseAdmin.from('seo').select('id').limit(1).single()
  let result

  if (existing) {
    const { data, error } = await supabaseAdmin.from('seo').update(body).eq('id', existing.id).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  } else {
    const { data, error } = await supabaseAdmin.from('seo').insert(body).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  }
  sendSuccess(res, result, 'SEO updated')
})

// GET /api/settings/dashboard (admin analytics)
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [projects, services, messages, skills, testimonials, education, experience] = await Promise.all([
    supabaseAdmin.from('projects').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('services').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('messages').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('skills').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('testimonials').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('education').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('experience').select('id', { count: 'exact', head: true }),
  ])

  const { count: unreadMessages } = await supabaseAdmin
    .from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false)

  sendSuccess(res, {
    projects: projects.count || 0,
    services: services.count || 0,
    messages: messages.count || 0,
    unreadMessages: unreadMessages || 0,
    skills: skills.count || 0,
    testimonials: testimonials.count || 0,
    education: education.count || 0,
    experience: experience.count || 0,
  })
})
