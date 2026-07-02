import express from 'express'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadImage, cloudinary } from '../config/cloudinary.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router()

// Generic image upload
router.post('/image', protect, adminOnly, uploadImage.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, 'No file uploaded', 400)
  sendSuccess(res, { url: req.file.path, public_id: req.file.filename }, 'Image uploaded', 201)
}))

// Multiple images
router.post('/images', protect, adminOnly, uploadImage.array('images', 10), asyncHandler(async (req, res) => {
  if (!req.files?.length) return sendError(res, 'No files uploaded', 400)
  const files = req.files.map(f => ({ url: f.path, public_id: f.filename }))
  sendSuccess(res, files, 'Images uploaded', 201)
}))

// Delete image by public_id
router.delete('/image', protect, adminOnly, asyncHandler(async (req, res) => {
  const { public_id } = req.body
  if (!public_id) return sendError(res, 'public_id required', 400)
  await cloudinary.uploader.destroy(public_id)
  sendSuccess(res, null, 'Image deleted')
}))

export default router
