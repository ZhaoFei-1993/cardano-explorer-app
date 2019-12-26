import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

export default ({ includePaths = [], ...rest }) => ({
  webpack: (config, { stage }) => {
    let loaders = [];

    const sassLoaderPath = require.resolve('sass-loader');

    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]_[local]',
        importLoaders: true,
        ...rest.cssLoaderOptions
      },
    };

    const sassLoader = {
      loader: sassLoaderPath,
      options: {
        implementation: require('sass'),
        sassOptions: {
          includePaths: ['source/', ...includePaths],
        },
        sourceMap: true,
        ...rest.sassLoaderOptions
      },
    };

    if (stage === 'dev') {
      // Dev
      loaders = [
        {
          loader: ExtractCssChunks.loader,
          options: {
            hot: true,
          },
        },
        cssLoader,
        sassLoader,
      ]
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [cssLoader, sassLoader]
    } else {
      // Prod
      loaders = [ExtractCssChunks.loader, cssLoader, sassLoader]
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.s(a|c)ss$/,
      use: loaders,
    });

    if (
      config.optimization.splitChunks &&
      config.optimization.splitChunks &&
      config.optimization.splitChunks.cacheGroups.styles
    ) {
      config.optimization.splitChunks.cacheGroups.styles.test = /\.(c|sc|sa)ss$/
    }

    return config
  },
})
