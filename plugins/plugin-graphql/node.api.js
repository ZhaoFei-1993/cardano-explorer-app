export default () => ({
  webpack: (config) => {

    // Support GraphQL literals
    config.module.rules[0].oneOf.unshift({
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
      test: /\.(graphql|gql)$/,
    });

    return config;
  },
});
