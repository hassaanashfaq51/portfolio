import { motion } from 'framer-motion'
import { FiDownload, FiAward, FiBriefcase, FiCode } from 'react-icons/fi'
import useFetch from '../hooks/useFetch'

export default function About() {
  const { data: about } = useFetch('/about')
  const { data: resume } = useFetch('/resume')

  return (
    <div className="pt-24 section">
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-mono text-sm mb-2">// About Me</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          Who I <span className="gradient-text">Am</span>
        </motion.h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden">
            {about?.image ? (
              <img src={about.image} alt="About" className="w-full aspect-[4/5] object-cover" />
            ) : (
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-accent/20 to-accent-3/10 rounded-3xl flex items-center justify-center">
                <FiCode size={80} className="text-accent/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          {/* Stats overlay */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Years Exp.', value: about?.years_of_experience || 3 },
              { label: 'Projects', value: about?.projects_completed || 50 },
              { label: 'Clients', value: about?.clients_served || 30 },
            ].map(({ label, value }) => (
              <div key={label} className="glass-strong border border-white/10 rounded-xl p-3 text-center">
                <p className="font-heading font-bold text-xl gradient-text">{value}+</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-heading font-bold text-3xl text-white mb-6">
            Passionate Developer & <span className="gradient-text">Creative Thinker</span>
          </h2>

          <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
            <p>{about?.biography || "I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly digital experiences. I combine technical expertise with an eye for design to build products that make an impact."}</p>
            {about?.personal_story && <p>{about.personal_story}</p>}
          </div>

          {/* Mission / Vision */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {about?.mission && (
              <div className="glass border border-accent/20 rounded-xl p-4">
                <h3 className="font-heading font-semibold text-accent text-sm mb-2 flex items-center gap-2"><FiAward size={14} /> Mission</h3>
                <p className="text-gray-400 text-sm">{about.mission}</p>
              </div>
            )}
            {about?.vision && (
              <div className="glass border border-accent-3/20 rounded-xl p-4">
                <h3 className="font-heading font-semibold text-accent-3 text-sm mb-2 flex items-center gap-2"><FiBriefcase size={14} /> Vision</h3>
                <p className="text-gray-400 text-sm">{about.vision}</p>
              </div>
            )}
          </div>

          {resume?.url && (
            <a href={resume.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              <FiDownload /> Download Resume
            </a>
          )}
        </motion.div>
      </div>

      {/* Achievements */}
      {about?.achievements?.length > 0 && (
        <div className="mb-16">
          <h2 className="section-title text-3xl mb-8">Achievements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {about.achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass border border-white/5 rounded-2xl p-5 hover:border-accent/20 transition-colors">
                <p className="text-gray-300 text-sm">{typeof a === 'string' ? a : a.title || a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
