import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail, Briefcase, LogOut, Loader, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

const AdminDashboard = ({ isOpen, onClose, onAuthChange, projects, onRefreshProjects }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Project form states
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTech, setFormTech] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Check login status on mount/open
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        setIsLoggedIn(true);
        onAuthChange(true);
      }
    };
    if (isOpen) checkLogin();
  }, [isOpen]);

  // Fetch messages if logged in
  useEffect(() => {
    if (isLoggedIn && activeTab === 'messages' && isOpen) {
      fetchMessages();
    }
  }, [isLoggedIn, activeTab, isOpen]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const [contactsRes, consultationsRes] = await Promise.all([
        fetch('/api/contacts', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/consultations', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      let contacts = [];
      let consultations = [];
      
      if (contactsRes.ok) {
        const cData = await contactsRes.json();
        contacts = Array.isArray(cData) ? cData.map(c => ({ ...c, type: 'inquiry' })) : [];
      }
      
      if (consultationsRes.ok) {
        const cData = await consultationsRes.json();
        consultations = Array.isArray(cData) ? cData.map(c => ({ ...c, type: 'consultation' })) : [];
      }
      
      const merged = [...contacts, ...consultations].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      setMessages(merged);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      // Supabase Login
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        
        localStorage.setItem('admin_token', data.session.access_token);
        setIsLoggedIn(true);
        onAuthChange(true);
      } catch (err) {
        setAuthError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback local secret passcode
      setTimeout(() => {
        if (passcode === 'admin' || passcode === 'portfolio_admin_2026') {
          localStorage.setItem('admin_token', 'fallback_admin_token');
          setIsLoggedIn(true);
          onAuthChange(true);
        } else {
          setAuthError('Invalid passcode. Use passcode: admin');
        }
        setLoading(false);
      }, 500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    onAuthChange(false);
    setEmail('');
    setPassword('');
    setPasscode('');
  };

  const handleOpenAddForm = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormDescription('');
    setFormTech('');
    setFormFeatures('');
    setFormLiveUrl('');
    setFormGithubUrl('');
    setFormImageUrl('');
    setShowFormModal(true);
  };

  const handleOpenEditForm = (proj) => {
    setEditingProject(proj);
    setFormTitle(proj.title || '');
    setFormDescription(proj.description || '');
    setFormTech(proj.technologies ? proj.technologies.join(', ') : '');
    setFormFeatures(proj.features ? proj.features.join(', ') : '');
    setFormLiveUrl(proj.live_url || '');
    setFormGithubUrl(proj.github_url || '');
    setFormImageUrl(proj.image_url || '');
    setShowFormModal(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const token = localStorage.getItem('admin_token');
    const payload = {
      title: formTitle,
      description: formDescription,
      technologies: formTech.split(',').map(s => s.trim()).filter(Boolean),
      features: formFeatures.split(',').map(s => s.trim()).filter(Boolean),
      live_url: formLiveUrl,
      github_url: formGithubUrl,
      image_url: formImageUrl
    };

    try {
      let response;
      if (editingProject) {
        // Update
        response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        setShowFormModal(false);
        onRefreshProjects();
      } else {
        const err = await response.json();
        alert('Failed to save project: ' + err.error);
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setActionLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        onRefreshProjects();
      } else {
        const err = await response.json();
        alert('Failed to delete project: ' + err.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/50 dark:border-slate-800/50"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h2 className="font-outfit font-extrabold text-lg text-slate-800 dark:text-slate-100">
              Admin Command Console
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Not Logged In View */}
        {!isLoggedIn ? (
          <div className="flex-grow p-6 sm:p-8 flex flex-col justify-center max-w-md mx-auto w-full">
            <h3 className="font-outfit font-bold text-xl text-center text-slate-800 dark:text-slate-100 mb-2">
              Sign In to Dashboard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">
              {isSupabaseConfigured 
                ? 'Authenticate using your Supabase developer credentials.' 
                : 'Demo Mode: Supabase not configured. Access dashboard using fallback password.'}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {isSupabaseConfigured ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@hassaan.dev"
                      className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Passcode</label>
                  <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    placeholder="Enter admin passcode"
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <span className="block mt-1 text-[10px] text-emerald-500">
                    💡 Tip: Enter 'admin' or 'portfolio_admin_2026'
                  </span>
                </div>
              )}

              {authError && (
                <div className="text-xs text-red-500 font-medium bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 text-center">
                  ⚠️ {authError}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader size={16} className="animate-spin" /> : <span>Access Console</span>}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Main Panel */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden h-full">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800/50 p-4 space-y-2 flex md:flex-col justify-between items-center md:items-stretch bg-slate-50/50 dark:bg-slate-900/10">
              <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1.5 w-full">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center justify-center md:justify-start space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === 'projects' 
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/15' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Briefcase size={16} />
                  <span className="hidden md:inline">Projects</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center justify-center md:justify-start space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === 'messages' 
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/15' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Mail size={16} />
                  <span className="hidden md:inline">Inquiries</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold rounded-xl text-red-500 hover:bg-red-500/10 transition-colors w-auto md:w-full md:mt-auto"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Log Out</span>
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-grow p-5 sm:p-6 overflow-y-auto min-h-0 bg-white/10 dark:bg-slate-950/10">
              {activeTab === 'projects' ? (
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-outfit font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                      Manage Projects
                    </h3>
                    <button 
                      onClick={handleOpenAddForm}
                      className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/10"
                    >
                      <Plus size={14} />
                      <span>New Project</span>
                    </button>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id} 
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img 
                            src={proj.image_url} 
                            alt={proj.title} 
                            className="w-10 h-10 rounded-lg object-cover bg-slate-200 border border-slate-300/30"
                          />
                          <div className="overflow-hidden">
                            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{proj.title}</h4>
                            <p className="text-[10px] text-slate-400 truncate">{proj.technologies ? proj.technologies.join(', ') : ''}</p>
                          </div>
                        </div>

                        <div className="flex space-x-1 pl-3">
                          <button 
                            onClick={() => handleOpenEditForm(proj)}
                            className="p-2 text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-lg transition-colors"
                          >
                            <Plus size={14} className="rotate-45" /> {/* Just custom edit layout or icon */}
                          </button>
                          <button 
                            onClick={() => handleProjectDelete(proj.id)}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Messages Tab */
                <div>
                  <h3 className="font-outfit font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100 mb-5">
                    Messages & Contacts
                  </h3>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                      <Loader size={24} className="animate-spin mb-2" />
                      <span className="text-xs">Fetching messages...</span>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      No inquiries received yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-900/20"
                        >
                          <div className="flex flex-wrap justify-between items-start mb-2.5">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{msg.name || msg.full_name}</h4>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  msg.type === 'consultation' 
                                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/15'
                                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15'
                                }`}>
                                  {msg.type}
                                </span>
                              </div>
                              <a 
                                href={`mailto:${msg.email}`} 
                                className="text-xs text-indigo-500 dark:text-cyan-400 hover:underline"
                              >
                                {msg.email}
                              </a>
                              {msg.type === 'consultation' && (
                                <div className="mt-1 space-y-0.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                                  {(msg.subject || msg.project_type) && (
                                    <p>Subject/Type: <span className="text-indigo-500 dark:text-cyan-400">{msg.subject || msg.project_type}</span></p>
                                  )}
                                  {msg.phone && (
                                    <p>Phone: <span className="text-indigo-500 dark:text-cyan-400">{msg.phone}</span></p>
                                  )}
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-white/30 dark:bg-slate-950/20 p-2.5 rounded-lg border border-slate-300/10 leading-relaxed whitespace-pre-line">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Embedded Project Editor Form Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30">
                <h3 className="font-outfit font-extrabold text-base text-slate-800 dark:text-slate-100">
                  {editingProject ? 'Edit Showcase Project' : 'Add Showcase Project'}
                </h3>
                <button 
                  onClick={() => setShowFormModal(false)} 
                  className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="flex-grow p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Project Title</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    placeholder="e.g. U2 Collective HR Portal"
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Description</label>
                  <textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    rows="3"
                    placeholder="Describe your web application..."
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Technologies (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    placeholder="React.js, Node.js, Supabase, Tailwind CSS"
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Key Features (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="Authentication, Admin dashboard, Database schema"
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Live Demo URL</label>
                    <input 
                      type="url" 
                      value={formLiveUrl}
                      onChange={(e) => setFormLiveUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formGithubUrl}
                      onChange={(e) => setFormGithubUrl(e.target.value)}
                      placeholder="https://github.com/mhassaan/repo"
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Image Link URL</label>
                  <input 
                    type="text" 
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="w-full py-3 mt-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 flex items-center justify-center space-x-2 shadow-lg"
                >
                  {actionLoading ? <Loader size={16} className="animate-spin" /> : <span>Publish Project</span>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
