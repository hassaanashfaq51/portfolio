import express from 'express'
import { createGenericController } from '../controllers/generic.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadImage } from '../config/cloudinary.js'

const router = express.Router()
const ctrl = createGenericController('services', { searchField: 'title' })

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', protect, adminOnly, uploadImage.single('image'), ctrl.create)
router.put('/reorder', protect, adminOnly, ctrl.reorder)
router.put('/:id', protect, adminOnly, uploadImage.single('image'), ctrl.update)
router.delete('/:id', protect, adminOnly, ctrl.remove)

export default router
