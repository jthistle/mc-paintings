// next.config.js

module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg)$/,
      type: 'asset/inline',
    });

    return config;
  },
};
