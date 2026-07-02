import express from 'express'
import { sendMessage, getMessages, markRead, deleteMessage } from '../controllers/contact.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', sendMessage)
router.get('/messages', protect, adminOnly, getMessages)
router.patch('/messages/:id/read', protect, adminOnly, markRead)
router.delete('/messages/:id', protect, adminOnly, deleteMessage)

export default router
