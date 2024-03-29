module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'custom-media-queries': true,
      },
      importFrom: {
        customMedia: {
          "--mobile": "(max-width: 800px)",
          "--desktop": "(min-width: 801px)"
        }
      },
    },
  },
}
