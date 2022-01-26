module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './pages/**/*.js',
    './components/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'p-blue': '#6474af',
        'pink': '#fe9d97',
      },
      borderWidth: {
        default: '1px',
        '1': '1px',
      },
      outline: {
        pink: '2px solid #fe9d97',
      }
    },
  },
  variants: {},
  plugins: [],
}
