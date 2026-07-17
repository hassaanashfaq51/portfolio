import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, GraduationCap, Briefcase, Award } from 'lucide-react';
import { sectionReveal, titleReveal, subtitleReveal, staggerContainer, fadeUp } from '../utils/animations';

const About = () => {
  return (
    <motion.section 
      id="about" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[5%] w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Muhammad Hassaan</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Profile Summary */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-outfit font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100">
              Professional Full-Stack Developer
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              I am a dedicated Full-Stack Developer committed to building clean, high-performance, and scalable digital solutions. My approach to engineering centers on resolving real-world problems through modular architectural designs, robust database operations, and high-fidelity, intuitive frontend interfaces.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Specializing in the JavaScript/Node.js ecosystem, I leverage React.js for clean UI structures and Express for backend microservices, unified under Supabase serverless databases. I operate with a problem-solving mindset, writing maintainable code that delivers exceptional user experiences.
            </p>

            {/* Development Approach Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex items-start space-x-4 mt-6 transition-colors duration-300">
              <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-500 dark:text-cyan-400">
                <Code size={24} />
              </div>
              <div>
                <h4 className="font-outfit font-bold text-base text-slate-800 dark:text-slate-100">
                  Real-World Development Approach
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Focusing on writing production-ready code, setting up secure APIs, deploying auto-indexing database schemas, and building responsive animations using Framer Motion.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics Grid */}
          <motion.div 
            variants={staggerContainer}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            {[
              { label: 'Production Projects', value: '15+', icon: Code },
              { label: 'Core Technologies', value: '14+', icon: BookOpen },
              { label: 'Industry Focus', value: 'Full-Stack', icon: Briefcase },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px -10px rgba(99, 102, 241, 0.2)" }}
                  className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex sm:flex-col lg:flex-row items-center sm:items-start lg:items-center justify-between shadow-lg transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-500 dark:text-cyan-400">
                      <StatIcon size={22} />
                    </div>
                    <div>
                      <h4 className="font-outfit font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-slate-100">
                        {stat.value}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default About;
