module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    width: {
      container: '340px',
    },
    height: {
      100: '26rem',
    },
    minHeight: {
      75: '75px',
    },
    maxWidth: {
      170: '170px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
