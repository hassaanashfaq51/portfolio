import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, Briefcase, Award, Sparkles, CheckCircle2, Workflow } from 'lucide-react';

const PROJECT_DETAILS_MAP = {
  'proj-1': {
    role: 'Full Stack Developer',
    fullDescription: 'U2 Collective HR Management Portal is a full-stack web-based Human Resource Management System designed to centralize employee management and daily HR operations in one secure platform.\n\nThe system includes two main user roles: CEO/Admin and Employee. The CEO/Admin manages employees and HR operations, while employees have restricted access based on their role and permissions.',
    highlights: [],
    howItWorks: [
      'The CEO/Admin creates and manages employee accounts.',
      'Employees log in using credentials assigned by the CEO/Admin.',
      'The system identifies the user\'s role and provides the appropriate dashboard.',
      'Employee attendance is automatically recorded through login and logout activity.',
      'The CEO/Admin can manage employees, attendance, tasks, reviews, documents, and reports from one centralized platform.'
    ],
    whatLearned: null,
    outcome: 'This project demonstrates my ability to build a complete full-stack business application with authentication, role-based access control, backend APIs, database integration, automated workflows, secure data handling, and modern dashboard development.'
  },
  'proj-5': {
    role: 'Frontend Developer',
    fullDescription: 'TaskPilot is a modern productivity-focused web application built to provide an organized and efficient task management experience. The application allows users to create, manage, prioritize, categorize, and track tasks through an interactive and responsive interface.',
    highlights: [
      'Built the application using Vanilla JavaScript',
      'Implemented DOM manipulation for dynamic task management',
      'Used Local Storage for client-side data persistence',
      'Created filtering and sorting functionality',
      'Implemented search functionality',
      'Added task deadline logic',
      'Designed responsive layouts',
      'Added light and dark mode support',
      'Focused on smooth interactions and user experience',
      'Added import and export functionality'
    ],
    whatLearned: 'TaskPilot demonstrates my ability to build a complete and interactive frontend web application using Vanilla JavaScript. The project focuses on DOM manipulation, client-side data persistence, responsive design, user experience, accessibility, and polished interface development.',
    outcome: 'A feature-rich productivity application demonstrating strong practical frontend development skills and the ability to create interactive, responsive, and persistent web experiences without relying on a backend database.'
  },
  'proj-2': {
    role: 'Backend Developer',
    fullDescription: 'This project is a modular User Management REST API built using Node.js, Express.js, MongoDB Atlas, and Mongoose. It provides complete CRUD functionality for managing user records while implementing schema validation, persistent cloud database storage, environment-based configuration, and centralized error handling.',
    highlights: [
      'Connected a Node.js and Express.js backend with MongoDB Atlas',
      'Designed a Mongoose User schema',
      'Implemented validation rules for name, email, and age',
      'Built modular controllers, routes, models, configuration, and middleware',
      'Implemented complete CRUD functionality',
      'Used environment variables to protect database credentials',
      'Created centralized error handling',
      'Tested Create, Read, Update, and Delete operations using Postman',
      'Verified database persistence through MongoDB Atlas'
    ],
    whatLearned: 'This project demonstrates my ability to integrate a backend application with a cloud database, design schemas, implement persistent CRUD operations, validate user input, organize backend code into a modular architecture, and handle API errors professionally.',
    outcome: 'A complete database-integrated backend API that demonstrates practical skills in Node.js, Express.js, MongoDB, Mongoose, RESTful architecture, validation, error handling, and persistent data storage.'
  },
  'proj-3': {
    role: 'Backend Developer',
    fullDescription: 'This project focuses on developing a RESTful backend API using Node.js and Express.js. The application demonstrates how backend routes, controllers, middleware, request handling, validation, and structured API responses work together to build a clean and maintainable server-side application.',
    highlights: [
      'Built backend routes using Express.js',
      'Organized API logic into a structured architecture',
      'Worked with RESTful HTTP methods',
      'Implemented middleware concepts',
      'Tested API endpoints using Postman',
      'Improved understanding of server-side request and response handling'
    ],
    whatLearned: 'This project demonstrates my ability to build and organize a backend application using Node.js and Express.js, understand RESTful API principles, manage HTTP requests and responses, and test backend functionality using Postman.',
    outcome: 'A functional RESTful backend API that demonstrates practical backend development skills and provides a strong foundation for building larger full-stack applications.'
  },
  'proj-4': {
    role: 'Frontend Developer',
    fullDescription: 'This project focuses on building a responsive frontend interface using modern HTML5 and CSS3 techniques. The main objective was to create a clean, structured, and visually appealing interface while ensuring that the layout adapts smoothly across desktop, tablet, and mobile devices.',
    highlights: [
      'Designed layouts that adapt to different screen sizes',
      'Applied responsive design principles',
      'Used CSS Grid for flexible layouts',
      'Focused on clean visual hierarchy and spacing',
      'Improved understanding of mobile-first frontend development'
    ],
    whatLearned: 'This project demonstrates my understanding of core frontend development concepts, responsive design, semantic HTML structure, CSS layouts, and building interfaces that provide a consistent experience across multiple devices.',
    outcome: 'A polished responsive frontend project that demonstrates practical skills in HTML5, CSS3, CSS Grid, and mobile-first web development.'
  }
};

