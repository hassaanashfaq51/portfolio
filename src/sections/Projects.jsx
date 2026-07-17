import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { FolderGit2, Loader, AlertTriangle } from 'lucide-react';
import { sectionReveal, titleReveal, subtitleReveal, staggerContainer } from '../utils/animations';

const Projects = ({ projects, loading, error, isAdmin, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Filter Categories
  const categories = ['All', 'React.js', 'Node.js', 'Supabase', 'Flutter'];

  useEffect(() => {
    if (!Array.isArray(projects)) {
      setFilteredProjects([]);
      return;
    }
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(proj => {
        if (!proj) return false;
        const techList = Array.isArray(proj.technologies) 
          ? proj.technologies 
          : (typeof proj.technologies === 'string' ? proj.technologies.split(',').map(t => t.trim()) : []);
        return techList.some(tech => tech && typeof tech === 'string' && tech.toLowerCase() === filter.toLowerCase());
      });
      setFilteredProjects(filtered);
    }
  }, [filter, projects]);

  return (
    <motion.section 
      id="projects" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background decoration */}
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Showcase of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Featured Work</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm max-w-md mx-auto">
            Explore web applications, tools, and mobile software built with modern architectural guidelines.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/15'
                  : 'glass-panel text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 border border-slate-200/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loader and Error States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader size={36} className="animate-spin mb-4 text-indigo-500" />
            <span className="text-sm font-medium">Fetching portfolio artifacts...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-red-500 bg-red-500/5 border border-red-500/10 rounded-2xl max-w-md mx-auto">
            <AlertTriangle size={36} className="mb-3" />
            <span className="text-sm font-bold">Failed to load projects</span>
            <span className="text-xs mt-1 text-slate-500 text-center px-4">{error}</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            No projects found matching the filter category "{filter}".
          </div>
        ) : (
          /* Project Grid */
          <motion.div 
            layout
            variants={staggerContainer}
            className={filteredProjects.length === 1 
              ? "max-w-2xl mx-auto w-full" 
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
};

export default Projects;
