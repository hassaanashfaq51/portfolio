import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'
import api, { getErrorMessage } from '../services/api'
import { useData } from '../context/DataContext'

export default function Contact() {
  const { socialLinks } = useData()
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSending(true)
    setServerError('')
    try {
      await api.post('/contact', data)
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 6000)
    } catch (err) {
      setServerError(getErrorMessage(err))
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'hassaanashfaq51@gmail.com',
      href: 'mailto:hassaanashfaq51@gmail.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+92 311 6647440',
      href: 'tel:+923116647440',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Mailsi, Punjab, Pakistan',
      href: null,
    },
  ]

  return (
    <div className="pt-24 section">
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-mono text-sm mb-2">// Get in Touch</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          Let's <span className="gradient-text">Connect</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto">
          Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4 glass border border-white/5 rounded-xl p-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-mono mb-0.5">{label}</p>
                {href ? (
                  <a href={href} className="text-white text-sm hover:text-accent transition-colors">{value}</a>
                ) : (
                  <p className="text-white text-sm">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Response time */}
          <div className="glass border border-accent-3/20 rounded-xl p-4 text-center">
            <span className="w-2 h-2 bg-accent-3 rounded-full inline-block animate-pulse mr-2" />
            <span className="text-accent-3 text-sm font-medium">Typically responds within 24 hours</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
          <div className="glass border border-white/5 rounded-2xl p-8">
            {success ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-accent-3/10 border border-accent-3/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck size={28} className="text-accent-3" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Your Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Doe"
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                    <input
                      {...register('email', { required: 'Email required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                      placeholder="john@example.com"
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
                  <input {...register('phone')} placeholder="+1 (555) 000-0000" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
                  <input {...register('subject')} placeholder="Project Inquiry" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Message *</label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Too short' } })}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {serverError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{serverError}</div>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
