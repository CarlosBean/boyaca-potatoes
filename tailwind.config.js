/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
