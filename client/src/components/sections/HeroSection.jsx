import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'
import { useData } from '../../context/DataContext'
import useFetch from '../../hooks/useFetch'

const iconMap = { github: FiGithub, linkedin: FiLinkedin, twitter: FiTwitter, email: FiMail, x: FiTwitter }

// Typing effect hook
const useTypingEffect = (words = []) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIndex % words.length]
    const timeout = isDeleting ? 50 : 100
    const deleteDelay = !isDeleting && text === current ? 1800 : timeout

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text !== current) setText(current.slice(0, text.length + 1))
        else setIsDeleting(true)
      } else {
        if (text !== '') setText(current.slice(0, text.length - 1))
        else { setIsDeleting(false); setWordIndex(i => i + 1) }
      }
    }, deleteDelay)

    return () => clearTimeout(timer)
  }, [text, wordIndex, isDeleting, words])

  return text
}

export default function HeroSection() {
  const { hero, socialLinks } = useData()
  const { data: resume } = useFetch('/resume')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const typingWords = hero?.typing_words || ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver']
  const typedText = useTypingEffect(typingWords)

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-accent/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] border border-accent-3/5 rounded-full"
        />
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/8 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-3/6 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <motion.div style={{ y, opacity }} className="section pt-32 pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass border border-accent/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-accent-3 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400 font-mono">Available for work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-4"
            >
              Hi, I'm <br />
              <span className="gradient-text">{hero?.name || 'Your Name'}</span>
            </motion.h1>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl font-heading font-semibold text-gray-300 mb-6 h-10"
            >
              <span className="text-accent">{typedText}</span>
              <span className="animate-ping text-accent">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              {hero?.description || 'I craft premium digital experiences with cutting-edge technologies. Specializing in full-stack development, creating scalable and beautiful web applications.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to={hero?.cta_primary_link || '/projects'} className="btn-primary flex items-center gap-2 group">
                {hero?.cta_primary_text || 'View Projects'}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {resume?.url ? (
                <a href={resume.url} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                  <FiDownload /> Download CV
                </a>
              ) : (
                <Link to={hero?.cta_secondary_link || '/contact'} className="btn-secondary">
                  {hero?.cta_secondary_text || 'Contact Me'}
                </Link>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-600 text-sm font-mono">Follow me</span>
              <div className="w-12 h-px bg-gradient-to-r from-gray-600 to-transparent" />
              <div className="flex gap-3">
                {socialLinks.map(link => {
                  const Icon = iconMap[link.platform?.toLowerCase()] || FiGithub
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="w-10 h-10 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
                    >
                      <Icon size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right — Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-[-20px] rounded-full border border-accent/10 animate-spin-slow" />
              <div className="absolute inset-[-40px] rounded-full border border-accent-3/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

              {/* Main image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-3/10 rounded-full blur-3xl" />

                {hero?.profile_image ? (
                  <img
                    src={hero.profile_image}
                    alt={hero.name}
                    className="relative z-10 w-full h-full object-cover rounded-full border-2 border-white/10"
                  />
                ) : (
                  <div className="relative z-10 w-full h-full rounded-full border-2 border-white/10 bg-gradient-to-br from-accent/20 to-accent-3/10 flex items-center justify-center">
                    <span className="font-heading font-black text-8xl text-white/20">
                      {hero?.name?.[0] || 'P'}
                    </span>
                  </div>
                )}

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 glass border border-accent/20 rounded-2xl px-4 py-3 z-20"
                >
                  <p className="text-xs text-gray-400 font-mono">Experience</p>
                  <p className="text-xl font-heading font-bold gradient-text">
                    {hero?.stats?.[0]?.value || '3+'} <span className="text-sm">Years</span>
                  </p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-4 -left-4 glass border border-accent-3/20 rounded-2xl px-4 py-3 z-20"
                >
                  <p className="text-xs text-gray-400 font-mono">Projects</p>
                  <p className="text-xl font-heading font-bold text-accent-3">
                    {hero?.stats?.[1]?.value || '50+'}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}
