/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5b8fd',
          400: '#818cf8',
          500: '#1e3a8a',
          600: '#1e3a8a',
          700: '#1e3799',
          800: '#1e3166',
          900: '#1a2b5c',
        },
        accent: {
          400: '#f59e0b',
          500: '#d97706',
        }
      },
    },
  },
  plugins: [],
};
