import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiMail } from 'react-icons/fi'

export default function ContactCTA() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl glass border border-accent/20 p-12 sm:p-16 text-center"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-3/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-3/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 items-center justify-center mb-6"
          >
            <FiMail size={28} className="text-accent" />
          </motion.div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Have a project in mind? I'd love to hear about it. Let's build something amazing together.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary flex items-center gap-2 group">
              Start a Conversation <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/projects" className="btn-secondary">
              View My Work
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
