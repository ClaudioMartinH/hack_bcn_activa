/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transitionProperty: {
        'grid-cols': 'grid-template-columns',
      },
    },
  },
  plugins: [],
}

