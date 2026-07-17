import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { sectionReveal, titleReveal, subtitleReveal, buttonHover, fadeUp } from '../utils/animations';

const Resume = () => {
  return (
    <motion.section 
      id="resume" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Glow backgrounds */}
      <div className="absolute top-[30%] left-[5%] w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Resume</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Minimal Action Card */}
        <motion.div 
          variants={fadeUp}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl bg-white/20 dark:bg-slate-950/10 max-w-xl mx-auto transition-colors duration-300"
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Click the button below to view or download a comprehensive, printer-ready PDF version of my technical skills, projects, and professional background.
          </p>

          <div className="flex justify-center">
            <motion.a
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              href="/assets/Muhammad_Hassaan_Resume.pdf"
              download="Muhammad_Hassaan_Resume.pdf"
              className="group flex items-center space-x-2.5 py-4 px-8 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/20 hover:shadow-cyan-500/25 cursor-pointer transition-colors"
            >
              <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Download PDF Resume</span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Resume;
