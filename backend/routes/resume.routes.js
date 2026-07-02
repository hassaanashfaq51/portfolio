import express from 'express'
import { supabaseAdmin } from '../config/supabase.js'
import { cloudinary } from '../config/cloudinary.js'
import { uploadResume } from '../config/cloudinary.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('resume').select('*').limit(1).single()
  if (error) return sendSuccess(res, null)
  sendSuccess(res, data)
}))

router.post('/', protect, adminOnly, uploadResume.single('resume'), asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, 'Resume file required', 400)

  // Delete old resume
  const { data: old } = await supabaseAdmin.from('resume').select('public_id').limit(1).single()
  if (old?.public_id) {
    try { await cloudinary.uploader.destroy(old.public_id, { resource_type: 'raw' }) } catch (e) {}
  }
  await supabaseAdmin.from('resume').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const { data, error } = await supabaseAdmin.from('resume').insert({
    url: req.file.path,
    public_id: req.file.filename,
    filename: req.file.originalname || 'resume.pdf',
  }).select().single()

  if (error) return sendError(res, error.message, 500)
  sendSuccess(res, data, 'Resume uploaded', 201)
}))

router.delete('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const { data } = await supabaseAdmin.from('resume').select('public_id').limit(1).single()
  if (data?.public_id) {
    try { await cloudinary.uploader.destroy(data.public_id, { resource_type: 'raw' }) } catch (e) {}
  }
  await supabaseAdmin.from('resume').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  sendSuccess(res, null, 'Resume deleted')
}))

export default router
