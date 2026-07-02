import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-3/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="mb-8"
        >
          <span className="font-heading font-black text-[10rem] leading-none gradient-text opacity-20 select-none block">
            404
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border border-white/5 rounded-3xl p-10 -mt-20 relative z-10"
        >
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="font-heading font-bold text-3xl text-white mb-3">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            Looks like this page has drifted into deep space. Let's bring you back to solid ground.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary flex items-center justify-center gap-2">
              <FiHome /> Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary flex items-center justify-center gap-2">
              <FiArrowLeft /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
