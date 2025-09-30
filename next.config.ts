module.exports = {
  images: {
    domains: ["static.cdneu-stat.com"],
  },
  async redirects() {
    return [
      {
        source: '/resources/slg/index.html',
        destination: 'http://cdn.lvslot.net/resources/slg/index.html',
        permanent: false,
      },
    ]
  },
};
