import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

// GET /api/hero
export const getHero = asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('hero').select('*').limit(1).single()
  if (error) return sendError(res, error.message, 500)
  sendSuccess(res, data)
})

// PUT /api/hero
export const updateHero = asyncHandler(async (req, res) => {
  const {
    name, tagline, subtitle, description,
    cta_primary_text, cta_primary_link,
    cta_secondary_text, cta_secondary_link,
    typing_words, stats,
  } = req.body

  const updateData = {
    name, tagline, subtitle, description,
    cta_primary_text, cta_primary_link,
    cta_secondary_text, cta_secondary_link,
    typing_words,
    stats,
    updated_at: new Date().toISOString(),
  }

  // Handle image upload from cloudinary middleware
  if (req.file?.path) updateData.profile_image = req.file.path

  const { data: existing } = await supabaseAdmin.from('hero').select('id').limit(1).single()

  let result
  if (existing) {
    const { data, error } = await supabaseAdmin.from('hero').update(updateData).eq('id', existing.id).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  } else {
    const { data, error } = await supabaseAdmin.from('hero').insert(updateData).select().single()
    if (error) return sendError(res, error.message, 500)
    result = data
  }

  sendSuccess(res, result, 'Hero updated successfully')
})
