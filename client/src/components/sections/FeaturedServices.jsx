import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { HiOutlineCode, HiOutlineColorSwatch, HiOutlineDeviceMobile, HiOutlineServer } from 'react-icons/hi'
import useFetch from '../../hooks/useFetch'

const fallbackIcons = [HiOutlineCode, HiOutlineColorSwatch, HiOutlineDeviceMobile, HiOutlineServer]

const ServiceCard = ({ service, index }) => {
  const Icon = fallbackIcons[index % fallbackIcons.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 glass border border-white/5 rounded-2xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-400 overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
          <Icon size={22} className="text-accent" />
        </div>

        <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {service.short_description || service.description}
        </p>

        {/* Features */}
        {service.features?.length > 0 && (
          <ul className="space-y-1 mb-4">
            {service.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-3" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <Link to="/services" className="inline-flex items-center gap-1 text-sm text-accent hover:gap-2 transition-all">
          Learn more <FiArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function FeaturedServices() {
  const { data: services, loading } = useFetch('/services', { params: { limit: 4 } })

  if (loading || !services?.length) return null

  return (
    <section className="section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-accent-3 font-mono text-sm mb-2">// What I Do</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-title">My <span className="gradient-text">Services</span></motion.h2>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link to="/services" className="btn-ghost flex items-center gap-2 text-gray-400 hover:text-accent-3">
            All Services <FiArrowRight />
          </Link>
        </motion.div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </section>
  )
}
