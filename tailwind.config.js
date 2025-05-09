/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#85ACFF',
          400: '#5C90FF',
          500: '#3B82F6',
          600: '#0B61EA',
          700: '#084BB8',
          800: '#063585',
          900: '#031F52',
        },
        secondary: '#4f46e5',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 