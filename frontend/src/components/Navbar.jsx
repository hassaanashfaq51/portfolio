import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Terminal, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonHover } from '../utils/animations';

const Navbar = ({ onAdminClick, isAdminLoggedIn, activeTab, onTabChange, onChatClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', value: 'home' },
    { name: 'About', value: 'about' },
    { name: 'Skills', value: 'skills' },
    { name: 'Projects', value: 'projects' },
    { name: 'Education', value: 'education' },
    { name: 'Experience', value: 'experience' },
    { name: 'Resume', value: 'resume' },
    { name: 'Contact', value: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, value) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onTabChange(value);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-navbar shadow-md py-3' : 'bg-transparent py-5'}`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-2">
            <span className="font-outfit font-extrabold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">
              Hassaan.dev
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.value}`}
                onClick={(e) => handleNavClick(e, item.value)}
                className={`relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer rounded-lg group ${
                  activeTab === item.value
                    ? 'text-indigo-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-cyan-400'
                }`}
              >
                {/* Active menu smoothly slides */}
                {activeTab === item.value && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-indigo-500/10 dark:bg-cyan-500/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 flex flex-col items-center">
                  {item.name}
                  {/* Hover underline animation */}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
                </span>
              </a>
            ))}

            {/* AI Assistant Button */}
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={onChatClick}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 bg-indigo-500/10 dark:bg-cyan-500/10 hover:bg-indigo-500/20 dark:hover:bg-cyan-500/20 cursor-pointer border border-indigo-500/20 dark:border-cyan-400/20 transition-all duration-200"
              title="AI Portfolio Assistant"
            >
              <Bot size={14} className="animate-pulse" />
              <span>AI Assistant</span>
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              className="p-2 rounded-full glass-panel flex items-center justify-center hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 cursor-pointer bg-white/10 dark:bg-slate-900/10 border border-slate-200/20 dark:border-slate-800/40"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </motion.button>

            {/* Admin Console Toggle */}
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={onAdminClick}
              className={`p-2 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isAdminLoggedIn 
                  ? 'border-green-500 text-green-500 bg-green-500/10' 
                  : 'border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500'
              }`}
              title="Admin Panel"
            >
              <Terminal size={18} />
            </motion.button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-panel hover:bg-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onAdminClick}
              className={`p-2 rounded-full border ${
                isAdminLoggedIn 
                  ? 'border-green-500 text-green-500 bg-green-500/10' 
                  : 'border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Terminal size={18} />
            </button>

            {/* AI Assistant Mobile Toggle */}
            <button
              onClick={onChatClick}
              className="p-2 rounded-full glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-indigo-500 dark:text-cyan-400 border border-indigo-500/10 dark:border-cyan-400/10"
              aria-label="AI Assistant"
            >
              <Bot size={18} className="animate-pulse" />
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full glass-panel text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden glass-navbar w-full mt-3 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-3 space-y-2 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.value}`}
                  onClick={(e) => handleNavClick(e, item.value)}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    activeTab === item.value
                      ? 'bg-indigo-500/10 text-indigo-500 font-bold dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-500'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  onChatClick();
                }}
                className="px-3 py-2.5 rounded-lg text-base font-bold flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md cursor-pointer text-left"
              >
                <Bot size={18} className="animate-pulse" />
                <span>AI Portfolio Assistant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
