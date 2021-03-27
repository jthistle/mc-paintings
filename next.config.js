// next.config.js

module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: {
    //     test: /\.(js|ts)x?$/,
    //   },
    //   use: ['@svgr/webpack'],
    // });

    config.module.rules.push({
      test: /\.(png|svg)$/,
      type: 'asset/resource',
    });

    return config;
  },
};
