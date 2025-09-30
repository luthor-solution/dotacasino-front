module.exports = {
  images: {
    domains: ["static.cdneu-stat.com"],
  },
  async redirects() {
    return [
      {
        source: '/resources/:path*',
        destination: 'http://cdn.lvslot.net/resources/:path*',
        permanent: false,
      },
    ]
  },
};
