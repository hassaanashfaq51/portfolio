import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Trash2, Edit } from 'lucide-react';
import { buttonHover, projectCardHover, imageHover, tagHover, fadeUp } from '../utils/animations';

const projectCardVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible,
  hover: projectCardHover.hover
};

const ProjectCard = ({ project, isAdmin, onEdit, onDelete }) => {
  if (!project) return null;
  const { id, title, description, technologies, features, live_url, github_url, image_url } = project;

  const techList = Array.isArray(technologies) 
    ? technologies 
    : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()) : []);
  const featList = Array.isArray(features) 
    ? features 
    : (typeof features === 'string' ? features.split(',').map(f => f.trim()) : []);

  return (
    <motion.div
      layout
      variants={projectCardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover="hover"
      className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full relative group transition-colors duration-300"
    >
      {/* Admin Actions */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            onClick={() => onEdit(project)}
            className="p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-indigo-500 backdrop-blur-md transition-colors shadow-lg cursor-pointer"
            title="Edit Project"
          >
            <Edit size={14} />
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="p-2.5 rounded-full bg-slate-900/80 text-red-400 hover:bg-red-600 hover:text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
            title="Delete Project"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Project Banner Image */}
      <div className="h-48 sm:h-52 w-full overflow-hidden relative">
        <motion.img 
          variants={imageHover}
          src={image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {/* Soft overlay appearing on hover */}
        <motion.div 
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1, transition: { duration: 0.3 } }
          }}
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" 
        />
      </div>

      {/* Card Details */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {techList.map((tech, index) => (
              <motion.span 
                key={index}
                variants={tagHover}
                className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-cyan-500/10 dark:text-cyan-400 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <h3 className="font-outfit font-bold text-lg sm:text-xl mb-2 text-slate-800 dark:text-slate-100">
            {title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Key Features */}
          {featList && featList.length > 0 && (
            <div className="mb-4 sm:mb-5">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Key Highlights</h5>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                {featList.slice(0, 3).map((feat, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Link Buttons */}
        <div className="flex space-x-3 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
          {live_url && (
            <motion.a 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center space-x-1.5 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 shadow-md shadow-indigo-500/15 cursor-pointer"
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </motion.a>
          )}
          {github_url && (
            <motion.a 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center space-x-1.5 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer bg-transparent hover:bg-slate-100/30"
            >
              <Github size={13} />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
