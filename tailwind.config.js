/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0fbfc',
          100: '#ccf2f5',
          200: '#99e5eb',
          300: '#5fcfd9',
          400: '#2eb5c4',
          500: '#159aa9',
          600: '#0d7b8a',
          700: '#0d6270',
          800: '#0f4f5a',
          900: '#114146',
          950: '#082930',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f9f3e9',
          200: '#f2e7d0',
          300: '#e9d4ab',
          400: '#ddb87f',
          500: '#d09e5a',
          600: '#b8824a',
          700: '#996b3f',
          800: '#7d573a',
          900: '#674833',
        },
        coral: {
          50: '#fff5f0',
          100: '#ffe5d4',
          200: '#ffc7a3',
          300: '#ffa06b',
          400: '#ff7a3d',
          500: '#f25c1a',
          600: '#d94512',
          700: '#b33612',
          800: '#8f2c14',
          900: '#752714',
        },
        gold: {
          400: '#e8b54a',
          500: '#d99f2e',
          600: '#b8862a',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
