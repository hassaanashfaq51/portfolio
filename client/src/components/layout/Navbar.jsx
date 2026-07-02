import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useData } from '../../context/DataContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { settings } = useData()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 py-3 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {settings?.logo ? (
              <img src={settings.logo} alt="Logo" className="h-9 w-auto" />
            ) : (
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold text-lg shadow-glow-accent group-hover:scale-110 transition-transform duration-300">
                  P
                </div>
                <div className="absolute inset-0 rounded-xl bg-accent/20 blur-md group-hover:blur-lg transition-all duration-300" />
              </div>
            )}
            <span className="font-heading font-bold text-xl text-white hidden sm:block">
              {settings?.site_title || 'Portfolio'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-4/5 transition-all duration-300" />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden sm:flex btn-primary text-sm py-2.5 px-5">
              Hire Me
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden glass border border-white/10 p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[68px] left-0 right-0 z-40 glass-strong border-b border-white/5 lg:hidden overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, path }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-gray-300 hover:bg-white/5'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/contact" className="btn-primary text-center mt-2">
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
