import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSave } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

export default function AdminSEO() {
  const { data: seo, loading, refetch } = useFetch('/seo')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (seo) reset(seo)
  }, [seo, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    setError('')
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'og_image') { if (v instanceof FileList && v[0]) fd.append('og_image', v[0]) }
      else fd.append(k, v || '')
    })
    try {
      await api.put('/seo', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setSuccess(true); refetch(); setTimeout(() => setSuccess(false), 3000)
    } catch (err) { setError(getErrorMessage(err)) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="skeleton h-96 rounded-2xl" />

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">SEO Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white">Meta Tags</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Meta Title</label>
            <input {...register('meta_title')} className="input" placeholder="Portfolio | Full Stack Developer" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Meta Description</label>
            <textarea {...register('meta_description')} rows={3} className="input resize-none" placeholder="Brief description for search engines..." />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Keywords</label>
            <input {...register('keywords')} className="input" placeholder="developer, portfolio, react, nodejs" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Robots</label>
            <select {...register('robots')} className="input">
              <option value="index, follow">Index, Follow</option>
              <option value="noindex, nofollow">No Index, No Follow</option>
              <option value="index, nofollow">Index, No Follow</option>
            </select>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white">Open Graph (Social Share)</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">OG Title</label>
            <input {...register('og_title')} className="input" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">OG Description</label>
            <textarea {...register('og_description')} rows={2} className="input resize-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">OG Image (1200x630 recommended)</label>
            <input {...register('og_image')} type="file" accept="image/*" className="input text-sm" />
            {seo?.og_image && <img src={seo.og_image} alt="OG" className="mt-2 h-20 rounded-lg border border-white/10" />}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Twitter Card Type</label>
            <select {...register('twitter_card')} className="input">
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Canonical URL</label>
          <input {...register('canonical_url')} className="input" placeholder="https://yourportfolio.com" />
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className={`btn-primary flex items-center gap-2 ${success ? '!from-accent-3 !to-accent-3' : ''}`}>
            <FiSave size={16} />
            {success ? 'Saved!' : saving ? 'Saving...' : 'Save SEO'}
          </button>
        </div>
      </form>
    </div>
  )
}
