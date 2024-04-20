/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0284c7',
        secondary: '#111827'
      },
      backgroundColor: {
        primary: '#111827',
        secondary: '#0284c7'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
