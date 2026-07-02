import express from 'express'
import { login, refresh, getMe, changePassword, setup } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/setup', setup)
router.post('/login', login)
router.post('/refresh', refresh)
router.get('/me', protect, getMe)
router.put('/password', protect, changePassword)

export default router
