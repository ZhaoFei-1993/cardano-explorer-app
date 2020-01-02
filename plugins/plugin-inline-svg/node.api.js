export default () => ({
  webpack: (config) => {

    // Support inline SVG
    config.module.rules[0].oneOf.unshift({
      test: /\.inline\.svg$/,
      loader: 'svg-inline-loader'
    });

    return config;
  },
});
