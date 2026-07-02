import express from 'express'
import { getHero, updateHero } from '../controllers/hero.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadProfile } from '../config/cloudinary.js'

const router = express.Router()

router.get('/', getHero)
router.put('/', protect, adminOnly, uploadProfile.single('profile_image'), updateHero)

export default router
