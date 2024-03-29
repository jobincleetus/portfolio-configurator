/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#0085FF',
        grey: '#f5f5f5',
        darkerGrey: '#eeeeee',
        white: '#ffffff'
      }
    },
  },
  plugins: [],
}