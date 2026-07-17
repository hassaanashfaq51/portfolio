import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';

const ChatbotDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi! I’m Hassaan’s Portfolio Assistant. Ask me anything about my skills, projects, education, or experience.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await response.json();
      
      // Artificial delay for better UX and typing indicator visualization
      setTimeout(() => {
        setIsTyping(false);
        if (response.ok && data.response) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: data.response
            }
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'Sorry, I encountered an issue connecting to the Portfolio API. Please try again.'
            }
          ]);
        }
      }, 750);

    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: 'Network error. I am unable to connect to Hassaan’s portfolio server right now.'
          }
        ]);
      }, 750);
    }
  };

  // Drawer Animation Variants
  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-[4px] cursor-pointer"
          />

          {/* Drawer container */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-900 shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-900 flex justify-between items-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/25 flex items-center justify-center">
                  <Bot size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-outfit font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-1.5 leading-none">
                    Portfolio Assistant
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                    Muhammad Hassaan
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                aria-label="Close Chat"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/20 relative">
              <div className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {messages.map((msg, index) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} relative z-10`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed transition-colors shadow-sm ${
                        isAssistant
                          ? 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 rounded-tl-sm'
                          : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white rounded-tr-sm shadow-indigo-500/10'
                      }`}
                    >
                      {/* For assistant responses with lists, format nicely */}
                      <p className="whitespace-pre-line font-medium text-xs sm:text-sm">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start relative z-10"
                >
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl rounded-tl-sm p-3.5 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 flex items-center space-x-3"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about skills, projects, experience..."
                  className="w-full text-xs sm:text-sm p-3.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-cyan-500/20 font-medium transition-all duration-200"
                />
                <Sparkles size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              </div>

              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3.5 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md shadow-indigo-500/25 hover:shadow-cyan-500/20 transition-all flex items-center justify-center cursor-pointer ${
                  (!inputValue.trim() || isTyping) && 'opacity-50 cursor-not-allowed shadow-none hover:shadow-none'
                }`}
                aria-label="Send Message"
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatbotDrawer;
