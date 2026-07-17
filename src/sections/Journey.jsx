import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import { sectionReveal, titleReveal, subtitleReveal } from '../utils/animations';

const Journey = () => {
  return (
    <motion.section 
      id="journey" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background decoration */}
      <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Journey & Experience</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm max-w-md mx-auto">
            A chronological timeline of my technical accomplishments, skills development, and full-stack engineering milestones.
          </p>
        </div>

        {/* Timeline Component wrapper */}
        <Timeline />

      </div>
    </motion.section>
  );
};

export default Journey;
