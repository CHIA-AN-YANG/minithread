/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/page.tsx',
    './**/components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a99b83',
        primaryDark: '#816f4f',
        secondary: '#9aba8c',
        secondaryDark: '#678d57',
        mePage: '#ebf2f4',
      },
    },
  },
  plugins: [],
};
