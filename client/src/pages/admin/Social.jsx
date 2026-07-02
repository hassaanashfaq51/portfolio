import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

const platforms = ['github', 'linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'email', 'phone', 'x', 'tiktok']

export default function AdminSocial() {
  const { data, loading, refetch } = useFetch('/social')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, control, reset } = useForm({ defaultValues: { links: [] } })
  const { fields, append, remove } = useFieldArray({ control, name: 'links' })

  useEffect(() => {
    const items = Array.isArray(data) ? data : (data?.data || [])
    if (items.length > 0) reset({ links: items })
  }, [data, reset])

  const onSubmit = async ({ links }) => {
    setSaving(true)
    setError('')
    try {
      await api.put('/social', { links })
      setSuccess(true); refetch(); setTimeout(() => setSuccess(false), 3000)
    } catch (err) { setError(getErrorMessage(err)) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="skeleton h-64 rounded-2xl" />

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">Social Links</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="glass border border-white/5 rounded-2xl p-5 mb-4">
          <div className="space-y-3">
            {fields.map((field, i) => (
              <div key={field.id} className="grid grid-cols-[1fr_1.5fr_auto] gap-3 items-center">
                <select {...register(`links.${i}.platform`)} className="input text-sm py-2">
                  <option value="">Platform</option>
                  {platforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
                <input {...register(`links.${i}.url`)} placeholder="https://..." className="input text-sm py-2" />
                <button type="button" onClick={() => remove(i)} className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
                  <FiTrash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => append({ platform: '', url: '', is_active: true })}
            className="mt-4 flex items-center gap-2 text-sm text-accent hover:text-accent-3 transition-colors">
            <FiPlus size={16} /> Add Link
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-4">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className={`btn-primary flex items-center gap-2 ${success ? '!from-accent-3 !to-accent-3' : ''}`}>
            <FiSave size={16} />
            {success ? 'Saved!' : saving ? 'Saving...' : 'Save Links'}
          </button>
        </div>
      </form>
    </div>
  )
}
