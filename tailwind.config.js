/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens driven by CSS variables
        surface: {
          base: 'var(--bg-base)',
          raised: 'var(--bg-raised)',
          elevated: 'var(--bg-elevated)',
          overlay: 'var(--bg-overlay)',
          // Legacy mappings for backward compatibility
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          card: 'var(--bg-card)',
          'card-hover': 'var(--bg-card-hover)',
          glass: 'var(--bg-glass)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
          strong: 'var(--border-strong)',
          active: 'var(--border-active)',
          glow: 'var(--border-glow)',
        },
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Executive Gold / Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          primary: '#f59e0b',
          secondary: '#10b981', // Validation / Seat status Emerald
          amber: '#f59e0b',
          emerald: '#10b981',
          champagne: '#f5e6a3', // Highlight / Eyebrow chips
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        headline: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['44px', { lineHeight: '52px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl-mobile': ['30px', { lineHeight: '38px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '700' }],
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow-amber': '0 0 32px -4px rgba(245, 158, 11, 0.25)',
        'glow-emerald': '0 0 32px -4px rgba(16, 185, 129, 0.25)',
      },
      borderRadius: {
        'card': '1rem', // 16px
        'card-lg': '1.25rem', // 20px
        'card-xl': '1.5rem', // 24px
      },
      transitionTimingFunction: {
        'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
