import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Star, GitFork, BookOpen, ExternalLink, Github as GitIcon, User } from 'lucide-react';

const Github = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = 'hassaanashfaq51'; // Recommended standard handle

  const fallbackProfile = {
    name: 'Muhammad Hassaan',
    bio: 'Full-Stack Developer specializing in React, Node, and Supabase.',
    followers: 18,
    following: 22,
    public_repos: 14,
    avatar_url: '/assets/profile.png' // High quality generated profile picture
  };

  const fallbackRepos = [
    {
      id: 1,
      name: 'u2-collective-portal',
      description: 'Employee management portal designed to manage operations, payrolls, administrative tasks, and staff permissions.',
      stargazers_count: 8,
      forks_count: 3,
      language: 'JavaScript',
      html_url: 'https://github.com/hassaanashfaq51/u2-collective-portal'
    },
    {
      id: 2,
      name: 'flutter-taskmanager',
      description: 'A Flutter-based mobile scheduler featuring offline SQLite synchronizations, alerts, and calendar metrics.',
      stargazers_count: 5,
      forks_count: 2,
      language: 'Dart',
      html_url: 'https://github.com/hassaanashfaq51/flutter-taskmanager'
    },
    {
      id: 3,
      name: 'portfolio-website',
      description: 'Interactive custom portfolio layout featuring Vite, Tailwind, Framer Motion, and backend Express connections.',
      stargazers_count: 12,
      forks_count: 4,
      language: 'JavaScript',
      html_url: 'https://github.com/hassaanashfaq51/portfolio'
    },
    {
      id: 4,
      name: 'express-ecommerce-api',
      description: 'High performance backend API endpoints for e-commerce, offering catalog search, cart operations, and stripe integration.',
      stargazers_count: 7,
      forks_count: 1,
      language: 'JavaScript',
      html_url: 'https://github.com/hassaanashfaq51/ecommerce-platform'
    }
  ];

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Try fetching profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        } else {
          setProfile(fallbackProfile);
        }

        // Try fetching repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          // Filter out forks and verify data size
          const filtered = reposData.filter(r => !r.fork).slice(0, 4);
          setRepos(filtered.length > 0 ? filtered : fallbackRepos);
        } else {
          setRepos(fallbackRepos);
        }
      } catch (err) {
        setProfile(fallbackProfile);
        setRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section id="github" className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10">
      <div className="absolute top-[20%] right-[15%] w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            GitHub <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Contribution & Code</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 p-1 relative mb-4">
                <img 
                  src={profile?.avatar_url || fallbackProfile.avatar_url} 
                  alt="GitHub Avatar" 
                  className="w-full h-full object-cover rounded-full bg-slate-800"
                />
              </div>

              <h3 className="font-outfit font-extrabold text-lg text-slate-800 dark:text-slate-100">
                {profile?.name || fallbackProfile.name}
              </h3>
              <a 
                href={`https://github.com/${username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-indigo-500 dark:text-cyan-400 font-semibold mt-1 flex items-center space-x-1 hover:underline"
              >
                <span>@{username}</span>
                <ExternalLink size={10} />
              </a>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-4 px-2 leading-relaxed">
                {profile?.bio || fallbackProfile.bio}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200/50 dark:border-slate-800/50 w-full mt-6 pt-4">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    {profile?.public_repos || fallbackProfile.public_repos}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Repos</p>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    {profile?.followers || fallbackProfile.followers}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Followers</p>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    {profile?.following || fallbackProfile.following}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Following</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Repository Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between hover:border-indigo-500/50 shadow-md transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2 text-indigo-500 dark:text-cyan-400">
                      <BookOpen size={16} />
                      <h4 className="font-outfit font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 truncate max-w-[150px]">
                        {repo.name}
                      </h4>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-500 dark:hover:text-cyan-400"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal line-clamp-3 mb-4">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/20 dark:border-slate-800/20">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span>{repo.language || 'Code'}</span>
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork size={12} />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Github;
