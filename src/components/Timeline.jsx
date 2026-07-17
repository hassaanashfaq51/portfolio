import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Server, Rocket } from 'lucide-react';
import { staggerContainer } from '../utils/animations';

const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const timelineData = [
  {
    phase: 'Phase 01',
    icon: Code,
    title: 'Started software development journey',
    description: 'Began exploring software engineering paradigms, mastering programming languages, data structures, OOP principles, and basic algorithm design.'
  },
  {
    phase: 'Phase 02',
    icon: BookOpen,
    title: 'Learned modern technologies',
    description: 'Dived into frontend engineering and mobile frameworks, mastering React.js, Tailwind CSS, Flutter, Dart, and responsive mobile/web layout systems.'
  },
  {
    phase: 'Phase 03',
    icon: Server,
    title: 'Built full-stack applications',
    description: 'Integrated client-server architectures, designing backend microservices with Node.js and Express.js, and deploying cloud datastores like Supabase & PostgreSQL.'
  },
  {
    phase: 'Phase 04',
    icon: Rocket,
    title: 'Developed real-world projects',
    description: 'Engineered and deployed complete software products for production, integrating payment Gateways, robust auth flows, role-based controls, and client dashboards.'
  }
];

const Timeline = () => {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative border-l border-indigo-200 dark:border-slate-800 ml-4 md:ml-6 space-y-8 md:space-y-12 py-4"
    >
      {timelineData.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            variants={timelineItemVariants}
            className="relative pl-8 md:pl-10 group"
          >
            {/* Timeline Dot Marker */}
            <div className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border border-indigo-500 bg-white dark:bg-slate-900 text-indigo-500 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-cyan-400 group-hover:text-white transition-all duration-200 shadow-md">
              <IconComponent size={14} />
            </div>

            {/* Content Container */}
            <motion.div 
              whileHover={{ y: -3, scale: 1.01, borderColor: "rgba(99, 102, 241, 0.4)", boxShadow: "0 10px 25px -10px rgba(99, 102, 241, 0.15)" }}
              className="glass-panel p-5 rounded-2xl transition-colors duration-300 cursor-default"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-cyan-500/10 dark:text-cyan-400">
                  {item.phase}
                </span>
              </div>
              <h4 className="font-outfit font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 mb-2">
                {item.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Timeline;
