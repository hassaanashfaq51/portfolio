import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'

const categories = [
  { key: 'frontend', label: 'Frontend', color: 'text-accent' },
  { key: 'backend', label: 'Backend', color: 'text-accent-3' },
  { key: 'database', label: 'Database', color: 'text-yellow-400' },
  { key: 'tools', label: 'Tools & DevOps', color: 'text-pink-400' },
  { key: 'soft_skills', label: 'Soft Skills', color: 'text-blue-400' },
]

const SkillBar = ({ skill, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-white text-sm font-medium flex items-center gap-2">
        {skill.icon && <span>{skill.icon}</span>}
        {skill.name}
      </span>
      <div className="flex items-center gap-2">
        {skill.years_of_experience > 0 && (
          <span className="text-gray-600 text-xs font-mono">{skill.years_of_experience}yr</span>
        )}
        <span className="text-accent text-sm font-mono font-bold">{skill.proficiency}%</span>
      </div>
    </div>
    <div className="progress-bar">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  </motion.div>
)

export default function Skills() {
  const { data: skills, loading } = useFetch('/skills', { params: { limit: 100 } })

  const grouped = categories.map(cat => ({
    ...cat,
    skills: (skills || []).filter(s => s.category === cat.key),
  })).filter(g => g.skills.length > 0)

  return (
    <div className="pt-24 section">
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-mono text-sm mb-2">// My Expertise</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          Skills & <span className="gradient-text">Technologies</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-lg mx-auto">
          A curated list of technologies I've worked with and continue to master.
        </motion.p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="glass border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
            >
              <h2 className={`font-heading font-bold text-lg mb-6 ${group.color}`}>{group.label}</h2>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.id} skill={skill} delay={si * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Featured skills as tags */}
      {skills?.filter(s => s.is_featured).length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4 font-mono">Featured Technologies</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.filter(s => s.is_featured).map(skill => (
              <span key={skill.id} className="px-4 py-2 glass border border-accent/20 rounded-full text-sm text-accent font-mono hover:bg-accent/10 transition-colors cursor-default">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
