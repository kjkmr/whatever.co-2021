module.exports = {
  i18n: {
    locales: ['ja', 'en', 'zh-hant'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/work/',
        destination: '/work/category/all/',
        permanent: false,
      },
    ]
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
