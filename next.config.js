const redirects = require('./redirects.json')

module.exports = {
  i18n: {
    locales: ['ja', 'en', 'zh-hant'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/work/category/all/',
        permanent: false,
      },
      {
        source: '/zh/:slug/',
        destination: '/zh-hant/:slug/',
        permanent: true,
      },
      {
        source: '/zh/team/:slug/',
        destination: '/zh-hant/team/:slug/',
        permanent: true,
      },
    ].concat(redirects)
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    return config;
  },
  images: {
    domains: ['cdn.whatever.co']
  }
}
