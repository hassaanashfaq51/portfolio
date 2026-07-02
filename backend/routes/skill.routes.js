import express from 'express'
import { createGenericController } from '../controllers/generic.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()
const ctrl = createGenericController('skills', { searchField: 'name' })

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', protect, adminOnly, ctrl.create)
router.put('/reorder', protect, adminOnly, ctrl.reorder)
router.put('/:id', protect, adminOnly, ctrl.update)
router.delete('/:id', protect, adminOnly, ctrl.remove)

export default router
