import express from 'express'
import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'
import { createGenericController } from '../controllers/generic.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()
const ctrl = createGenericController('social_links')

// GET all social links (public)
router.get('/', ctrl.getAll)

// POST single link (admin)
router.post('/', protect, adminOnly, ctrl.create)

// PUT single link (admin)
router.put('/:id', protect, adminOnly, ctrl.update)

// DELETE single link (admin)
router.delete('/:id', protect, adminOnly, ctrl.remove)

// PUT /api/social — bulk replace all social links
router.put('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const { links } = req.body
  if (!Array.isArray(links)) return sendError(res, 'Links array required', 400)

  // Delete all and reinsert
  await supabaseAdmin.from('social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  if (links.length === 0) return sendSuccess(res, [], 'Social links cleared')

  const { data, error } = await supabaseAdmin.from('social_links').insert(
    links.map((l, i) => ({ ...l, order_index: i, is_active: l.is_active !== false }))
  ).select()

  if (error) return sendError(res, error.message, 500)
  sendSuccess(res, data, 'Social links updated')
}))

export default router
