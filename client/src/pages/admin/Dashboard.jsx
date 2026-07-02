import { motion } from 'framer-motion'
import { FiBriefcase, FiLayers, FiMessageSquare, FiCode, FiStar, FiBook } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useAuth } from '../../context/AuthContext'

const StatCard = ({ icon: Icon, label, value, color, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass border border-white/5 rounded-2xl p-5 hover:border-accent/20 transition-all hover:-translate-y-0.5"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      {link && <Link to={link} className="text-xs text-gray-500 hover:text-accent transition-colors">View all →</Link>}
    </div>
    <p className="font-heading font-black text-3xl text-white mb-1">{value ?? '—'}</p>
    <p className="text-gray-500 text-sm">{label}</p>
  </motion.div>
)

export default function Dashboard() {
  const { user } = useAuth()
  const { data: stats } = useFetch('/settings/dashboard')

  const cards = [
    { icon: FiBriefcase, label: 'Total Projects', value: stats?.projects, color: 'bg-accent/10 text-accent', link: '/admin/projects', delay: 0 },
    { icon: FiLayers, label: 'Services', value: stats?.services, color: 'bg-purple-500/10 text-purple-400', link: '/admin/services', delay: 0.05 },
    { icon: FiMessageSquare, label: 'Messages', value: stats?.messages, color: `${stats?.unreadMessages > 0 ? 'bg-red-500/10 text-red-400' : 'bg-accent-3/10 text-accent-3'}`, link: '/admin/messages', delay: 0.1 },
    { icon: FiCode, label: 'Skills', value: stats?.skills, color: 'bg-yellow-500/10 text-yellow-400', link: '/admin/skills', delay: 0.15 },
    { icon: FiStar, label: 'Testimonials', value: stats?.testimonials, color: 'bg-pink-500/10 text-pink-400', link: '/admin/testimonials', delay: 0.2 },
    { icon: FiBook, label: 'Education', value: stats?.education, color: 'bg-blue-500/10 text-blue-400', link: '/admin/education', delay: 0.25 },
  ]

  const quickLinks = [
    { label: 'Add Project', path: '/admin/projects', emoji: '🚀' },
    { label: 'Update Hero', path: '/admin/hero', emoji: '🎯' },
    { label: 'Add Skill', path: '/admin/skills', emoji: '💡' },
    { label: 'Check Messages', path: '/admin/messages', emoji: '📬', badge: stats?.unreadMessages },
  ]

  return (
    <div>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-white mb-1">
          Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="text-gray-500 text-sm">Here's what's happening with your portfolio.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(card => <StatCard key={card.label} {...card} />)}
      </div>

      {/* Unread messages alert */}
      {stats?.unreadMessages > 0 && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/admin/messages" className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 hover:bg-red-500/15 transition-colors">
            <FiMessageSquare className="text-red-400" size={20} />
            <span className="text-red-300 text-sm">
              You have <strong>{stats.unreadMessages}</strong> unread {stats.unreadMessages === 1 ? 'message' : 'messages'}
            </span>
          </Link>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="font-heading font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map(({ label, path, emoji, badge }) => (
            <Link
              key={path}
              to={path}
              className="glass border border-white/5 rounded-xl p-4 text-center hover:border-accent/20 hover:-translate-y-0.5 transition-all relative group"
            >
              {badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {badge}
                </span>
              )}
              <div className="text-2xl mb-2">{emoji}</div>
              <p className="text-sm text-gray-400 group-hover:text-white transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
