/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "../**/*.{razor,razor.css,cs,js,html}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '8rem',
        '2xl': '10rem',
      }
    },
    colors: {
      'text': '#180202',
      'background': '#fafafa',
      'primary': '#bd9ddd',
      'secondary': '#dad7ea',
      'accent': '#9edcad',
      'gray': {
        DEFAULT: '#808080',
        50: '#f2f2f2',
        100: '#e6e6e6',
        200: '#cccccc',
        300: '#b3b3b3',
        400: '#999999',
        500: '#808080',
        600: '#666666',
        700: '#4d4d4d',
        800: '#333333',
        900: '#1a1a1a',
        950: '#0d0d0d',
      },
      'transparent': 'transparent',
    },
  },
  plugins: [],
}
