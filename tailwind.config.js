/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#121110',
          900: '#0b0a09',
          800: '#1a1816',
          700: '#26231f',
          600: '#38342e',
        },
        gold: {
          50: '#fbf6ec',
          100: '#f4e8cf',
          200: '#ead3a2',
          300: '#dfbf80',
          DEFAULT: '#c9a96e',
          500: '#c9a96e',
          600: '#a8884d',
          700: '#7d6230',
        },
        ivory: '#f7f1e6',
        softwhite: '#fcfaf6',
        burgundy: {
          DEFAULT: '#6e1f2f',
          500: '#8a2a3e',
          700: '#561624',
          900: '#2e0b14',
        },
        rosegold: '#b76e79',
        blush: '#f0d5d0',
        warmpink: '#e9bfc0',
        wa: { DEFAULT: '#0f8a4f', dark: '#0b6e3f' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'Arial Narrow', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(-28px) translateX(10px)', opacity: '0.9' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.08)' },
        },
        beam: {
          '0%, 100%': { transform: 'rotate(-14deg)', opacity: '0.25' },
          '50%': { transform: 'rotate(14deg)', opacity: '0.6' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        beam: 'beam 7s ease-in-out infinite',
        eq: 'eq 1.1s ease-in-out infinite',
      },
      boxShadow: {
        gold: '0 10px 40px -12px rgba(201,169,110,0.55)',
        lux: '0 24px 60px -24px rgba(18,17,16,0.35)',
      },
    },
  },
  plugins: [],
};
