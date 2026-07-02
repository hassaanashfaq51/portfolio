import { supabaseAdmin } from '../config/supabase.js'
import { cloudinary } from '../config/cloudinary.js'
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

// GET /api/projects
export const getProjects = asyncHandler(async (req, res) => {
  const {
    page = 1, limit = 10, category, status, featured,
    search, sort = 'created_at', order = 'desc',
  } = req.query

  const offset = (parseInt(page) - 1) * parseInt(limit)

  let query = supabaseAdmin
    .from('projects')
    .select('*, project_images(id, url, alt, is_cover)', { count: 'exact' })

  if (category) query = query.eq('category', category)
  if (status) query = query.eq('status', status)
  if (featured !== undefined) query = query.eq('is_featured', featured === 'true')
  if (search) query = query.ilike('title', `%${search}%`)

  query = query.order(sort, { ascending: order === 'asc' })
  query = query.range(offset, offset + parseInt(limit) - 1)

  const { data, error, count } = await query
  if (error) return sendError(res, error.message, 500)

  sendPaginated(res, data, {
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(count / parseInt(limit)),
  })
})

// GET /api/projects/:id
export const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*, project_images(*)')
    .eq('id', id)
    .single()

  if (error || !data) return sendError(res, 'Project not found', 404)
  sendSuccess(res, data)
})

// GET /api/projects/slug/:slug
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .single()

  if (error || !data) return sendError(res, 'Project not found', 404)

  // Increment view count
  await supabaseAdmin.from('projects').update({ views: (data.views || 0) + 1 }).eq('id', data.id)

  sendSuccess(res, data)
})

// POST /api/projects
export const createProject = asyncHandler(async (req, res) => {
  const {
    title, slug, category, description, short_description,
    technologies, github_link, live_link, features,
    challenges, solutions, status, completion_date,
    tags, is_featured,
  } = req.body

  const { data, error } = await supabaseAdmin.from('projects').insert({
    title,
    slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    category,
    description,
    short_description,
    technologies: Array.isArray(technologies) ? technologies : JSON.parse(technologies || '[]'),
    github_link,
    live_link,
    features: Array.isArray(features) ? features : JSON.parse(features || '[]'),
    challenges,
    solutions,
    status: status || 'completed',
    completion_date,
    tags: Array.isArray(tags) ? tags : JSON.parse(tags || '[]'),
    is_featured: is_featured === 'true' || is_featured === true,
  }).select().single()

  if (error) return sendError(res, error.message, 500)

  // Handle image uploads
  if (req.files?.length > 0) {
    const images = req.files.map((file, i) => ({
      project_id: data.id,
      url: file.path,
      alt: `${title} image ${i + 1}`,
      is_cover: i === 0,
      public_id: file.filename,
    }))
    await supabaseAdmin.from('project_images').insert(images)
  }

  sendSuccess(res, data, 'Project created', 201)
})

// PUT /api/projects/:id
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = { ...req.body, updated_at: new Date().toISOString() }

  // Parse JSON fields
  if (typeof updateData.technologies === 'string') updateData.technologies = JSON.parse(updateData.technologies)
  if (typeof updateData.features === 'string') updateData.features = JSON.parse(updateData.features)
  if (typeof updateData.tags === 'string') updateData.tags = JSON.parse(updateData.tags)
  if (updateData.is_featured !== undefined) updateData.is_featured = updateData.is_featured === 'true' || updateData.is_featured === true

  const { data, error } = await supabaseAdmin.from('projects').update(updateData).eq('id', id).select().single()
  if (error) return sendError(res, error.message, 500)

  sendSuccess(res, data, 'Project updated')
})

// DELETE /api/projects/:id
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Get images to delete from cloudinary
  const { data: images } = await supabaseAdmin.from('project_images').select('public_id').eq('project_id', id)
  if (images?.length) {
    await Promise.all(images.map(img => img.public_id && cloudinary.uploader.destroy(img.public_id)))
  }

  await supabaseAdmin.from('project_images').delete().eq('project_id', id)
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id)
  if (error) return sendError(res, error.message, 500)

  sendSuccess(res, null, 'Project deleted')
})

// POST /api/projects/:id/images
export const addProjectImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!req.files?.length) return sendError(res, 'No images provided', 400)

  const images = req.files.map((file, i) => ({
    project_id: id,
    url: file.path,
    alt: req.body.alt || `Project image ${i + 1}`,
    is_cover: req.body.is_cover === 'true' && i === 0,
    public_id: file.filename,
  }))

  const { data, error } = await supabaseAdmin.from('project_images').insert(images).select()
  if (error) return sendError(res, error.message, 500)

  sendSuccess(res, data, 'Images uploaded', 201)
})

// DELETE /api/projects/images/:imageId
export const deleteProjectImage = asyncHandler(async (req, res) => {
  const { imageId } = req.params
  const { data: img } = await supabaseAdmin.from('project_images').select('public_id').eq('id', imageId).single()
  if (img?.public_id) await cloudinary.uploader.destroy(img.public_id)

  const { error } = await supabaseAdmin.from('project_images').delete().eq('id', imageId)
  if (error) return sendError(res, error.message, 500)

  sendSuccess(res, null, 'Image deleted')
})

// GET /api/projects/categories
export const getCategories = asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('projects').select('category').neq('category', null)
  if (error) return sendError(res, error.message, 500)
  const categories = [...new Set(data.map(p => p.category))]
  sendSuccess(res, categories)
})
