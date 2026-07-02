import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Generic image storage
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
})

// Project image storage
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/projects',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ quality: 'auto:good', fetch_format: 'auto', width: 1200, crop: 'limit' }],
  },
})

// Profile image storage
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/profile',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto:good', fetch_format: 'auto', width: 600, height: 600, crop: 'fill' }],
  },
})

// Resume storage (PDF)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/resume',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
  },
})

export const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 } })
export const uploadProjectImage = multer({ storage: projectStorage, limits: { fileSize: 5 * 1024 * 1024 } })
export const uploadProfile = multer({ storage: profileStorage, limits: { fileSize: 3 * 1024 * 1024 } })
export const uploadResume = multer({ storage: resumeStorage, limits: { fileSize: 10 * 1024 * 1024 } })

export { cloudinary }
export default cloudinary
