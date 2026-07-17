// Unified Framer Motion Animation Variants for Premium UI
// Respects prefers-reduced-motion automatically

const isReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

// Page / Section Entrance (Fade-in + slide-up with stagger)
export const sectionReveal = {
  hidden: { opacity: 0, y: isReduced ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isReduced ? 0.15 : 0.6,
      ease: [0.16, 1, 0.3, 1], // smooth, custom exponential easeOut
      staggerChildren: isReduced ? 0 : 0.12,
      delayChildren: 0.05
    }
  }
};

// Section Header Title (Slide up, fade, remove blur)
export const titleReveal = {
  hidden: { opacity: 0, y: isReduced ? 0 : 20, filter: isReduced ? "none" : "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: isReduced ? 0.15 : 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Section Header Subtitle (Delay-matched slide up, fade, remove blur)
export const subtitleReveal = {
  hidden: { opacity: 0, y: isReduced ? 0 : 15, filter: isReduced ? "none" : "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: isReduced ? 0.15 : 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Standard Container Stagger
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isReduced ? 0 : 0.08,
      delayChildren: 0.05
    }
  }
};

// Fade & Slide up variant for children
export const fadeUp = {
  hidden: { opacity: 0, y: isReduced ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isReduced ? 0.15 : 0.5,
      ease: "easeOut"
    }
  }
};

// Skill Card Hover config
export const skillCardHover = {
  hover: {
    scale: isReduced ? 1 : 1.06,
    y: isReduced ? 0 : -4,
    boxShadow: "0 12px 24px -10px rgba(99, 102, 241, 0.45)",
    borderColor: "rgba(99, 102, 241, 0.4)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Skill Card Icon hover rotation + scaling
export const skillIconHover = {
  hover: {
    rotate: isReduced ? 0 : 3,
    scale: isReduced ? 1 : 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Project Card Hover config
export const projectCardHover = {
  hover: {
    scale: isReduced ? 1 : 1.02,
    y: isReduced ? 0 : -6,
    boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.25)",
    borderColor: "rgba(99, 102, 241, 0.35)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Button Hover & Tap micro-interactions
export const buttonHover = {
  hover: {
    y: isReduced ? 0 : -2,
    scale: isReduced ? 1 : 1.03,
    boxShadow: "0 8px 20px -4px rgba(99, 102, 241, 0.4)",
    transition: {
      duration: 0.18,
      ease: "easeOut"
    }
  },
  tap: {
    scale: isReduced ? 1 : 0.97,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

// Image hover Zoom & Brightness increase
export const imageHover = {
  hover: {
    scale: isReduced ? 1 : 1.06,
    filter: "brightness(1.08)",
    transition: {
      duration: 0.45,
      ease: "easeOut"
    }
  }
};

// Tech tags hover
export const tagHover = {
  hover: {
    y: isReduced ? 0 : -1.5,
    scale: isReduced ? 1 : 1.05,
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  }
};
