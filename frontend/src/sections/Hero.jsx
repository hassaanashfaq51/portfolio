import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar } from 'lucide-react';
import { buttonHover } from '../utils/animations';

const Hero = ({ onTabChange }) => {
  const handleBookConsultation = () => {
    // Dispatch custom event to select the Consultation tab in the Contact form
    const event = new CustomEvent('selectConsultationTab');
    window.dispatchEvent(event);
    if (onTabChange) {
      onTabChange('contact');
    }
  };

  // Sequence-ordered delay variants
  const headingVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } 
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 } 
    }
  };

  const buttonsContainerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.45 } 
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.6 } 
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.75 } 
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent">
      {/* Clean Animated Background - Grid overlay and floating glow blobs */}
      <div className="absolute inset-0 noise-overlay z-0 opacity-40" />
      
      {/* Interactive breathing grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.12] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Slowly moving glow blobs */}
      <motion.div 
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[15%] w-[350px] h-[350px] bg-indigo-500 rounded-full blur-[130px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -40, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-cyan-500 rounded-full blur-[130px] pointer-events-none z-0" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-8"
        >
          {/* Professional Profile Image */}
          <motion.div 
            variants={imageVariants}
            whileHover={{ scale: 1.05 }}
            className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-xl shadow-indigo-500/20 dark:shadow-indigo-500/10 flex items-center justify-center cursor-default group"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-800">
              <img 
                src="/assets/profile.jpg" 
                alt="Muhammad Hassaan" 
                className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-550"
              />
            </div>
            {/* Ambient breathing ring glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
          </motion.div>

          {/* Availability Badge */}
          <motion.div 
            variants={badgeVariants} 
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span>Available for Careers & Projects</span>
          </motion.div>

          {/* Developer Introduction */}
          <div className="space-y-4 max-w-2xl">
            <motion.h1 
              variants={headingVariants} 
              className="font-outfit font-extrabold text-4xl sm:text-6xl tracking-tight leading-none text-slate-800 dark:text-slate-100"
            >
              Muhammad Hassaan
            </motion.h1>

            <motion.h2 
              variants={subtitleVariants} 
              className="font-outfit font-bold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
            >
              Full-Stack Developer
            </motion.h2>
          </div>

          {/* Hero Summary */}
          <motion.div 
            variants={subtitleVariants} 
            className="space-y-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-medium"
          >
            <p>Full-Stack Developer building modern and efficient digital solutions.</p>
            <p>Passionate about creating intuitive experiences and solving complex problems.</p>
            <p>Dedicated to delivering clean, scalable, and user-focused applications.</p>
          </motion.div>

          {/* Hero Action Buttons */}
          <motion.div 
            variants={buttonsContainerVariants} 
            className="flex flex-wrap items-center justify-center gap-4 pt-4 z-20"
          >
            <motion.a 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              href="/assets/Muhammad_Hassaan_Resume.pdf"
              download="Muhammad_Hassaan_Resume.pdf"
              className="group flex items-center space-x-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/25 cursor-pointer transition-colors"
            >
              <FileText size={16} />
              <span>Download Resume</span>
            </motion.a>
            
            <motion.button 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={handleBookConsultation}
              className="flex items-center space-x-2 py-3 px-6 rounded-xl text-sm font-bold border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
            >
              <Calendar size={16} />
              <span>Book a Free Consultation</span>
            </motion.button>
          </motion.div>
    </motion.div>
      </div>
    </section>
  );
};

export default Hero;
