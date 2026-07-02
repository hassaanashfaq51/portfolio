import express from 'express'
import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router()

const countRows = async (table, applyFilters = query => query) => {
  const query = applyFilters(supabaseAdmin.from(table).select('id', { count: 'exact', head: true }))
  const { count, error } = await query
  if (error) throw error
  return count || 0
}

router.get('/', asyncHandler(async (req, res) => {
  try {
    const { data: about } = await supabaseAdmin
      .from('about')
      .select('years_of_experience, projects_completed, clients_served')
      .limit(1)
      .maybeSingle()

    const [
      completedProjects,
      totalProjects,
      skills,
      services,
      education,
      experience,
      testimonials,
    ] = await Promise.all([
      countRows('projects', query => query.eq('status', 'completed')),
      countRows('projects'),
      countRows('skills'),
      countRows('services', query => query.eq('is_active', true)),
      countRows('education'),
      countRows('experience'),
      countRows('testimonials', query => query.eq('is_active', true)),
    ])

    const projectsCompleted = Math.max(completedProjects, about?.projects_completed || 0)

    sendSuccess(res, {
      yearsExperience: about?.years_of_experience || 0,
      projectsCompleted,
      totalProjects,
      technologies: skills,
      services,
      education,
      experience,
      testimonials,
      clientsServed: about?.clients_served || 0,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    sendError(res, error.message, 500)
  }
}))

export default router
