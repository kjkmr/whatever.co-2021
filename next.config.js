module.exports = {
  i18n: {
    locales: ['ja', 'en', 'zh-hans'],
    defaultLocale: 'ja',
  },
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/work/category/all',
        permanent: true,
      },
    ]
  },
}
