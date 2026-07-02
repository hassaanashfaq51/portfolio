import { motion } from 'framer-motion'

export default function LoadingScreen({ minimal = false }) {
  if (minimal) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#0B0B0B] flex flex-col items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />

      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center font-heading font-bold text-4xl shadow-glow-accent">
          P
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-accent/30"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-heading font-bold text-2xl text-white mb-2"
      >
        Portfolio
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 text-sm font-mono"
      >
        Loading experience...
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
        className="h-px bg-gradient-to-r from-accent to-accent-3 mt-8 rounded-full"
      />
    </motion.div>
  )
}
