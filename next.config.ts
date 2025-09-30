module.exports = {
  images: {
    domains: ["static.cdneu-stat.com"],
  },
  async rewrites() {
    return [
      {
        source: '/resources/:path*',
        destination: 'http://cdn.lvslot.net/resources/:path*',
      },
    ]
  },
};
