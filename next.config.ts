module.exports = {
  images: {
    domains: ["static.cdneu-stat.com"],
  },
  async rewrites() {
    return [
      {
        source: '/resources/slg/index.html',
        destination: 'http://cdn.lvslot.net/resources/slg/index.html',
      },
    ]
  },
};
