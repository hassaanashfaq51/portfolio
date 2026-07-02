import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import useFetch from '../hooks/useFetch'

export default function Services() {
  const { data: services, loading } = useFetch('/services', { params: { limit: 50 } })

  return (
    <div className="pt-24 section">
      <div className="text-center mb-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent-3 font-mono text-sm mb-2">// What I Offer</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          My <span className="gradient-text">Services</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto">
          Comprehensive development services tailored to bring your vision to life.
        </motion.p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton h-80 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group glass border rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-400 ${service.is_featured ? 'border-accent/30 shadow-glow-accent' : 'border-white/5 hover:border-accent/20'}`}
            >
              {/* Image */}
              {service.image ? (
                <div className="h-44 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-44 bg-gradient-card flex items-center justify-center">
                  <span className="text-5xl">🛠️</span>
                </div>
              )}

              <div className="p-6">
                {service.is_featured && (
                  <span className="text-xs font-mono text-accent-3 border border-accent-3/20 px-2 py-0.5 rounded-full mb-3 inline-block">Featured</span>
                )}
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.short_description || service.description}
                </p>

                {service.features?.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {service.features.slice(0, 4).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-gray-400 text-sm">
                        <FiCheck size={14} className="text-accent-3 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between">
                  {service.price && <p className="text-accent font-heading font-bold">{service.price}</p>}
                  <Link to="/contact" className="flex items-center gap-1 text-sm text-gray-400 hover:text-accent transition-colors ml-auto group/link">
                    {service.cta_text || 'Get Started'} <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !services?.length && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🔧</p>
          <p className="font-heading text-xl text-white mb-2">No services yet</p>
          <p>Check back soon!</p>
        </div>
      )}

      {/* Bottom CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
        <p className="text-gray-400 mb-4">Don't see what you need? Let's talk about custom solutions.</p>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
          Discuss Your Project <FiArrowRight />
        </Link>
      </motion.div>
    </div>
  )
}
