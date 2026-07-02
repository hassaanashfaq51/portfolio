import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiLink } from 'react-icons/fi'
import useFetch from '../hooks/useFetch'

const ExperienceCard = ({ item, index }) => {
  const startDate = item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''
  const endDate = item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />
      {/* Timeline dot */}
      <div className={`absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full border-2 transition-colors ${item.is_current ? 'border-accent-3 bg-accent-3' : 'border-accent bg-background group-hover:bg-accent'}`} />

      <div className="glass border border-white/5 rounded-2xl p-6 hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-4">
            {item.company_logo ? (
              <img src={item.company_logo} alt={item.company} className="w-10 h-10 rounded-xl object-cover border border-white/10" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-heading font-bold">
                {item.company?.[0]}
              </div>
            )}
            <div>
              <h3 className="font-heading font-bold text-white text-lg">{item.role}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {item.company_url ? (
                  <a href={item.company_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent flex items-center gap-1">
                    {item.company} <FiLink size={12} />
                  </a>
                ) : (
                  <span>{item.company}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {(startDate || endDate) && (
              <span className="flex items-center gap-1 glass px-3 py-1 rounded-full border border-white/5">
                <FiCalendar size={11} /> {startDate} — {endDate}
              </span>
            )}
            {item.location && (
              <span className="flex items-center gap-1 glass px-3 py-1 rounded-full border border-white/5">
                <FiMapPin size={11} /> {item.location}
              </span>
            )}
            {item.type && (
              <span className="tag">{item.type.replace('_', ' ')}</span>
            )}
          </div>
        </div>

        {item.description && <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>}

        {item.responsibilities?.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {item.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        )}

        {item.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map(t => (
              <span key={t} className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-xs text-accent font-mono">{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { data: experience, loading } = useFetch('/experience')
  const { data: education, loading: eduLoading } = useFetch('/education')

  return (
    <div className="pt-24 section">
      <div className="text-center mb-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-mono text-sm mb-2">// My Journey</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          Experience & <span className="gradient-text">Education</span>
        </motion.h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center text-accent text-sm">💼</span>
            Work Experience
          </h2>
          {loading ? (
            <div className="space-y-4">{Array(3).fill(0).map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>
          ) : (
            <div>{(experience || []).map((item, i) => <ExperienceCard key={item.id} item={item} index={i} />)}</div>
          )}
        </div>

        {/* Education */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-accent-3/10 border border-accent-3/20 rounded-lg flex items-center justify-center text-accent-3 text-sm">🎓</span>
            Education
          </h2>
          {eduLoading ? (
            <div className="space-y-4">{Array(2).fill(0).map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>
          ) : (
            <div>
              {(education || []).map((item, i) => {
                const startDate = item.start_date ? new Date(item.start_date).getFullYear() : ''
                const endDate = item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).getFullYear() : ''
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8 pb-12 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-3 via-accent-3/30 to-transparent" />
                    <div className={`absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full border-2 ${item.is_current ? 'border-accent-3 bg-accent-3' : 'border-accent-3/50 bg-background'}`} />

                    <div className="glass border border-white/5 rounded-2xl p-5 hover:border-accent-3/20 transition-colors">
                      <div className="flex items-start gap-3 mb-2">
                        {item.image ? (
                          <img src={item.image} alt={item.institute} className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-accent-3/10 border border-accent-3/20 flex items-center justify-center text-accent-3 font-heading font-bold flex-shrink-0">
                            {item.institute?.[0]}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-white">{item.degree}</h3>
                          <p className="text-gray-400 text-sm">{item.institute}</p>
                          {item.field_of_study && <p className="text-gray-500 text-xs">{item.field_of_study}</p>}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs mt-3">
                        {(startDate || endDate) && (
                          <span className="glass px-3 py-1 rounded-full border border-white/5 text-gray-400">
                            {startDate} — {endDate}
                          </span>
                        )}
                        {item.grade && <span className="glass px-3 py-1 rounded-full border border-accent-3/20 text-accent-3">GPA: {item.grade}</span>}
                      </div>
                      {item.description && <p className="text-gray-500 text-sm mt-3">{item.description}</p>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
