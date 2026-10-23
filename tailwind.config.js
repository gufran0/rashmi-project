/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#111310',
          900: '#111310',
          800: '#1a1c19',
          700: '#232620',
          600: '#2c3028',
        },
        gold: {
          DEFAULT: '#C9A86A',
          light: '#D4B87A',
          dark: '#A8863F',
          pale: '#F0E6D0',
        },
        ivory: {
          DEFAULT: '#F7F3EC',
          dark: '#EDE6D8',
        },
        ink: '#111310',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
