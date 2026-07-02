import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi'
import api, { getErrorMessage } from '../../services/api'
import useFetch from '../../hooks/useFetch'

/**
 * Reusable Admin CRUD component
 * Props:
 * - endpoint: API endpoint (e.g. '/skills')
 * - title: Page title
 * - columns: Array of { key, label, render? }
 * - FormComponent: Component for add/edit form
 * - params: Additional query params
 */
export default function AdminCRUD({ endpoint, title, columns, FormComponent, params = {} }) {
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const { data, loading, refetch } = useFetch(endpoint, { params })

  const items = Array.isArray(data) ? data : (data?.data || [])

  const handleDelete = async (id) => {
    setDeleting(true)
    try {
      await api.delete(`${endpoint}/${id}`)
      setDeleteId(null)
      refetch()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditItem(null)
    refetch()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-xl text-white">{title}</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setEditItem(null); setShowForm(true) }}
          className="btn-primary flex items-center gap-2 text-sm py-2"
        >
          <FiPlus size={16} /> Add New
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-4 flex items-center gap-2">
          <FiAlertTriangle size={16} /> {error}
          <button onClick={() => setError('')} className="ml-auto"><FiX size={16} /></button>
        </div>
      )}

      {/* Table */}
      <div className="glass border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-12 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FiPlus size={40} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">No items yet</p>
            <p className="text-sm mt-1">Click "Add New" to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {columns.map(col => (
                    <th key={col.key} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">{col.label}</th>
                  ))}
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-sm text-gray-300">
                        {col.render ? col.render(item[col.key], item) : (item[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditItem(item); setShowForm(true) }}
                          className="p-1.5 text-gray-500 hover:text-accent transition-colors rounded-lg hover:bg-accent/10"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0F1115] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="font-heading font-semibold text-white">
                  {editItem ? `Edit ${title.replace(/s$/, '')}` : `Add ${title.replace(/s$/, '')}`}
                </h2>
                <button onClick={() => { setShowForm(false); setEditItem(null) }} className="text-gray-500 hover:text-white p-1">
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-5">
                <FormComponent
                  item={editItem}
                  endpoint={endpoint}
                  onSuccess={handleSuccess}
                  onCancel={() => { setShowForm(false); setEditItem(null) }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F1115] border border-red-500/20 rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="text-red-400" size={20} />
              </div>
              <h3 className="font-heading font-bold text-white text-center mb-2">Delete Item?</h3>
              <p className="text-gray-400 text-sm text-center mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary text-sm py-2">Cancel</button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
