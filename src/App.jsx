import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import AdminDashboard from './components/AdminDashboard';
import ChatbotDrawer from './components/ChatbotDrawer';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Inspiration from './sections/Inspiration';
import Journey from './sections/Journey';
import Github from './sections/Github';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionReveal } from './utils/animations';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    if (['home', 'about', 'education', 'experience', 'resume'].includes(tabValue)) {
      window.scrollTo({ top: 0, behavior: tabValue === 'home' ? 'smooth' : 'auto' });
    } else {
      setTimeout(() => {
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
        }
      }, 100);
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

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
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

  const handleDeleteProjectDirect = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-cyan-200">
        
        {/* Animated Custom Cursor */}
        <Cursor />

        {/* Global Navigation */}
        <Navbar 
          onAdminClick={() => setIsAdminOpen(true)} 
          isAdminLoggedIn={isAdminLoggedIn} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onChatClick={() => setIsChatOpen(true)}
        />
        
        {/* Core Layout Containers */}
        <div className="w-full">
          {['home', 'skills', 'projects', 'contact'].includes(activeTab) ? (
            <>
              <Hero onTabChange={handleTabChange} />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Skills />
                <Projects 
                  projects={projects}
                  loading={loading}
                  error={error}
                  isAdmin={isAdminLoggedIn}
                  onEdit={() => setIsAdminOpen(true)} // Opens admin pane where full details are configured
                  onDelete={handleDeleteProjectDirect}
                />
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
            </div>
          )}
        </div>

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

        {/* Admin Dashboard Overlay Modal */}
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onAuthChange={setIsAdminLoggedIn}
          projects={projects}
          onRefreshProjects={fetchProjects}
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

        {/* Chatbot Side Drawer Overlay */}
        <ChatbotDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
