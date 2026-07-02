/**
 * Generic CRUD controller factory for simple tables
 */
import { supabaseAdmin } from '../config/supabase.js'
import { cloudinary } from '../config/cloudinary.js'
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'

export const createGenericController = (tableName, options = {}) => {
  const { imageField = 'image', singleRow = false } = options

  const getAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 50, sort = 'order_index', order = 'asc', search } = req.query

    if (singleRow) {
      const { data, error } = await supabaseAdmin.from(tableName).select('*').limit(1).maybeSingle()
      if (error) return sendError(res, error.message, 500)
      return sendSuccess(res, data || null)
    }

    const offset = (parseInt(page) - 1) * parseInt(limit)

    let query = supabaseAdmin.from(tableName).select('*', { count: 'exact' })
    if (search && options.searchField) query = query.ilike(options.searchField, `%${search}%`)
    query = query.order(sort, { ascending: order === 'asc' }).range(offset, offset + parseInt(limit) - 1)

    const { data, error, count } = await query
    if (error) return sendError(res, error.message, 500)

    sendPaginated(res, data, { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil((count || 0) / parseInt(limit)) })
  })

  const getOne = asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin.from(tableName).select('*').eq('id', req.params.id).single()
    if (error || !data) return sendError(res, `${tableName} record not found`, 404)
    sendSuccess(res, data)
  })

  const create = asyncHandler(async (req, res) => {
    const body = { ...req.body }
    if (req.file?.path) body[imageField] = req.file.path
    if (req.file?.filename) body[`${imageField}_public_id`] = req.file.filename

    // Parse JSON string fields
    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'string' && (body[key].startsWith('[') || body[key].startsWith('{'))) {
        try { body[key] = JSON.parse(body[key]) } catch (e) {}
      }
    })

    const { data, error } = await supabaseAdmin.from(tableName).insert(body).select().single()
    if (error) return sendError(res, error.message, 500)
    sendSuccess(res, data, `${tableName} created`, 201)
  })

  const update = asyncHandler(async (req, res) => {
    const body = { ...req.body, updated_at: new Date().toISOString() }
    if (req.file?.path) body[imageField] = req.file.path
    if (req.file?.filename) body[`${imageField}_public_id`] = req.file.filename

    // Delete old image if replacing
    if (req.file && req.body[`${imageField}_public_id`]) {
      try { await cloudinary.uploader.destroy(req.body[`${imageField}_public_id`]) } catch (e) {}
    }

    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'string' && (body[key].startsWith('[') || body[key].startsWith('{'))) {
        try { body[key] = JSON.parse(body[key]) } catch (e) {}
      }
    })

    let query
    if (singleRow) {
      const { data: existing } = await supabaseAdmin.from(tableName).select('id').limit(1).single()
      if (existing) {
        query = supabaseAdmin.from(tableName).update(body).eq('id', existing.id)
      } else {
        query = supabaseAdmin.from(tableName).insert(body)
      }
    } else {
      query = supabaseAdmin.from(tableName).update(body).eq('id', req.params.id)
    }

    const { data, error } = await query.select().single()
    if (error) return sendError(res, error.message, 500)
    sendSuccess(res, data, `${tableName} updated`)
  })

  const remove = asyncHandler(async (req, res) => {
    // Delete associated image
    const { data: item } = await supabaseAdmin.from(tableName).select(`${imageField}_public_id`).eq('id', req.params.id).single()
    if (item?.[`${imageField}_public_id`]) {
      try { await cloudinary.uploader.destroy(item[`${imageField}_public_id`]) } catch (e) {}
    }

    const { error } = await supabaseAdmin.from(tableName).delete().eq('id', req.params.id)
    if (error) return sendError(res, error.message, 500)
    sendSuccess(res, null, `${tableName} deleted`)
  })

  const reorder = asyncHandler(async (req, res) => {
    const { items } = req.body // [{ id, order_index }]
    if (!Array.isArray(items)) return sendError(res, 'Items array required', 400)

    await Promise.all(items.map(({ id, order_index }) =>
      supabaseAdmin.from(tableName).update({ order_index }).eq('id', id)
    ))
    sendSuccess(res, null, 'Order updated')
  })

  return { getAll, getOne, create, update, remove, reorder }
}
