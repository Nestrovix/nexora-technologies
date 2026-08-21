import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: ['reveal-d1', 'reveal-d2', 'reveal-d3', 'reveal-d4', 'reveal-d5'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        navy: {
          950: '#050b1c',
          900: '#07112b',
          800: '#0b1a3d',
          700: '#122550',
          600: '#1a3068',
          500: '#26407f',
        },
        electric: {
          400: '#4da6ff',
          500: '#1f8bff',
          600: '#0b6fe0',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7338e0',
        },
        ink: {
          100: '#f5f8ff',
          200: '#dde5f4',
          300: '#b7c4dd',
          400: '#8697b8',
          500: '#8290b4',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: {
        card: '0 18px 45px -22px rgba(3, 10, 28, 0.75)',
        glow: '0 0 0 1px rgba(77,166,255,0.18), 0 24px 60px -30px rgba(31,139,255,0.55)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(120,160,220,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.07) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '56px 56px' },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        floaty: 'floaty 9s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'fade-up': 'fade-up .7s cubic-bezier(.22,.61,.36,1) both',
      },
      transitionTimingFunction: { premium: 'cubic-bezier(.22,.61,.36,1)' },
    },
  },
  plugins: [],
};

export default config;
