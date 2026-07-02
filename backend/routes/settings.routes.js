import express from 'express'
import { getSettings, updateSettings, getDashboardStats } from '../controllers/settings.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadImage } from '../config/cloudinary.js'

const router = express.Router()

router.get('/', getSettings)
router.put('/', protect, adminOnly, uploadImage.single('logo'), updateSettings)
router.get('/dashboard', protect, adminOnly, getDashboardStats)

export default router
