import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mandarine: 'oklch(70% 0.19 55)',
        nextoo: 'oklch(58% 0.22 25)',
      },
      fontFamily: {
        sans: ['Luciole', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: 'oklch(55% 0.15 135)',
          'primary-content': 'oklch(98% 0.01 135)',
          secondary: 'oklch(25% 0.08 250)',
          'secondary-content': 'oklch(98% 0.01 250)',
          accent: 'oklch(65% 0.14 145)',
          'accent-content': 'oklch(98% 0.01 145)',
          neutral: 'oklch(35% 0.04 257)',
          'neutral-content': 'oklch(98% 0.003 247)',
          'base-100': 'oklch(98% 0.003 247)',
          'base-200': 'oklch(96% 0.007 247)',
          'base-300': 'oklch(92% 0.013 255)',
          'base-content': 'oklch(20% 0.042 265)',
          info: 'oklch(78% 0.154 211)',
          success: 'oklch(84% 0.238 128)',
          warning: 'oklch(85% 0.199 91)',
          error: 'oklch(71% 0.202 349)',
        },
      },
      {
        dark: {
          'color-scheme': 'dark',
          primary: 'oklch(58% 0.16 135)',
          'primary-content': 'oklch(98% 0.01 135)',
          secondary: 'oklch(65% 0.12 145)',
          'secondary-content': 'oklch(20% 0.04 135)',
          accent: 'oklch(68% 0.15 145)',
          'accent-content': 'oklch(98% 0.01 145)',
          neutral: 'oklch(30% 0.02 247)',
          'neutral-content': 'oklch(92% 0.01 247)',
          'base-100': 'oklch(20% 0.02 245)',
          'base-200': 'oklch(17% 0.018 245)',
          'base-300': 'oklch(25% 0.025 245)',
          'base-content': 'oklch(92% 0.01 247)',
          info: 'oklch(78% 0.154 211)',
          success: 'oklch(84% 0.238 128)',
          warning: 'oklch(85% 0.199 91)',
          error: 'oklch(71% 0.202 349)',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
} satisfies Config
