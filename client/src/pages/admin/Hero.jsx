import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FiSave, FiUpload } from 'react-icons/fi'
import api, { getErrorMessage } from '../../services/api'
import useFetch from '../../hooks/useFetch'

export default function AdminHero() {
  const { data: hero, loading, refetch } = useFetch('/hero')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (hero) {
      reset({
        name: hero.name || '',
        tagline: hero.tagline || '',
        subtitle: hero.subtitle || '',
        description: hero.description || '',
        cta_primary_text: hero.cta_primary_text || 'View Projects',
        cta_primary_link: hero.cta_primary_link || '/projects',
        cta_secondary_text: hero.cta_secondary_text || 'Contact Me',
        cta_secondary_link: hero.cta_secondary_link || '/contact',
        typing_words: Array.isArray(hero.typing_words) ? hero.typing_words.join(', ') : '',
      })
    }
  }, [hero, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    setError('')
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'profile_image') {
        if (v instanceof FileList && v[0]) fd.append('profile_image', v[0])
      } else {
        fd.append(k, v || '')
      }
    })
    try {
      await api.put('/hero', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setSuccess(true)
      refetch()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="skeleton h-96 rounded-2xl" />

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">Hero Section</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
              <h2 className="font-heading font-semibold text-white mb-4">Profile Info</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
                <input {...register('name')} placeholder="Your Name" className="input" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tagline</label>
                <input {...register('tagline')} placeholder="e.g. Full Stack Developer" className="input" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Subtitle</label>
                <input {...register('subtitle')} placeholder="e.g. Available for freelance" className="input" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Description</label>
                <textarea {...register('description')} rows={4} className="input resize-none" placeholder="Tell visitors about yourself..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Typing Words (comma separated)</label>
                <input {...register('typing_words')} placeholder="Full Stack Developer, UI Designer, Problem Solver" className="input" />
              </div>
            </div>

            <div className="glass border border-white/5 rounded-2xl p-5">
              <h2 className="font-heading font-semibold text-white mb-4">Call-to-Action Buttons</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Primary Button Text</label>
                  <input {...register('cta_primary_text')} className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Primary Button Link</label>
                  <input {...register('cta_primary_link')} className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Secondary Button Text</label>
                  <input {...register('cta_secondary_text')} className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Secondary Button Link</label>
                  <input {...register('cta_secondary_link')} className="input" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile image */}
          <div>
            <div className="glass border border-white/5 rounded-2xl p-5 sticky top-0">
              <h2 className="font-heading font-semibold text-white mb-4">Profile Image</h2>
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-white/10 mb-4 bg-gradient-card flex items-center justify-center">
                {imagePreview || hero?.profile_image ? (
                  <img src={imagePreview || hero?.profile_image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl text-white/10 font-heading font-black">{hero?.name?.[0] || 'P'}</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 cursor-pointer glass border border-white/10 rounded-xl px-4 py-3 hover:border-accent/30 transition-colors text-sm text-gray-400 hover:text-white">
                <FiUpload size={16} /> Upload Photo
                <input {...register('profile_image')} type="file" accept="image/*" className="hidden"
                  onChange={e => { if (e.target.files[0]) setImagePreview(URL.createObjectURL(e.target.files[0])) }} />
              </label>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mt-4">{error}</div>}

        <div className="mt-6 flex justify-end">
          <motion.button type="submit" disabled={saving} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`btn-primary flex items-center gap-2 ${success ? '!bg-accent-3 !from-accent-3 !to-accent-3' : ''}`}>
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={16} />}
            {success ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
  )
}
