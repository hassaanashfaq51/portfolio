import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { sectionReveal, titleReveal, subtitleReveal, staggerContainer, fadeUp } from '../utils/animations';

const cardVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible,
  hover: {
    y: -6,
    scale: 1.02,
    borderColor: "rgba(99, 102, 241, 0.35)",
    boxShadow: "0 15px 30px -10px rgba(99, 102, 241, 0.2)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'COMSATS University Islamabad',
      icon: GraduationCap,
      description: 'Focused on advanced computing topics, system designs, software engineering methodology, and web stack infrastructure.'
    }
  ];

  return (
    <motion.section 
      id="education" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Background</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Education Cards Centered Layout */}
        <motion.div 
          variants={staggerContainer}
          className="flex justify-center w-full"
        >
          {educationData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col justify-between hover:border-indigo-500/35 transition-colors duration-300 max-w-2xl w-full"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-cyan-400">
                    <IconComponent size={24} />
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <h3 className="font-outfit font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-snug">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-500 dark:text-cyan-400">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Education;
