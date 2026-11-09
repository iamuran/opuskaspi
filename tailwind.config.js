/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#eefbf8', 100: '#d5f5ee', 500: '#14a38b', 600: '#0e8a76', 700: '#0b6e5f' },
      },
    },
  },
  plugins: [],
}
