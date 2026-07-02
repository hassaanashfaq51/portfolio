import express from 'express'
import {
  getProjects, getProject, getProjectBySlug, createProject,
  updateProject, deleteProject, addProjectImages, deleteProjectImage, getCategories,
} from '../controllers/project.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadProjectImage } from '../config/cloudinary.js'

const router = express.Router()

router.get('/', getProjects)
router.get('/categories', getCategories)
router.get('/slug/:slug', getProjectBySlug)
router.get('/:id', getProject)

router.post('/', protect, adminOnly, uploadProjectImage.array('images', 10), createProject)
router.put('/:id', protect, adminOnly, updateProject)
router.delete('/:id', protect, adminOnly, deleteProject)
router.post('/:id/images', protect, adminOnly, uploadProjectImage.array('images', 10), addProjectImages)
router.delete('/images/:imageId', protect, adminOnly, deleteProjectImage)

export default router
