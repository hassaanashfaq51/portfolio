import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useFetch from '../hooks/useFetch'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data: project, loading, error } = useFetch(`/projects/slug/${slug}`)

  if (loading) return (
    <div className="pt-24 section">
      <div className="skeleton h-96 rounded-3xl mb-8" />
      <div className="skeleton h-8 w-64 rounded mb-4" />
      <div className="skeleton h-4 w-full rounded mb-2" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  )

  if (error || !project) return (
    <div className="pt-32 section text-center">
      <p className="text-6xl mb-4">😕</p>
      <h1 className="font-heading text-3xl font-bold mb-4">Project Not Found</h1>
      <Link to="/projects" className="btn-primary inline-flex items-center gap-2"><FiArrowLeft /> Back to Projects</Link>
    </div>
  )

  const images = project.project_images || []

  return (
    <div className="pt-24 section">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-8">
          <FiArrowLeft /> Back to Projects
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Gallery */}
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl overflow-hidden">
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-2xl">
                {images.map(img => (
                  <SwiperSlide key={img.id}>
                    <img src={img.url} alt={img.alt || project.title} className="w-full h-80 object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            {project.title}
          </motion.h1>

          {/* Meta */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mb-6">
            {project.category && <span className="tag"><FiTag size={12} className="inline mr-1" />{project.category}</span>}
            <span className={`tag ${project.status === 'completed' ? '!text-accent-3 !border-accent-3/30 !bg-accent-3/10' : ''}`}>{project.status}</span>
            {project.completion_date && (
              <span className="tag"><FiCalendar size={12} className="inline mr-1" />{new Date(project.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            )}
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="font-heading font-bold text-xl text-white mb-3">Overview</h2>
            <p className="text-gray-400 leading-relaxed mb-8">{project.description}</p>
          </motion.div>

          {/* Features */}
          {project.features?.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
              <h2 className="font-heading font-bold text-xl text-white mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Challenges & Solutions */}
          {(project.challenges || project.solutions) && (
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {project.challenges && (
                <div className="glass border border-red-500/10 rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-white mb-2">Challenges</h3>
                  <p className="text-gray-400 text-sm">{project.challenges}</p>
                </div>
              )}
              {project.solutions && (
                <div className="glass border border-accent-3/10 rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-white mb-2">Solutions</h3>
                  <p className="text-gray-400 text-sm">{project.solutions}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 font-mono">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 space-y-5">
            {/* Links */}
            <div className="glass border border-white/5 rounded-2xl p-5">
              <h3 className="font-heading font-semibold text-white mb-4">Links</h3>
              <div className="space-y-3">
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white p-3 glass rounded-xl hover:border-accent/20 border border-transparent transition-all">
                    <FiGithub /> <span className="text-sm">View on GitHub</span>
                  </a>
                )}
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-accent-3 p-3 glass rounded-xl hover:border-accent-3/20 border border-transparent transition-all">
                    <FiExternalLink /> <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            {project.technologies?.length > 0 && (
              <div className="glass border border-white/5 rounded-2xl p-5">
                <h3 className="font-heading font-semibold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs text-accent font-mono">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link to="/contact" className="btn-primary w-full flex items-center justify-center gap-2">
              Hire Me for Similar Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
