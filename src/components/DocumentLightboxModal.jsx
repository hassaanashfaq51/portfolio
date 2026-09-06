import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const DocumentLightboxModal = ({ isOpen, documentData, onClose }) => {
  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Note: Per requirements, ESC-key listener is intentionally omitted.

  if (!isOpen || !documentData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={onClose}
        className="fixed inset-0 z-[150] flex flex-col bg-slate-950/90 backdrop-blur-md text-slate-100 select-none"
        role="dialog"
        aria-modal="true"
        aria-label={documentData.title || 'Credential Viewer'}
      >
        {/* Top Header Bar with Document Info and Visible Close (×) Button */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex-none px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-lg flex items-center justify-between gap-4 z-20 shadow-md"
        >
          <div className="min-w-0">
            <h3 className="font-outfit font-bold text-base sm:text-lg text-slate-100 truncate">
              {documentData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 truncate">
              {documentData.issuer}
            </p>
          </div>

          {/* Simple Visible Close (×) Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/90 hover:bg-red-500/20 hover:border-red-500/40 border border-slate-700/70 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500"
            title="Close"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Centered Document Viewport - Displays clearly while preserving original aspect ratio */}
        <div
          onClick={onClose}
          className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 flex items-center justify-center cursor-default"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-full max-h-full"
          >
            <div className="rounded-2xl p-2 sm:p-3 bg-slate-900/90 border border-slate-800 shadow-2xl">
              <img
                src={documentData.image}
                alt={documentData.title}
                loading="eager"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-xl select-none"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentLightboxModal;
