/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        base: {
          100: 'var(--color-base-100)',
          200: 'var(--color-base-200)',
          300: 'var(--color-base-300)',
          content: 'var(--color-base-content)',
        },
        // Primary
        primary: {
          DEFAULT: 'var(--color-primary)',
          content: 'var(--color-primary-content)',
        },
        // Secondary
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          content: 'var(--color-secondary-content)',
        },
        // Accent
        accent: {
          DEFAULT: 'var(--color-accent)',
          content: 'var(--color-accent-content)',
        },
        // Neutral
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          content: 'var(--color-neutral-content)',
        },
        // Semantic colors
        info: {
          DEFAULT: 'var(--color-info)',
          content: 'var(--color-info-content)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          content: 'var(--color-success-content)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          content: 'var(--color-warning-content)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          content: 'var(--color-error-content)',
        },
      },
      borderRadius: {
        'selector': 'var(--radius-selector)',
        'field': 'var(--radius-field)',
        'box': 'var(--radius-box)',
      },
    },
  },
  plugins: [],
}
