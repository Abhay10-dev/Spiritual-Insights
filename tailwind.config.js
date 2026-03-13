/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Spiritual Insights Design System
        saffron: {
          DEFAULT: '#FF9933',
          50: '#FFF4E6',
          100: '#FFE9CC',
          200: '#FFD199',
          300: '#FFBA66',
          400: '#FFA233',
          500: '#FF9933',
          600: '#CC7A29',
          700: '#995C1F',
          800: '#663D14',
          900: '#331F0A',
        },
        'deep-blue': {
          DEFAULT: '#1E3A8A',
          50: '#EFF2FB',
          100: '#DEE5F7',
          200: '#BDCBEF',
          300: '#9CB1E7',
          400: '#7B97DF',
          500: '#5A7DD7',
          600: '#3A63CF',
          700: '#1E3A8A',
          800: '#18306D',
          900: '#0E1C40',
        },
        gold: {
          DEFAULT: '#F5C542',
          50: '#FEFAE8',
          100: '#FEF5D1',
          200: '#FDEAA3',
          300: '#FBE075',
          400: '#FAD547',
          500: '#F5C542',
          600: '#C49E35',
          700: '#937628',
          800: '#624F1A',
          900: '#31270D',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'bead-pulse': 'bead-pulse 0.3s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        'bead-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
