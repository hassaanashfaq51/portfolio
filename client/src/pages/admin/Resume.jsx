import { useState } from 'react'
import { FiUpload, FiDownload, FiTrash2, FiFile } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

export default function AdminResume() {
  const { data: resume, loading, refetch } = useFetch('/resume')
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('resume', file)
    try {
      await api.post('/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      refetch()
    } catch (err) { setError(getErrorMessage(err)) }
    finally { setUploading(false) }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete resume?')) return
    setDeleting(true)
    try { await api.delete('/resume'); refetch() }
    catch (err) { setError(getErrorMessage(err)) }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">Resume</h1>

      {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-4">{error}</div>}

      <div className="max-w-lg">
        {resume?.url ? (
          <div className="glass border border-accent-3/20 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                <FiFile size={22} className="text-red-400" />
              </div>
              <div>
                <p className="text-white font-medium">{resume.filename || 'Resume.pdf'}</p>
                <p className="text-gray-500 text-sm">Uploaded {new Date(resume.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={resume.url} target="_blank" rel="noopener noreferrer" className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                <FiDownload /> Download / Preview
              </a>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50">
                <FiTrash2 size={14} /> {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <div className="glass border border-white/5 rounded-2xl p-10 text-center mb-4">
            <FiFile size={40} className="mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400 font-medium mb-1">No resume uploaded</p>
            <p className="text-gray-600 text-sm">Upload a PDF to display on your portfolio</p>
          </div>
        )}

        <label className={`flex items-center justify-center gap-3 cursor-pointer glass border border-white/10 rounded-2xl p-5 hover:border-accent/30 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <FiUpload size={20} className="text-accent" />
          <div>
            <p className="text-white font-medium">{resume?.url ? 'Replace Resume' : 'Upload Resume'}</p>
            <p className="text-gray-500 text-sm">PDF only, max 10MB</p>
          </div>
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
          {uploading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-auto" />}
        </label>
      </div>
    </div>
  )
}
