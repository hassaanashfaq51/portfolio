import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'

const ProjectCard = ({ project, index }) => {
  const cover = project.project_images?.find(i => i.is_cover) || project.project_images?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative glass border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {cover?.url ? (
          <img src={cover.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent-3/10 flex items-center justify-center">
            <span className="font-heading font-bold text-4xl text-accent/30">{project.title?.[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-mono font-medium ${
            project.status === 'completed' ? 'bg-accent-3/20 text-accent-3 border border-accent-3/20' :
            'bg-accent/20 text-accent border border-accent/20'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Links overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 glass border border-white/10 rounded-lg flex items-center justify-center text-white hover:text-accent transition-colors"
              onClick={e => e.stopPropagation()}>
              <FiGithub size={14} />
            </a>
          )}
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 glass border border-white/10 rounded-lg flex items-center justify-center text-white hover:text-accent-3 transition-colors"
              onClick={e => e.stopPropagation()}>
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {project.category && <span className="tag">{project.category}</span>}
        </div>
        <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {project.short_description || project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies || []).slice(0, 3).map(tech => (
            <span key={tech} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400 font-mono">{tech}</span>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500 font-mono">+{project.technologies.length - 3}</span>
          )}
        </div>

        <Link to={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm text-accent hover:text-accent-3 transition-colors group/link">
          View Details <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  const { data: projects, loading } = useFetch('/projects', { params: { featured: 'true', limit: 3 } })

  if (loading) return null

  return (
    <section className="section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-sm mb-2"
          >
            // Featured Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Recent <span className="gradient-text">Projects</span>
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link to="/projects" className="btn-ghost flex items-center gap-2 text-gray-400 hover:text-accent">
            View All <FiArrowRight />
          </Link>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects || []).map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
