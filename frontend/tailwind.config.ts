/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/page.tsx',
    './**/components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f68e4',
        secondary: '#f9a8d4',
        panelBg: '#fefcf5',
      },
    },
  },
  plugins: [],
};