const ProjectDetailsModal = ({ isOpen, project, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keep a local copy of the project data to avoid flashing/layout shifts during exit animation
  const [activeProject, setActiveProject] = useState(null);
  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  // Use the active/last-known project info during exit animation
  const displayProject = project || activeProject;
  if (!displayProject) return null;

  const { id, title, technologies, features, live_url, github_url, image_url, description } = displayProject;
  
  // Retrieve mapped details or fallback gracefully
  const detailedInfo = PROJECT_DETAILS_MAP[id] || {
    role: 'Developer',
    fullDescription: description,
    highlights: features || [],
    whatLearned: '',
    outcome: 'Demonstrates modern software development best practices, modular structures, and responsive user interfaces.'
  };

  const techList = Array.isArray(technologies) 
    ? technologies 
    : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()) : []);

  const featList = Array.isArray(features) 
    ? features 
    : (typeof features === 'string' ? features.split(',').map(f => f.trim()) : []);

  // Animations configuration
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: 'spring',
        duration: 0.45,
        bounce: 0.1,
        ease: 'easeOut' 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 max-h-[90vh]"
          >
            {/* Header Action Bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse" />
                <h4 className="font-outfit font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                  Project Detail Dossier
                </h4>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Container */}
            <div className="overflow-y-auto flex-grow">
              {/* Banner Section */}
              <div className="h-56 sm:h-72 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img 
                  src={image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-outfit font-extrabold text-2xl sm:text-3xl text-white drop-shadow-md">
                    {title}
                  </h3>
                  <div className="flex items-center mt-2 text-indigo-300 dark:text-cyan-300 font-semibold text-xs sm:text-sm">
                    <Briefcase size={14} className="mr-1.5" />
                    <span>Role: {detailedInfo.role}</span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Summary Description */}
                <div className="space-y-3">
                  <h5 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Sparkles size={14} className="mr-2 text-indigo-500" />
                    Project Overview
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {detailedInfo.fullDescription}
                  </p>
                </div>

                {/* Technologies Grid */}
                <div className="space-y-3">
                  <h5 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Cpu size={14} className="mr-2 text-indigo-500" />
                    Technologies Applied
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-cyan-500/10 dark:text-cyan-400 border border-indigo-500/5 dark:border-cyan-500/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grid of highlights & highlights features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Key Features */}
                  {featList.length > 0 && (
                    <div className="space-y-4">
                      <h5 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <CheckCircle2 size={14} className="mr-2 text-green-500" />
                        Key Features
                      </h5>
                      <ul className="space-y-3">
                        {featList.map((feat, index) => (
                          <li key={index} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 mr-2.5 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Development Highlights */}
                  {detailedInfo.highlights && detailedInfo.highlights.length > 0 && (
                    <div className="space-y-4">
                      <h5 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <Award size={14} className="mr-2 text-indigo-500" />
                        Development Highlights
                      </h5>
                      <ul className="space-y-3">
                        {detailedInfo.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 mr-2.5 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* How It Works */}
                {detailedInfo.howItWorks && detailedInfo.howItWorks.length > 0 && (
                  <div className="space-y-4">
                    <h5 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <Workflow size={14} className="mr-2 text-indigo-500 animate-pulse" />
                      How It Works
                    </h5>
                    <ol className="space-y-3 pl-5 list-decimal text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {detailedInfo.howItWorks.map((step, index) => (
                        <li key={index} className="pl-1 leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* What I Learned / Technical Concepts Demonstrated */}
                {detailedInfo.whatLearned && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-cyan-400">
                      What I Learned / Technical Concepts Demonstrated
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {detailedInfo.whatLearned}
                    </p>
                  </div>
                )}

                {/* Project Outcome */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-cyan-400">
                    Project Outcome
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {detailedInfo.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30">
              {github_url && (
                <a 
                  href={github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {live_url && (
                <a 
                  href={live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/10 transition-all cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Live Demonstration</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
