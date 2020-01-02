import * as React from 'react';
import path from 'path';
import { cardanoExplorerTheme } from './source/styles/theme/theme';

export default {
  Document: ({
    Html,
    Head,
    Body,
    children,
    state: { siteData, renderMeta },
  }) => (
    <Html lang="en-US" style={cardanoExplorerTheme}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  devServer: {
    port: 4001,
  },
  entry: path.join(__dirname, 'source', 'index.tsx'),
  inlineCss: true,
  paths: {
    buildArtifacts: 'build/artifacts', // The output directory for generated (internal) resources
    devDist: 'build/tmp/dev-server', // The development scratch directory.
    dist: 'build/static', // The production output directory.
    public: 'source/public', // The public directory (files copied to dist during build)
    src: 'source', // The source directory. Must include an index.js entry file.
    temp: 'build/tmp', // Temp output directory for build files not to be published.
  },
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-react-router',
    'plugin-graphql',
    'plugin-sass-with-modules',
    [
      'react-static-plugin-source-filesystem',
      {
        location: path.resolve('./source/routes'),
      },
    ],
  ],
}
