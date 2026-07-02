import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiCheckCircle, FiTrash2, FiSearch, FiX, FiAlertTriangle } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import api, { getErrorMessage } from '../../services/api'

export default function AdminMessages() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [error, setError] = useState('')
  const { data, loading, refetch } = useFetch('/contact/messages', {
    params: { limit: 50, is_read: filter || undefined, search: search || undefined },
  })

  const messages = Array.isArray(data) ? data : (data?.data || [])

  const markRead = async (id) => {
    try { await api.patch(`/contact/messages/${id}/read`); refetch() } catch (e) {}
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/contact/messages/${deleteId}`)
      setDeleteId(null)
      setSelectedMsg(null)
      refetch()
    } catch (err) { setError(getErrorMessage(err)) }
  }

  const handleOpen = (msg) => {
    setSelectedMsg(msg)
    if (!msg.is_read) markRead(msg.id)
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-xl text-white mb-6">Messages</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-4 flex items-center gap-2">
          <FiAlertTriangle size={16} /> {error}
          <button onClick={() => setError('')} className="ml-auto"><FiX size={16} /></button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="input pl-9 py-2 text-sm" />
        </div>
        <div className="flex gap-2">
          {['', 'false', 'true'].map((v, i) => (
            <button key={i} onClick={() => setFilter(v)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === v ? 'bg-accent/10 text-accent border border-accent/20' : 'glass border border-white/5 text-gray-500 hover:text-white'}`}>
              {i === 0 ? 'All' : i === 1 ? 'Unread' : 'Read'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)
          ) : messages.length === 0 ? (
            <div className="glass border border-white/5 rounded-2xl p-10 text-center text-gray-500">
              <FiMail size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">No messages</p>
            </div>
          ) : messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => handleOpen(msg)}
              className={`glass border rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5 ${
                selectedMsg?.id === msg.id ? 'border-accent/40 bg-accent/5' : msg.is_read ? 'border-white/5 hover:border-white/10' : 'border-accent/20 hover:border-accent/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  {!msg.is_read && <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                  <p className={`text-sm font-medium truncate ${msg.is_read ? 'text-gray-400' : 'text-white'}`}>{msg.name}</p>
                </div>
                <span className="text-xs text-gray-600 flex-shrink-0">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-1">{msg.subject || 'No subject'}</p>
              <p className="text-xs text-gray-600 line-clamp-1">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selectedMsg ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedMsg.id}
              className="glass border border-white/5 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-heading font-bold text-white text-lg mb-1">{selectedMsg.name}</h3>
                  <a href={`mailto:${selectedMsg.email}`} className="text-accent text-sm hover:underline">{selectedMsg.email}</a>
                  {selectedMsg.phone && <p className="text-gray-500 text-sm mt-0.5">{selectedMsg.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${selectedMsg.is_read ? 'text-gray-500 bg-gray-500/10' : 'text-accent bg-accent/10'}`}>
                    {selectedMsg.is_read ? <FiCheckCircle size={12} /> : <FiMail size={12} />}
                    {selectedMsg.is_read ? 'Read' : 'Unread'}
                  </span>
                  <button onClick={() => setDeleteId(selectedMsg.id)} className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              {selectedMsg.subject && <div className="mb-4 pb-4 border-b border-white/5">
                <p className="text-gray-500 text-xs mb-1 font-mono">SUBJECT</p>
                <p className="text-white">{selectedMsg.subject}</p>
              </div>}

              <div className="mb-4">
                <p className="text-gray-500 text-xs mb-2 font-mono">MESSAGE</p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
              </div>

              <p className="text-gray-600 text-xs">{new Date(selectedMsg.created_at).toLocaleString()}</p>

              <div className="mt-4 pt-4 border-t border-white/5">
                <a href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject || 'Your message'}`}
                  className="btn-primary text-sm py-2.5 inline-flex items-center gap-2">
                  <FiMail size={15} /> Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="glass border border-white/5 rounded-2xl p-16 text-center text-gray-500">
              <FiCheckCircle size={40} className="mx-auto mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F1115] border border-red-500/20 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="font-heading font-bold text-white text-center mb-2">Delete Message?</h3>
              <p className="text-gray-400 text-sm text-center mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary py-2 text-sm">Cancel</button>
                <button onClick={handleDelete} className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl py-2 text-sm font-medium transition-colors">Delete</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
