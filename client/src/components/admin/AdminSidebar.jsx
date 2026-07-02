import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiUser, FiBriefcase, FiCode, FiStar, FiMessageSquare,
  FiSettings, FiFileText, FiLink, FiSearch, FiBook, FiLayers, FiGlobe,
  FiChevronLeft
} from 'react-icons/fi'
import { HiOutlineHome } from 'react-icons/hi'

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: FiGrid, end: true },
  { label: 'Hero', path: '/admin/hero', icon: HiOutlineHome },
  { label: 'About', path: '/admin/about', icon: FiUser },
  { label: 'Projects', path: '/admin/projects', icon: FiBriefcase },
  { label: 'Services', path: '/admin/services', icon: FiLayers },
  { label: 'Skills', path: '/admin/skills', icon: FiCode },
  { label: 'Experience', path: '/admin/experience', icon: FiBriefcase },
  { label: 'Education', path: '/admin/education', icon: FiBook },
  { label: 'Testimonials', path: '/admin/testimonials', icon: FiStar },
  { label: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
  { label: 'Resume', path: '/admin/resume', icon: FiFileText },
  { label: 'Social Links', path: '/admin/social', icon: FiLink },
  { label: 'SEO', path: '/admin/seo', icon: FiSearch },
  { label: 'Settings', path: '/admin/settings', icon: FiSettings },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: open ? 240 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex-shrink-0 overflow-hidden bg-[#0B0D11] border-r border-white/5"
      >
        <div className="w-60 h-full flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold text-sm">P</div>
              <span className="font-heading font-bold text-white">Admin</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
              <FiChevronLeft size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-0.5">
              {navItems.map(({ label, path, icon: Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent border border-accent/20'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} className={isActive ? 'text-accent' : ''} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/5">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-accent transition-colors">
              <FiGlobe size={13} /> View Portfolio
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
