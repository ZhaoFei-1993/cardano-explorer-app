import path from 'path'

export default {
  devServer: {
    port: 4001,
  },
  entry: path.join(__dirname, 'source', 'index.tsx'),
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-react-router',
    'plugin-graphql',
    'plugin-sass-with-modules',
    [
      'react-static-plugin-source-filesystem',
      {
        location: path.resolve('./source/pages'),
      },
    ],
  ],
  paths: {
    src: 'source', // The source directory. Must include an index.js entry file.
    temp: 'build/tmp', // Temp output directory for build files not to be published.
    dist: 'build/static', // The production output directory.
    devDist: 'build/tmp/dev-server', // The development scratch directory.
    public: 'source/public', // The public directory (files copied to dist during build)
    assets: 'build/static', // The output directory for bundled JS and CSS
    buildArtifacts: 'build/artifacts', // The output directory for generated (internal) resources
  },
}
