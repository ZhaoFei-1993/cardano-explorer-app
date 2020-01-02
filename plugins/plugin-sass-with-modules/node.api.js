import autoprefixer from 'autoprefixer';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

export default ({ includePaths = [], ...rest }) => ({
  webpack: (config, { stage }) => {
    let loaders = [];

    const sassLoaderPath = require.resolve('sass-loader');

    const cssLoader = {
      loader: 'css-loader',
      options: {
        importLoaders: true,
        localIdentName: '[name]_[local]',
        modules: true,
        sourceMap: true,
        ...rest.cssLoaderOptions
      },
    };

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          postcssFlexbugsFixes,
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
        sourceMap: true,
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
            hot: stage === 'dev',
            reloadAll: true,
          },
        },
        cssLoader,
        postCssLoader,
        sassLoader,
      ]
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [
        {
          ...cssLoader,
          options: {
            ...cssLoader.options,
            exportOnlyLocals: true,
          },
        },
        postCssLoader,
        sassLoader
      ]
    } else {
      // Prod
      loaders = [
        ExtractCssChunks.loader,
        cssLoader,
        postCssLoader,
        sassLoader
      ]
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
