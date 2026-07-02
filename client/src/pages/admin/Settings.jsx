import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSave, FiGlobe } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

export default function AdminSettings() {
  const { data: settings, loading, refetch } = useFetch('/settings')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (settings) reset(settings)
  }, [settings, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    setError('')
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'logo') { if (v instanceof FileList && v[0]) fd.append('logo', v[0]) }
      else fd.append(k, v ?? '')
    })
    try {
      await api.put('/settings', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setSuccess(true); refetch(); setTimeout(() => setSuccess(false), 3000)
    } catch (err) { setError(getErrorMessage(err)) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="skeleton h-96 rounded-2xl" />

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">Website Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white flex items-center gap-2"><FiGlobe size={18} /> General</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Site Title</label>
            <input {...register('site_title')} className="input" placeholder="My Portfolio" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Site Description</label>
            <textarea {...register('site_description')} rows={2} className="input resize-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Footer Text</label>
            <input {...register('footer_text')} className="input" placeholder="© 2024 Portfolio. All rights reserved." />
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white">Branding</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Logo</label>
            <input {...register('logo')} type="file" accept="image/*" className="input text-sm" />
            {settings?.logo && <img src={settings.logo} alt="Logo" className="mt-2 h-10 rounded border border-white/10" />}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Primary Color</label>
              <div className="flex gap-2">
                <input {...register('primary_color')} type="color" className="w-12 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                <input {...register('primary_color')} className="input flex-1" placeholder="#6C63FF" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Accent Color</label>
              <div className="flex gap-2">
                <input {...register('accent_color')} type="color" className="w-12 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                <input {...register('accent_color')} className="input flex-1" placeholder="#2CB67D" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white">Analytics</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Google Analytics ID</label>
            <input {...register('analytics_id')} className="input" placeholder="G-XXXXXXXXXX" />
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5">
          <h2 className="font-heading font-semibold text-white mb-4">Maintenance Mode</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input {...register('maintenance_mode')} type="checkbox" className="w-4 h-4" />
            <span className="text-gray-400 text-sm">Enable maintenance mode (site will show maintenance page to visitors)</span>
          </label>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className={`btn-primary flex items-center gap-2 ${success ? '!from-accent-3 !to-accent-3' : ''}`}>
            <FiSave size={16} />
            {success ? 'Saved!' : saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
