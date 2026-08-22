import type { Config } from 'tailwindcss';

/**
 * NEXORA — SPEC-SHEET IDENTITY
 * ---------------------------------------------------------------------------
 * A light, technical palette: white paper, a single alternate band, one teal
 * accent and a hairline rule. No gradients, no glow, no shadow-based depth —
 * structure is carried by 1px rules and squared corners.
 */
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
        /** Page ground */
        paper: '#FFFFFF',
        /** Alternate section band */
        band: '#F2F4F7',
        /** Hairline rule — the only structural device besides type */
        line: '#D9DEE7',
        /** Single accent */
        accent: {
          DEFAULT: '#0F766E',
          600: '#0F766E',
          700: '#0B5A54',
          50: '#E7F1F0',
        },
        /**
         * Terminal / code panel ramp. Dark ground #0B1120 with foregrounds that
         * all clear 4.5:1 against it (measured minimum: 7.7:1).
         */
        term: {
          bg: '#0B1120',       // panel ground
          chrome: '#111A2C',   // title bar / gutter
          line: '#26324A',     // hairlines inside the panel
          text: '#D7DEEC',     // default code foreground — 13.9:1
          dim: '#9AA7BF',      // comments, line numbers — 7.8:1
          key: '#7FD1C6',      // keywords / accent — 10.6:1
          str: '#A8D89A',      // strings — 11.6:1
          num: '#F0B67F',      // numbers / literals — 10.5:1
          fn: '#9DBEF5',       // functions / properties — 10.0:1
          warn: '#F2C14E',     // amber status — 11.2:1
          ok: '#6FCF97',       // green status — 9.9:1
        },
        /** Text ramp — every step below clears 4.5:1 on both paper and band */
        ink: {
          900: '#0B1120', // headings, primary text
          800: '#1B2434', // strong body / emphasised values
          700: '#313C4F', // long-form body
          600: '#4A5568', // secondary body (7.4:1 on paper)
          500: '#5B6779', // muted labels (5.6:1 on paper, 5.1:1 on band)
        },
      },
      /**
       * Urbanist (body/UI), Red Hat Display (headings), Azeret Mono (code,
       * terminal, diagram and metric surfaces). See src/app/layout.tsx for the
       * measured metrics that drove the size and tracking retune.
       */
      fontFamily: {
        sans: ['var(--font-body)', 'Urbanist', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Red Hat Display', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Azeret Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      /**
       * Display steps, nudged up ~4%. Red Hat Display's cap-height is 70/100
       * against Manrope's 72 and its lowercase sets ~3% narrower, so at the
       * old values the headings read slightly small and slightly short. Only
       * the steps used exclusively by display type are touched — text-xl and
       * below carry body copy, where Urbanist's x-height (51 vs Public Sans's
       * 52) is close enough to leave alone.
       */
      fontSize: {
        '2xl': ['1.56rem', { lineHeight: '2.05rem' }],
        '3xl': ['1.95rem', { lineHeight: '2.3rem' }],
        '4xl': ['2.34rem', { lineHeight: '2.55rem' }],
        '5xl': ['3.12rem', { lineHeight: '1' }],
        '6xl': ['3.9rem', { lineHeight: '1' }],
        '7xl': ['4.68rem', { lineHeight: '1' }],
      },
      /**
       * Uppercase label tracking. Urbanist's capitals are ~7% narrower than
       * Public Sans's, so the spec-sheet labels need a little more air to keep
       * the same drafted feel; the button/link tracking follows suit.
       */
      letterSpacing: {
        label: '0.24em',
        key: '0.22em',
        control: '0.09em',
      },
      /** Squared throughout — 2px is the ceiling. */
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        '3xl': '2px',
        full: '9999px',
      },
      /** Hairlines replace shadows; the two legacy names resolve to nothing. */
      boxShadow: {
        card: 'none',
        glow: 'none',
      },
      backgroundImage: {
        /** Graph paper — minor 24px cells inside a 120px major division. */
        'graph-minor':
          'linear-gradient(to right, rgba(11,17,32,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,17,32,0.035) 1px, transparent 1px)',
        'graph-major':
          'linear-gradient(to right, rgba(11,17,32,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,17,32,0.055) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '24px 24px', 'grid-lg': '120px 120px' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.22,.61,.36,1) both',
      },
      transitionTimingFunction: { premium: 'cubic-bezier(.22,.61,.36,1)' },
    },
  },
  plugins: [],
};

export default config;
