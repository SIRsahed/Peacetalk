/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: '1%'
      },
      colors: {
        'primary': '#4D0EFF',
        'secondary': '#3B374E',
        'gr': '#81858F'
      },
      backgroundColor: {
        'primary': '#0A0A14',
        'btn': '#4D0EFF'
      },
      fontFamily: {
        'pops': ["Poppins", 'serif'],
        'roboto': ["Roboto", 'serif']
      },
      boxShadow: {
        'input': '4px 4px 4px 0px rgba(52, 36, 121, 0.25), -4px -4px 4px 0px rgba(52, 36, 121, 0.25)'
      }
    },
  },
  plugins: [],
}