/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B0B0B',
        secondary: '#FFFFFF',
        accent: '#6C63FF',
        'accent-2': '#7F5AF0',
        'accent-3': '#2CB67D',
        background: '#0F1115',
        card: 'rgba(255,255,255,0.05)',
        'glass': 'rgba(255,255,255,0.08)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7F5AF0, #2CB67D)',
        'gradient-dark': 'linear-gradient(180deg, #0B0B0B 0%, #0F1115 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(44,182,125,0.05))',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(108,99,255,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        glow: {
          from: { 'box-shadow': '0 0 20px rgba(108,99,255,0.3), 0 0 40px rgba(108,99,255,0.1)' },
          to: { 'box-shadow': '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(108,99,255,0.2)' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          from: { transform: 'translateY(-30px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(108,99,255,0.4)',
        'glow-green': '0 0 30px rgba(44,182,125,0.4)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5)',
        'glass': '0 8px 32px rgba(0,0,0,0.37)',
        'inner-glow': 'inset 0 0 30px rgba(108,99,255,0.1)',
      },
      screens: {
        '3xl': '1920px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
