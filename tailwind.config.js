/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  // important: true,
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '980px',
      xl: '1440px'
    },
    extend: {
      fontFamily:{
        sans:"Product Sans, system-ui, sans-serif",
      },
      // colors:{
      //   brand:"rgb(var(--color-brand) / <alpaha-value)>",
      // },
    },
  },
  plugins: [],
}
