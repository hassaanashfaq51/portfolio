import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertTriangle, FiGithub, FiExternalLink, FiImage } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

const INITIAL_FORM = { title: '', category: '', short_description: '', description: '', technologies: '', github_link: '', live_link: '', features: '', challenges: '', solutions: '', status: 'completed', tags: '', is_featured: false }

export default function AdminProjects() {
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const { data, loading, refetch } = useFetch('/projects', { params: { limit: 100 } })
  const projects = Array.isArray(data) ? data : (data?.data || [])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { reset(INITIAL_FORM); setEditItem(null); setShowForm(true) }
  const openEdit = (p) => {
    setEditItem(p)
    reset({
      title: p.title, category: p.category, short_description: p.short_description, description: p.description,
      technologies: p.technologies?.join(', ') || '', github_link: p.github_link || '', live_link: p.live_link || '',
      features: p.features?.join(', ') || '', challenges: p.challenges || '', solutions: p.solutions || '',
      status: p.status, tags: p.tags?.join(', ') || '', is_featured: p.is_featured,
    })
    setShowForm(true)
  }

  const onSubmit = async (data) => {
    setSaving(true)
    setError('')
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'images') {
          if (v instanceof FileList) Array.from(v).forEach(f => fd.append('images', f))
        } else {
          fd.append(k, v ?? '')
        }
      })

      if (editItem) {
        // Update without re-uploading images
        const payload = { ...data }
        ;['technologies', 'features', 'tags'].forEach(k => {
          payload[k] = typeof data[k] === 'string' ? data[k].split(',').map(s => s.trim()).filter(Boolean) : data[k]
        })
        delete payload.images
        await api.put(`/projects/${editItem.id}`, payload)
      } else {
        await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      setShowForm(false)
      refetch()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await api.delete(`/projects/${deleteId}`); setDeleteId(null); refetch() }
    catch (err) { setError(getErrorMessage(err)) }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-xl text-white">Projects</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm py-2"><FiPlus size={16} /> Add Project</button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-4 flex items-center gap-2">
          <FiAlertTriangle size={16} /> {error}
          <button onClick={() => setError('')} className="ml-auto"><FiX size={16} /></button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass border border-white/5 rounded-2xl p-16 text-center text-gray-500">
          <FiImage size={40} className="mx-auto mb-4 opacity-20" />
          <p>No projects yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => {
            const cover = p.project_images?.find(img => img.is_cover) || p.project_images?.[0]
            return (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="group glass border border-white/5 rounded-2xl overflow-hidden hover:border-accent/20 transition-all">
                <div className="relative h-36 bg-gradient-card">
                  {cover?.url ? (
                    <img src={cover.url} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-accent/20 text-4xl font-heading">{p.title?.[0]}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  {p.is_featured && <span className="absolute top-2 left-2 text-xs bg-accent/20 text-accent border border-accent/20 rounded-full px-2 py-0.5">Featured</span>}
                  <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full border ${p.status === 'completed' ? 'bg-accent-3/10 text-accent-3 border-accent-3/20' : 'bg-accent/10 text-accent border-accent/20'}`}>{p.status}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-white text-sm mb-1 line-clamp-1">{p.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{p.short_description || p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(p.technologies || []).slice(0, 3).map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 bg-white/5 rounded text-gray-500 font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {p.github_link && <a href={p.github_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white"><FiGithub size={13} /></a>}
                      {p.live_link && <a href={p.live_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-3"><FiExternalLink size={13} /></a>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-500 hover:text-accent rounded-lg hover:bg-accent/10 transition-colors"><FiEdit2 size={13} /></button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"><FiTrash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-[#0F1115] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="font-heading font-semibold text-white">{editItem ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={() => { setShowForm(false); setEditItem(null) }} className="text-gray-500 hover:text-white"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Title *</label>
                    <input {...register('title', { required: true })} className="input" placeholder="Project Name" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <input {...register('category')} className="input" placeholder="Web App, Mobile..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Short Description</label>
                  <input {...register('short_description')} className="input" placeholder="Brief summary" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Description</label>
                  <textarea {...register('description')} rows={3} className="input resize-none" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
                    <input {...register('github_link')} className="input" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                    <input {...register('live_link')} className="input" placeholder="https://..." />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Technologies (comma sep.)</label>
                    <input {...register('technologies')} className="input" placeholder="React, Node.js, ..." />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <select {...register('status')} className="input">
                      <option value="completed">Completed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="planned">Planned</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Features (comma separated)</label>
                  <textarea {...register('features')} rows={2} className="input resize-none" placeholder="Feature 1, Feature 2..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                  <input {...register('tags')} className="input" placeholder="tag1, tag2..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Completion Date</label>
                  <input {...register('completion_date')} type="date" className="input" />
                </div>
                {!editItem && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Project Images</label>
                    <input {...register('images')} type="file" multiple accept="image/*" className="input text-sm" />
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input {...register('is_featured')} type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-400 text-sm">Featured project</span>
                </label>
                {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); setEditItem(null) }} className="flex-1 btn-secondary py-2.5 text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50">
                    {saving ? 'Saving...' : (editItem ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F1115] border border-red-500/20 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="font-heading font-bold text-white text-center mb-2">Delete Project?</h3>
              <p className="text-gray-400 text-sm text-center mb-6">All images will also be deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary py-2 text-sm">Cancel</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl py-2 text-sm font-medium">
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
