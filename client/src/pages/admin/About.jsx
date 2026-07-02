import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSave } from 'react-icons/fi'
import api, { getErrorMessage } from '../../services/api'
import useFetch from '../../hooks/useFetch'

export default function AdminAbout() {
  const { data: about, loading, refetch } = useFetch('/about')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (about) reset({
      biography: about.biography || '', personal_story: about.personal_story || '',
      mission: about.mission || '', vision: about.vision || '',
      career_goals: about.career_goals || '',
      years_of_experience: about.years_of_experience || 0,
      projects_completed: about.projects_completed || 0,
      clients_served: about.clients_served || 0,
      achievements: Array.isArray(about.achievements) ? about.achievements.join('\n') : '',
    })
  }, [about, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    setError('')
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'image') { if (v instanceof FileList && v[0]) fd.append('image', v[0]) }
      else if (k === 'achievements') { fd.append(k, JSON.stringify(v.split('\n').filter(Boolean))) }
      else fd.append(k, v || '')
    })
    try {
      await api.put('/about', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setSuccess(true); refetch(); setTimeout(() => setSuccess(false), 3000)
    } catch (err) { setError(getErrorMessage(err)) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="skeleton h-96 rounded-2xl" />

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">About Section</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
            <h2 className="font-heading font-semibold text-white">Biography</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Biography</label>
              <textarea {...register('biography')} rows={5} className="input resize-none" placeholder="Tell your story..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Personal Story</label>
              <textarea {...register('personal_story')} rows={3} className="input resize-none" />
            </div>
          </div>
          <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
            <h2 className="font-heading font-semibold text-white">Mission & Vision</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Mission</label>
              <textarea {...register('mission')} rows={3} className="input resize-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Vision</label>
              <textarea {...register('vision')} rows={3} className="input resize-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Career Goals</label>
              <textarea {...register('career_goals')} rows={2} className="input resize-none" />
            </div>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5">
          <h2 className="font-heading font-semibold text-white mb-4">Stats</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[['years_of_experience', 'Years of Experience'], ['projects_completed', 'Projects Completed'], ['clients_served', 'Clients Served']].map(([n, l]) => (
              <div key={n}>
                <label className="block text-sm text-gray-400 mb-1.5">{l}</label>
                <input {...register(n)} type="number" className="input" placeholder="0" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="font-heading font-semibold text-white">Profile Image</h2>
          <input {...register('image')} type="file" accept="image/*" className="input text-sm" />
          {about?.image && <img src={about.image} alt="About" className="w-32 h-40 object-cover rounded-xl border border-white/10" />}
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5">
          <h2 className="font-heading font-semibold text-white mb-4">Achievements</h2>
          <label className="block text-sm text-gray-400 mb-1.5">One per line</label>
          <textarea {...register('achievements')} rows={5} className="input resize-none" placeholder="Award 1&#10;Certificate 2&#10;..." />
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className={`btn-primary flex items-center gap-2 ${success ? '!from-accent-3 !to-accent-3' : ''}`}>
            <FiSave size={16} />
            {success ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
