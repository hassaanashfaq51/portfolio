import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Calendar, Building2, Eye, ShieldCheck } from 'lucide-react';
import DocumentLightboxModal from '../components/DocumentLightboxModal';
import { sectionReveal, titleReveal, subtitleReveal } from '../utils/animations';

const CREDENTIALS = [
  {
    id: 'cert-completion',
    typeBadge: '🏆 Certificate of Completion',
    badgeIcon: Award,
    title: 'Certificate of Completion',
    issuer: 'Decode Labs',
    program: 'Virtual Internship – Full Stack Development',
    meta: [
      { label: 'Duration', value: 'July 25, 2026 — August 25, 2026' },
      { label: 'Issued', value: 'August 26, 2026' },
      { label: 'Credential ID', value: 'FSD086772' }
    ],
    image: '/assets/decodelabs-certificate.png',
    alt: 'Decode Labs Certificate of Completion for Hassaan Ashfaq - Full Stack Development Virtual Internship',
    accentGradient: 'from-amber-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-amber-500 dark:text-amber-400',
    borderColor: 'hover:border-amber-500/40 dark:hover:border-amber-400/40'
  },
  {
    id: 'cert-lor',
    typeBadge: '⭐ Letter of Recommendation',
    badgeIcon: Star,
    title: 'Letter of Recommendation',
    issuer: 'Decode Labs',
    program: 'Letter of Recommendation – Full Stack Development',
    meta: [
      { label: 'Date', value: 'September 3, 2026' },
      { label: 'Endorsement', value: 'Full Stack Development' },
      { label: 'Status', value: 'Govt. Registered Enterprise' }
    ],
    image: '/assets/decodelabs-lor.png',
    alt: 'Decode Labs Letter of Recommendation for Hassaan Ashfaq - Full Stack Development',
    accentGradient: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    borderColor: 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40'
  }
];

// Card animation variants with smooth staggered reveal
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.18,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const Certificates = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <motion.section
      id="certificates"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-[25%] left-[5%] w-[320px] h-[320px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[320px] h-[320px] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div variants={titleReveal} className="inline-block mb-3">
            <span className="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20">
              PROFESSIONAL CREDENTIALS
            </span>
          </motion.div>

          <motion.h2
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Certificates &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">LOR</span>
          </motion.h2>

          <motion.div
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />

          <motion.p
            variants={subtitleReveal}
            className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Recognition of my professional growth, technical skills, and experience in Full Stack Development.
          </motion.p>
        </div>

        {/* Credentials Grid: 2 Side-by-Side Cards on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CREDENTIALS.map((item, index) => {
            const Icon = item.badgeIcon;
            return (
              <motion.div
                key={item.id}
                custom={index + 1}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  boxShadow: '0 24px 48px -12px rgba(99, 102, 241, 0.18)',
                  transition: { duration: 0.25, ease: 'easeOut' }
                }}
                onClick={() => setSelectedDoc(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDoc(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title} issued by ${item.issuer}`}
                className={`group glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/60 ${item.borderColor} transition-all duration-300 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500/50 relative overflow-hidden`}
              >
                {/* Subtle Card Ambient Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.accentGradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                {/* Top Card Info */}
                <div className="relative z-10">
                  {/* Badge & Organization */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60">
                      <Icon size={14} className={item.iconColor} />
                      <span>{item.typeBadge}</span>
                    </span>

                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Building2 size={13} className="text-indigo-500 dark:text-cyan-400" />
                      <span>{item.issuer}</span>
                    </span>
                  </div>

                  {/* Title & Program */}
                  <h3 className="font-outfit font-bold text-xl text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600 dark:text-cyan-400 mt-1">
                    {item.program}
                  </p>

                  {/* Metadata Attributes */}
                  <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 grid grid-cols-2 gap-2 text-xs">
                    {item.meta.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-0.5">
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {m.label}
                        </span>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Preview Frame */}
                <div className="relative z-10 mt-6 rounded-2xl overflow-hidden bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 p-3 sm:p-4 flex items-center justify-center min-h-[240px] sm:min-h-[260px] max-h-[320px] shadow-inner group/doc">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="max-h-[220px] sm:max-h-[240px] w-auto max-w-full object-contain rounded-lg shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
                    />

                    {/* Subtle Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 text-xs font-bold shadow-lg flex items-center gap-1.5 border border-white/20">
                        <Eye size={14} className="text-indigo-500 dark:text-cyan-400" />
                        Click to Expand Viewer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer: View Credential CTA (Strictly View-Only) */}
                <div className="relative z-10 mt-5 pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Verified Document
                  </span>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all">
                    <Eye size={14} />
                    <span>VIEW CREDENTIAL</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Full-Screen Lightbox Modal */}
      <DocumentLightboxModal
        isOpen={!!selectedDoc}
        documentData={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </motion.section>
  );
};

export default Certificates;
