import * as React from 'react';
import { BrandType } from '../constants';
import BlocksBrowser from '../features/blocks/ui/BlocksBrowser';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

export const BlockPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <BlocksFeatureProvider>
      <BlocksBrowser title="Browse Blocks" />
    </BlocksFeatureProvider>
    <Footer />
  </Layout>
);

export default BlockPage;
