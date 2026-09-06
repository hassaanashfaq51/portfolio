import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Award } from 'lucide-react';

const DocumentLightboxModal = ({ isOpen, documentData, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);

  // Reset zoom on open or change of document
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, documentData]);

  // Keyboard controls: Escape to close, +/-/0 to zoom
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2)));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom((prev) => Math.max(0.75, +(prev - 0.25).toFixed(2)));
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !documentData) return null;

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2)));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(0.75, +(prev - 0.25).toFixed(2)));
  };

  const handleZoomReset = (e) => {
    e.stopPropagation();
    setZoom(1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={onClose}
        className="fixed inset-0 z-[150] flex flex-col bg-slate-950/90 backdrop-blur-md text-slate-100 select-none"
        role="dialog"
        aria-modal="true"
        aria-label={documentData.title || 'Credential Viewer'}
      >
        {/* Top Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="flex-none px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-lg flex items-center justify-between gap-4 z-20 shadow-lg"
        >
          {/* Document Title & Badge */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-outfit font-bold text-sm sm:text-base text-slate-100 truncate">
                  {documentData.title}
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-indigo-500/10 text-cyan-300 border border-indigo-500/20">
                  Verified Credential
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {documentData.issuer} • {documentData.program}
              </p>
            </div>
          </div>

          {/* Viewer Controls: Zoom & Close */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/60 shadow-inner">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Zoom Out (-)"
                aria-label="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>

              <button
                type="button"
                onClick={handleZoomReset}
                className="px-2 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
                title="Reset Zoom (0)"
                aria-label="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Zoom In (+)"
                aria-label="Zoom In"
              >
                <ZoomIn size={16} />
              </button>

              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="p-1.5 ml-1 rounded-lg text-cyan-400 hover:bg-slate-700/80 transition-colors"
                  title="Reset to Normal View"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-red-500/20 hover:border-red-500/40 border border-slate-700/60 transition-all cursor-pointer"
              title="Close Viewer (Esc)"
              aria-label="Close Viewer"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>

        {/* Center Document Viewport */}
        <div
          ref={containerRef}
          onClick={onClose}
          className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative cursor-default max-w-full"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Elegant Document Matting & Glow */}
            <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 border border-slate-700/60 shadow-2xl shadow-indigo-950/60">
              <img
                src={documentData.image}
                alt={documentData.title}
                loading="eager"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[75vh] sm:max-h-[78vh] w-auto max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl sm:rounded-2xl select-none pointer-events-auto border border-white/10 shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Status / Guidance Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={(e) => e.stopPropagation()}
          className="flex-none px-4 py-2.5 border-t border-slate-800/80 bg-slate-900/70 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Credential • Authorized Online Verification</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Use zoom controls or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">+</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">-</kbd> to inspect details • Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Esc</kbd> to close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentLightboxModal;
