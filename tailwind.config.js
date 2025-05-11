/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        burgundy: '#800020',
        gold: '#D4AF37',
        cream: '#FFFDD0',
        charcoal: '#36454F',
      },
    },
  },
  plugins: [],
};