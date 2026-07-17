import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ name, icon: Icon, percentage }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="glass-panel p-5 rounded-2xl flex flex-col justify-between"
    >
      <div className="flex items-center space-x-3 mb-4">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-500 dark:text-cyan-400">
            <Icon size={22} />
          </div>
        )}
        <h4 className="font-outfit font-semibold text-base sm:text-lg text-slate-800 dark:text-slate-100">{name}</h4>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Proficiency</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
