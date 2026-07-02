import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCounter } from '../../hooks/useCounter'
import useFetch from '../../hooks/useFetch'

const StatItem = ({ label, value, suffix = '+', delay = 0 }) => {
  const numValue = parseInt(value) || 0
  const [ref, count] = useCounter(numValue, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center group"
    >
      <div className="relative inline-block">
        <span className="font-heading font-black text-4xl sm:text-5xl gradient-text">
          {count}{suffix}
        </span>
        <div className="absolute -inset-2 bg-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      </div>
      <p className="text-gray-500 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  const { data, loading, refetch } = useFetch('/stats')

  const stats = [
    { label: 'Years Experience', value: data?.yearsExperience || 0 },
    { label: 'Projects Completed', value: data?.projectsCompleted || 0 },
    { label: 'Services', value: data?.services || 0 },
    { label: 'Technologies', value: data?.technologies || 0 },
  ]

  useEffect(() => {
    const interval = setInterval(refetch, 10000)
    return () => clearInterval(interval)
  }, [refetch])

  return (
    <section className="py-16 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/3 via-transparent to-accent-3/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {loading ? (
            stats.map((s) => (
              <div key={s.label} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
            ))
          ) : (
            stats.map((s, i) => (
              <StatItem key={`${s.label}-${s.value}`} {...s} delay={i * 0.1} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
