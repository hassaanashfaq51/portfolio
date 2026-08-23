import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const motionComponent = motion;
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { blogArticles } from '../utils/blogData';
import { 
  sectionReveal, 
  titleReveal, 
  subtitleReveal, 
  staggerContainer, 
  fadeUp, 
  projectCardHover, 
  tagHover, 
  buttonHover 
} from '../utils/animations';

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArticle]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motionComponent.section 
      id="blog" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motionComponent.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Blog & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Insights</span>
          </motionComponent.h2>
          <motionComponent.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Sharing my experiences, technical knowledge, projects, and lessons learned throughout my development journey.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <motionComponent.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {blogArticles.map((article) => (
            <motionComponent.div
              key={article.id}
              variants={{
                hidden: fadeUp.hidden,
                visible: fadeUp.visible,
                hover: projectCardHover.hover
              }}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                {/* Meta Category and Read Time */}
                <div className="flex items-center justify-between gap-4 mb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-indigo-500 dark:text-cyan-400 font-extrabold font-outfit">
                    <BookOpen size={12} />
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium font-sans">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {article.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.tags.map((tag, idx) => (
                    <motionComponent.span
                      key={idx}
                      variants={tagHover}
                      whileHover="hover"
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/35 cursor-default transition-colors duration-300"
                    >
                      {tag}
                    </motionComponent.span>
                  ))}
                </div>
              </div>

              {/* Read Action CTA Button */}
              <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-start">
                <motionComponent.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 hover:text-indigo-700 dark:hover:text-cyan-300 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg px-2 py-1"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motionComponent.button>
              </div>
            </motionComponent.div>
          ))}
        </motionComponent.div>

        {/* Polished Modal Overlay */}
        <AnimatePresence>
          {selectedArticle && (
            <motionComponent.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 dark:bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motionComponent.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200/50 dark:border-slate-800/50 focus:outline-none scrollbar"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-200/40 hover:bg-slate-200/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all border border-slate-200/35 dark:border-slate-700/35 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  aria-label="Close article"
                >
                  <X size={18} />
                </button>

                {/* Modal Content Headers */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">
                    <span>{selectedArticle.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-slate-400 dark:text-slate-500 normal-case font-medium flex items-center gap-1.5">
                      <Clock size={12} />
                      {selectedArticle.readTime}
                    </span>
                  </div>

                  <h1 
                    id="modal-title"
                    className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 dark:text-slate-100 mb-6 leading-tight"
                  >
                    {selectedArticle.title}
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pb-6 border-b border-slate-200/40 dark:border-slate-800/40">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-cyan-500/10 dark:text-cyan-400 border border-indigo-500/20 dark:border-cyan-400/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Article Core Body */}
                <div className="space-y-6 text-slate-700 dark:text-slate-350 font-sans text-sm sm:text-base leading-relaxed">
                  {selectedArticle.content.map((block, index) => {
                    if (block.type === 'heading') {
                      return (
                        <h4 
                          key={index} 
                          className="font-outfit font-extrabold text-lg sm:text-xl text-slate-800 dark:text-slate-100 mt-8 mb-3"
                        >
                          {block.text}
                        </h4>
                      );
                    }
                    if (block.type === 'paragraph') {
                      return (
                        <p key={index} className="text-slate-600 dark:text-slate-400">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'list') {
                      return (
                        <ul 
                          key={index} 
                          className="list-disc pl-5 space-y-2.5 my-4 text-slate-600 dark:text-slate-400"
                        >
                          {block.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="pl-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === 'code') {
                      return (
                        <div key={index} className="relative group my-6 overflow-hidden rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                          <div className="flex items-center justify-between px-4 py-2 bg-slate-200/30 dark:bg-slate-900/60 border-b border-slate-200/35 dark:border-slate-800/35 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                            <span>{block.language}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(block.code);
                                alert('Code snippet copied to clipboard!');
                              }}
                              className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 cursor-pointer focus:outline-none"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="p-4 sm:p-5 bg-slate-950 text-slate-100 font-mono text-[12px] sm:text-sm overflow-x-auto leading-relaxed scrollbar">
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Bottom Back Button */}
                <div className="mt-10 pt-6 border-t border-slate-200/40 dark:border-slate-800/40 flex justify-end">
                  <motionComponent.button
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200/50 hover:bg-slate-200/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/85 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-300/35 dark:border-slate-700/35 focus:outline-none"
                  >
                    Close Article
                  </motionComponent.button>
                </div>
              </motionComponent.div>
            </motionComponent.div>
          )}
        </AnimatePresence>

      </div>
    </motionComponent.section>
  );
};

export default Blog;
