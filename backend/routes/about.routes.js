import express from 'express'
import { createGenericController } from '../controllers/generic.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadProfile } from '../config/cloudinary.js'

const router = express.Router()
const ctrl = createGenericController('about', { singleRow: true })

router.get('/', ctrl.getAll)
router.put('/', protect, adminOnly, uploadProfile.single('image'), ctrl.update)

export default router
