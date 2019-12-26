export default () => ({
  webpack: (config) => {

    // Support GraphQL literals
    config.module.rules[0].oneOf.unshift({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
});
