/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom:
          '0 0px 2px -1px rgba(0, 0, 0, 0.1), 0 -2px 0px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
}
