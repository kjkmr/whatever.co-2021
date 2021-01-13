module.exports = {
  i18n: {
    locales: ['ja', 'en', 'zh-hans'],
    defaultLocale: 'en',
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }

    return config;
  }
}
