import express from 'express'
import { getSeo, updateSeo } from '../controllers/settings.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadImage } from '../config/cloudinary.js'

const router = express.Router()

router.get('/', getSeo)
router.put('/', protect, adminOnly, uploadImage.single('og_image'), updateSeo)

export default router
