import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Blog from './sections/Blog';
import Inspiration from './sections/Inspiration';
import Contact from './sections/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { ArrowUp, Terminal, Heart, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionReveal } from './utils/animations';

// Code split heavy overlays and sub-views to optimize mobile initial load time
const ChatbotDrawer = React.lazy(() => import('./components/ChatbotDrawer'));
const About = React.lazy(() => import('./sections/About'));
const Education = React.lazy(() => import('./sections/Education'));
const Journey = React.lazy(() => import('./sections/Journey'));
const Resume = React.lazy(() => import('./sections/Resume'));

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    if (['home', 'about', 'education', 'experience', 'resume', 'blog'].includes(tabValue)) {
      window.scrollTo({ top: 0, behavior: tabValue === 'home' ? 'smooth' : 'auto' });
    } else {
      let retries = 0;
      const scrollToElement = () => {
        const element = document.getElementById(tabValue);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else if (retries < 10) {
          retries++;
          setTimeout(scrollToElement, 50); // Retry in case React state/mount is rendering the DOM
        }
      };
      setTimeout(scrollToElement, 100);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (res.ok) {
        setProjects(data);
      } else {
        setError(data.error || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to portfolio API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };



  const LoadingSpinner = (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <Loader size={36} className="animate-spin mb-4 text-indigo-500" />
      <span className="text-sm font-medium">Loading content...</span>
    </div>
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-cyan-200">
        
        {/* Animated Custom Cursor */}
        <Cursor />

        {/* Global Navigation */}
        <Navbar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onChatClick={() => {
            setIsChatOpen(true);
          }}
        />
        
        {/* Core Layout Containers */}
        <Suspense fallback={LoadingSpinner}>
          <div className="w-full">
            {['home', 'skills', 'projects', 'certificates', 'contact'].includes(activeTab) ? (
              <>
                <Hero onTabChange={handleTabChange} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Skills />
                  <Projects 
                    projects={projects}
                    loading={loading}
                    error={error}
                    onViewDetails={(proj) => setSelectedProjectDetails(proj)}
                  />
                  <Certificates />
                  <Inspiration />
                  <Contact />
                </div>
              </>
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-[70vh]">
                {activeTab === 'about' && <About />}
                {activeTab === 'education' && <Education />}
                {activeTab === 'experience' && <Journey />}
                {activeTab === 'resume' && <Resume />}
                {activeTab === 'blog' && <Blog />}
              </div>
            )}
          </div>
        </Suspense>

        {/* Global Footer */}
        <motion.footer 
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20 mt-12 text-center text-xs text-slate-500 dark:text-slate-400"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="flex items-center gap-1 font-semibold">
              Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> by Muhammad Hassaan © {new Date().getFullYear()}
            </p>
            <p className="font-medium text-[10px] tracking-wide">
              React • Express • Node.js • Supabase
            </p>
          </div>
        </motion.footer>

        <Suspense fallback={null}>


          {/* Chatbot Side Drawer Overlay */}
          <ChatbotDrawer
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </Suspense>

        {/* Project Details Dossier Modal */}
        <ProjectDetailsModal
          isOpen={!!selectedProjectDetails}
          project={selectedProjectDetails}
          onClose={() => setSelectedProjectDetails(null)}
        />

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -6, 0]
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                default: { duration: 0.3 }
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 25px rgba(99, 102, 241, 0.75)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20 border border-white/10 flex items-center justify-center cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </ThemeProvider>
  );
}

export default App;
