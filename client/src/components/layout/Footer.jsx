import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi'
import { useData } from '../../context/DataContext'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  instagram: FiInstagram,
  email: FiMail,
  x: FiTwitter,
}

export default function Footer() {
  const { settings, socialLinks } = useData()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 mt-20">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold">P</div>
              <span className="font-heading font-bold text-xl">{settings?.site_title || 'Portfolio'}</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {settings?.site_description || 'Building premium digital experiences with modern web technologies.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Services', '/services'], ['Skills', '/skills'], ['Contact', '/contact']].map(([label, path]) => (
                <Link key={path} to={path} className="text-gray-500 hover:text-accent transition-colors text-sm">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.platform?.toLowerCase()] || FiGithub
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/50 hover:shadow-glow-accent transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-gray-600 text-sm">
            {settings?.footer_text || `© ${new Date().getFullYear()} Portfolio. All rights reserved.`}
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
          >
            Back to top <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
