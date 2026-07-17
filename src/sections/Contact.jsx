import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Send, Calendar, Loader, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sectionReveal, titleReveal, subtitleReveal, buttonHover, fadeUp, staggerContainer } from '../utils/animations';

const contactCardVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible,
  hover: {
    x: 6,
    scale: 1.02,
    borderColor: "rgba(99, 102, 241, 0.4)",
    boxShadow: "0 10px 20px -8px rgba(99, 102, 241, 0.2)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const Contact = () => {
  const [activeForm, setActiveForm] = useState('message'); // 'message' or 'consultation'

  // Inquiry Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Consultation Form States
  const [consName, setConsName] = useState('');
  const [consEmail, setConsEmail] = useState('');
  const [consPhone, setConsPhone] = useState('');
  const [consSubject, setConsSubject] = useState('');
  const [consMessage, setConsMessage] = useState('');
  const [consLoading, setConsLoading] = useState(false);
  const [consSubmitted, setConsSubmitted] = useState(false);
  const [consErrorMsg, setConsErrorMsg] = useState('');

  // Event listener to automatically switch tabs when consultation button is clicked in Hero
  useEffect(() => {
    const handleSwitchTab = () => {
      setActiveForm('consultation');
    };
    window.addEventListener('selectConsultationTab', handleSwitchTab);
    return () => window.removeEventListener('selectConsultationTab', handleSwitchTab);
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg(result.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Failed to connect to backend api.');
    } finally {
      setLoading(false);
    }
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setConsLoading(true);
    setConsErrorMsg('');

    if (!consName.trim()) {
      setConsErrorMsg('Full Name is required.');
      setConsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(consEmail)) {
      setConsErrorMsg('Please enter a valid email address.');
      setConsLoading(false);
      return;
    }

    if (!consMessage.trim()) {
      setConsErrorMsg('Project Details/Message is required.');
      setConsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: consName,
          email: consEmail,
          phone: consPhone,
          subject: consSubject,
          message: consMessage
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConsSubmitted(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#06B6D4', '#8B5CF6']
        });
        setConsName('');
        setConsEmail('');
        setConsPhone('');
        setConsSubject('');
        setConsMessage('');
      } else {
        setConsErrorMsg(result.error || 'Failed to book consultation. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setConsErrorMsg('Network error. Failed to connect to backend api.');
    } finally {
      setConsLoading(false);
    }
  };

  // Custom Brand SVG Icons
  const GmailIcon = () => (
    <svg className="w-[18px] h-[18px] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.29 1.454-2.032 2.514-1.222L12 11.365l9.486-7.13c1.06-.81 2.514-.068 2.514 1.222z"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg className="w-[18px] h-[18px] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.22.694.825.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg className="w-[18px] h-[18px] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
    </svg>
  );

  const WhatsappIcon = () => (
    <svg className="w-[18px] h-[18px] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  const contactDetails = [
    { label: 'Email', value: 'hassanashfaq51@gmail.com', href: 'mailto:hassanashfaq51@gmail.com', icon: GmailIcon },
    { label: 'GitHub', value: 'github.com/hassaanashfaq51', href: 'https://github.com/hassaanashfaq51', icon: GithubIcon },
    { label: 'LinkedIn', value: 'linkedin.com/in/m-hassaan-57845508', href: 'https://linkedin.com/in/m-hassaan-57845508', icon: LinkedinIcon },
    { label: 'WhatsApp', value: '+92 311 6647440', href: 'https://wa.me/923116647440', icon: WhatsappIcon },
  ];

  const projectTypes = [
    'Web Application',
    'Mobile Application (Flutter)',
    'E-Commerce Platform',
    'Custom Database Integration (Supabase)',
    'API Development / Backend Routing',
    'Other Technical Consultation'
  ];

  return (
    <motion.section 
      id="contact" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Connect & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Collaborate</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm max-w-md mx-auto">
            Have a project in mind, a job opportunity, or want to arrange a free tech consultation? Get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <h3 className="font-outfit font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100">
                Contact Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Connect via professional social networks or reach out directly via phone and email. Let's build something exceptional together.
              </p>
            </div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.a
                    key={index}
                    href={detail.href}
                    target={detail.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={detail.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    variants={contactCardVariants}
                    whileHover="hover"
                    className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex items-center space-x-4 hover:border-indigo-500/50 shadow-sm transition-colors duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-500 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {detail.label}
                      </h4>
                      <p className="font-outfit font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-none">
                        {detail.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Dynamic Form Panel */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl h-full flex flex-col justify-between transition-colors duration-300">
              
              {/* Form Toggles */}
              <div className="flex border-b border-slate-200/30 dark:border-slate-800/30 pb-4 mb-6 gap-2">
                <motion.button
                  type="button"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveForm('message')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                    activeForm === 'message'
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Send size={12} />
                  <span>Send Message</span>
                </motion.button>
                <motion.button
                  type="button"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveForm('consultation')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                    activeForm === 'consultation'
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Calendar size={12} />
                  <span>Book Consultation</span>
                </motion.button>
              </div>

              {/* Form Render */}
              {activeForm === 'message' ? (
                /* INQUIRY FORM */
                submitted ? (
                  <div className="text-center py-10 space-y-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center text-green-500">
                      <CheckCircle size={48} className="animate-bounce" />
                    </div>
                    <h4 className="font-outfit font-extrabold text-xl text-slate-800 dark:text-slate-100">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Thank you for reaching out. I've received your query and will reply shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-indigo-500 dark:text-cyan-400 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-4 flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Your Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="John Doe"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Your Email</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="john@example.com"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Message</label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="5"
                        placeholder="Hi Hassaan, I would like to collaborate on..."
                        className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {errorMsg && (
                      <div className="text-xs text-red-500 font-semibold bg-red-500/10 p-2.5 rounded-xl border border-red-500/10 text-center">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    <motion.button 
                      type="submit" 
                      disabled={loading}
                      variants={buttonHover}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 shadow-md flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      {loading ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )
              ) : (
                /* CONSULTATION FORM */
                consSubmitted ? (
                  <div className="text-center py-10 space-y-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center text-green-500">
                      <CheckCircle size={48} className="animate-bounce" />
                    </div>
                    <h4 className="font-outfit font-extrabold text-xl text-slate-800 dark:text-slate-100">
                      Consultation Booked Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Thank you for booking. I've received your consultation request and will send an email invite within 24 hours.
                    </p>
                    <button 
                      onClick={() => setConsSubmitted(false)}
                      className="text-xs text-indigo-500 dark:text-cyan-400 font-bold hover:underline"
                    >
                      Book another consultation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-4 flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={consName}
                          onChange={(e) => setConsName(e.target.value)}
                          required
                          placeholder="John Doe"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={consEmail}
                          onChange={(e) => setConsEmail(e.target.value)}
                          required
                          placeholder="john@example.com"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          value={consPhone}
                          onChange={(e) => setConsPhone(e.target.value)}
                          placeholder="+92 311 6647440"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Subject (Optional)</label>
                        <input 
                          type="text" 
                          value={consSubject}
                          onChange={(e) => setConsSubject(e.target.value)}
                          placeholder="e.g., E-commerce App development"
                          className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Project Details / Message</label>
                      <textarea 
                        value={consMessage}
                        onChange={(e) => setConsMessage(e.target.value)}
                        required
                        rows="4"
                        placeholder="Provide details about what you want to construct, technical preferences, timeline, and goals..."
                        className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {consErrorMsg && (
                      <div className="text-xs text-red-500 font-semibold bg-red-500/10 p-2.5 rounded-xl border border-red-500/10 text-center">
                        ⚠️ {consErrorMsg}
                      </div>
                    )}

                    <motion.button 
                      type="submit" 
                      disabled={consLoading}
                      variants={buttonHover}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 shadow-md flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      {consLoading ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Calendar size={14} />
                          <span>Request Consultation</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
