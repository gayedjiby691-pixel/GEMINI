/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A14',
        violet: {
          DEFAULT: '#7B61FF',
          soft: 'rgba(123, 97, 255, 0.15)',
        },
        ghost: '#F0EFF4',
        graphite: '#18181B',
        card: {
          DEFAULT: '#12121E',
          hover: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '2rem',
        pill: '3rem',
        hero: '4rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(123, 97, 255, 0.25)',
        'glow-lg': '0 0 80px rgba(123, 97, 255, 0.3)',
        'glow-sm': '0 0 20px rgba(123, 97, 255, 0.15)',
        card: '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(123, 97, 255, 0.15)' },
          '100%': { boxShadow: '0 0 50px rgba(123, 97, 255, 0.35)' },
        },
      },
    },
  },
  plugins: [],
}
