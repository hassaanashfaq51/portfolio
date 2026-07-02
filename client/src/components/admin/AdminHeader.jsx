import { useLocation } from 'react-router-dom'
import { FiMenu, FiLogOut, FiBell } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const pageNames = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero Section',
  '/admin/about': 'About',
  '/admin/projects': 'Projects',
  '/admin/services': 'Services',
  '/admin/skills': 'Skills',
  '/admin/experience': 'Experience',
  '/admin/education': 'Education',
  '/admin/testimonials': 'Testimonials',
  '/admin/messages': 'Messages',
  '/admin/resume': 'Resume',
  '/admin/social': 'Social Links',
  '/admin/seo': 'SEO Settings',
  '/admin/settings': 'Website Settings',
}

export default function AdminHeader({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const title = pageNames[pathname] || 'Admin'

  return (
    <header className="h-14 border-b border-white/5 bg-[#0B0D11] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
          <FiMenu size={20} />
        </button>
        <h1 className="font-heading font-semibold text-white text-sm">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
          <FiBell size={17} />
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold text-xs text-white">
            {user?.name?.[0] || 'A'}
          </div>
          <span className="hidden sm:block">{user?.name || user?.email}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-400/5"
        >
          <FiLogOut size={15} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  )
}
