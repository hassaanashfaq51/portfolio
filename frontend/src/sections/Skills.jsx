import React from 'react';
import { motion } from 'framer-motion';
import { 
  sectionReveal, 
  titleReveal, 
  subtitleReveal, 
  staggerContainer, 
  skillCardHover, 
  skillIconHover,
  fadeUp
} from '../utils/animations';

// Custom wrapper combination to merge fadeUp entrance with skillCardHover
const cardVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible,
  hover: skillCardHover.hover
};

// High-fidelity custom SVG logos for the tech stack
const skillLogos = {
  "React.js": (
    <svg className="w-8 h-8" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "Node.js": (
    <svg className="w-8 h-8" viewBox="0 0 256 284" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0L24 60.1v120.2l104 60.1 104-60.1V60.1L128 0z" fill="#339933"/>
      <path d="M128 27.7l80 46.2v92.4l-80 46.2-80-46.2V73.9l80-46.2z" fill="#333333"/>
      <path d="M128 55.4l56 32.3v64.6l-56 32.3-56-32.3V87.7l56-32.3z" fill="#66CC33"/>
    </svg>
  ),
  "Supabase": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.361 9.905H13.62L18.423.864a.5.5 0 00-.776-.566L2.639 14.095h7.741L5.577 23.136a.5.5 0 00.776.566L21.361 9.905z" fill="#3ECF8E"/>
    </svg>
  ),
  "JavaScript": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
      <path d="M20 18.2c-.3.5-.7.8-1.2 1-.5.2-1 .3-1.6.3-1 0-1.8-.3-2.3-1-.6-.6-.8-1.5-.8-2.6h1.7c0 .6.2 1.1.4 1.3.3.3.7.4 1.2.4.4 0 .7-.1.9-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-1-.5l-.7-.3c-1-.4-1.6-.7-2-1.1-.4-.4-.6-1-.6-1.8 0-.9.3-1.6.9-2.1.6-.5 1.4-.7 2.4-.7.9 0 1.6.2 2.2.6.6.4.9.9 1.1 1.6h-1.7c-.1-.4-.3-.7-.6-.9-.3-.2-.6-.3-1.1-.3-.4 0-.7.1-.9.3-.2.2-.3.4-.3.6 0 .3.1.5.3.6.2.2.5.3 1 .5l.7.3c1 .4 1.7.8 2 1.2.4.4.6 1 .6 1.8 0 .9-.3 1.6-.9 2.2zM12 15v1.6c0 .8-.2 1.4-.6 1.7-.4.3-1 .5-1.8.5-.6 0-1.1-.1-1.5-.3-.4-.2-.7-.5-.9-.9-.1-.2-.2-.6-.2-1.1h1.7c0 .5.3.7.8.7.4 0 .6-.2.6-.6v-6.6h1.8V15z" fill="#323330"/>
    </svg>
  ),
  "HTML5": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" fill="#E34F26"/>
      <path d="M12 2.2v19.6l6.8-2.3 1.5-17.3H12z" fill="#F16529"/>
      <path d="M12 10.7H8.3l-.3-2.9H12V4.9H5.1l.8 8.9H12v-3.1zm0 5.6l-3.3-.9-.2-2.3H5.3l.4 4.8 6.3 1.7v-3.3z" fill="#EBEBEB"/>
      <path d="M12 10.7h3.7l-.4 3.9-3.3.9v3.3l6.3-1.7.9-9.6H12v3.2zm0-5.8v2.9h6.6l.3-2.9H12z" fill="#FFF"/>
    </svg>
  ),
  "CSS3": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" fill="#1572B6"/>
      <path d="M12 2.2v19.6l6.8-2.3 1.5-17.3H12z" fill="#33A9DC"/>
      <path d="M12 10.7H8.3l-.3-2.9H12V4.9H5.1l.8 8.9H12v-3.1zm0 5.6l-3.3-.9-.2-2.3H5.3l.4 4.8 6.3 1.7v-3.3z" fill="#EBEBEB"/>
      <path d="M12 10.7h3.7l-.4 3.9-3.3.9v3.3l6.3-1.7.9-9.6H12v3.2zm0-5.8v2.9h6.6l.3-2.9H12z" fill="#FFF"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.002C12 3.24 14.24 1 17 1s5 2.24 5 5.002c0 3.238-3.056 4.793-5 5.998-1.944-1.205-5-2.76-5-5.998zm-6 6c0-2.762 2.24-5.002 5-5.002s5 2.24 5 5.002c0 3.238-3.056 4.793-5 5.998-1.944-1.205-5-2.76-5-5.998z" fill="#06B6D4"/>
      <path d="M6 18.002C6 15.24 8.24 13 11 13s5 2.24 5 5.002c0 3.238-3.056 4.793-5 5.998-1.944-1.205-5-2.76-5-5.998z" fill="#06B6D4" opacity="0.6"/>
    </svg>
  ),
  "GitHub": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.22.694.825.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" fill="#FFF"/>
    </svg>
  ),
  "Git": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.384 11.232L12.768.616a1.088 1.088 0 00-1.536 0L8.768 3.08a.272.272 0 000 .384l3.056 3.056a.272.272 0 00.384 0l1.152-1.152a.272.272 0 01.384 0l3.824 3.824a.272.272 0 010 .384l-1.152 1.152a.272.272 0 000 .384l3.056 3.056a1.088 1.088 0 001.536-1.536v.024-.04zm-8.8 3.2L11.528 11.36a.272.272 0 00-.384 0l-1.2 1.2a.272.272 0 01-.384 0L6.64 9.616a.272.272 0 00-.384 0L.616 11.232a1.088 1.088 0 000 1.536l10.616 10.616a1.088 1.088 0 001.536 0l2.464-2.464a.272.272 0 000-.384l-1.2-1.2-.448-.104.016.032z" fill="#F05032"/>
    </svg>
  ),
  "Python": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 0C5.3 0 5.6 2.8 5.6 2.8l.1 2.9h6.3v.9H5.6S2 6.2 2 12.1c0 5.8 3.1 5.6 3.1 5.6h1.8v-2.5c0-2.8 2.3-5.2 5.1-5.2h6.3V5.8c0-3-2.6-5.8-6.4-5.8zm.2 24c6.6 0 6.3-2.8 6.3-2.8l-.1-2.9h-6.3v-.9h6.4s3.6.4 3.6-5.5c0-5.8-3.1-5.6-3.1-5.6H17v2.5c0 2.8-2.3 5.2-5.1 5.2H5.6v4.2c0 3 2.6 5.8 6.4 5.8z" fill="#3776AB"/>
      <circle cx="8.3" cy="2.8" r="0.75" fill="#FFF"/>
      <circle cx="15.7" cy="21.2" r="0.75" fill="#FFF"/>
    </svg>
  ),
  "C++": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 10.7h-2.7V8H19.5v2.7H16.8v1.8h2.7V15.2h1.8v-2.7H24V10.7z" fill="#00599C"/>
      <path d="M15 10.7h-2.7V8h-1.8v2.7H7.8v1.8h2.7V15.2h1.8v-2.7H15V10.7z" fill="#00599C"/>
      <path d="M12.4 2.2C5.9 2.2.6 7.5.6 14s5.3 11.8 11.8 11.8c4.3 0 8.1-2.3 10.1-5.8l-2.4-1.4c-1.5 2.7-4.4 4.5-7.7 4.5-4.8 0-8.8-3.9-8.8-8.8s3.9-8.8 8.8-8.8c3.3 0 6.2 1.8 7.7 4.5l2.4-1.4C20.5 4.5 16.7 2.2 12.4 2.2z" fill="#00599C"/>
    </svg>
  ),
  "Flutter": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.314 0L2.3 12l3.6 3.6 15.6-15.6H14.314zM21.5 12l-8.6 8.6-3.6-3.6 8.6-8.6h7.2L21.5 12z" fill="#02569B"/>
      <path d="M21.5 24h-7.2l-5-5 3.6-3.6 8.6 8.6z" fill="#0175C2"/>
    </svg>
  ),
  "Firebase": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.89 15.75L2.1 6.84a.45.45 0 01.76-.44L12 14.54l-8.11 1.21z" fill="#FFC107"/>
      <path d="M12 14.54L9.12.92a.45.45 0 00-.85-.14L3.89 15.75 12 14.54z" fill="#FFA000"/>
      <path d="M12 14.54v9.11a.45.45 0 00.74.34l9.37-9.45-10.11 1.21z" fill="#F57C00"/>
      <path d="M21.72 13.91L12 4.19.78 15.42a.45.45 0 00.62.66L12 14.54l9.1 1.35c.34-.05.51-.43.28-.68z" fill="#FFCA28"/>
    </svg>
  ),
  "REST APIs": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="6" rx="1.5" fill="#6366F1" fillOpacity="0.8"/>
      <rect x="2" y="13" width="20" height="6" rx="1.5" fill="#06B6D4" fillOpacity="0.8"/>
      <circle cx="6" cy="6" r="1.5" fill="#FFF"/>
      <circle cx="6" cy="16" r="1.5" fill="#FFF"/>
      <path d="M14 6h4M14 16h4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 9v4" stroke="#6366F1" strokeWidth="2" strokeDasharray="2 2"/>
    </svg>
  )
};

const Skills = () => {
  const skillsList = [
    "React.js",
    "Node.js",
    "Supabase",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "GitHub",
    "Git",
    "Flutter",
    "Python",
    "C++"
  ];

  return (
    <motion.section 
      id="skills" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background radial effects */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Expertise</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Unified Flat Grid of Skills */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 group/container"
        >
          {skillsList.map((skillName, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center text-center gap-4 group-hover/container:opacity-50 hover:!opacity-100 hover:border-indigo-500/50 dark:hover:border-cyan-400/50 cursor-default relative overflow-hidden bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm transition-colors duration-300"
            >
              {/* Subtle inner hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Container */}
              <motion.div 
                variants={skillIconHover}
                className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 w-14 h-14 flex items-center justify-center border border-slate-200/20 dark:border-slate-800/40 shadow-inner"
              >
                {skillLogos[skillName] || <span className="text-xs font-mono font-bold">API</span>}
              </motion.div>

              {/* Name */}
              <h4 className="font-outfit font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-tight">
                {skillName}
              </h4>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Skills;
