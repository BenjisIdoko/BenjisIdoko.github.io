/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  // important: true,
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '980px',
      xl: '1440px'
    },
    extend: {},
  },
  plugins: [],
}
