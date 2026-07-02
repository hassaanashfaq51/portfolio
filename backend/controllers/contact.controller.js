import { supabaseAdmin } from '../config/supabase.js'
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js'
import asyncHandler from '../utils/asyncHandler.js'
import nodemailer from 'nodemailer'

const createTransporter = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

// POST /api/contact
export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message, phone } = req.body

  if (!name || !email || !message) {
    return sendError(res, 'Name, email, and message are required', 400)
  }

  const { data, error } = await supabaseAdmin.from('messages').insert({
    name, email, subject, message, phone,
    ip_address: req.ip,
    user_agent: req.headers['user-agent'],
    is_read: false,
  }).select().single()

  if (error) return sendError(res, error.message, 500)

  // Send email notification
  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject || 'Portfolio Message'} from ${name}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto; background: #0F1115; color: #fff; padding: 30px; border-radius: 10px;">
          <h2 style="color: #6C63FF;">New Portfolio Message</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px; color:#aaa;">Name:</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px; color:#aaa;">Email:</td><td style="padding:8px;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px; color:#aaa;">Phone:</td><td style="padding:8px;">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px; color:#aaa;">Subject:</td><td style="padding:8px;">${subject || 'N/A'}</td></tr>
          </table>
          <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px; border-left:3px solid #6C63FF;">
            <p style="color:#aaa; margin:0 0 8px;">Message:</p>
            <p style="margin:0;">${message}</p>
          </div>
        </div>
      `,
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto; background: #0F1115; color: #fff; padding: 30px; border-radius: 10px;">
          <h2 style="color: #6C63FF;">Message Received!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I'll get back to you as soon as possible, typically within 24-48 hours.</p>
          <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px; border-left:3px solid #6C63FF;">
            <p style="color:#aaa; margin:0 0 8px;">Your message:</p>
            <p style="margin:0;">${message}</p>
          </div>
          <p style="margin-top:20px; color:#aaa;">Best regards</p>
        </div>
      `,
    })
  } catch (emailError) {
    console.error('Email send error:', emailError.message)
    // Don't fail the request if email fails
  }

  sendSuccess(res, data, 'Message sent successfully', 201)
})

// GET /api/contact/messages (admin)
export const getMessages = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, is_read, search } = req.query
  const offset = (parseInt(page) - 1) * parseInt(limit)

  let query = supabaseAdmin.from('messages').select('*', { count: 'exact' })
  if (is_read !== undefined) query = query.eq('is_read', is_read === 'true')
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`)
  query = query.order('created_at', { ascending: false }).range(offset, offset + parseInt(limit) - 1)

  const { data, error, count } = await query
  if (error) return sendError(res, error.message, 500)

  sendPaginated(res, data, { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(count / parseInt(limit)) })
})

// PATCH /api/contact/messages/:id/read (admin)
export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabaseAdmin.from('messages').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) return sendError(res, error.message, 500)
  sendSuccess(res, data, 'Marked as read')
})

// DELETE /api/contact/messages/:id (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const { error } = await supabaseAdmin.from('messages').delete().eq('id', req.params.id)
  if (error) return sendError(res, error.message, 500)
  sendSuccess(res, null, 'Message deleted')
})
