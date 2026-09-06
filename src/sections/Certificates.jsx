import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import DocumentLightboxModal from '../components/DocumentLightboxModal';
import { sectionReveal, titleReveal, subtitleReveal } from '../utils/animations';

const CREDENTIALS = [
  {
    id: 'cert-completion',
    title: 'Certificate of Completion',
    issuer: 'Decode Labs',
    image: '/assets/decodelabs-certificate.png',
    alt: 'Certificate of Completion - Decode Labs'
  },
  {
    id: 'cert-lor',
    title: 'Letter of Recommendation',
    issuer: 'Decode Labs',
    image: '/assets/decodelabs-lor.png',
    alt: 'Letter of Recommendation - Decode Labs'
  }
];

// Card animation variants with smooth staggered reveal
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.15,
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Certificates &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">LOR</span>
          </motion.h2>

          <motion.div
            variants={subtitleReveal}
            className="w-14 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Clean Credential Cards: Two Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {CREDENTIALS.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index + 1}
              variants={cardVariants}
              whileHover={{
                y: -6,
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
              aria-label={`View ${item.title} - ${item.issuer}`}
              className="group glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500/40 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500/50 relative overflow-hidden"
            >
              {/* Top: Credential Title & Decode Labs */}
              <div>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {item.issuer}
                </p>
              </div>

              {/* Middle: Document Preview Frame */}
              <div className="my-6 rounded-2xl overflow-hidden bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 p-3 sm:p-4 flex items-center justify-center h-64 sm:h-72 shadow-inner group/doc transition-colors">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-contain rounded-lg shadow-sm transition-transform duration-300 ease-out group-hover:scale-[1.02] select-none pointer-events-none"
                />
              </div>

              {/* Bottom: One Simple "View Credential" Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDoc(item);
                }}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <Eye size={16} />
                <span>View Credential</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simplified Document Viewer Modal */}
      <DocumentLightboxModal
        isOpen={!!selectedDoc}
        documentData={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </motion.section>
  );
};

export default Certificates;
