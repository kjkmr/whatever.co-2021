module.exports = {
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
