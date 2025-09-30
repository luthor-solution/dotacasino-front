module.exports = {
  images: {
    domains: ["static.cdneu-stat.com"],
  },
  async rewrites() {
    return [
      {
        source: '/resources/:path*',
        destination: 'https://cdn.lvslot.net/resources/:path*',
      },
    ]
  },
};
