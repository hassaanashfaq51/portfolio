import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiSearch, FiGrid, FiList } from 'react-icons/fi'
import useFetch from '../hooks/useFetch'

export default function Projects() {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [searchInput, setSearchInput] = useState('')

  const { data: projects, loading } = useFetch('/projects', {
    params: { category: category || undefined, search: search || undefined, limit: 50 },
  })
  const { data: categories } = useFetch('/projects/categories')

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <div className="pt-24 section">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-mono text-sm mb-2">// My Work</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          All <span className="gradient-text">Projects</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto">
          A collection of projects that showcase my skills and experience.
        </motion.p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCategory('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!category ? 'bg-accent text-white' : 'glass border border-white/10 text-gray-400 hover:text-white'}`}>
            All
          </button>
          {(categories || []).map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-accent text-white' : 'glass border border-white/10 text-gray-400 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Search + View toggle */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search projects..."
              className="input py-2 pr-10 text-sm w-48"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent">
              <FiSearch size={16} />
            </button>
          </form>
          <div className="flex gap-1 glass border border-white/10 rounded-lg p-1">
            <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-accent/20 text-accent' : 'text-gray-500'}`}><FiGrid size={16} /></button>
            <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-accent/20 text-accent' : 'text-gray-500'}`}><FiList size={16} /></button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className={`grid ${view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="skeleton h-64 rounded-2xl" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${search}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid ${view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
          >
            {(projects || []).map((project, i) => {
              const cover = project.project_images?.find(img => img.is_cover) || project.project_images?.[0]
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group glass border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-1 transition-all duration-400 ${view === 'list' ? 'flex gap-6 p-4' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${view === 'grid' ? 'h-48' : 'w-40 h-28 flex-shrink-0 rounded-xl'}`}>
                    {cover?.url ? (
                      <img src={cover.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent-3/10 flex items-center justify-center">
                        <span className="font-heading text-3xl text-accent/30">{project.title?.[0]}</span>
                      </div>
                    )}
                    {view === 'grid' && <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />}
                  </div>

                  {/* Content */}
                  <div className={`${view === 'grid' ? 'p-5' : 'flex-1'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {project.category && <span className="tag">{project.category}</span>}
                      <span className={`text-xs font-mono ${project.status === 'completed' ? 'text-accent-3' : 'text-accent'}`}>{project.status}</span>
                    </div>
                    <h3 className="font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{project.short_description || project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(project.technologies || []).slice(0, 4).map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-white/5 rounded text-gray-400 font-mono">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link to={`/projects/${project.slug}`} className="text-sm text-accent hover:underline">View Details</Link>
                      {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white"><FiGithub size={15} /></a>}
                      {project.live_link && <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-3"><FiExternalLink size={15} /></a>}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && !projects?.length && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-heading font-semibold text-xl text-white mb-2">No projects found</p>
          <p>Try a different category or search term.</p>
        </div>
      )}
    </div>
  )
}
